'use client';

import { useState, useCallback, useRef } from 'react';

// ══════════════════════════════════════════════════════════════
// SHARED TYPES & HELPERS
// ══════════════════════════════════════════════════════════════

interface CleanRow {
  text: string;
  source: string;
  source_url: string;
  emotion: string;
  product_model: string;
  scene_type: string;
}

const CLEAN_COLS: (keyof CleanRow)[] = ['text', 'source', 'source_url', 'emotion', 'product_model', 'scene_type'];

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
}

function downloadCSV(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function rowsToCSV(cols: string[], rows: Record<string, string>[]): string {
  const header = cols.join(',');
  const body = rows.map(r =>
    cols.map(c => `"${(r[c] ?? '').replace(/"/g, '""')}"`).join(',')
  ).join('\n');
  return header + '\n' + body;
}

// ══════════════════════════════════════════════════════════════
// TAB 1 – DATA CLEANER
// ══════════════════════════════════════════════════════════════

function normalizeEmotion(raw: string): string {
  const v = raw.trim().toLowerCase();
  if (!v || v === 'unclear') return 'unclear';
  if (['positive', 'pos', 'good', 'great', 'excellent', 'happy', '正面', '好', '喜欢', '满意'].some(k => v.includes(k))) return 'positive';
  if (['negative', 'neg', 'bad', 'poor', 'terrible', 'unhappy', '负面', '差', '不好', '不满'].some(k => v.includes(k))) return 'negative';
  if (['mixed', 'both', 'neutral_mixed', '混合'].some(k => v.includes(k))) return 'mixed';
  if (['neutral', 'ok', 'fine', 'average', 'so-so', '中性', '一般'].some(k => v.includes(k))) return 'neutral';
  return 'neutral';
}

function parseRawData(raw: string): CleanRow[] {
  return raw.split('\n').map(l => l.trim()).filter(Boolean).map(line => {
    const parts = line.split('|').map(p => p.trim());
    const get = (i: number) => (parts[i] && parts[i] !== '') ? parts[i] : 'unclear';
    return {
      text: get(0), source: get(1), source_url: get(2),
      emotion: normalizeEmotion(get(3)), product_model: get(4), scene_type: get(5),
    };
  });
}

function emotionColor(e: string): string {
  if (e === 'positive') return '#CCFF00';
  if (e === 'negative') return '#ff4444';
  if (e === 'mixed') return '#ffaa00';
  if (e === 'neutral') return '#888888';
  return '#555555';
}

// ══════════════════════════════════════════════════════════════
// TAB 2 – DATA ATTRIBUTOR
// ══════════════════════════════════════════════════════════════

// 27-field output columns
const ATTR_COLS = [
  'text', 'source', 'source_url', 'emotion', 'product_model', 'scene_type',
  'archetype', 'attribution_note',
  'pain_stage', 'frustration_level', 'delight_level', 'risk_level',
  'keyword_matched', 'archetype_confidence',
  'language', 'text_length', 'word_count', 'has_url',
  'sentiment_score', 'complaint_type', 'feature_request', 'use_case',
  'is_catastrophic', 'is_wow', 'is_scene_signal',
  'data_version', 'batch_id',
];

type AttrRow = Record<string, string>;

const kw = (list: string[], text: string): string | null => {
  const t = text.toLowerCase();
  for (const k of list) { if (t.includes(k.toLowerCase())) return k; }
  return null;
};

const ARCHETYPE_RULES: { archetype: string; keywords: string[]; note?: string }[] = [
  {
    archetype: '后处理壁垒型',
    keywords: ['清洗', 'IPA', '固化', '气味', '有毒', '脏乱', '泄漏', '后处理', '皮肤过敏',
      'wash', 'cure', 'smell', 'toxic', 'messy', 'ipa', 'cleanup', 'skin', 'fumes', 'ventilation'],
  },
  {
    archetype: '可靠性受损型',
    keywords: ['首层不粘', '层间剥离', 'FEP', 'Z轴', '打印失败', '漏树脂', '屏幕坏', '退货', '卖掉',
      'adhesion', 'delamination', 'failed print', 'layer', 'screen died', 'returned', 'sold',
      'fep tear', 'z axis', 'print failed'],
  },
  {
    archetype: '技术门槛型',
    keywords: ['调平', '曝光参数', '支撑', '切片', '学习曲线', '折腾', '新手',
      'leveling', 'exposure', 'supports', 'slicer', 'learning curve', 'calibration',
      'beginner', 'settings', 'tuning'],
  },
  {
    archetype: '场景期待型',
    keywords: ['如果能', '要是', '希望', '下一代', '全彩', '免涂装', '直接出色',
      'wish', 'if only', 'next gen', 'full color', 'no painting', 'pre-colored',
      'one day', 'would love', 'direct color'],
    note: 'SCENE_SIGNAL',
  },
  {
    archetype: '生态锁定型',
    keywords: ['原厂树脂', '第三方', '封闭', '解锁费', '切片绑定',
      'proprietary', 'third party', 'locked', 'open material', 'resin cost',
      'drm', 'cartridge', 'license fee'],
  },
  {
    archetype: '总拥有成本型',
    keywords: ['屏幕寿命', 'FEP更换', '隐性成本', '算下来',
      'screen life', 'fep cost', 'replacement', 'expensive to run',
      'total cost', 'hidden cost', 'consumable'],
  },
  {
    archetype: '品牌魅力型',
    keywords: ['为什么选', '喜欢', '值得', '推荐',
      'why I chose', 'love', 'best thing', 'recommend', 'worth it', 'switched to', 'glad I bought'],
  },
  {
    archetype: '失望离开型',
    keywords: ['switched to', 'went back', 'gave up', 'sold my', '换了', '退货', '放弃', '卖掉'],
  },
];

const CATASTROPHIC_KW = ['退货', '卖掉', '放弃', '漏树脂毁机', 'returned', 'sold', 'gave up', 'ruined', 'destroyed'];
const SIGNIFICANT_KW = ['反复失败', '屏幕报废', '核心功能失效', 'repeated failure', 'screen dead', 'unusable'];
const WOW_KW = ['incredible', 'insane', 'perfect', "best i've seen", '绝了', '震惊', '超出预期'];
const NEGATIVE_KW = ['bad', 'poor', 'terrible', 'awful', 'broken', 'fail', '差', '烂', '坏', '失败'];

function detectLanguage(text: string): string {
  const hasChinese = /[\u4e00-\u9fa5]/.test(text);
  const hasLatin = /[a-zA-Z]/.test(text);
  if (hasChinese && hasLatin) return 'mixed';
  if (hasChinese) return 'zh';
  return 'en';
}

function attributeRow(row: Record<string, string>, batchId: string): AttrRow {
  const text = row.text ?? '';
  const emotion = (row.emotion ?? '').toLowerCase();

  // Archetype matching (priority order)
  let archetype = '综合反馈型';
  let attributionNote = '';
  let matchedKw = '';
  let confidence = 'low';

  for (const rule of ARCHETYPE_RULES) {
    const hit = kw(rule.keywords, text);
    if (hit) {
      archetype = rule.archetype;
      attributionNote = rule.note ?? '';
      matchedKw = hit;
      confidence = 'high';
      break;
    }
  }
  if (archetype === '综合反馈型') confidence = 'medium';

  // pain_stage
  let painStage = 'overall';
  if (kw(['后处理', 'wash', 'cure', 'smell', 'ipa', 'cleanup', 'fumes'], text)) painStage = 'post_processing';
  else if (kw(['打印失败', 'failed print', 'layer', 'adhesion', 'z axis', 'leveling', 'exposure'], text)) painStage = 'printing_process';
  else if (kw(['resin', '树脂', '耗材', 'consumable', 'fep', 'screen life', 'total cost'], text)) painStage = 'cost_materials';
  else if (kw(['色彩', '精度', '表面', '细节', 'quality', 'detail', 'surface'], text)) painStage = 'output_quality';
  else if (emotion === 'negative' || emotion === 'mixed') painStage = 'printing_process';

  // frustration_level
  let frustrationLevel = 'none';
  if (kw(CATASTROPHIC_KW, text)) frustrationLevel = 'catastrophic';
  else if (kw(SIGNIFICANT_KW, text)) frustrationLevel = 'significant';
  else if (emotion === 'negative') frustrationLevel = 'significant';
  else if (emotion === 'mixed') frustrationLevel = 'tolerable';
  else if (kw(NEGATIVE_KW, text)) frustrationLevel = 'minor';

  // delight_level
  let delightLevel = 'neutral';
  if (kw(WOW_KW, text)) delightLevel = 'wow';
  else if (emotion === 'positive') delightLevel = 'satisfied';

  // risk_level
  const riskLevel = frustrationLevel === 'catastrophic' ? '高' : frustrationLevel === 'significant' ? '中' : '低';

  // complaint_type
  let complaintType = 'none';
  if (kw(['屏幕', 'screen', 'fep', 'z axis', 'Z轴', 'leveling', '调平'], text)) complaintType = 'hardware';
  else if (kw(['slicer', '切片', 'software', 'firmware', 'settings'], text)) complaintType = 'software';
  else if (kw(['resin', '树脂', 'fep', 'consumable', '耗材', '成本'], text)) complaintType = 'consumable';
  else if (kw(['learning', 'calibration', '折腾', 'beginner'], text)) complaintType = 'usability';
  else if (kw(['cost', 'price', 'expensive', '贵', '费'], text)) complaintType = 'cost';

  // feature_request
  const featureRequest = kw(['wish', 'if only', 'would love', 'please add', 'should have',
    '希望', '要是', '如果', '建议', 'suggest'], text) ? 'yes' : 'no';

  // use_case
  let useCase = 'unknown';
  if (kw(['hobby', 'fun', 'home', '玩', '爱好'], text)) useCase = 'hobby';
  else if (kw(['professional', 'business', 'client', '专业', '商用', '客户'], text)) useCase = 'professional';
  else if (kw(['school', 'student', 'class', '学生', '学校'], text)) useCase = 'education';

  // sentiment_score: -2 to 2
  const sentimentMap: Record<string, number> = {
    positive: 1, negative: -1, mixed: 0, neutral: 0, unclear: 0,
  };
  let sentimentScore = sentimentMap[emotion] ?? 0;
  if (delightLevel === 'wow') sentimentScore = 2;
  if (frustrationLevel === 'catastrophic') sentimentScore = -2;
  if (frustrationLevel === 'significant') sentimentScore = Math.min(sentimentScore, -1);

  const hasUrl = (row.source_url && row.source_url !== 'unclear') ? 'yes' : 'no';
  const isCatastrophic = frustrationLevel === 'catastrophic' ? 'true' : 'false';
  const isWow = delightLevel === 'wow' ? 'true' : 'false';
  const isSceneSignal = archetype === '场景期待型' ? 'true' : 'false';

  return {
    text: row.text ?? '',
    source: row.source ?? 'unclear',
    source_url: row.source_url ?? 'unclear',
    emotion: row.emotion ?? 'unclear',
    product_model: row.product_model ?? 'unclear',
    scene_type: row.scene_type ?? 'unclear',
    archetype,
    attribution_note: attributionNote,
    pain_stage: painStage,
    frustration_level: frustrationLevel,
    delight_level: delightLevel,
    risk_level: riskLevel,
    keyword_matched: matchedKw,
    archetype_confidence: confidence,
    language: detectLanguage(text),
    text_length: String(text.length),
    word_count: String(text.split(/\s+/).filter(Boolean).length),
    has_url: hasUrl,
    sentiment_score: String(sentimentScore),
    complaint_type: complaintType,
    feature_request: featureRequest,
    use_case: useCase,
    is_catastrophic: isCatastrophic,
    is_wow: isWow,
    is_scene_signal: isSceneSignal,
    data_version: '2026Q2',
    batch_id: batchId,
  };
}

// CSV parser that handles quoted fields
function parseCSV(raw: string): Record<string, string>[] {
  const lines = raw.trim().split('\n');
  if (lines.length < 2) return [];

  const parseFields = (line: string): string[] => {
    const fields: string[] = [];
    let cur = '';
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuote && line[i + 1] === '"') { cur += '"'; i++; }
        else { inQuote = !inQuote; }
      } else if (ch === ',' && !inQuote) {
        fields.push(cur); cur = '';
      } else {
        cur += ch;
      }
    }
    fields.push(cur);
    return fields;
  };

  const headers = parseFields(lines[0]).map(h => h.trim());
  return lines.slice(1).filter(l => l.trim()).map(line => {
    const vals = parseFields(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = (vals[i] ?? '').trim(); });
    return obj;
  });
}

