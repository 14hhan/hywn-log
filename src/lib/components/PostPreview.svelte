<script>
  import { format } from 'date-fns'
  import ButtonLink from './ButtonLink.svelte'

  export let post
  export let small = false
</script>

<div class="flex flex-col flex-1">
  <div>
    {#if !small}
      <h1 class="!mt-0 !mb-2">
        <a class="!font-semibold" href={`/posts/${post.slug}`}>{post.title}</a>
      </h1>
    {:else}
      <h3 class="!mt-0 !mb-2 !text-2xl">
        <a class="!font-semibold" href={`/posts/${post.slug}`}>{post.title}</a>
      </h3>
    {/if}
    <div class="opacity-70">
      <time>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
      •
      <span>{post.readingTime}</span>
    </div>
  </div>
  <div class="flex-1 mt-1 mb-4">{@html post.preview}</div>
  <slot name="actions">
    <div class="flex justify-end w-full">
      <ButtonLink href={`/posts/${post.slug}`}>Read More</ButtonLink>
    </div>
  </slot>
</div>
