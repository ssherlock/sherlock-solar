<script lang="ts">
    import Battery from '$lib/components/Battery.svelte';
    import { onMount } from 'svelte';
    import authStore, { type AuthState } from '../../stores/authStore';
    import { ChargingState, formatDateTime, retrieveSolarDetails } from '../../solar-utils';
	import Line from '$lib/components/Line.svelte';
	import { RefreshCcw } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { SyncLoader } from 'svelte-loading-spinners';

let percentage: number = 0;
let time: string = '';
let pvPower: string = '';
let pvPowerValue: number = 0;
let batDischargePowerValue: number = 0;
let batDisChargePower: string = '';
let batChargePowerValue: number = 0;
let batChargePower: string = '';
let gridConsumptionPower: string = '';
let gridConsumptionPowerValue: number = 0;
let feedinPower: string = '';
let feedinPowerValue: number = 0;
let loadPower: string = '';
let loadPowerValue: number = 0;
let chargingState: ChargingState = ChargingState.Nothing;
let isAuthenticated: boolean = false;
let accessToken: string | null = null;
let user: any | null = null;
let showSpinner: boolean = true;

$: time;
$: pvPower;
$: percentage;

interface Data {
  name: string;
  unit: string;
  value: number | string;
  variable: string;
}

interface Result {
  datas: Data[];
  deviceSN: string;
  time: string;
}

