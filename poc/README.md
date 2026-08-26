# POC · «Continuará» — el Pase de la Noche

Prototipo funcional del momento de desbloqueo de Idilio TV.
La documentación del entregable está en [`../docs/04-poc`](../docs/04-poc/).

```bash
npm install
npm run dev        # prototipo
npm run build      # dist/ — rutas relativas, funciona en cualquier subdirectorio
npm run export     # regenera ../mobbin-export desde el prototipo (dev server arriba)
```

| Archivo | Qué es |
|---|---|
| `src/lib/economy.ts` | El modelo económico. Cada constante marcada REAL (verificada en producción) o PROPUESTA. |
| `src/lib/state.ts` | La máquina de estados: pase, cooldown de 24 h, racha, comodín, saldo, cuenta. |
| `src/lib/content.ts` | Series y cliffhangers. Cifras reales del catálogo. |
| `src/components/Wall.tsx` | El muro. La pantalla donde ocurre todo. |
| `src/components/Sheets.tsx` | Elección de pase, tienda, celebración, cuenta, mi economía. |
| `src/styles.css` | Tokens y componentes. Sin librería de UI. |
| `scripts/export-mobbin.mjs` | Recorre el POC y genera el export de flujos. |
