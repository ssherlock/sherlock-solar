<script lang="ts">
	import { type User, login, retrieveSolarDetails } from "../../solar-utils";
	import authStore from "../../stores/authStore";
	import Line from "./Line.svelte";

    let email: string = '';
    let password: string = '';
    let accessToken: string = '';
    let displayMessage: string = '';
    let displayType: string = '';

    const userData: User = {
          emailAddress: email,
          password: password,
      };
  
    const handleLogin = async (emailAddress: string, password: string) => {
        //TODO: error handling for empty fields
        const user: any | null = await login(emailAddress, password);
        if (user.status === 200) {
          displayType = "SUCCESS";
          displayMessage = "Login Successful";
          // console.log('response.data: ', response.data);
          accessToken = await user.data.accessToken;
          // console.log('accessToken: ', accessToken);
          authStore.update(state => ({
            isAuthenticated: true,
            accessToken: accessToken,
            user
          }));
        } else {
          displayType = "ERROR";
          displayMessage = "Login Unsuccessful";
        }
        
        // console.log('repsonse: ', JSON.stringify(response));
        // console.log('accessToken: ', accessToken);
    }; 

    const sendResetLink = async (email:string) => {
    // displayMessage = "";
    // if (email) {
    //   try {
    //       const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    //         redirectTo: 'https://dgs.sherlock.uk/resetPassword',
    //         // redirectTo: 'http://localhost:5173/resetPassword',
    //       })
    //       // const { data, error } = await supabase.auth.resetPasswordForEmail(email); //This redirects to default page (Today)
    //   } catch (error) {
    //     if (error instanceof Error) {
    //       displayMessage = error.message;
    //       displayType = "ERROR";
    //     }
    //   } finally {
    //     displayMessage = "Password Reset Requested. Please Check Your Email";
    //     displayType = "SUCCESS"
    //   }
    // } else {
    //   displayMessage = "Email Address Required"
    //   displayType = "ERROR";
    // }
  };     
  </script>
  <div class="min-h-screen flex justify-center items-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="main-title">Sherlock Solar</h1>
      <img class="mx-auto mb-2" src="SherlockSolar_Logo.png" alt="logo" />
        <h1 class="dgs-title">Sign in</h1>
        <!-- <form class="row flex-center flex" on:submit|preventDefault="{handleLogin}"> -->
        <div class="mt-4">
          {#if displayMessage.length <= 0 || displayType == "SUCCESS"}
            <!-- svelte-ignore a11y-autofocus -->
            <input
                id="email"
                type="email"
                class="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Email Address *"
                bind:value={email}
                autocomplete="email"
                required
                autofocus
            />
          {:else}
            <!-- svelte-ignore a11y-autofocus  -->
            <input
                id="email"
                type="email"
                class="w-full px-4 py-2 text-sm border border-red-600 rounded-md focus:border-red-600 focus:outline focus:ring-1"
                placeholder="Email Address *"
                bind:value={email}
                autocomplete="username"
                required
                autofocus
            />
            {/if} 
        </div>
        <div class="mt-4">
            <input
            class="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            placeholder="Password *"
            bind:value={password}
            type="password"
            autocomplete="current-password"
            />
        </div>
        <div class="mt-4">
            <button
            class="block h-12 w-40 mx-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            on:click|preventDefault={() =>{handleLogin(email, password)}}
            >
            Login
            </button>
        </div>
        <div class="mt-4 text-center">
            <p class="text-sm">
                Can't login? <button class="text-blue-600 hover:underline" on:click|preventDefault={() =>{sendResetLink(email)}}> Send reset link</button>
            </p>
        </div>
        <div class="mt-4 text-center">
          {#if displayType === "ERROR"}
            <p class="field-error">
                {displayMessage}
            </p>   
          {:else}
            <p class="field-success">
              {displayMessage}
            </p>              
          {/if}
        </div>
      </div>
    </div>