async function retrieveValues() {
    console.log("Entering main.svelte");
    await authStore.subscribe((state: AuthState) => {
        isAuthenticated = state.isAuthenticated;
        accessToken = state.accessToken;
        user = state.user;
    });

    // let accessToken = "dummy";
    if (accessToken) {
        //get the solar details

        // const responseData: any | null = await JSON.parse('{"errno":0,"msg":"success","result":[{"datas":[{"name":"PVPower","unit":"kW","value":0.445,"variable":"pvPower"},{"name":"PV1Volt","unit":"V","value":221.9,"variable":"pv1Volt"},{"name":"PV1Current","unit":"A","value":2,"variable":"pv1Current"},{"name":"PV1Power","unit":"kW","value":0.444,"variable":"pv1Power"},{"name":"PV2Volt","unit":"V","value":5.8,"variable":"pv2Volt"},{"name":"PV2Current","unit":"A","value":0.1,"variable":"pv2Current"},{"name":"PV2Power","unit":"kW","value":0.001,"variable":"pv2Power"},{"name":"EPSPower","unit":"kW","value":0,"variable":"epsPower"},{"name":"EPS-RCurrent","unit":"A","value":0,"variable":"epsCurrentR"},{"name":"EPS-RVolt","unit":"V","value":0,"variable":"epsVoltR"},{"name":"EPS-RPower","unit":"kW","value":0,"variable":"epsPowerR"},{"name":"RCurrent","unit":"A","value":1.7,"variable":"RCurrent"},{"name":"RVolt","unit":"V","value":234.7,"variable":"RVolt"},{"name":"RFreq","unit":"Hz","value":50.09,"variable":"RFreq"},{"name":"RPower","unit":"kW","value":0.382,"variable":"RPower"},{"name":"AmbientTemperature","unit":"℃","value":38.3,"variable":"ambientTemperation"},{"name":"InvTemperation","unit":"℃","value":29.6,"variable":"invTemperation"},{"name":"ChargeTemperature","unit":"℃","value":0,"variable":"chargeTemperature"},{"name":"batTemperature","unit":"℃","value":29.7,"variable":"batTemperature"},{"name":"Load Power","unit":"kW","value":0.404,"variable":"loadsPower"},{"name":"Output Power","unit":"kW","value":0.382,"variable":"generationPower"},{"name":"Feed-in Power","unit":"kW","value":0,"variable":"feedinPower"},{"name":"GridConsumption Power","unit":"kW","value":0.044,"variable":"gridConsumptionPower"},{"name":"InvBatVolt","unit":"V","value":239.8,"variable":"invBatVolt"},{"name":"InvBatCurrent","unit":"A","value":-0.1,"variable":"invBatCurrent"},{"name":"invBatPower","unit":"kW","value":-0.047,"variable":"invBatPower"},{"name":"Charge Power","unit":"kW","value":0.047,"variable":"batChargePower"},{"name":"Discharge Power","unit":"kW","value":0,"variable":"batDischargePower"},{"name":"BatVolt","unit":"V","value":239.7,"variable":"batVolt"},{"name":"BatCurrent","unit":"A","value":0.3,"variable":"batCurrent"},{"name":"MeterPower","unit":"kW","value":0.044,"variable":"meterPower"},{"name":"Meter2Power","unit":"kW","value":0,"variable":"meterPower2"},{"name":"SoC","unit":"%","value":89,"variable":"SoC"},{"name":"Cumulative power generation","unit":"kWh","value":906.8,"variable":"generation"},{"name":"Battery Residual Energy","unit":"0.01kWh","value":956,"variable":"ResidualEnergy"},{"name":"Running State","value":"163","variable":"runningState"},{"name":"Battery Status","value":"1","variable":"batStatus"},{"name":"Battery Status Name","value":"Normal","variable":"batStatusV2"},{"name":"The current error code is reported","value":"","variable":"currentFault"},{"name":"The number of errors","value":"0","variable":"currentFaultCount"}],"deviceSN":"66BH302022PC033","time":"2024-05-24 17:29:06 BST+0100"}]}');
        
        //Shower on example
        // const responseData: any | null = await JSON.parse('{"errno":0,"msg":"success","result":[{"datas":[{"name":"PVPower","unit":"kW","value":1.328,"variable":"pvPower"},{"name":"PV1Volt","unit":"V","value":232.9,"variable":"pv1Volt"},{"name":"PV1Current","unit":"A","value":5.7,"variable":"pv1Current"},{"name":"PV1Power","unit":"kW","value":1.328,"variable":"pv1Power"},{"name":"PV2Volt","unit":"V","value":6,"variable":"pv2Volt"},{"name":"PV2Current","unit":"A","value":0,"variable":"pv2Current"},{"name":"PV2Power","unit":"kW","value":0,"variable":"pv2Power"},{"name":"EPSPower","unit":"kW","value":0,"variable":"epsPower"},{"name":"EPS-RCurrent","unit":"A","value":0,"variable":"epsCurrentR"},{"name":"EPS-RVolt","unit":"V","value":0,"variable":"epsVoltR"},{"name":"EPS-RPower","unit":"kW","value":0,"variable":"epsPowerR"},{"name":"RCurrent","unit":"A","value":12.8,"variable":"RCurrent"},{"name":"RVolt","unit":"V","value":233.3,"variable":"RVolt"},{"name":"RFreq","unit":"Hz","value":50.02,"variable":"RFreq"},{"name":"RPower","unit":"kW","value":2.997,"variable":"RPower"},{"name":"AmbientTemperature","unit":"℃","value":50,"variable":"ambientTemperation"},{"name":"InvTemperation","unit":"℃","value":44.8,"variable":"invTemperation"},{"name":"ChargeTemperature","unit":"℃","value":0,"variable":"chargeTemperature"},{"name":"batTemperature","unit":"℃","value":34.3,"variable":"batTemperature"},{"name":"Load Power","unit":"kW","value":8.018,"variable":"loadsPower"},{"name":"Output Power","unit":"kW","value":2.997,"variable":"generationPower"},{"name":"Feed-in Power","unit":"kW","value":0,"variable":"feedinPower"},{"name":"GridConsumption Power","unit":"kW","value":5.012,"variable":"gridConsumptionPower"},{"name":"InvBatVolt","unit":"V","value":237.4,"variable":"invBatVolt"},{"name":"InvBatCurrent","unit":"A","value":7.3,"variable":"invBatCurrent"},{"name":"invBatPower","unit":"kW","value":1.744,"variable":"invBatPower"},{"name":"Charge Power","unit":"kW","value":0,"variable":"batChargePower"},{"name":"Discharge Power","unit":"kW","value":1.744,"variable":"batDischargePower"},{"name":"BatVolt","unit":"V","value":237.4,"variable":"batVolt"},{"name":"BatCurrent","unit":"A","value":-7.6,"variable":"batCurrent"},{"name":"MeterPower","unit":"kW","value":5.012,"variable":"meterPower"},{"name":"Meter2Power","unit":"kW","value":0,"variable":"meterPower2"},{"name":"SoC","unit":"%","value":65,"variable":"SoC"},{"name":"Cumulative power generation","unit":"kWh","value":752.5,"variable":"generation"},{"name":"Battery Residual Energy","unit":"0.01kWh","value":700,"variable":"ResidualEnergy"},{"name":"Running State","value":"163","variable":"runningState"},{"name":"Battery Status","value":"1","variable":"batStatus"},{"name":"Battery Status Name","value":"Normal","variable":"batStatusV2"},{"name":"The current error code is reported","value":"","variable":"currentFault"},{"name":"The number of errors","value":"0","variable":"currentFaultCount"}],"deviceSN":"66BH302022PC033","time":"2024-05-12 11:40:48 BST+0100"}]}');

        //Battery charging example
        // const responseData: any | null = await JSON.parse('{"errno":0,"msg":"success","result":[{"datas":[{"name":"PVPower","unit":"kW","value":2.574,"variable":"pvPower"},{"name":"PV1Volt","unit":"V","value":231.9,"variable":"pv1Volt"},{"name":"PV1Current","unit":"A","value":11.1,"variable":"pv1Current"},{"name":"PV1Power","unit":"kW","value":2.574,"variable":"pv1Power"},{"name":"PV2Volt","unit":"V","value":5.9,"variable":"pv2Volt"},{"name":"PV2Current","unit":"A","value":0,"variable":"pv2Current"},{"name":"PV2Power","unit":"kW","value":0,"variable":"pv2Power"},{"name":"EPSPower","unit":"kW","value":0,"variable":"epsPower"},{"name":"EPS-RCurrent","unit":"A","value":0,"variable":"epsCurrentR"},{"name":"EPS-RVolt","unit":"V","value":0,"variable":"epsVoltR"},{"name":"EPS-RPower","unit":"kW","value":0,"variable":"epsPowerR"},{"name":"RCurrent","unit":"A","value":3,"variable":"RCurrent"},{"name":"RVolt","unit":"V","value":239.4,"variable":"RVolt"},{"name":"RFreq","unit":"Hz","value":50.02,"variable":"RFreq"},{"name":"RPower","unit":"kW","value":0.706,"variable":"RPower"},{"name":"AmbientTemperature","unit":"℃","value":50.2,"variable":"ambientTemperation"},{"name":"InvTemperation","unit":"℃","value":42.7,"variable":"invTemperation"},{"name":"ChargeTemperature","unit":"℃","value":0,"variable":"chargeTemperature"},{"name":"batTemperature","unit":"℃","value":34.3,"variable":"batTemperature"},{"name":"Load Power","unit":"kW","value":0.729,"variable":"loadsPower"},{"name":"Output Power","unit":"kW","value":0.706,"variable":"generationPower"},{"name":"Feed-in Power","unit":"kW","value":0,"variable":"feedinPower"},{"name":"GridConsumption Power","unit":"kW","value":0.025,"variable":"gridConsumptionPower"},{"name":"InvBatVolt","unit":"V","value":242.6,"variable":"invBatVolt"},{"name":"InvBatCurrent","unit":"A","value":-7.3,"variable":"invBatCurrent"},{"name":"invBatPower","unit":"kW","value":-1.788,"variable":"invBatPower"},{"name":"Charge Power","unit":"kW","value":1.788,"variable":"batChargePower"},{"name":"Discharge Power","unit":"kW","value":0,"variable":"batDischargePower"},{"name":"BatVolt","unit":"V","value":242.3,"variable":"batVolt"},{"name":"BatCurrent","unit":"A","value":7.4,"variable":"batCurrent"},{"name":"MeterPower","unit":"kW","value":0.025,"variable":"meterPower"},{"name":"Meter2Power","unit":"kW","value":0,"variable":"meterPower2"},{"name":"SoC","unit":"%","value":66,"variable":"SoC"},{"name":"Cumulative power generation","unit":"kWh","value":752.7,"variable":"generation"},{"name":"Battery Residual Energy","unit":"0.01kWh","value":711,"variable":"ResidualEnergy"},{"name":"Running State","value":"163","variable":"runningState"},{"name":"Battery Status","value":"1","variable":"batStatus"},{"name":"Battery Status Name","value":"Normal","variable":"batStatusV2"},{"name":"The current error code is reported","value":"","variable":"currentFault"},{"name":"The number of errors","value":"0","variable":"currentFaultCount"}],"deviceSN":"66BH302022PC033","time":"2024-05-12 11:50:48 BST+0100"}]}');

        //Live
        const [status, responseData] = await retrieveSolarDetails(accessToken);

        // let status = 200; 
        if (status === 200) {
            if (responseData) {
                console.log("responseData: " + JSON.stringify(responseData));

                // Access properties only after the check
                const socData = await responseData.result[0].datas.find((data: { variable: string; }) => data.variable === 'SoC');
                if (socData) { // Check if socData is found before accessing its value
                    percentage = socData.value;
                }
                console.info('SOC:', percentage);

                time = await formatDateTime(responseData.result[0].time);
                console.info('Timestamp:', time);

                const pvPowerData = await responseData.result[0].datas.find((data: { variable: string; }) => data.variable === 'pvPower');
                if (pvPowerData) {
                    pvPowerValue = pvPowerData.value;
                    pvPower = pvPowerData.value + " " + await pvPowerData.unit;
                }

                const batDischargePowerData = await responseData.result[0].datas.find((data: { variable: string; }) => data.variable === 'batDischargePower');
                if (batDischargePowerData) {
                    batDisChargePower = batDischargePowerData.value + " " + await batDischargePowerData.unit;
                    batDischargePowerValue = batDischargePowerData.value;
                }
                const batChargePowerData = await responseData.result[0].datas.find((data: { variable: string; }) => data.variable === 'batChargePower');
                if (batChargePowerData) {
                    batChargePower = batChargePowerData.value + " " + await batChargePowerData.unit;
                    batChargePowerValue = batChargePowerData.value;
                }

                if (batDischargePowerValue === 0 && batChargePowerValue === 0) {
                    chargingState = ChargingState.Nothing;
                } else if (batDischargePowerValue > 0 && batChargePowerValue === 0) {
                    chargingState = ChargingState.Discharging;
                } else if (batDischargePowerValue === 0 && batChargePowerValue > 0) {
                    chargingState = ChargingState.Charging;
                }

                //Grid Consumption vs Feed-in power
                const gridConsumptionPowerData = await responseData.result[0].datas.find((data: { variable: string; }) => data.variable === 'gridConsumptionPower');
                if (gridConsumptionPowerData) {
                    gridConsumptionPower = gridConsumptionPowerData.value + " " + await gridConsumptionPowerData.unit;
                    gridConsumptionPowerValue = gridConsumptionPowerData.value;
                }

                const feedinPowerData = await responseData.result[0].datas.find((data: { variable: string; }) => data.variable === 'feedinPower');
                if (feedinPowerData) {
                    feedinPower = feedinPowerData.value + " " + await feedinPowerData.unit;
                    feedinPowerValue = feedinPowerData.value;
                }

                const loadPowerData = await responseData.result[0].datas.find((data: { variable: string; }) => data.variable === 'loadsPower');
                if (loadPowerData) {
                    loadPower = loadPowerData.value + " " + await loadPowerData.unit;
                    loadPowerValue = loadPowerData.value;
                }

                showSpinner = false;
                return;
            } else {
                console.error("Error parsing JSON response data");
            }
        } else {
            console.log("response returned with status: " + status);
            window.location.reload();
        }
    }
}

