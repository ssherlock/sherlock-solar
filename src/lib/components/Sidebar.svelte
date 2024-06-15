<script lang="ts">
  import { onDestroy } from 'svelte';
  import { X } from 'lucide-svelte';
	import authStore from '../../stores/authStore';

  export let open: boolean = false;

  let unsubscribe: { (): void; (): any; };
  let user: any;
  
  onDestroy( () => {
    unsubscribe;
  });

  const handleSignOut = async () => {
    unsubscribe = authStore.subscribe((value) => user = value);
    authStore.signOut();
  };
</script>

<aside class="absolute z-10 w-full bg-gray-300 border-r-2 shadow-lg" class:open>
  <button class="py-4 px-4" on:click={() => (open = false)}>
    <X />
  </button>
  <nav class="pt-2 pl-4 pb-2 text-xl">
    <a class="block" href="/main" on:click={() => (open = false)}>Home</a>
    <!-- <a class="block" href="/resetPassword" on:click={() => (open = false)}>Reset Password</a> -->
    <hr class="border-1 border-gray-500" />
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a href="" on:click={() => {handleSignOut()}}>Sign Out</a>
  </nav>
</aside>

<style>
  aside {
    padding-left: 20%;
    right: 100%;
    transition: ease-out 400ms;
  }

  .open {
    transition: ease-out 200ms;
    right: 20%;
  }
</style>
