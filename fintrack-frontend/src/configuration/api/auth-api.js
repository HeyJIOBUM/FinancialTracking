import {base_api_url} from "@/configuration/api/application-api";

async function sendUserDataToServer(endpoint, objToSend) {
    let response = null;
    try {
        response = await fetch(base_api_url + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(objToSend),
        });
    }
    catch (err) {
        return {statusCode: 500, message: `Server error: ${err.message}`};
    }

    try {
        const data = await response.json();
        return {statusCode: data.statusCode, message: data.message};
    }
    catch (err) {
        // server doesn't return data so response.json() may throw an exception
        return {statusCode: 200, message: `Response body is empty`};
    }
}

export async function register(authObj) {
    return await sendUserDataToServer('/register', authObj);
}

export async function signIn(authObj) {
    return await sendUserDataToServer('/login', authObj);
}

export async function changePassword(passwordChangeObj) {
    return await sendUserDataToServer('/me/change_password', passwordChangeObj);
}