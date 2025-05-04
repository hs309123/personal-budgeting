import React from 'react';
import {
    useGetDashboardSummaryQuery,
    useGetRecentTransactionsQuery,
    useGetBudgetUsageQuery,
    useGetSavingsProgressQuery,
} from "../../../redux/api/dashboard.api";
import SummaryCard from "../../../components/dashboard/SummaryCard"
import TransactionList from "../../../components/dashboard/TransactionList"

const Dashboard = () => {
    const { data: summary, isLoading: loadingSummary } = useGetDashboardSummaryQuery();
    const { data: transactions, isLoading: loadingTransactions } = useGetRecentTransactionsQuery();
    const { data: budgetUsage, isLoading: loadingBudget } = useGetBudgetUsageQuery();
    const { data: savingsProgress, isLoading: loadingSavings } = useGetSavingsProgressQuery();

    console.l
    const isLoading = loadingSummary || loadingTransactions || loadingBudget || loadingSavings;

    if (isLoading) return <div className="text-center mt-10">Loading Dashboard...</div>;

    return (
        <div className="p-6 space-y-6 w-full">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <SummaryCard label="Total Budget" value={summary?.data.totalBudget} />
                <SummaryCard label="Total Savings Goal" value={summary?.data.totalSavingsGoal} />
                <SummaryCard label="Total Income" value={summary?.data.totalIncome} />
                <SummaryCard label="Total Expenses" value={summary?.data.totalExpenses} />
                <SummaryCard label="Balance" value={summary?.data.balance} />
            </div>

            {/* Recent Transactions */}
            <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-lg font-semibold">Recent Expenses</p>
                        {transactions?.data.recentExpenses.length > 0 ?
                            transactions?.data.recentExpenses?.map(expen => <TransactionList title="Recent Expenses" transaction={expen} />) :
                            <p>There are no Recent Expenses</p>
                        }

                    </div>
                    <div>
                        <p className="text-lg font-semibold">Recent Incomes</p>
                        {transactions?.data.recentExpenses.length > 0 ?
                            transactions?.data.recentIncomes?.map(expen => <TransactionList title="Recent Income" transaction={expen} />) :
                            <p>There are no Recent Income</p>
                        }

                    </div>
                </div>
            </section>

            {/* Budget Usage */}
            <section className="w-full">
                <h2 className="text-xl font-semibold mb-2">Budget Usage</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {budgetUsage?.data.map((budget, idx) => (
                        <div key={idx} className="border p-4 rounded-md shadow">
                            <h3 className="font-medium text-lg">{budget.category}</h3>
                            <p>Allocated: ₹{budget.allocated}</p>
                            <p>Spent: ₹{budget.spent}</p>
                            <p>Remaining: ₹{budget.remaining}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Savings Progress */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Savings Goals</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savingsProgress?.data.map((goal, idx) => (
                        <div key={idx} className="border p-4 rounded-md shadow">
                            <h3 className="font-medium text-lg">{goal.title}</h3>
                            <p>Target: ₹{goal.target}</p>
                            <p>Saved: ₹{goal.saved}</p>
                            <p>Remaining: ₹{goal.remaining}</p>
                            <p className="text-sm text-gray-600">Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};


export default Dashboard;
