export default function Loader() {
    return (
        <div
            className="flex items-center justify-center min-h-screen w-full bg-base"
            data-testid="loader"
        >
            <span className="loading loading-dots loading-lg text-primary"></span>
        </div>
    )
}
