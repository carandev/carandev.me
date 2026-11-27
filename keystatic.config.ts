import { collection, config, fields } from '@keystatic/core'

// Cover and inline images live next to the code so Astro can optimize them; paths are relative to src/content/blog/.
const IMAGES = { directory: 'src/assets/blog', publicPath: '../../assets/blog/' }

export default config({
  // Local mode writes files straight to disk with no authentication, so it is only allowed in `astro dev`.
  // Every other build (Vercel, `astro preview`) edits through GitHub: sign-in required, each save is a commit.
  // PUBLIC_KEYSTATIC_STORAGE=github switches dev to GitHub mode too (needed once to create the GitHub App).
  storage: import.meta.env.DEV && import.meta.env.PUBLIC_KEYSTATIC_STORAGE !== 'github'
    ? { kind: 'local' }
    : { kind: 'github', repo: { owner: 'carandev', name: 'carandev.me' } },
  ui: {
    brand: { name: 'carandev · blog' }
  },
  collections: {
    blog: collection({
      label: 'Artículos',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'pubDate', 'draft'],
      schema: {
        title: fields.slug({
          name: { label: 'Título', validation: { isRequired: true } },
          slug: { label: 'Slug', description: 'Dirección del artículo: /blog/<slug>/' }
        }),
        description: fields.text({
          label: 'Descripción',
          description: 'Resumen corto para la lista de artículos, buscadores y redes sociales.',
          multiline: true,
          validation: { isRequired: true }
        }),
        pubDate: fields.date({
          label: 'Fecha de publicación',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true }
        }),
        updatedDate: fields.date({ label: 'Fecha de actualización' }),
        tags: fields.array(fields.text({ label: 'Etiqueta' }), {
          label: 'Etiquetas',
          itemLabel: props => props.value
        }),
        cover: fields.image({ label: 'Portada', ...IMAGES }),
        draft: fields.checkbox({
          label: 'Borrador',
          description: 'Los borradores no se publican en el sitio.',
          defaultValue: false
        }),
        content: fields.mdx({
          label: 'Contenido',
          options: { image: IMAGES }
        })
      }
    })
  }
})
