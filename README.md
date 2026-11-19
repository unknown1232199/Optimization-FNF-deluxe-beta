# FNF Tools

Pequeña colección de herramientas web para modders de **Friday Night Funkin'**. Funciona directamente desde el navegador y se publica con GitHub Pages.

<p align="center">
  <a href="https://unknown1232199.github.io/Optimization-FNF-deluxe-beta/"><strong>Abrir FNF Tools</strong></a>
  ·
  <a href="https://unknown1232199.github.io/Optimization-FNF-deluxe-beta/optimizador-ogg.html">OGG Slimmer</a>
  ·
  <a href="https://unknown1232199.github.io/Optimization-FNF-deluxe-beta/Lo/">Convertidor osu!</a>
</p>

---

## Herramientas

### 01 · OGG Slimmer — preparación sin pérdida

Prepara en un único ZIP todos los archivos OGG seleccionados, sin recodificar ni modificar el audio.

- Lee archivos `.ogg` con cualquier combinación de mayúsculas y minúsculas.
- Permite elegir archivos sueltos o una carpeta completa.
- Conserva nombres y rutas de carpetas, incluidas las de instrumental y voces.
- Mantiene canales estéreo y mono tal como están en el original.
- No altera vocals del jugador, del oponente ni el instrumental.
- Crea un ZIP sin recomprimir los OGG y ofrece mantener la pantalla activa cuando el navegador lo permite.
- Todo se procesa localmente en el navegador.

**Importante sobre el tamaño:** Vorbis ya es un formato comprimido. Para que el audio permanezca idéntico, esta herramienta copia los OGG byte por byte. Por eso no promete reducir el peso de los audios; el ahorro real sin pérdida puede ser nulo o muy pequeño.

[Abrir OGG Slimmer](https://unknown1232199.github.io/Optimization-FNF-deluxe-beta/optimizador-ogg.html)

### 02 · Convertidor osu! → Psych Engine 1.0.4

Convierte beatmaps y packs compatibles de osu! en charts para **Psych Engine 1.0.4**.

- Entradas: archivos `.osu`, mapas `.osz` y packs `.zip`.
- Permite revisar dificultades y configurar la asignación de notas.
- Genera la estructura de archivos para importar el resultado al proyecto de FNF.
- La conversión se ejecuta en el navegador.

La compatibilidad depende del contenido del beatmap y de las opciones elegidas. Revisá los archivos generados y probalos dentro de tu proyecto.

[Abrir el convertidor osu!](https://unknown1232199.github.io/Optimization-FNF-deluxe-beta/Lo/convertidor-osu.html)

---

## Cómo empezar

1. Abrí [FNF Tools](https://unknown1232199.github.io/Optimization-FNF-deluxe-beta/).
2. Elegí OGG Slimmer o el convertidor osu!.
3. Seleccioná los archivos compatibles.
4. Esperá el procesamiento y descargá el resultado.
5. Probalo en tu mod antes de reemplazar los originales.

> Hacé una copia de seguridad de tu proyecto antes de reemplazar archivos.

## Estructura

```text
Optimization-FNF-deluxe-beta/
├── .github/workflows/pages.yml
├── Lo/
│   └── index.html
├── index.html
├── optimizador-ogg.html
└── README.md
```

## Desarrollo y publicación

- Sitio estático con **HTML, CSS y JavaScript**.
- Publicación mediante **GitHub Pages** desde la rama `main`.
- El workflow de `.github/workflows/pages.yml` realiza el despliegue.

## Créditos y avisos

Proyecto comunitario e independiente; no está afiliado oficialmente con Friday Night Funkin', Psych Engine ni osu!.
