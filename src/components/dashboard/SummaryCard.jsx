const SummaryCard = ({ label, value }) => (
    <div className="border rounded-lg shadow-sm p-4 text-center bg-white">
        <h3 className="text-gray-500 text-sm">{label}</h3>
        <p className="text-xl font-bold text-gray-800">₹{value || 0}</p>
    </div>
);

export default SummaryCard