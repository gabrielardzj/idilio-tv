#!/usr/bin/env bash
# Publica el POC en el repo público que sirve el link del entregable.
#
# El repo principal es privado y GitHub Pages en repos privados requiere plan de
# pago, así que el POC vive también en gabrielardzj/idilio-racha-de-noches-poc,
# que solo contiene el prototipo.
#
#   ./scripts/publicar-poc.sh "mensaje de commit"
set -euo pipefail

ORIGEN="$(cd "$(dirname "${BASH_SOURCE[0]}")/../poc" && pwd)"
DESTINO="${POC_PUB_DIR:-/tmp/idilio-poc-pub}"
MENSAJE="${1:-Sincronizar el POC desde el workspace}"

[ -d "$DESTINO/.git" ] || {
  echo "No hay clon en $DESTINO. Clónalo primero:"
  echo "  git clone https://github.com/gabrielardzj/idilio-racha-de-noches-poc.git $DESTINO"
  exit 1
}

# --exclude .github es obligatorio: el workspace no tiene .github/ dentro de poc/,
# así que sin esta exclusión --delete borra el workflow de despliegue del repo
# público y el link deja de actualizarse en silencio. Ya pasó una vez.
rsync -a --delete \
  --exclude node_modules --exclude dist --exclude .git --exclude .github \
  "$ORIGEN/" "$DESTINO/"

cd "$DESTINO"
git add -A
git diff --cached --quiet && { echo "Sin cambios que publicar."; exit 0; }
git commit -q -m "$MENSAJE"
git push -q origin main
echo "Publicado. El workflow corre los tests antes de desplegar:"
echo "  https://github.com/gabrielardzj/idilio-racha-de-noches-poc/actions"
