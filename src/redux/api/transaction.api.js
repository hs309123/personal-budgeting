import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const transactionApi = createApi({
    reducerPath: 'transactionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/transactions`,
        credentials: "include",
        headers: {
            authorization: localStorage.getItem("_PBA_ID") || ""
        }
    }),
    endpoints: (builder) => ({
        getTransactions: builder.query({
            query: (type) => ({
                url: `/?type=${type}`,
                method: 'GET',
            }),
            providesTags: ["Transaction"]
        }),
        getTransactionById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET',
            }),
            providesTags: ["Transaction"]
        }),
        createTransaction: builder.mutation({
            query: (body) => ({
                url: `/`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ["Transaction"]
        }),
        updateTransaction: builder.mutation({
            query: ({ id, body }) => ({
                url: `/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ["Transaction"]
        }),
        deleteTransaction: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Transaction"]
        }),
    }),
});

export const {
    useGetTransactionsQuery,
    useGetTransactionByIdQuery,
    useCreateTransactionMutation,
    useUpdateTransactionMutation,
    useDeleteTransactionMutation
} = transactionApi;