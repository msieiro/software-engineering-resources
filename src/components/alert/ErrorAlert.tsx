export default function ErrorAlert({ message }: { message: string }) {
    return (
        <div className="fixed bottom-4 right-4 flex items-center justify-between bg-error-content text-error text-sm p-2 rounded shadow-lg text-xl">
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-alert-circle mr-2"
            >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span data-testid="error-alert">{message}</span>
        </div>
    )
}
