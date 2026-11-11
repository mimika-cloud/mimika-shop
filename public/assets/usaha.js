/*
 * DATA USAHA mimika.shop
 * Ubah / tambah usaha cukup di file ini, lalu unggah ulang file ini saja.
 *
 * Kolom:
 *   nama, url (subdomain), kategori (lihat KATEGORI), ringkas (1–2 kalimat),
 *   alamat, jam, wa (nomor WhatsApp, boleh 08… atau 62…), logo (opsional, path gambar),
 *   inisial + warna (dipakai bila belum ada logo), tag (kata kunci pencarian).
 */
window.MIMIKA = {
    kontak: {
        // Nomor WhatsApp pengelola mimika.shop untuk pendaftaran usaha baru. Kosong = tombol diarahkan ke mimika.cloud.
        wa: '081240256821',
        email: '',
    },

    kategori: ['Kuliner & Kopi', 'Otomotif', 'Toko & Kebutuhan', 'Jasa'],

    usaha: [
        {
            nama: "Ben's Robotic Wash",
            url: 'https://bens.mimika.shop',
            kategori: 'Otomotif',
            ringkas: 'Cuci mobil robotic tanpa sentuh (touchless) pertama di Timika, plus kafe kopi Wamena selagi menunggu. Bisa booking online.',
            alamat: 'Jl. Amungsa, Kwamki, Mimika Baru',
            jam: '08.00–18.00 WIT',
            wa: '082148438909',
            logo: 'assets/img/bens.svg',
            logoBg: '#0b0d0f',
            tag: 'cuci mobil car wash steam kopi kafe booking',
        },
        {
            nama: 'SkyMart',
            url: 'https://skymart.mimika.shop',
            kategori: 'Toko & Kebutuhan',
            ringkas: 'Minimarket kebutuhan harian.', // TODO: lengkapi deskripsi, alamat, jam, WA
            alamat: '',
            jam: '',
            wa: '',
            inisial: 'SM',
            warna: '#2563eb',
            tag: 'minimarket sembako belanja harian',
        },
        {
            nama: 'Rabers',
            url: 'https://rabers.mimika.shop',
            kategori: '', // TODO: isi salah satu kategori di atas
            ringkas: 'Profil usaha sedang disiapkan.', // TODO
            alamat: '',
            jam: '',
            wa: '',
            inisial: 'RB',
            warna: '#b45309',
            tag: '',
        },
        {
            nama: 'The Evangelizer Cafe',
            url: 'https://theevangelizercafe.mimika.shop',
            kategori: 'Kuliner & Kopi',
            ringkas: 'Kafe untuk ngopi dan berkumpul.', // TODO: lengkapi deskripsi, menu andalan, alamat, jam, WA
            alamat: '',
            jam: '',
            wa: '',
            inisial: 'TE',
            warna: '#7c2d12',
            tag: 'kafe kopi cafe nongkrong',
        },
    ],
};
