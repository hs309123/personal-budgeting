import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const savingsGoalApi = createApi({
    reducerPath: 'savingsGoalApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/savings-goal`,
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('_PBA_ID');
            if (token) {
                headers.set('authorization', `${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['SavingsGoal'],
    endpoints: (builder) => ({
        getSavingsGoals: builder.query({
            query: () => '/',
            providesTags: ['SavingsGoal'],
        }),
        getSavingsGoalById: builder.query({
            query: (id) => `/${id}`,
            providesTags: ['SavingsGoal'],
        }),
        createSavingsGoal: builder.mutation({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['SavingsGoal'],
        }),
        updateSavingsGoal: builder.mutation({
            query: ({ id, body }) => ({
                url: `/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['SavingsGoal'],
        }),
        deleteSavingsGoal: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['SavingsGoal'],
        }),
    }),
});

export const {
    useGetSavingsGoalsQuery,
    useGetSavingsGoalByIdQuery,
    useCreateSavingsGoalMutation,
    useUpdateSavingsGoalMutation,
    useDeleteSavingsGoalMutation,
} = savingsGoalApi;
