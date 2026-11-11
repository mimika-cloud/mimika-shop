#!/bin/bash
# Jalankan di server Hostinger setelah git pull:  bash deploy.sh
# Menyalin isi public/ ke mimika.shop dan demo/ ke demo.mimika.shop.
# File bawaan Hostinger (.private, default.php) tidak disentuh.
set -e
cd "$(dirname "$0")"
rsync -a --delete --exclude '.private' --exclude 'default.php' public/ ~/domains/mimika.shop/public_html/
if [ -d ~/domains/demo.mimika.shop/public_html ]; then
  rsync -a --delete --exclude '.private' --exclude 'default.php' demo/ ~/domains/demo.mimika.shop/public_html/
fi
echo "Selesai: mimika.shop dan demo.mimika.shop diperbarui."
