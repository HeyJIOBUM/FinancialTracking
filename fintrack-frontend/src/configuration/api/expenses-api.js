import {applicationApi} from "@/configuration/api/application-api";

export const expensesApi = applicationApi.injectEndpoints({
    endpoints: (build) => ({
        getExpenses: build.query({
            query: () => '/me/expenses',
        }),
        addExpense: build.mutation({
            query: ({expense}) => ({
                url: '/me/expenses',
                method: 'POST',
                body: expense,
            }),
        }),
        updateExpense: build.mutation({
            query: ({id, expense}) => ({
                url: `/me/expenses/${id}`,
                method: 'PUT',
                body: expense,
            }),
        }),
        deleteExpense: build.query({
            query: ({id}) => ({
                url: `/me/expenses/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetExpensesQuery,
    useAddExpenseMutation,
    useUpdateExpenseMutation,
    useDeleteExpenseQuery
} = expensesApi