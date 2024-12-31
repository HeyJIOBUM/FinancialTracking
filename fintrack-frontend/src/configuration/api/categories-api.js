import {applicationApi} from "@/configuration/api/application-api";

export const categoriesApi = applicationApi.injectEndpoints({
    endpoints: (build) => ({
        getDefaultCategories: build.query({
            query: () => '/default/categories',
        }),
        getCategories: build.query({
            query: () => '/me/categories',
        }),
        addCategory: build.mutation({
            query: ({category}) => ({
                url: '/me/categories',
                method: 'POST',
                body: [category],
            }),
        }),
        addCategories: build.mutation({
            query: ({categories}) => ({
                url: '/me/categories',
                method: 'POST',
                body: categories,
            }),
        }),
        updateCategory: build.mutation({
            query: ({id, category}) => ({
                url: `/me/categories/${id}`,
                method: 'PUT',
                body: category,
            }),
        }),
        deleteCategory: build.query({
            query: ({id}) => ({
                url: `/me/categories/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetDefaultCategoriesQuery,
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useAddCategoriesMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryQuery
} = categoriesApi