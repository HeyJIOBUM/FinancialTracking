import {base_api_url} from "@/configuration/api/application-api";

async function authenticateUser(endpoint, username, password) {
    let response = null;
    try {
        response = await fetch(base_api_url + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({username, password}),
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

export async function register({username, password}) {
    return await authenticateUser('/register', username, password);
}

export async function signIn({username, password}) {
    return await authenticateUser('/login', username, password);
}