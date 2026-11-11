(function () {
    const D = window.MIMIKA;
    const $ = (s) => document.querySelector(s);
    const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const waNum = (n) => { let d = String(n || '').replace(/\D/g, ''); if (d.startsWith('0')) d = '62' + d.slice(1); return d; };
    const host = (u) => { try { return new URL(u).host; } catch (e) { return u; } };
    const norm = (s) => String(s || '').toLowerCase();

    let aktif = 'Semua';
    let kata = '';

    const icon = {
        pin: '<svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
        jam: '<svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
        wa: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.6 14.2c-.2.7-1.4 1.3-2 1.4-.5 0-1 .3-3.5-.7-3-1.2-4.8-4.3-5-4.5-.1-.2-1.2-1.6-1.2-3s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.2.5.1.6 0l.9-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.4z"/></svg>',
    };

    function logo(u) {
        if (u.logo) return `<div class="grid h-16 place-items-center rounded-xl px-3" style="background:${esc(u.logoBg || '#fff')}"><img src="${esc(u.logo)}" alt="Logo ${esc(u.nama)}" class="max-h-10 max-w-full"></div>`;
        return `<div class="grid h-16 w-16 place-items-center rounded-xl font-display text-xl font-bold text-white" style="background:${esc(u.warna || '#0f3d3e')}">${esc(u.inisial || u.nama.slice(0, 2).toUpperCase())}</div>`;
    }

    function kartu(u) {
        const info = [
            u.alamat ? `<li class="flex items-start gap-2">${icon.pin}<span>${esc(u.alamat)}</span></li>` : '',
            u.jam ? `<li class="flex items-center gap-2">${icon.jam}<span>${esc(u.jam)}</span></li>` : '',
        ].join('');
        const wa = u.wa ? `<a href="https://wa.me/${waNum(u.wa)}?text=${encodeURIComponent('Halo ' + u.nama + ', saya lihat dari mimika.shop.')}" target="_blank" rel="noopener" class="btn bg-laut-50 px-4 text-laut hover:bg-laut/15" aria-label="WhatsApp ${esc(u.nama)}">${icon.wa} Chat</a>` : '';
        return `<article class="group flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-laut/10 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-laut/10">
            <div class="flex items-start justify-between gap-3">${logo(u)}
                <span class="rounded-full bg-pasir px-3 py-1 text-xs font-medium text-laut/80">${esc(u.kategori || 'Usaha lokal')}</span></div>
            <h3 class="mt-4 text-lg font-semibold text-laut">${esc(u.nama)}</h3>
            <p class="mt-1 text-sm leading-relaxed text-tinta/70">${esc(u.ringkas)}</p>
            ${info ? `<ul class="mt-3 space-y-1.5 text-sm text-tinta/60">${info}</ul>` : ''}
            <div class="mt-auto flex items-center gap-2 pt-5">
                <a href="${esc(u.url)}" class="btn flex-1 bg-laut text-white hover:bg-laut-700">Kunjungi <span aria-hidden="true">→</span></a>${wa}
            </div>
            <p class="mt-2 text-center text-xs text-tinta/40">${esc(host(u.url))}</p>
        </article>`;
    }

    function render() {
        const q = norm(kata).trim();
        const list = D.usaha.filter((u) => (aktif === 'Semua' || u.kategori === aktif)
            && (!q || norm([u.nama, u.kategori, u.ringkas, u.alamat, u.tag].join(' ')).includes(q)));
        $('#grid').innerHTML = list.map(kartu).join('');
        $('#kosong').classList.toggle('hidden', list.length > 0);
    }

    function chips() {
        const ada = new Set(D.usaha.map((u) => u.kategori).filter(Boolean));
        const cats = ['Semua', ...D.kategori.filter((k) => ada.has(k))];
        $('#kategori').innerHTML = cats.map((k) => `<button type="button" class="chip" aria-pressed="${k === aktif}" data-k="${esc(k)}">${esc(k)}</button>`).join('');
        $('#kategori').querySelectorAll('button').forEach((b) => b.addEventListener('click', () => { aktif = b.dataset.k; chips(); render(); }));
    }

    $('#jumlah-usaha').textContent = D.usaha.length;
    $('#tahun').textContent = new Date().getFullYear();
    $('#hero-list').innerHTML = D.usaha.slice(0, 4).map((u) => `<li class="flex items-center gap-3 rounded-xl bg-white/5 p-3">
        <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-xs font-bold" style="background:${esc(u.logo ? u.logoBg : u.warna)};color:#fff">${u.logo ? `<img src="${esc(u.logo)}" alt="" class="h-4">` : esc(u.inisial)}</span>
        <span class="min-w-0"><span class="block truncate font-semibold">${esc(u.nama)}</span><span class="block text-xs text-white/50">${esc(u.kategori || 'Usaha lokal')}</span></span></li>`).join('');

    const wa = waNum(D.kontak.wa);
    if (wa) $('#cta-wa').href = `https://wa.me/${wa}?text=${encodeURIComponent('Halo, saya ingin mendaftarkan usaha saya di mimika.shop.')}`;

    $('#cari').addEventListener('input', (e) => { kata = e.target.value; render(); });
    chips();
    render();
})();
