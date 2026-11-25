(() => {
  const config = window.INTRO_CONFIG || {};
  const links = document.getElementById('contact-links');
  // Confirmed primary links are rendered in HTML so they also work without JS.
  try {
    const u = new URL(config.whatsapp);
    if (!document.getElementById('whatsapp-link') && u.protocol === 'https:' && (u.hostname === 'wa.me' || u.hostname === 'api.whatsapp.com')) {
      const a = document.createElement('a'); a.textContent = 'WhatsApp ↗'; a.href = u.href;
      a.target = '_blank'; a.rel = 'noopener noreferrer'; links.append(a);
    }
  } catch {}
  document.getElementById('copy-link').addEventListener('click', async () => {
    const url = document.querySelector('link[rel="canonical"]').href;
    const status = document.getElementById('copy-status');
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(url);
      else {
        const t = document.createElement('textarea'); t.value = url; t.style.position = 'fixed'; t.style.opacity = '0'; document.body.append(t); t.select(); t.setSelectionRange(0, t.value.length);
        const ok = document.execCommand('copy'); t.remove(); if (!ok) throw new Error('copy failed');
      }
      status.textContent = 'Link copied. See you in the conversation.';
    } catch { status.textContent = 'Touch and hold the address above to copy the link.'; }
  });
})();
