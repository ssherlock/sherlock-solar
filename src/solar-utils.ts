export async function login(emailAddress: string, password: string): Promise<{ status: number, data?: any } | undefined> {
    try {
        const userData: User = {
            emailAddress: emailAddress,
            password: password,
        };

        const response = await fetch('https://solar.sherlock.co.uk/login', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const status = response.status;
        if (status !== 200) {
            console.log('Error: Login failed: ' + await response.status);
            return { status };
        }

        const jsonData = await response.json();
        // console.log('response: ', response.status + ' ' + JSON.stringify(jsonData, null, 2));
        return { status, data: jsonData };

    } catch (Error: any) {
        console.log(('Err: ' + Error.message));
        return undefined;
    }
}
  
  // Optional interface for user data (if needed elsewhere)
  export interface User {
    emailAddress: string;
    password: string;
  }

  export async function pingService(accessToken: string): Promise<[number | undefined, Response | undefined]> {
    try {
        accessToken = 'Bearer ' + await accessToken;
        // console.log('accessToken:' + accessToken);
        const response = await fetch('https://solar.sherlock.co.uk/ping', {
            method: 'GET',
            headers: {
                'Authorization': accessToken
            }
        });

        if (response.status !== 200) {
            console.log('Error: ' + await response.status);
            return [response.status, undefined];
        }

        const jsonData = await response.json();

        console.log('ping response: ', response.status + ' ' + JSON.stringify(jsonData));
        return [response.status, jsonData];

    } catch (error: any) {
        console.log('Err: ' + error.message);
        return [undefined, undefined];
    }
}  

export async function retrieveSolarDetails(accessToken: string): Promise<[number | undefined, Response | undefined]> {
    try {
        accessToken = 'Bearer ' + await accessToken;
        // console.log('accessToken:' + accessToken);
        const response = await fetch('https://solar.sherlock.co.uk/retrieveSolarDetails', {
            method: 'GET',
            headers: {
                'Authorization': accessToken
            }
        });

        if (response.status !== 200) {
            console.log('Error: ' + await response.status);
            return [response.status, undefined];
        } 

        const jsonData = await response.json();
        return [response.status, jsonData];

    } catch (error: any) {
        console.log('Err: ' + error.message);
        return [undefined, undefined];
    }
}

export async function setMinSOCDetails(accessToken: string, minSocValue: number): Promise<[number | undefined, Response | undefined]> {
    try {
        accessToken = 'Bearer ' + await accessToken;
        // console.log('accessToken:' + accessToken);
        const response = await fetch('https://solar.sherlock.co.uk/setMinSOC', {
            method: 'POST',
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "min_soc": minSocValue })
        });

        if (response.status !== 200) {
            console.log('Error: ' + await response.status);
            return [response.status, undefined];
        }

        const jsonData = await response.json();

        // console.log('response: ', response.status + ' ' + JSON.stringify(jsonData, null, 2));
        return [response.status, jsonData];

    } catch (error: any) {
        console.log('Err: ' + error.message);
        return [undefined, undefined];
    }
}

export async function retrieveMinSOCDetails(accessToken: string): Promise<[number | undefined, Response | undefined]> {
    try {
        accessToken = 'Bearer ' + await accessToken;
        // console.log('accessToken:' + accessToken);
        const response = await fetch('https://solar.sherlock.co.uk/getMinSOC', {
            method: 'GET',
            headers: {
                'Authorization': accessToken
            }
        });

        if (response.status !== 200) {
            console.log('Error: ' + await response.status);
            return [response.status, undefined];
        }

        const jsonData = await response.json();

        // console.log('retrieveMinSOCDetails response: ', response.status + ' ' + JSON.stringify(jsonData, null, 2));
        return [response.status, jsonData];

    } catch (error: any) {
        console.log('Err: ' + error.message);
        return [undefined, undefined];
    }
}

export async function setBatteryChargeDetails(accessToken: string, forceChargeEnabled: boolean, st_hours: number, st_minutes: number, et_hours: number, et_minutes: number): Promise<[number | undefined, Response | undefined]> {
    try {
        accessToken = 'Bearer ' + await accessToken;
        const response = await fetch('https://solar.sherlock.co.uk/setBatteryChargeTimes', {
            method: 'POST',
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"enable1": forceChargeEnabled,"startTime1": {"hour": st_hours,"minute": st_minutes},"endTime1": {"hour": et_hours,"minute": et_minutes}})
        });

        if (response.status !== 200) {
            console.log('Error: ' + await response.status);
            return [response.status, undefined];
        }

        const jsonData = await response.json();

        return [response.status, jsonData];

    } catch (error: any) {
        console.log('Err: ' + error.message);
        return [undefined, undefined];
    }
}

export async function retrieveBatteryChargeDetails(accessToken: string): Promise<[number | undefined, Response | undefined]> {
    try {
        accessToken = 'Bearer ' + await accessToken;
        // console.log('accessToken:' + accessToken);
        const response = await fetch('https://solar.sherlock.co.uk/retrieveBatteryChargeTimes', {
            method: 'GET',
            headers: {
                'Authorization': accessToken
            }
        });

        if (response.status !== 200) {
            console.log('Error: ' + await response.status);
            return [response.status, undefined];
        }

        const jsonData = await response.json();

        // console.log('retrieveMinSOCDetails response: ', response.status + ' ' + JSON.stringify(jsonData, null, 2));
        return [response.status, jsonData];

    } catch (error: any) {
        console.log('Err: ' + error.message);
        return [undefined, undefined];
    }
}

export function formatDateTime(dateTimeString: string): string {
    // Split the input string into date, time, and offset parts
    const [date, time, offset] = dateTimeString.split(' ');
  
    // Convert the offset to a number of minutes
    // const offsetMinutes = offset.slice(0, 3) === 'BST' ? 0 : 60; // Assume BST is +1 hour
  
    // Create a Date object with the date and time components
    const dateTime = new Date(`${date}T${time}`);
  
    // Adjust the date and time by the offset
    // dateTime.setHours(dateTime.getHours());
  
    // Extract individual date and time components
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();
    const day = dateTime.getDate();
    const month = dateTime.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = dateTime.getFullYear();
  
    // Format the components into the desired string
    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    const formattedDate = `${padZero(day)}-${month}-${year}`;
  
    return `${formattedDate} ${formattedTime}`;
  }
  
  // Helper function to pad a single-digit number with a leading zero
  function padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }

  export enum ChargingState {
    Nothing = 0,
    Charging = 1,
    Discharging = 2
}
