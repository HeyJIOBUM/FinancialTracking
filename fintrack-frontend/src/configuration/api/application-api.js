import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const base_api_url = "http://localhost:8080";

export const applicationApi = createApi({
    reducerPath: 'apiReducer',
    baseQuery: fetchBaseQuery({
        baseUrl: base_api_url,
        prepareHeaders: headers => {
            headers.set('Content-Type', 'application/json;charset=UTF-8');
            return headers;
        },
        credentials: "include"
    }),
    tagTypes: ["Budget", "Category", "Expense", "Income"],
    endpoints: _ => ({}),
});