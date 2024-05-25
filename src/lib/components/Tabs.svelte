<script lang="ts">
    import { page } from '$app/stores';
    import { BatteryCharging, Home, RefreshCcw } from 'lucide-svelte';
  
    const tabs = [
      {
        value: 1,
        icon: Home,
        text: 'Home',
        url: '/'      
      },
      {
        value: 2,
        icon: BatteryCharging,
        text: 'Set Min SOC',
        url: '/setMinSOC' 
      }
    ];
    const activeTab: number = 1;
  </script>
  
  <!-- Added top border or not border -->
  <!-- <div class="border-b border-gray-200 dark:border-gray-700 border-t-2"> -->
  <div class="border-b border-blue-200 dark:border-gray-700 ">
    <ul class="flex flex-wrap justify-center mb-px text-sm font-medium text-center dgs-blue dark:text-gray-400">
      {#each tabs as tab}
        <li class="mr-2">
          {#if $page.url.pathname === tab.url}
            <a
              href={tab.url}
              class="flex flex-col justify-center items-center p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500 group"
            >
              <svelte:component this={tab.icon} />
              {tab.text}
            </a>
          {:else}
            <a
              href={tab.url}
              class="flex flex-col justify-center items-center p-4 rounded-t-lg border-2 border-transparent hover:text-blue-600 hover:border-blue-600 dark:hover:text-gray-300 group"
            >
              <svelte:component this={tab.icon} />
              {tab.text}
            </a>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
  