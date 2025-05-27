import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const budgetApi = createApi({
    reducerPath: 'budgetApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/budget`,
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = window.localStorage.getItem('_PBA_ID');
            if (token) {
                headers.set('authorization', `${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Budget'],
    endpoints: (builder) => ({
        getBudgets: builder.query({
            query: () => '/',
            providesTags: ['Budget'],
        }),
        getBudgetById: builder.query({
            query: (id) => `/${id}`,
            providesTags: ['Budget'],
        }),
        createBudget: builder.mutation({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Budget'],
        }),
        updateBudget: builder.mutation({
            query: ({ id, body }) => ({
                url: `/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Budget'],
        }),
        deleteBudget: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Budget'],
        }),
    }),
});

export const {
    useGetBudgetsQuery,
    useGetBudgetByIdQuery,
    useCreateBudgetMutation,
    useUpdateBudgetMutation,
    useDeleteBudgetMutation,
} = budgetApi;
