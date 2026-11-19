#!/bin/bash
# Jalankan di server Hostinger setelah git pull:  bash deploy.sh
# Menyalin isi public/ ke mimika.shop dan demo/ ke demo.mimika.shop.
# File bawaan Hostinger (.private, default.php) tidak disentuh.
set -e
cd "$(dirname "$0")"

# Nomor versi = kode commit terakhir. Ditempel ke nama file css/js di index.html
# (misal assets/usaha.js?v=d2ef306) supaya CDN Hostinger & browser pengunjung
# langsung mengambil file baru setiap kali ada perubahan.
VER=$(git rev-parse --short HEAD 2>/dev/null || date +%s)

stamp() {
  sed -i -E "s#(assets/(app\.css|app\.js|usaha\.js))(\?v=[A-Za-z0-9]+)?\"#\1?v=${VER}\"#g" "$1/index.html"
}

rsync -a --delete --exclude '.private' --exclude 'default.php' public/ ~/domains/mimika.shop/public_html/
stamp ~/domains/mimika.shop/public_html
if [ -d ~/domains/demo.mimika.shop/public_html ]; then
  rsync -a --delete --exclude '.private' --exclude 'default.php' demo/ ~/domains/demo.mimika.shop/public_html/
  stamp ~/domains/demo.mimika.shop/public_html
fi
echo "Selesai: mimika.shop dan demo.mimika.shop diperbarui (versi ${VER})."
