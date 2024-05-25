import { writable } from 'svelte/store';

export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  accessToken: string | null;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  user: null
};

const { subscribe, update, set } = writable<AuthState>(initialAuthState);

function signOut() {
  set(initialAuthState);
}

const authStore = {
  subscribe,
  signOut,
  update
};

export default authStore;