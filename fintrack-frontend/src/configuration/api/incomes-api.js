import {applicationApi} from "@/configuration/api/application-api";

export const incomesApi = applicationApi.injectEndpoints({
    endpoints: (build) => ({
        getIncomes: build.query({
            query: () => '/me/incomes',
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Income', id })), 'Income']
                    : ['Income'],
        }),
        addIncome: build.mutation({
            query: ({income}) => ({
                url: '/me/incomes',
                method: 'POST',
                body: income,
            }),
            invalidatesTags: ['Income'],
        }),
        updateIncome: build.mutation({
            query: ({id, income}) => ({
                url: `/me/incomes/${id}`,
                method: 'PUT',
                body: income,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Income', id: arg.id }],
        }),
        deleteIncome: build.mutation({
            query: ({id}) => ({
                url: `/me/incomes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Income'],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetIncomesQuery,
    useAddIncomeMutation,
    useUpdateIncomeMutation,
    useDeleteIncomeMutation
} = incomesApi