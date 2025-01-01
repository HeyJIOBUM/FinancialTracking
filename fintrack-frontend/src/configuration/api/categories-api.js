import {applicationApi} from "@/configuration/api/application-api";

export const categoriesApi = applicationApi.injectEndpoints({
    endpoints: (build) => ({
        getDefaultCategories: build.query({
            query: () => '/default/categories',
        }),
        getCategories: build.query({
            query: () => '/me/categories',
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Category', id })), 'Category']
                    : ['Category'],
        }),
        addCategory: build.mutation({
            query: ({category}) => ({
                url: '/me/categories',
                method: 'POST',
                body: [category],
            }),
            invalidatesTags: ['Category'],
        }),
        addCategories: build.mutation({
            query: ({categories}) => ({
                url: '/me/categories',
                method: 'POST',
                body: categories,
            }),
            invalidatesTags: ['Category'],
        }),
        updateCategory: build.mutation({
            query: ({id, category}) => ({
                url: `/me/categories/${id}`,
                method: 'PUT',
                body: category,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Category', id: arg.id }],
        }),
        deleteCategory: build.mutation({
            query: ({id}) => ({
                url: `/me/categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),
    }),
})

export const {
    useGetDefaultCategoriesQuery,
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useAddCategoriesMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoriesApi