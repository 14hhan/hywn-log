<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    // fetch posts from endpoint so that it includes all metadata (see posts.json.js for explanation)
    const fetchedAbout = await fetch('/about.json').then((res) => res.json())
    const about = fetchedAbout[0]

    if (!about) {
      return {
        status: 404,
        error: 'Post not found'
      }
    }

    const component = await import('./about.md')

    return {
      props: {
        ...about,
        component: component.default
      }
    }
  }
</script>

<script>
  import { format } from 'date-fns'
  import { page } from '$app/stores'
  import { name, website } from '$lib/info'

  export let component

  // metadata
  export let title
  export let date
  export let preview
  export let slug

  // generated open-graph image for sharing on social media. Visit https://og-image.vercel.app/ to see more options.
  const ogImage = `https://og-image.vercel.app/**${encodeURIComponent(
    title
  )}**?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg`

  const url = `${website}/${slug}`
</script>

<svelte:head>
  <title>{name} | About</title>
  <meta name="description" content={preview} />
  <meta name="author" content={name} />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={preview} />
  <meta property="og:image" content={ogImage} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content={website} />
  <meta property="twitter:url" content={url} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={preview} />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>

<article class="relative">
  <h1 class="!mt-0 !mb-2 text-3xl">
    <a class="!font-semibold" href={$page.url.pathname}>
      {title}
    </a>
  </h1>
  <div class="opacity-70">
    <time datetime={new Date(date).toISOString()}>{format(new Date(date), 'MMMM d, yyyy')}</time>
  </div>

  <div class="about relative">
    <!-- render the post -->
    <svelte:component this={component} />
  </div>
</article>
