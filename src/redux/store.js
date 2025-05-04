import { configureStore } from '@reduxjs/toolkit'
import { userApi } from './api/user.api'
import { transactionApi } from './api/transaction.api'
import { savingsGoalApi } from './api/savingsGoal.api'
import { budgetApi } from './api/budget.api'
import { dashboardApi } from './api/dashboard.api'

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [transactionApi.reducerPath]: transactionApi.reducer,
        [savingsGoalApi.reducerPath]: savingsGoalApi.reducer,
        [budgetApi.reducerPath]: budgetApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
    },
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware().concat(
            userApi.middleware,
            transactionApi.middleware,
            savingsGoalApi.middleware,
            budgetApi.middleware,
            dashboardApi.middleware
        )
    )
})