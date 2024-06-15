
export const isEmailAddress = (cell: string) => {
    return validateEmail(String(cell));
}

export const validateEmail = (email: string) => {
    const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // console.log('Email Validation: ' + emailRegex.test(email))
    return emailRegex.test(email);
  };

//Build up modalMessage ready for displaying if validation fails on any field
export async function validateField(fieldIn: string | number | boolean, modalMessage: string, messageText: string): Promise<[boolean, string]> {
    let validated = false;
    if ((typeof fieldIn === 'string' && fieldIn.length <= 0) || (typeof fieldIn === 'number' && fieldIn === 0) || (typeof fieldIn === 'boolean' && fieldIn === false)) {
        validated = false;
        // console.log("fieldIn: " + fieldIn + " validated: " + validated + " modalMessage: " + modalMessage + " messageText: " + messageText);
        if (!validated && modalMessage.length > 0) {
            modalMessage += "<br/>" + messageText;
        } else {
            modalMessage = messageText;
        }
    }

    return [ validated, modalMessage ];
}




