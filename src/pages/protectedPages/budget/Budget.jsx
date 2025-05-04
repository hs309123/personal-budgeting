import React, { useState } from 'react';
import {
    useGetBudgetsQuery,
    useCreateBudgetMutation,
    useDeleteBudgetMutation,
} from '../../../redux/api/budget.api';
import {
    Loader,
    Trash2,
    PlusCircle,
    X,
} from 'lucide-react';

const Budget = () => {
    const { data, isLoading, isError } = useGetBudgetsQuery();
    const [createBudget] = useCreateBudgetMutation();
    const [deleteBudget] = useDeleteBudgetMutation();

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        category: '',
        amount: '',
        startDate: '',
        endDate: ''
    });

    const budgets = data?.data;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.category || !formData.amount || !formData.startDate || !formData.endDate) return;

        await createBudget({
            ...formData,
            amount: parseFloat(formData.amount),
            startDate: new Date(formData.startDate),
            endDate: new Date(formData.endDate),
        });

        setFormData({ category: '', amount: '', startDate: '', endDate: '' });
        setShowForm(false);
    };

    const handleDelete = async (id) => {
        await deleteBudget(id);
    };

    if (isLoading) {
        return <div className="p-4 flex items-center gap-2 text-blue-600"><Loader className="animate-spin" />Loading budgets...</div>;
    }

    if (isError) {
        return <div className="p-4 text-red-600">Failed to load budgets.</div>;
    }

    return (
        <div className="p-4 w-full mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Budgets</h1>
                <button
                    className="flex items-center gap-1 text-green-600 hover:underline"
                    onClick={() => setShowForm(true)}
                >
                    <PlusCircle size={18} /> Add Budget
                </button>
            </div>

            {budgets?.length === 0 ? (
                <p className="text-gray-500">No budgets found.</p>
            ) : (
                <ul className="space-y-4">
                    {budgets.map((budget) => (
                        <li
                            key={budget._id}
                            className="flex justify-between items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition"
                        >
                            <div>
                                <p className="font-medium">{budget.category}</p>
                                <p className="text-sm text-gray-500">Start Date: {new Date(budget.startDate).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-500">End Date: {new Date(budget.endDate).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-blue-600 font-semibold text-lg">
                                    ₹{budget.amount}
                                </div>
                                <button onClick={() => handleDelete(budget._id)}>
                                    <Trash2 className="text-red-600 hover:text-red-800" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Popup Form */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-black"
                            onClick={() => setShowForm(false)}
                        >
                            <X />
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Add Budget</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Category"
                                className="w-full border rounded px-3 py-2"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                className="w-full border rounded px-3 py-2"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            />
                            <input
                                type="date"
                                placeholder="Start Date"
                                className="w-full border rounded px-3 py-2"
                                value={formData.startDate}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            />
                            <input
                                type="date"
                                placeholder="End Date"
                                className="w-full border rounded px-3 py-2"
                                value={formData.endDate}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            />
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                            >
                                Add Budget
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Budget;
