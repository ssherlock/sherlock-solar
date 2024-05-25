<script	script lang="ts">
  import { onMount } from 'svelte'
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Battery from '$lib/components/Battery.svelte';
  import Login from '$lib/components/Login.svelte';
	import authStore, { type AuthState } from '../stores/authStore';
	import Tabs from '$lib/components/Tabs.svelte';

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
  <div class="px-2 pt-12 pb-24">
    <div class="min-h-screen flex justify-center p-5 bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="main-title">Sherlock Solar</h1>
        <slot class="overflow-x"/>
      </div>
    </div>
  </div>
  <!-- <nav class="fixed bottom-0 scroll border-separate justify-center inset-x-0 bg-gray-300 flex text-sm text-blue-900 uppercase font-mono">
    <Tabs />
  </nav> -->
{/if}
