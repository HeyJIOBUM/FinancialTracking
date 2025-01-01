import {applicationApi} from "@/configuration/api/application-api";

export const budgetsApi = applicationApi.injectEndpoints({
    endpoints: (build) => ({
        getBudgets: build.query({
            query: () => '/me/budgets',
        }),
        addBudget: build.mutation({
            query: ({budget}) => ({
                url: '/me/budgets',
                method: 'POST',
                body: budget,
            }),
        }),
        updateBudget: build.mutation({
            query: ({id, budget}) => ({
                url: `/me/budgets/${id}`,
                method: 'PUT',
                body: budget,
            }),
        }),
        deleteBudget: build.mutation({
            query: ({id}) => ({
                url: `/me/budgets/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetBudgetsQuery,
    useAddBudgetMutation,
    useUpdateBudgetMutation,
    useDeleteBudgetMutation
} = budgetsApi