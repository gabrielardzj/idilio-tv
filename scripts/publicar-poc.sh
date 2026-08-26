#!/usr/bin/env bash
# Publica el entregable completo en el repo público que sirve el link.
#
# El repo principal es privado y GitHub Pages en repos privados requiere plan de
# pago, así que el POC vive también en gabrielardzj/idilio-racha-de-noches-poc,
# que solo contiene el prototipo.
#
#   ./scripts/publicar-poc.sh "mensaje de commit"
set -euo pipefail

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ORIGEN="$RAIZ/poc"
DESTINO="${POC_PUB_DIR:-/tmp/idilio-poc-pub}"
MENSAJE="${1:-Sincronizar el POC desde el workspace}"

[ -d "$DESTINO/.git" ] || {
  echo "No hay clon en $DESTINO. Clónalo primero:"
  echo "  git clone https://github.com/gabrielardzj/idilio-racha-de-noches-poc.git $DESTINO"
  exit 1
}

# Ojo: nunca sincronizar sobre la raíz del repo público con --delete, porque
# borraría .github/ y el link dejaría de actualizarse en silencio. Ya pasó una vez.
# Por eso el POC va a $DESTINO/poc/ y el resto se copia carpeta a carpeta.
rsync -a --delete \
  --exclude node_modules --exclude dist --exclude .git \
  "$ORIGEN/" "$DESTINO/poc/"
rsync -a --delete "$RAIZ/docs" "$RAIZ/design" "$RAIZ/export" "$RAIZ/scripts" "$DESTINO/"
cp "$RAIZ/README.md" "$DESTINO/README.md"

cd "$DESTINO"
git add -A
git diff --cached --quiet && { echo "Sin cambios que publicar."; exit 0; }
git commit -q -m "$MENSAJE"
git push -q origin main
echo "Publicado. El workflow corre los tests antes de desplegar:"
echo "  https://github.com/gabrielardzj/idilio-racha-de-noches-poc/actions"
