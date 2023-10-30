export default function ErrorAlert() {
    return (
        <div className="fixed bottom-4 right-4 flex items-center bg-red-500 text-white text-sm p-2 rounded shadow-lg">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <span>Error! Could not retrieve results from NotionAPI.</span>
        </div>
    )
}
