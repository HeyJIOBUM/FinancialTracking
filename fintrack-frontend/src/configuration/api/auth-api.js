import {applicationApi} from "@/configuration/api/application-api";

export const authApi = applicationApi.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body,
            }),
        }),
        login: build.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body,
            }),
        }),
    })
})


