<script lang="ts">
  import { Menu, User } from 'lucide-svelte';

  export let sidebar = false;
</script>

<nav
  class="
    flex flex-wrap
    items-center
    justify-between
    bg-gray-300 
    fixed
    w-full
    py-2
    mb-5
    px-4
    text-lg
    text-gray-700
    shadow-lg
  "
>
  <div class="flex flex-wrap">
    <button on:click={() => (sidebar = !sidebar)}>
      <Menu />
    </button>
  </div>
  <div
    class="
      flex flex-wrap
      w-auto
      px-2
      text-base
      text-gray-700
    "
    id="menu"
  >
  </div>
</nav>
