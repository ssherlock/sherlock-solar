<script lang="ts">
  let lineRef: HTMLDivElement;
  export let direction:string = '';
</script>
  
{#if direction === 'horizontal_fromLeftRed'}
  <div class="line-horizontal" bind:this={lineRef}>
    <div class="dot-fromLeftRed" />
  </div>
{:else if direction === 'horizontal_fromLeftGreen'}
  <div class="line-horizontal" bind:this={lineRef}>
    <div class="dot-fromLeftGreen" />
  </div>
{:else if direction === 'horizontal_fromRightRed'}
  <div class="line-horizontal" bind:this={lineRef}>
    <div class="dot-fromRightRed" />
  </div>
{:else if direction === 'horizontal_fromRightGreen'}
  <div class="line-horizontal" bind:this={lineRef}>
    <div class="dot-fromRightGreen" />
  </div>  
{:else if direction === 'vertical_fromTopRed'}
  <div class="line-vertical" bind:this={lineRef}>
    <div class="dot-fromTopRed" />
  </div>
{:else if direction === 'vertical_fromBottomRed'}
  <div class="line-vertical" bind:this={lineRef}>
    <div class="dot-fromBottomRed" />
  </div>
{:else if direction === 'vertical_fromTopGreen'}
  <div class="line-vertical" bind:this={lineRef}>
    <div class="dot-fromTopGreen" />
  </div>
{:else if direction === 'vertical_fromBottomGreen'}
  <div class="line-vertical" bind:this={lineRef}>
    <div class="dot-fromBottomGreen" />
  </div>  
{:else if direction === 'line-vertical'}
  <div class="line-vertical" bind:this={lineRef} />
{:else if direction === 'line-horizontal'}
  <div class="line-horizontal" bind:this={lineRef} />
{/if}


