export default function TypeBadge({ type }: { type: string }) {
    return type === 'BLOG' ? (
        <span className="w-20 badge-md rounded-md bg-accent text-accent-content font-sans-bold text-center self-end">
            Blog
        </span>
    ) : type === 'YOUTUBE' ? (
        <span className="w-20 badge-md rounded-md bg-error text-error-content font-sans-bold text-center self-end">
            Youtube
        </span>
    ) : (
        <span className="w-20 badge-md rounded-md bg-info text-info-content font-sans-bold text-center self-end">
            Utility
        </span>
    )
}
