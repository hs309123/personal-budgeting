import React, { useState } from 'react';
import {
    useGetTransactionsQuery,
    useCreateTransactionMutation,
    useDeleteTransactionMutation,
} from '../../../redux/api/transaction.api';
import {
    DollarSign,
    Calendar,
    Loader,
    Trash2,
    PlusCircle,
    X,
} from 'lucide-react';

const Income = () => {
    const { data, isLoading, isError } = useGetTransactionsQuery("income");
    const [createTransaction] = useCreateTransactionMutation();
    const [deleteTransaction] = useDeleteTransactionMutation();

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ title: '', amount: '', date: '', category: "" });

    const incomeTransactions = data?.data

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.amount || !formData.date || !formData.category) return;

        await createTransaction({
            ...formData,
            type: 'income',
            amount: parseFloat(formData.amount),
        });
        setFormData({ title: '', amount: '', date: '', category: "" });
        setShowForm(false);
    };

    const handleDelete = async (id) => {
        await deleteTransaction(id);
    };

    if (isLoading) {
        return <div className="p-4 flex items-center gap-2 text-blue-600"><Loader className="animate-spin" />Loading income...</div>;
    }

    if (isError) {
        return <div className="p-4 text-red-600">Failed to load income.</div>;
    }

    return (
        <div className="p-4 w-full mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Income</h1>
                <button
                    className="flex items-center gap-1 text-green-600 hover:underline"
                    onClick={() => setShowForm(true)}
                >
                    <PlusCircle size={18} /> Add Income
                </button>
            </div>

            {incomeTransactions.length === 0 ? (
                <p className="text-gray-500">No income records found.</p>
            ) : (
                <ul className="space-y-4">
                    {incomeTransactions.map((transaction) => (
                        <li
                            key={transaction._id}
                            className="flex justify-between items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex items-center gap-3">
                                <DollarSign className="text-green-600" />
                                <div>
                                    <p className="font-medium">{transaction.title}</p>
                                    <div className="text-sm text-gray-500 flex items-center gap-1">
                                        <Calendar size={14} />
                                        <span>{new Date(transaction.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-green-600 font-semibold text-lg">
                                    ₹{transaction.amount}
                                </div>
                                <button onClick={() => handleDelete(transaction._id)}>
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
                        <h2 className="text-xl font-semibold mb-4">Add Income</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Title"
                                className="w-full border rounded px-3 py-2"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                className="w-full border rounded px-3 py-2"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            />
                            <div>
                                <input
                                    placeholder="Category eg: rent, salary, etc."
                                    className="w-full border rounded px-3 py-2"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                />
                            </div>
                            <input
                                type="date"
                                className="w-full border rounded px-3 py-2"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                            >
                                Add Income
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Income;
