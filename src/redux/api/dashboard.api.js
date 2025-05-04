import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/dashboard`,
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('_PBA_ID');
            if (token) {
                headers.set('authorization', `${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getDashboardSummary: builder.query({
            query: () => '/summary',
        }),
        getRecentTransactions: builder.query({
            query: () => '/recent-transactions',
        }),
        getBudgetUsage: builder.query({
            query: () => '/budget-usage',
        }),
        getSavingsProgress: builder.query({
            query: () => '/savings-progress',
        }),
    }),
});

export const {
    useGetDashboardSummaryQuery,
    useGetRecentTransactionsQuery,
    useGetBudgetUsageQuery,
    useGetSavingsProgressQuery,
} = dashboardApi;