const TransactionList = ({ transaction }) => (
    <div className="p-4">
        {transaction ? (
            <>
                <div className="grid grid-cols-2">
                    <p className="text-sm">
                        <strong>Title:</strong> {transaction.title}
                    </p>
                    <p className="text-sm">
                        <strong>Amount:</strong> ₹{transaction.amount}
                    </p>
                    <p className="text-sm">
                        <strong>Type:</strong> {transaction.type}
                    </p>
                    <p className="text-sm">
                        <strong>Category:</strong> {transaction.category}
                    </p>
                    <p className="text-sm">
                        <strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}
                    </p>
                </div>
                <hr className="h-0 border-b-[1px] border-gray-300 w-full mt-1" />
            </>
        ) : (
            <p className="text-sm text-gray-500">No transaction found.</p>
        )}
    </div>
);

export default TransactionList;