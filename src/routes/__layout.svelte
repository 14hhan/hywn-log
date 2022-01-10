<script>
  import '../app.css'
  import '../prism.css'
  import 'focus-visible'
  import MoonIcon from 'heroicons-svelte/solid/MoonIcon.svelte'
  import SunIcon from 'heroicons-svelte/solid/SunIcon.svelte'
  import { browser } from '$app/env'
  import { name } from '$lib/info'

  let prefersLight = browser ? Boolean(JSON.parse(localStorage.getItem('prefersLight'))) : false
</script>

<div class="flex flex-col min-h-screen">
  <div class="mx-auto flex flex-col flex-grow w-full max-w-4xl">
    <div class="flex h-16 px-4 py-4 justify-between items-center">
      <div class="name">
        <h2
          class="!text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 dark:from-violet-500 dark:to-pink-500"
        >
          <a class="text-xl sm:text-2xl font-bold" href="/">
            {name}
          </a>
        </h2>
      </div>
      
      <div class="flex items-center">
        <h2
          class=""
        >
          <a class="text-xl sm:text-2xl font-semibold text-slate-600 dark:text-slate-400" href="/about">
            About
          </a>
        </h2>
        {#if browser}
          <button
            type="button"
            role="switch"
            aria-label="Toggle Dark Mode"
            aria-checked={!prefersLight}
            class="h-6 w-6 sm:h-8 sm:w-8 sm:p-1 ml-6 mb-1"
            on:click={() => {
              prefersLight = !prefersLight
              localStorage.setItem('prefersLight', prefersLight.toString())

              if (prefersLight) {
                document.querySelector('html').classList.remove('dark')
              } else {
                document.querySelector('html').classList.add('dark')
              }
            }}
          >
            {#if prefersLight}
              <MoonIcon class="text-slate-500" />
            {:else}
              <SunIcon class="text-slate-300" />
            {/if}
          </button>
        {/if}
      </div>
    </div>
    <main
      class="prose prose-slate prose-sm sm:prose sm:prose-slate sm:prose-lg sm:max-w-none dark:prose-invert flex flex-col w-full flex-grow py-4 px-4 mb-10"
    >
      <slot />
    </main>
  </div>
</div>
