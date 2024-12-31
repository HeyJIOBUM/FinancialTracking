'use server'

import {cookies} from "next/headers";

export async function deleteTokenCookie() {
    const cookieStore = await cookies();
    cookieStore.delete("Host-auth-token");
}