# FNF Tools

Pequeña colección de herramientas web para modders de **Friday Night Funkin'**. El proyecto funciona directamente desde el navegador y está publicado con GitHub Pages.

<p align="center">
  <a href="https://unknown1232199.github.io/Optimization-FNF-deluxe-beta/"><strong>Abrir FNF Tools</strong></a>
  ·
  <a href="https://unknown1232199.github.io/Optimization-FNF-deluxe-beta/optimizador-ogg.html">Organizador OGG</a>
  ·
  <a href="https://unknown1232199.github.io/Optimization-FNF-deluxe-beta/Lo/">Convertidor osu!</a>
</p>

---

## Herramientas

### 01 · Organizador OGG

Prepara un ZIP con archivos OGG/OGA de mods de FNF sin modificar su contenido.

- Selección de varios archivos o de una carpeta completa.
- Copia los archivos originales tal cual, sin recodificar ni alterar el audio.
- Mantiene nombres y rutas de carpetas al crear el ZIP.
- Conserva los nombres y las rutas de carpetas, incluidas `Voices`, `Player`, `Opponent` y `Vocals`.
- No convierte a mono, no remuestrea y no intenta comprimir ni reescribir el OGG.
- Incluye progreso general de **todas las canciones** y opción para mantener la pantalla encendida mientras la pestaña está visible (si el navegador admite Screen Wake Lock).
- El procesamiento se realiza localmente: los archivos seleccionados no se envían a un servidor.

**Audio y compatibilidad:** esta herramienta no modifica el audio. El ZIP contiene los mismos archivos seleccionados, con sus nombres y carpetas.

[Abrir el optimizador OGG](https://unknown1232199.github.io/Optimization-FNF-deluxe-beta/optimizador-ogg.html)

### 02 · Convertidor osu! → Psych Engine 1.0.4

Convierte beatmaps y packs compatibles de osu! en charts para **Psych Engine 1.0.4**.

- Entradas: archivos `.osu`, mapas `.osz` y packs `.zip`.
- Permite revisar las dificultades y configurar la asignación de notas.
- Genera la estructura de archivos para importar el resultado al proyecto de FNF.
- La conversión se ejecuta en el navegador.

La compatibilidad depende del contenido del beatmap y de las opciones elegidas. Revisá los archivos generados y probalos dentro de tu proyecto.

[Abrir el convertidor osu!](https://unknown1232199.github.io/Optimization-FNF-deluxe-beta/Lo/convertidor-osu.html)

---

## Cómo empezar

1. Entrá a [FNF Tools](https://unknown1232199.github.io/Optimization-FNF-deluxe-beta/).
2. Elegí el optimizador OGG o el convertidor osu!.
3. Seleccioná los archivos compatibles desde tu dispositivo.
4. Esperá a que termine el procesamiento y descargá el resultado.
5. Probalo en tu mod antes de reemplazar archivos originales.

> **Consejo:** hacé una copia de seguridad de tu proyecto antes de importar archivos optimizados o charts convertidos.

---

## Estructura del proyecto

Se mantienen las páginas principales en la raíz para conservar las URLs públicas de GitHub Pages. El convertidor osu! permanece separado en `Lo/`.

```text
Optimization-FNF-deluxe-beta/
├── .github/
│   └── workflows/
│       └── pages.yml
├── assets/
├── Lo/
│   └── index.html
├── index.html
├── optimizador-ogg.html
└── README.md
```

| Ruta | Función |
|---|---|
| `index.html` | Página principal y accesos a las herramientas |
| `optimizador-ogg.html` | Interfaz del organizador OGG |
| `assets/ogg/fnf-ogg-validator.js` | Verificador propio de integridad y estructura OGG antes de aceptar una salida |\n| `assets/ogg/optivorbis-worker.js` | Worker que procesa los archivos OGG con OptiVorbis |
| `assets/ogg/*.wasm` | Módulo WebAssembly utilizado por OptiVorbis |
| `Lo/convertidor-osu.html` | Convertidor de osu! / OSZ a Psych Engine |
| `OPTIVORBIS-LICENSE.txt` | Licencia del componente OptiVorbis |

---

## Desarrollo y publicación

- Sitio estático basado en **HTML, CSS y JavaScript**.
- Publicación mediante **GitHub Pages** desde la rama `main`.
- El workflow de `.github/workflows/pages.yml` se encarga del despliegue.
- No requiere instalar dependencias para usar las herramientas publicadas.



## Créditos y avisos

- Proyecto comunitario e independiente; no está afiliado oficialmente con Friday Night Funkin', Psych Engine ni osu!.
- La conversión depende del contenido del beatmap y del engine de destino.
