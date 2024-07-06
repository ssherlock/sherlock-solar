<script	script lang="ts">
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Login from '$lib/components/Login.svelte';
	import authStore, { type AuthState } from '../stores/authStore';
	
  let open = false; 

  let isAuthenticated: boolean;
  let user: any | null;
  let accessToken: string | null;

  authStore.subscribe((state: AuthState) => {
    isAuthenticated = state.isAuthenticated;
    accessToken = state.accessToken;
    user = state.user;
  });     
</script>

{#if !isAuthenticated}
  <Login />
{:else}
  <Sidebar bind:open /> 
  <Navbar bind:sidebar={open} />
  <div class="flex flex-col h-screen">
    <div class="flex-grow flex items-center justify-center p-5 bg-gray-100">
      <div class="bg-white pt-2 pb-2 pl-4 pr-4 rounded-lg shadow-md w-full max-w-md">
        <h1 class="main-title">Sherlock Solar</h1>
        <div class="overflow-y-auto ">
          <slot class="overflow-x"/>
        </div>
      </div>
    </div>
  </div>
  <!-- <nav class="fixed bottom-0 scroll border-separate justify-center inset-x-0 bg-gray-300 flex text-sm text-blue-900 uppercase font-mono">
    <Tabs />
  </nav> -->
{/if}
