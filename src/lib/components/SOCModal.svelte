<script lang=ts>
	export let onConfirm: any;
	export let showSOCModal: Boolean;
	export let socValue: number;
	let errorMessage: string = " ";
	let dialog: HTMLDialogElement; 

	$: if (dialog && showSOCModal && socValue) dialog.showModal();

	const handleDialogResponse = async (response: 'OK' | 'CANCEL') => { 
		if (response === "OK") {
			if (socValue > 100 || socValue < 1)	 {
				errorMessage = "Please enter a value between 1 and 100";
			} else {
				// console.log("User responded with Yes");
				dialog.close();
				onConfirm(socValue);
			}
		} else {
			// console.log("User responded with No"); 
			dialog.close();
		}
		return;
	}
</script>
  
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showSOCModal = false)}
	on:click|self={() => dialog.close()}>
	
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<slot />
		<div class="ml-[20%] mr-[20%] flex flex-auto items-justify items-center"> 
			<!-- svelte-ignore missing-declaration -->
			<!-- <TextInput label="SOC %:" bind:value={socValue} /> -->
			<input
				type="number"
				bind:value={socValue}
				min="0"
				max="100"
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
</style>