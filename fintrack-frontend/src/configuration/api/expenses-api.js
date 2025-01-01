import {applicationApi} from "@/configuration/api/application-api";

export const expensesApi = applicationApi.injectEndpoints({
    endpoints: (build) => ({
        getExpenses: build.query({
            query: () => '/me/expenses',
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Expense', id })), 'Expense']
                    : ['Expense'],
        }),
        addExpense: build.mutation({
            query: ({expense}) => ({
                url: '/me/expenses',
                method: 'POST',
                body: expense,
            }),
            invalidatesTags: ['Expense', 'Budget'],
        }),
        updateExpense: build.mutation({
            query: ({id, expense}) => ({
                url: `/me/expenses/${id}`,
                method: 'PUT',
                body: expense,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Expense', id: arg.id }, 'Budget'],
        }),
        deleteExpense: build.mutation({
            query: ({id}) => ({
                url: `/me/expenses/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Expense', 'Budget'],
        }),
    }),
})

export const {
    useGetExpensesQuery,
    useAddExpenseMutation,
    useUpdateExpenseMutation,
    useDeleteExpenseMutation
} = expensesApi