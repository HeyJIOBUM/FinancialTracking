import {base_api_url} from "@/configuration/api/application-api";

async function authenticateUser(endpoint, username, password) {
    try {
        const response = await fetch(base_api_url + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        });

        return {ok: response.ok, errorMsg: response.ok ? undefined : response.statusText};
    }
    catch (err) {
        return {ok: false, errorMsg: `Error: ${err.message}`};
    }
}

export async function register({username, password}) {
    return await authenticateUser('/register', username, password);
}

export async function signIn({username, password}) {
    return await authenticateUser('/login', username, password);
}