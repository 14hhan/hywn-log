import { browser } from '$app/env'
import { parse } from 'node-html-parser'

// we require some server-side APIs to parse all metadata
if (browser) {
  throw new Error(`This should not be used on the browser, fetch from /posts.json instead`)
}

// Get all posts and add metadata
const parsedAbout = Object.entries(import.meta.globEager('/src/routes/about/about.md'))
  .map(([filepath, about]) => {
    return {
      ...about.metadata,

      // generate the slug from the file path
      slug: filepath
        .replace(/(\/index)?\.md/, '')
        .split('/')
        .pop(),

      // remove timezone from date
      date: about.metadata.date ? new Date(about.metadata.date).toLocaleDateString() : undefined,

      // the svelte component
      component: about.default
    }
  })

export function getAbout() {
  return parsedAbout
}

/**
 * An endpoint for the getPosts() function. Some of the metadata that gets added
 * is only available when run on the server (i.e node), so when we need to fetch
 * posts client-side we'll do it through this endpoint.
 *
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ url: { } }) {

  return {
    body: JSON.stringify(getAbout())
  }
}
