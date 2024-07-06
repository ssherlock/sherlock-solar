<script lang="ts">
	import { ChargingState } from "../../solar-utils";

    export let percentage: number = 100; // Default to 100%
    export let chargingState: ChargingState = ChargingState.Nothing;

    $: batteryColor = getBatteryColor(percentage);
  
    function getBatteryColor(percentage: number): string[] {
      const numBars = 10; // Number of bars in the battery
      const colors = new Array(numBars).fill('bg-gray-300'); // Initialize all bars with gray color      
  
      // Calculate the reversed filled bars index
      const filledBarsIndex = Math.floor(numBars - ((percentage / 100) * numBars));
  
      // Set colors for filled bars, starting from the filledBarsIndex
      for (let i = filledBarsIndex; i < numBars; i++) {
        if (percentage >= 65) {
          colors[i] = 'bg-green-500';
        } else if (percentage >= 35) {
          colors[i] = 'bg-yellow-500';
        } else {
          colors[i] = 'bg-red-500';
        }
      }
  
      return colors;
    }
  </script>

  <div class="flex items-center">
    <div class="h-28 w-20 flex flex-col justify-end pt-1 p-3">
      {#each batteryColor as color}
        <div class={`${color} h-full `} />
      {/each}
      {#if chargingState === ChargingState.Charging}
        <div class="text-center text-sm font-semibold text-green-600">{percentage}%</div>
      {:else if chargingState === ChargingState.Discharging}
        <div class="text-center text-sm font-semibold text-red-600">{percentage}%</div>
      {:else}
        <div class="text-center text-sm font-semibold">{percentage}%</div>
      {/if}
    </div>
  </div>
  