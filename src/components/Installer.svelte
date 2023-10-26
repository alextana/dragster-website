<script>
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  let frameworks = ['vue']
  let selectedFramework = 'vue'
  let command = null
  let copied = false
  let show = false

  function handleCopy() {
    navigator.clipboard.writeText(command.textContent)
    handleCopied()
  }

  onMount(() => {
    show = true
  })

  function handleCopied() {
    copied = true
    setTimeout(() => {
      copied = false
    }, 2500)
  }
</script>

{#if show}
  <div transition:fade>
    <div
      class="mockup-window border border-neutral-content/50 bg-base-300 shadow-xl"
    >
      <div class="grid grid-cols-1 px-4 py-16 bg-base-100">
        <div class="frameworks ml-2 flex gap-2">
          {#each frameworks as framework}
            <button
              on:click={() => (selectedFramework = framework)}
              class={`${
                selectedFramework === framework
                  ? 'bg-primary text-primary-content hover:text-primary-content'
                  : 'bg-base-300'
              } options  text-xs capitalize cursor-pointer px-3 py-1 hover:bg-primary hover:text-primary-content rounded-tl-lg rounded-tr-lg`}
            >
              {framework}
            </button>
          {/each}
        </div>
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <div
          class="w-full rounded-lg bg-gradient-to-r from-primary via-success to-accent p-[2px]"
        >
          <div
            class="transition-all font-mono relative text-sm bg-base-300 text-base-content text-left w-[380px] px-6 py-3 rounded-[.4rem]"
            bind:this={command}
          >
            {#if copied}
              <span in:fade>Copied!</span>
            {:else}
              <span in:fade
                >npm i @alextana/dragster{selectedFramework
                  ? '/' + selectedFramework
                  : ''}</span
              >
            {/if}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
              role="note"
              on:click={handleCopy}
              class="copy p-4 absolute cursor-pointer hover:text-accent right-0 top-1/2 transform -translate-y-1/2"
            >
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                width="256"
                height="256"
                viewBox="0 0 256 256"
                ><path
                  fill="currentColor"
                  d="M216 28H88a12 12 0 0 0-12 12v36H40a12 12 0 0 0-12 12v128a12 12 0 0 0 12 12h128a12 12 0 0 0 12-12v-36h36a12 12 0 0 0 12-12V40a12 12 0 0 0-12-12Zm-60 176H52V100h104Zm48-48h-24V88a12 12 0 0 0-12-12h-68V52h104Z"
                /></svg
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
