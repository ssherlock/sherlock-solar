<script	script lang="ts">
  import '../app.css';
  import Login from '$lib/components/Login.svelte';
  import authStore, { type AuthState } from '../stores/authStore';
	import Main from './main/main.svelte';
	import { onDestroy } from 'svelte';
  
  let isAuthenticated: boolean;
  let user: any | null;
  let accessToken: string | null;

  authStore.subscribe((state: AuthState) => {
    isAuthenticated = state.isAuthenticated;
    accessToken = state.accessToken;
    user = state.user;
  });

  onDestroy(() => {
    authStore.update(state => ({
      isAuthenticated: false,
      accessToken: null,
      user: null
    }));
  });
          
</script>

{#if !isAuthenticated}
  <Login />
{:else}
  <Main />
{/if}
