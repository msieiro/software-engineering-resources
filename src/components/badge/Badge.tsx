export default function Badge({
    content,
    style
}: {
    content: string
    style: string
}) {
    return (
        <span
            className={`badge bg-accent-content text-accent rounded m-1 font-semibold`}
        >
            {content}
        </span>
    )
}
