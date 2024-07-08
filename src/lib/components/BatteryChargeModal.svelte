<script lang=ts>
	export let onConfirm: any;
	export let showBatteryChargeModal: boolean;
	export let forceChargeEnabled: boolean;
	export let st_hours: number;
	export let st_minutes: number;
	export let et_hours: number;
	export let et_minutes: number;
	let errorMessage: string = " ";
	let dialog: HTMLDialogElement; 
	let isChecked: boolean = forceChargeEnabled;

	// $: if (dialog && showBatteryChargeModal && socValue) dialog.showModal();
	$: if (dialog && showBatteryChargeModal) dialog.showModal();

	const handleDialogResponse = async (response: 'OK' | 'CANCEL') => { 
		if (response === "OK") {
			if (st_hours > 23 || st_hours < 0 ||
				et_hours > 23 || et_hours < 0) {
				errorMessage = "Please enter valid times (24 hour format)";
			} else {
				dialog.close();
				onConfirm(isChecked, st_hours, st_minutes, et_hours, et_minutes);
			}
		} else {
			dialog.close();
		}
		return;
	}

	function handleFocus(event: FocusEvent) {
		const input = event.target as HTMLInputElement;
		input.select();
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
			<!-- <label class="text-sm text-gray-600" for="st_hours">Enabled: </label> -->

		</div>
		<!-- <p>Switch is {isChecked ? 'ON' : 'OFF'}</p> -->
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
			/>
			&nbsp;:&nbsp;
			<input
				type="number"
				bind:value={st_minutes}
				min="0"
				max="59"
				on:focus={handleFocus}
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
			/>
			&nbsp;:&nbsp;
			<input
				type="number"
				bind:value={et_minutes}
				min="0"
				max="59"
				on:focus={handleFocus}
			/>
		</div>		
		<div class="button-group">
			<!-- svelte-ignore missing-declaration -->
			<button class="m-4 dgs-button" on:click={() => handleDialogResponse("OK")}>Ok</button>
			<button class="m-4 dgs-button" on:click={() => handleDialogResponse("CANCEL")}>Cancel</button>
		</div>
		{#if errorMessage}
			<div class="text-sm text-red-700">
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