</script>

<div class="grid">
    <div class=""></div>
    <div>
        <div class="flex justify-center items-center ">
            <div class="relative w-16 h-16">
                <div class="absolute inset-0 rounded-full bg-yellow-500"></div>
                <div class="absolute inset-2 rounded-full bg-yellow-400"></div>
                <div class="absolute inset-4 rounded-full bg-yellow-300"></div>
                <div class="absolute inset-6 rounded-full bg-yellow-200"></div>
                <div class="absolute inset-8 rounded-full bg-yellow-100"></div>
                <div class="absolute inset-10 rounded-full bg-white"></div>
            </div>
        </div>
        <div class="flex justify-center items-center col-span-3">
            <div class="text-center text-xs font-semibold">{pvPower}</div>
        </div>
        <div class="flex justify-center items-center">
            {#if pvPowerValue > 0}
                <Line direction="vertical_fromTopGreen" />
            {:else}
                <Line direction="line-vertical" />
            {/if}
        </div>
    </div>
    <div class=""></div>
    <div>
        <div style="display: flex; align-items: center;">
            <img src="pylon.png" alt="pylon">
            <div class="line-container flex-grow">  
                {#if feedinPowerValue > gridConsumptionPowerValue}
                    <Line direction="horizontal_fromRightGreen" />
                {:else if feedinPowerValue < gridConsumptionPowerValue}
                    <Line direction="horizontal_fromLeftRed" />
                {:else}
                    <Line direction="line-horizontal" />
                {/if}
            </div>
        </div>
        <div class="text-center text-xs font-semibold">
            {#if feedinPowerValue > gridConsumptionPowerValue}
                <div class="text-green-700">
                    {gridConsumptionPower}
                </div>
            {:else}
                <div class="text-red-700">
                    {gridConsumptionPower}
                </div>
            {/if}
        </div>
    </div>
    <div >
        <div class="flex justify-center items-center">
            <img src="inverter.png" alt="inverter">
        </div>  
        <div class="flex justify-center items-center">
            {#if chargingState === ChargingState.Charging}
                <Line direction="vertical_fromTopGreen" />
            {:else if chargingState === ChargingState.Discharging}
                <Line direction="vertical_fromBottomRed" />
            {:else}
                <Line direction="line-vertical" />
            {/if}
        </div>
    </div>
    <div>
        <div style="display: flex; align-items: center;">
            <div class="line-container flex-grow">  
                {#if loadPowerValue > 0}
                <Line direction="horizontal_fromLeftRed" />
                {:else}
                <Line direction="line-horizontal" />
                {/if}
            </div>
          <img src="house.png" alt="house" />
        </div>
        <div class="text-center text-xs font-semibold">
          {#if feedinPowerValue > 0}
            <div class="text-red-700">{loadPower}</div>
          {:else}
            {loadPower}
          {/if}
        </div>
      </div>
    <div class=""></div>
    <div>
        <div class="text-center text-xs font-semibold mt-2">
            {#if chargingState === ChargingState.Charging}
                <div class="text-green-700">
                    {batChargePower}
                </div>
            {:else if chargingState === ChargingState.Discharging}
                <div class="text-red-700">
                    {batDisChargePower}
                </div>
            {/if}
        </div>
        <div class="flex justify-center items-center">
            <Battery percentage={percentage} chargingState={chargingState} />
        </div>
    </div>
    <!-- <div class="flex justify-left items-center">
        <div class="text-center text-xs font-semibold">Min SOC: 35%</div>
    </div> -->
</div>   
<div class="flex justify-center items-center">
    <div class="text-center text-sm font-semibold">Last Updated: <span class="text-green-700">{time}</span>
        <center class="pt-4">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click|preventDefault={() =>{showSpinner = true}}>
                {#if showSpinner}
                    {#await retrieveValues()}
                        <p>Loading. Please wait ...</p>
                        <SyncLoader size="60" color="#000000" unit="px" duration="1s" />
                    {:then} 
                        showSpinner = false;
                        <svelte:component class="justify-center" this={RefreshCcw} />
                    {/await}  
                {:else}
                    <svelte:component class="justify-center" this={RefreshCcw} />
                {/if}
            </div>
        </center>
    </div>
</div>