// ══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════

export default function UVDataEnginePage() {
  const [activeTab, setActiveTab] = useState<'cleaner' | 'attributor'>('cleaner');

  // Cleaner state
  const [rawInput, setRawInput] = useState('');
  const [cleanRows, setCleanRows] = useState<CleanRow[]>([]);
  const [cleanParsed, setCleanParsed] = useState(false);

  // Attributor state
  const [attrInput, setAttrInput] = useState('');
  const [attrRows, setAttrRows] = useState<AttrRow[]>([]);
  const [attrDone, setAttrDone] = useState(false);
  const [batchId, setBatchId] = useState('resin_lcd_batch_01');
  const fileRef = useRef<HTMLInputElement>(null);

  // ── Cleaner handlers ─────────────────────────────────────────
  const handleParse = useCallback(() => {
    if (!rawInput.trim()) return;
    setCleanRows(parseRawData(rawInput));
    setCleanParsed(true);
  }, [rawInput]);

  const handleCleanDownload = useCallback(() => {
    const csv = rowsToCSV(CLEAN_COLS, cleanRows as unknown as Record<string, string>[]);
    downloadCSV(csv, `uv_cleaned_${todayStr()}.csv`);
  }, [cleanRows]);

  const handleCleanClear = () => { setRawInput(''); setCleanRows([]); setCleanParsed(false); };

  // ── Attributor handlers ──────────────────────────────────────
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // infer batch_id from filename
    const name = file.name.replace(/\.csv$/i, '');
    setBatchId(name || 'resin_lcd_batch_01');
    const reader = new FileReader();
    reader.onload = (ev) => { setAttrInput(ev.target?.result as string ?? ''); setAttrDone(false); };
    reader.readAsText(file);
  };

  const handleRunAttribution = useCallback(() => {
    if (!attrInput.trim()) return;
    const parsed = parseCSV(attrInput).slice(0, 1500);
    const result = parsed.map(r => attributeRow(r, batchId));
    setAttrRows(result);
    setAttrDone(true);
  }, [attrInput, batchId]);

  const handleAttrDownload = useCallback(() => {
    const csv = rowsToCSV(ATTR_COLS, attrRows);
    downloadCSV(csv, `uv_attributed_${todayStr()}.csv`);
  }, [attrRows]);

  const handleAttrClear = () => {
    setAttrInput(''); setAttrRows([]); setAttrDone(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  // ── Derived attribution stats ────────────────────────────────
  const archetypeStats = attrDone
    ? Object.entries(
        attrRows.reduce<Record<string, number>>((acc, r) => {
          acc[r.archetype] = (acc[r.archetype] ?? 0) + 1;
          return acc;
        }, {})
      ).sort((a, b) => b[1] - a[1])
    : [];

  const catastrophicList = attrRows.filter(r => r.is_catastrophic === 'true').slice(0, 10);
  const wowList = attrRows.filter(r => r.is_wow === 'true').slice(0, 10);
  const sceneList = attrRows.filter(r => r.is_scene_signal === 'true');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-mono text-3xl font-bold text-white mb-2 tracking-tight">
            User&apos;s Voice Data Engine
          </h1>
          <p className="font-mono text-sm text-[#888]">Paste raw data. Get clean CSV.</p>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-0 mb-8 border border-[#222] rounded-lg overflow-hidden w-fit">
          {(['cleaner', 'attributor'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 font-mono text-sm transition-colors duration-150 ${
                activeTab === tab ? 'bg-[#CCFF00] text-black font-bold' : 'bg-transparent text-[#888] hover:text-white'
              }`}
            >
              {tab === 'cleaner' ? 'Data Cleaner' : 'Data Attributor'}
            </button>
          ))}
        </div>

        {/* ── TAB 1: Data Cleaner ── */}
        {activeTab === 'cleaner' && (
          <div className="space-y-6">
            <div>
              <textarea
                className="w-full h-52 bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-3 font-mono text-sm text-[#ccc] placeholder-[#444] resize-y focus:outline-none focus:border-[#CCFF00] transition-colors duration-150"
                placeholder="Paste raw user voice data here — one entry per line, pipe-separated or messy format"
                value={rawInput}
                onChange={e => { setRawInput(e.target.value); setCleanParsed(false); }}
                spellCheck={false}
              />
              <p className="mt-1.5 font-mono text-[11px] text-[#444]">
                Expected format: text | source | source_url | emotion | product_model | scene_type
              </p>
            </div>

            <div className="flex gap-3 items-center flex-wrap">
              <button
                onClick={handleParse}
                disabled={!rawInput.trim()}
                className="px-5 py-2.5 bg-[#CCFF00] text-black font-mono text-sm font-bold rounded transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Parse &amp; Preview
              </button>
              {cleanParsed && cleanRows.length > 0 && (
                <button onClick={handleCleanDownload}
                  className="px-5 py-2.5 border border-[#CCFF00] text-[#CCFF00] font-mono text-sm rounded hover:bg-[#CCFF00] hover:text-black transition-colors">
                  Download CSV
                </button>
              )}
              {(rawInput || cleanParsed) && (
                <button onClick={handleCleanClear}
                  className="px-5 py-2.5 border border-[#333] text-[#666] font-mono text-sm rounded hover:border-[#555] hover:text-[#999] transition-colors">
                  Clear
                </button>
              )}
              {cleanParsed && (
                <span className="font-mono text-xs text-[#555] ml-auto">
                  {cleanRows.length} row{cleanRows.length !== 1 ? 's' : ''} parsed
                </span>
              )}
            </div>

            {cleanParsed && cleanRows.length > 0 && (
              <div className="overflow-x-auto rounded-lg border border-[#1e1e1e]">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[#111]">
                      <th className="px-2 py-2 font-mono text-[10px] uppercase tracking-widest text-[#555] text-center w-8">#</th>
                      {CLEAN_COLS.map(col => (
                        <th key={col} className="px-3 py-2.5 font-mono text-[10px] uppercase tracking-widest text-[#555] whitespace-nowrap">
                          {col.replace(/_/g, ' ')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cleanRows.map((row, i) => (
                      <tr key={i} className="border-t border-[#1a1a1a] hover:bg-[#0f0f0f] transition-colors">
                        <td className="px-2 py-2.5 font-mono text-[11px] text-[#333] text-center">{i + 1}</td>
                        {CLEAN_COLS.map(col => (
                          <td key={col} className="px-3 py-2.5 font-mono text-[11px] max-w-[200px]">
                            {col === 'emotion' ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                                style={{ color: emotionColor(row[col]), background: emotionColor(row[col]) + '18' }}>
                                {row[col]}
                              </span>
                            ) : (
                              <span className={`block truncate ${row[col] === 'unclear' ? 'text-[#333]' : 'text-[#aaa]'}`} title={row[col]}>
                                {row[col]}
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {cleanParsed && cleanRows.length === 0 && (
              <p className="font-mono text-sm text-[#555]">No rows found. Make sure your data is non-empty.</p>
            )}
          </div>
        )}

        {/* ── TAB 2: Data Attributor ── */}
        {activeTab === 'attributor' && (
          <div className="space-y-8">

            {/* Input area */}
            <div className="space-y-4">
              {/* File upload */}
              <div
                className="border border-dashed border-[#333] rounded-lg p-6 text-center cursor-pointer hover:border-[#CCFF00] transition-colors group"
                onClick={() => fileRef.current?.click()}
              >
                <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
                <p className="font-mono text-sm text-[#555] group-hover:text-[#888] transition-colors">
                  Drop or click to upload .csv file
                </p>
                {attrInput && !attrDone && (
                  <p className="font-mono text-xs text-[#CCFF00] mt-1">File loaded — ready to run</p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#1e1e1e]" />
                <span className="font-mono text-xs text-[#444]">or paste CSV below</span>
                <div className="flex-1 h-px bg-[#1e1e1e]" />
              </div>

              <textarea
                className="w-full h-40 bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-3 font-mono text-xs text-[#ccc] placeholder-[#444] resize-y focus:outline-none focus:border-[#CCFF00] transition-colors"
                placeholder="Paste cleaned CSV content here (with header row)…"
                value={attrInput}
                onChange={e => { setAttrInput(e.target.value); setAttrDone(false); }}
                spellCheck={false}
              />

              <div className="flex gap-3 items-center flex-wrap">
                <button
                  onClick={handleRunAttribution}
                  disabled={!attrInput.trim()}
                  className="px-5 py-2.5 bg-[#CCFF00] text-black font-mono text-sm font-bold rounded hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                >
                  Run Attribution
                </button>
                {attrDone && (
                  <button onClick={handleAttrDownload}
                    className="px-5 py-2.5 border border-[#CCFF00] text-[#CCFF00] font-mono text-sm rounded hover:bg-[#CCFF00] hover:text-black transition-colors">
                    Download 27-col CSV
                  </button>
                )}
                {(attrInput || attrDone) && (
                  <button onClick={handleAttrClear}
                    className="px-5 py-2.5 border border-[#333] text-[#666] font-mono text-sm rounded hover:border-[#555] hover:text-[#999] transition-colors">
                    Clear
                  </button>
                )}
                {attrDone && (
                  <span className="font-mono text-xs text-[#555] ml-auto">
                    {attrRows.length} / 1500 rows attributed
                  </span>
                )}
              </div>
            </div>

            {/* Results */}
            {attrDone && attrRows.length > 0 && (
              <div className="space-y-8">

                {/* Archetype Summary */}
                <div>
                  <h2 className="font-mono text-xs uppercase tracking-widest text-[#555] mb-4">Archetype Distribution</h2>
                  <div className="space-y-2">
                    {archetypeStats.map(([arch, count]) => {
                      const pct = Math.round((count / attrRows.length) * 100);
                      return (
                        <div key={arch} className="flex items-center gap-3">
                          <span className="font-mono text-xs text-[#888] w-36 shrink-0 truncate">{arch}</span>
                          <div className="flex-1 bg-[#111] rounded-full h-1.5 overflow-hidden">
                            <div className="h-full bg-[#CCFF00] rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="font-mono text-xs text-[#555] w-16 text-right">{count} ({pct}%)</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Catastrophic list */}
                {catastrophicList.length > 0 && (
                  <div>
                    <h2 className="font-mono text-xs uppercase tracking-widest text-[#ff4444] mb-3">
                      Catastrophic ({catastrophicList.length}{attrRows.filter(r=>r.is_catastrophic==='true').length > 10 ? '+' : ''})
                    </h2>
                    <div className="space-y-2">
                      {catastrophicList.map((r, i) => (
                        <div key={i} className="bg-[#110000] border border-[#2a0000] rounded-lg px-4 py-3">
                          <p className="font-mono text-xs text-[#ccc] leading-relaxed">{r.text}</p>
                          <div className="flex gap-3 mt-1.5 flex-wrap">
                            <span className="font-mono text-[10px] text-[#ff4444]">{r.archetype}</span>
                            <span className="font-mono text-[10px] text-[#555]">{r.source}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Wow list */}
                {wowList.length > 0 && (
                  <div>
                    <h2 className="font-mono text-xs uppercase tracking-widest text-[#CCFF00] mb-3">
                      Wow Moments ({wowList.length}{attrRows.filter(r=>r.is_wow==='true').length > 10 ? '+' : ''})
                    </h2>
                    <div className="space-y-2">
                      {wowList.map((r, i) => (
                        <div key={i} className="bg-[#0a0f00] border border-[#1a2a00] rounded-lg px-4 py-3">
                          <p className="font-mono text-xs text-[#ccc] leading-relaxed">{r.text}</p>
                          <div className="flex gap-3 mt-1.5 flex-wrap">
                            <span className="font-mono text-[10px] text-[#CCFF00]">{r.archetype}</span>
                            <span className="font-mono text-[10px] text-[#555]">{r.source}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Scene Signal list */}
                {sceneList.length > 0 && (
                  <div>
                    <h2 className="font-mono text-xs uppercase tracking-widest text-[#ffaa00] mb-3">
                      SCENE_SIGNAL — All ({sceneList.length})
                    </h2>
                    <div className="space-y-2">
                      {sceneList.map((r, i) => (
                        <div key={i} className="bg-[#0f0a00] border border-[#2a1a00] rounded-lg px-4 py-3">
                          <p className="font-mono text-xs text-[#ccc] leading-relaxed">{r.text}</p>
                          <div className="flex gap-3 mt-1.5 flex-wrap">
                            <span className="font-mono text-[10px] text-[#ffaa00]">场景期待型</span>
                            <span className="font-mono text-[10px] text-[#555]">{r.source}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {catastrophicList.length === 0 && wowList.length === 0 && sceneList.length === 0 && (
                  <p className="font-mono text-sm text-[#555]">No Catastrophic / Wow / Scene Signal rows found in this batch.</p>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
