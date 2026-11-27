# Blog

Los artículos son archivos MDX en `src/content/blog/<slug>.mdx`. El nombre del archivo es la dirección del artículo: `/blog/<slug>/`. Las imágenes van en `src/assets/blog/`.

Puedes crear, editar y borrar artículos desde el panel **Keystatic** en `/keystatic`, o editando los archivos a mano.

## Qué publica el sitio

| Ruta | Contenido |
|---|---|
| `/blog/` | Artículos publicados, del más reciente al más antiguo, 10 por página (`/blog/2/`, ...) |
| `/blog/<slug>/` | El artículo, con fecha, tiempo de lectura y etiquetas |
| `/` | Sección «Últimos artículos» con los 3 más recientes |
| `/rss.xml` | Feed RSS |
| `/sitemap-index.xml` | Sitemap |

Los artículos con `draft: true` (casilla **Borrador**) no aparecen en ninguna de estas rutas.

## Campos de un artículo

```yaml
---
title: Hola, mundo                  # obligatorio
description: Resumen corto          # obligatorio; lista, buscadores y redes sociales
pubDate: 2026-11-27                 # obligatorio
updatedDate: 2026-11-30             # opcional
tags: [astro, blog]                 # opcional
cover: ../../assets/blog/hola.png   # opcional; también se usa como imagen para redes sociales
draft: false                        # opcional; true = no se publica
---
```

Si un archivo no cumple este esquema (`src/content.config.ts`), `astro build` falla y Vercel no despliega el cambio.

## Escribir en local

```bash
npm run dev
```

Abre `http://localhost:4321/keystatic`. En desarrollo el panel usa el modo **local**: guarda los archivos directamente en tu disco y no pide inicio de sesión. Después haces commit y push como con cualquier otro cambio.

> **Cuidado en redes que no son tuyas:** `npm run dev` usa `--host`, así que otros equipos de tu red pueden abrir el panel y guardar artículos o imágenes sin iniciar sesión. Solo pueden escribir en `src/content/blog/` y `src/assets/blog/`. En una red pública usa `npx astro dev`: sin `--host`, el servidor solo escucha en `127.0.0.1`.

## Escribir en producción (carandev.me/keystatic)

En producción el panel siempre usa el modo **GitHub**:

- Inicias sesión con tu cuenta de GitHub. Solo las cuentas con permiso de escritura en `carandev/carandev.me` pueden guardar cambios.
- Cada guardado es un commit en el repositorio, y Vercel vuelve a desplegar el sitio. El artículo aparece en alrededor de un minuto.

### Configuración inicial (una sola vez)

1. Crea la GitHub App desde local, con el modo GitHub activado:

   ```bash
   PUBLIC_KEYSTATIC_STORAGE=github npm run dev
   ```

   Abre `http://127.0.0.1:4321/keystatic` y sigue el asistente. Este crea la GitHub App y escribe en tu `.env` las variables `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` y `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.
2. Si en el asistente no indicaste la URL desplegada (`https://carandev.me`), agrega en la configuración de la GitHub App, en *Callback URL*, `https://carandev.me/api/keystatic/github/oauth/callback`.
3. Instala la app solo en el repositorio `carandev/carandev.me`.
4. Copia las cuatro variables en Vercel, en *Project → Settings → Environment Variables*, y vuelve a desplegar.

Las variables de Keystatic son secretos de servidor, salvo `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`. No las subas al repositorio.

Si en producción falta `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET` o `KEYSTATIC_SECRET`, `/api/keystatic` responde con error y el panel no permite iniciar sesión ni guardar. El resto del sitio no se ve afectado. Si falta `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`, solo se ven afectados los enlaces del panel a la GitHub App.

Quien inicie sesión sin permiso de escritura verá la opción de hacer un fork, pero no podrá escribir en `carandev/carandev.me`.
