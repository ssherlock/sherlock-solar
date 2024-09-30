<script lang=ts>
	import { ReceiptPoundSterling } from "lucide-svelte";

	export let onConfirm: any;
	export let showBatteryChargeModal: boolean;
	export let forceChargeEnabled: boolean;
	export let st_hours: string;
	export let st_minutes: string;
	export let et_hours: string;
	export let et_minutes: string;
	let HOURS = "HOURS";
	let MINUTES = "MINUTES";
	let errorMessage: string = "";
	let dialog: HTMLDialogElement; 
	let isChecked: boolean = forceChargeEnabled;

	// $: if (dialog && showBatteryChargeModal && socValue) dialog.showModal();
	$: if (dialog && showBatteryChargeModal) {
		formatNumbersAsString(st_hours, st_minutes, et_hours, et_minutes);
		dialog.showModal();
	}

	const handleDialogResponse = async (response: 'OK' | 'CANCEL') => { 
		errorMessage = "";
		if (response === "OK") {
		
			if (Number(st_hours) > 23 || Number(st_hours) < 0 ||
			    Number(et_hours) > 23 || Number(et_hours) < 0 ||
			    Number(st_minutes) > 59 || Number(st_minutes) < 0 ||
			    Number(et_minutes) > 59 || Number(et_minutes) < 0) {
				errorMessage = "Please enter valid times (24 hour format)";
			} else {
				dialog.close();
				onConfirm(isChecked, st_hours, st_minutes, et_hours, et_minutes);
				formatNumbersAsString(st_hours, st_minutes, et_hours, et_minutes);
			}

			if (errorMessage === "") {
				dialog.close();
			}
		} else if (response === "CANCEL") {
			dialog.close();
		}
		return;
	}

	export function formatNumbersAsString(st_hours: string, st_minutes: string, et_hours: string, et_minutes: string) {
		st_hours = st_hours.toString().padStart(2, '0');
		st_minutes = st_minutes.toString().padStart(2, '0');
		et_hours = et_hours.toString().padStart(2, '0');
		et_minutes = et_minutes.toString().padStart(2, '0');	
	}

	function handleFocus(event: FocusEvent) {
		const input = event.target as HTMLInputElement;
		input.select();
	}	


	function validateNumber(numEntered: string, numType: string): import("svelte/elements").ChangeEventHandler<HTMLInputElement> | null | undefined {
		errorMessage = "";
		
		if (numType === HOURS) {
			if (Number(numEntered) > 23 || Number(numEntered) < 0) {
				errorMessage = "Hours must be between 0 and 23";
			}
		} else if (numType === MINUTES) {
			if (Number(numEntered) > 59 || Number(numEntered) < 0) {
				errorMessage = "Minutes must between 0 and 59";
			}
		}
		return;
	}

</script>
  
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showBatteryChargeModal = false)}
	on:click|self={() => dialog.close()}>
	
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click on:click|stopPropagation>
		<slot name="header" />
		<slot />
		<div class="ml-[20%] mr-[20%] flex flex-auto items-justify items-center">
			<label class="text-sm text-gray-600" for="st_hours">Enabled: </label>
			<label class="ml-2 switch">
				<input type="checkbox" bind:checked={isChecked}>
				<span class="slider round"></span>
			</label>
		</div>
		<div class="ml-[20%] mr-[20%] flex flex-auto items-justify items-center">
			<label class="text-sm text-gray-600" for="st_hours">Start Time</label>
		</div>
		<div class="ml-[20%] mr-[20%] flex flex-auto items-justify items-center"> 
			<!-- svelte-ignore missing-declaration -->
			<input
				type="number"
				bind:value={st_hours}
				min="0"
				max="23"
				on:focus={handleFocus}
				on:change={validateNumber(et_hours, HOURS)}
			/>
			&nbsp;:&nbsp;
			<input
				type="number"
				bind:value={st_minutes}
				min="0"
				max="59"
				on:focus={handleFocus}
				on:change={validateNumber(st_minutes, MINUTES)}
			/>
		</div>
		<div class="mt-4 ml-[20%] mr-[20%] flex flex-auto items-justify items-center">
			<label class="text-sm text-gray-600" for="st_hours">End Time</label>
		</div>
		<div class="ml-[20%] mr-[20%] flex flex-auto items-justify items-center"> 
			<!-- svelte-ignore missing-declaration -->
			<input
				type="number"
				bind:value={et_hours}
				min="0"
				max="23"
				on:focus={handleFocus}
				on:change={validateNumber(et_hours, HOURS)}
			/>
			&nbsp;:&nbsp;
			<input
				type="number"
				bind:value={et_minutes}
				min="0"
				max="59"
				on:focus={handleFocus}
				on:change={validateNumber(et_minutes, MINUTES)}
			/>
		</div>		
		<div class="button-group">
			<!-- svelte-ignore missing-declaration -->
			 {#if errorMessage.length > 0}
			 	<button class="m-4 dgs-button-disabled" on:click={() => handleDialogResponse("OK")} disabled>Ok</button>
			 {:else}
			 	<button class="m-4 dgs-button" on:click={() => handleDialogResponse("OK")}>Ok</button>
			{/if}
			<button class="m-4 dgs-button" on:click={() => handleDialogResponse("CANCEL")}>Cancel</button>
		</div>
		{#if errorMessage}
			<div class="text-sm text-red-700 text-center font-bold">
				{errorMessage}
			</div>
		{/if}
	</div>
</dialog>
  
<style>
	dialog {
		max-width: 60%;
		width: 60%; /* Limit max width */
		border-radius: .5em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 10px;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}

	.switch {
  position: relative;
  display: inline-block;
  width: 30px;  /* 60px * 0.5 */
  height: 17px; /* 34px * 0.5 */
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 13px; /* 26px * 0.5 */
  width: 13px;  /* 26px * 0.5 */
  left: 2px;    /* 4px * 0.5 */
  bottom: 2px;  /* 4px * 0.5 */
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  transform: translateX(13px); /* 26px * 0.5 */
}

.slider.round {
  border-radius: 17px; /* 34px * 0.5 */
}

.slider.round:before {
  border-radius: 50%;
}
</style>