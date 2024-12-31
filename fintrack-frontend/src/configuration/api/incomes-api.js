import {applicationApi} from "@/configuration/api/application-api";

export const incomesApi = applicationApi.injectEndpoints({
    endpoints: (build) => ({
        getIncomes: build.query({
            query: () => '/me/incomes',
        }),
        addIncome: build.mutation({
            query: (income) => ({
                url: '/me/incomes',
                method: 'POST',
                body: income,
            }),
        }),
        updateIncome: build.mutation({
            query: ({id, income}) => ({
                url: `/me/incomes/${id}`,
                method: 'PUT',
                body: income,
            }),
        }),
        deleteIncome: build.query({
            query: (id) => ({
                url: `/me/incomes/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

