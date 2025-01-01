import {applicationApi} from "@/configuration/api/application-api";

export const budgetsApi = applicationApi.injectEndpoints({
    endpoints: (build) => ({
        getBudgets: build.query({
            query: () => '/me/budgets',
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Budget', id })), 'Budget']
                    : ['Budget'],
        }),
        addBudget: build.mutation({
            query: ({budget}) => ({
                url: '/me/budgets',
                method: 'POST',
                body: budget,
            }),
            invalidatesTags: ['Budget'],
        }),
        updateBudget: build.mutation({
            query: ({id, budget}) => ({
                url: `/me/budgets/${id}`,
                method: 'PUT',
                body: budget,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Budget', id: arg.id }],
        }),
        deleteBudget: build.mutation({
            query: ({id}) => ({
                url: `/me/budgets/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Budget'],
        }),
    }),
})

export const {
    useGetBudgetsQuery,
    useAddBudgetMutation,
    useUpdateBudgetMutation,
    useDeleteBudgetMutation
} = budgetsApi