import React, { useState } from 'react';
import {
    useGetSavingsGoalsQuery,
    useCreateSavingsGoalMutation,
    useDeleteSavingsGoalMutation,
} from '../../../redux/api/savingsGoal.api';
import {
    Loader,
    Trash2,
    PlusCircle,
    X,
} from 'lucide-react';

const Savings = () => {
    const { data, isLoading, isError } = useGetSavingsGoalsQuery();
    const [createSavingsGoal] = useCreateSavingsGoalMutation();
    const [deleteSavingsGoal] = useDeleteSavingsGoalMutation();

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        targetAmount: '',
        deadline: ''
    });

    const savingsGoals = data?.data;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.targetAmount || !formData.deadline) return;

        await createSavingsGoal({
            ...formData,
            targetAmount: parseFloat(formData.targetAmount),
            deadline: new Date(formData.deadline),
        });

        setFormData({ title: '', targetAmount: '', deadline: '' });
        setShowForm(false);
    };

    const handleDelete = async (id) => {
        await deleteSavingsGoal(id);
    };

    if (isLoading) {
        return <div className="p-4 flex items-center gap-2 text-blue-600"><Loader className="animate-spin" />Loading savings goals...</div>;
    }

    if (isError) {
        return <div className="p-4 text-red-600">Failed to load savings goals.</div>;
    }

    return (
        <div className="p-4 w-full mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Savings Goals</h1>
                <button
                    className="flex items-center gap-1 text-green-600 hover:underline"
                    onClick={() => setShowForm(true)}
                >
                    <PlusCircle size={18} /> Add Savings Goal
                </button>
            </div>

            {savingsGoals?.length === 0 ? (
                <p className="text-gray-500">No savings goals found.</p>
            ) : (
                <ul className="space-y-4">
                    {savingsGoals.map((goal) => (
                        <li
                            key={goal._id}
                            className="flex justify-between items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition"
                        >
                            <div>
                                <p className="font-medium">{goal.title}</p>
                                <p className="text-sm text-gray-500">Target Amount: ₹{goal.targetAmount}</p>
                                <p className="text-sm text-gray-500">Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button onClick={() => handleDelete(goal._id)}>
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
                        <h2 className="text-xl font-semibold mb-4">Add Savings Goal</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    placeholder="Title"
                                    className="w-full border rounded px-3 py-2"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700">Target Amount</label>
                                <input
                                    id="targetAmount"
                                    type="number"
                                    placeholder="Target Amount"
                                    className="w-full border rounded px-3 py-2"
                                    value={formData.targetAmount}
                                    onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
                                <input
                                    id="deadline"
                                    type="date"
                                    placeholder="Deadline"
                                    className="w-full border rounded px-3 py-2"
                                    value={formData.deadline}
                                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                            >
                                Add Savings Goal
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Savings;
