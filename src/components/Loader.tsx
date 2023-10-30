export default function Loader() {
    return (
        <div
            className="flex items-center justify-center min-h-screen"
            data-testid="loader"
        >
            <span className="loading loading-dots loading-lg"></span>
        </div>
    )
}
