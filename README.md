# FNF Tools — herramientas para modders

Pequeña colección de herramientas web para trabajar con archivos y recursos de **Friday Night Funkin'**. Todo se ejecuta desde el navegador; no hace falta instalar un programa.

🌐 **Web:** https://unknown1232199.github.io/Optimization-FNF-deluxe-beta/

## Herramientas

### Optimizador de OGG

Permite seleccionar varios archivos `.ogg` o una carpeta completa y procesarlos en lote.

- Procesamiento local en el navegador: los audios no se suben a un servidor.
- Mantiene los nombres y las rutas de las carpetas al generar el ZIP.
- Usa OptiVorbis para intentar reducir el tamaño sin volver a codificar el audio con pérdida.
- Si el resultado no es válido, el proceso falla o el archivo no queda más pequeño, conserva el original.
- Incluye progreso y un resumen de los archivos incluidos en el ZIP.

**Importante sobre compatibilidad:** aunque el procesamiento busca conservar las muestras de audio, algunos engines o forks de FNF pueden interpretar de manera distinta la estructura interna de un OGG. Probá el resultado en tu mod antes de reemplazar tus archivos originales. Conservá siempre una copia de seguridad, especialmente de `Voices`, `Player`, `Opponent` y `Vocals`.

### Convertidor osu! / OSZ a Psych Engine

Herramienta para convertir mapas y packs compatibles para **Psych Engine 1.0.4**.

Abrila desde la página principal y revisá las indicaciones de la propia herramienta antes de importar el resultado a tu proyecto.

## Cómo usar

1. Abrí la [página de herramientas](https://unknown1232199.github.io/Optimization-FNF-deluxe-beta/).
2. Entrá en **Optimizador de OGG**.
3. Elegí archivos sueltos o una carpeta que contenga tus audios.
4. Esperá a que termine el procesamiento y descargá el ZIP.
5. Probá los archivos en el engine que utiliza tu mod. No borres los originales hasta comprobar que todo funciona correctamente.

## Desarrollo y despliegue

El sitio es estático y se publica con **GitHub Pages** desde la rama `main` mediante GitHub Actions. Los archivos HTML, JavaScript, CSS, workers y recursos WASM se sirven directamente desde el repositorio.

- `index.html`: página principal y accesos a las herramientas.
- `optimizador-ogg.html`: interfaz del optimizador OGG.
- `optivorbis-worker.js`: worker que ejecuta el procesamiento OGG.
- `7864aa111af62d6a0d7f.module.wasm`: módulo WebAssembly utilizado por el optimizador.
- `Lo/`: archivos del convertidor osu! / OSZ.

## Avisos

- Este proyecto no está afiliado oficialmente con Friday Night Funkin', Psych Engine ni osu!.
- Los resultados pueden variar según la versión del engine y el decodificador OGG.
- Hacé copias de seguridad antes de reemplazar audio de un mod.

