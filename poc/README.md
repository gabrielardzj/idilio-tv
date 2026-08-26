# POC · Racha de Noches

**▶ En vivo: [gabrielardzj.github.io/idilio-racha-de-noches-poc](https://gabrielardzj.github.io/idilio-racha-de-noches-poc/)**

Prototipo funcional (no un click-through): la economía está implementada de verdad en un
motor puro y testeado, y la interfaz solo la refleja.

```bash
npm install
npm run dev        # http://localhost:5173
npx vitest run     # 22 tests del motor de economía
npm run build
```

## Cómo recorrerlo

- **Desliza hacia arriba** (o flecha ↓) para pasar al siguiente episodio.
- Los episodios **1–10 son libres**; del **11** en adelante aparece el muro.
- Al terminar el primer episodio de la noche, la racha **se acredita sola** — sin reclamar.
- El botón **`Estados`** del borde derecho abre el panel del prototipo:
  - **Recorrido real** — *avanzar una noche*, *saltarte una noche* (prueba el escudo),
    *desaparecer tres noches* (rompe la racha). Viaja en el tiempo sin esperar días.
  - **Estados A–I** — salta directo a cualquier estado del muro.

## Estructura

| Archivo | Qué es |
|---|---|
| `src/economy.ts` | **El motor.** Todas las reglas de la economía, sin React y sin DOM. Si hay que discutir una regla, se discute aquí. |
| `src/economy.test.ts` | 22 tests que fijan esas reglas, incluido el corte de noche a las 4:00 am. |
| `src/components/UnlockSheet.tsx` | El muro — la intervención. El orden de los bloques es el argumento. |
| `src/components/AccountSheet.tsx` | La cuenta como seguro de la racha (noche 3). |
| `src/components/CoinShop.tsx` | La fuente comprada. Precios rotulados en capítulos. |
| `src/components/DevPanel.tsx` | Andamiaje del prototipo. **No es parte del producto.** |
| `src/useTween.ts` | Interpolación de números: el saldo *baja a la vista* al gastarlo. |
| `src/styles.css` | Tokens reales de Idilio + los derivados de esta intervención. |

## Sobre las animaciones

Ninguna es decorativa. Si el saldo simplemente cambia de número, el usuario no percibe que
pagó — y **percibir el gasto es la mitad de entender la economía**.

| Animación | Qué hace visible |
|---|---|
| Saldo interpolado (~620 ms) | que el dinero *bajó*, no que apareció otro número |
| Recibo `−15` que sube y se desvanece | el precio exacto de lo que acaba de pasar |
| CTA que se confirma en el sitio (`✓ Listo`, 880 ms) | que fue una transacción, no un salto |
| Barra de posición que avanza un capítulo | el progreso que se acaba de comprar |
| Frame que vuelve del desenfoque con un golpe de luz | que lo pagado se recibió |
| Luna nueva con halo que se expande una vez | que la racha subió |
| Chips del HUD que se apagan con el sheet abierto | evita dos cifras desincronizadas en pantalla |

Todas respetan `prefers-reduced-motion`.

## Alcance declarado

Es un POC de **una funcionalidad con sus estados**, como pide el brief. El video es un
placeholder compuesto (gradiente + grano + subtítulo quemado), no contenido real; el episodio
dura 11 s en vez de 60–90 s para poder recorrerlo; y quedan fuera la navegación general, el
catálogo y las pantallas de soporte.
