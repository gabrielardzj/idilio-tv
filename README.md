# Reto de diseño · Idilio TV
## «Continuará» — el Pase de la Noche

**¿Cómo podríamos usar mecánicas de gamificación para que volver a Idilio forme parte natural de la experiencia de ver microdramas?**

> El metajuego de Idilio existe, pero vive en una pestaña. El core loop vive en el player.
> La propuesta entera consiste en mudar el metajuego al lugar donde el usuario ya está,
> y en cambiar la unidad de todo: de monedas a episodios, de días calendario a noches.

---

## Los cuatro entregables

| | Entregable | Qué hay adentro |
|---|---|---|
| **1** | **[Diagnóstico](docs/01-diagnostico/)** | Qué falla hoy, a partir de usar la app y leer los datos. Qué señales pesaron y qué descarté — incluido por qué no construyo sobre el 2.4x de D30. |
| **2** | **[Estrategia](docs/02-estrategia/)** | Ocho intervenciones en tres olas, con hipótesis, métricas, guardrails y criterio de priorización. Y qué no cabe en un trimestre. |
| **3** | **[La intervención en profundidad](docs/03-diseno/)** | El Pase de la Noche: mecánica, diagrama de flujo, ocho decisiones de diseño con su porqué, la revisión crítica del precedente, modelo económico y riesgos técnicos. Más el [sistema visual](docs/03-diseno/sistema.md) y sus [tokens](docs/03-diseno/tokens.json). |
| **4** | **[POC](docs/04-poc/)** | Prototipo funcional · [`/poc`](poc/) · y el [export de flujos](mobbin-export/) con 13 pantallas en 6 flujos. |

**Anexo ·** [Registro de dogfooding](docs/00-dogfooding/) — qué se pudo usar del producto real y qué se verificó ahí.

---

## El hallazgo que ordena todo

La app tiene **12 episodios gratis** por serie. Cada desbloqueo cuesta **15 monedas**. La sesión promedio dura **22 minutos ≈ 14 episodios**.

**12 gratis + el muro ≈ 14 episodios.**

La sesión promedio no termina cuando el usuario se sacia: termina cuando choca. Los 22 minutos no son una métrica de salud, son el techo que impone la economía.

Y lo que hay en ese choque, verificado en el paywall real del build 1.20.0:

```
Costo del episodio: 15        Tu balance: 0
─────────────────────────────────────────
       Obtén monedas para continuar
  $0.99 → 180    $1.99 → 180    $3.99 → 375
```

Un usuario que nunca vio una moneda, a la 1 a.m., a mitad de un cliffhanger, recibe una tienda y ninguna otra salida. La recompensa diaria — la única fuente gratuita — vive en otra pestaña.

**No es que el metajuego esté mal diseñado. Está en otro edificio.**

---

## La propuesta, en cinco reglas

1. **Un Pase de la Noche cada 24 h**, acumulable hasta dos. Abre un episodio gratis. Techo duro por usuario: 7 por semana.
2. **El usuario elige a qué serie se lo da.** Un recurso que se asigna se entiende; uno que se recibe, no.
3. **La noche corre de 5 a.m. a 5 a.m.**, no de medianoche a medianoche. 54% de las sesiones son entre 11 p.m. y 2 a.m.
4. **Un comodín que se consume solo.** Si hay que hacer algo para no perder la racha, la racha ya es una tarea.
5. **Todo se declara en episodios.** El saldo, el precio, el paquete, la meta.

Y el muro deja de decir *«tu balance: 0»* para decir **«Hoy a las 18:05»**.

---

## Correr el POC

```bash
cd poc && npm install && npm run dev
```

O abrir [`mobbin-export/index.html`](mobbin-export/index.html) para ver los 6 flujos completos sin instalar nada.
