export default function Badge({
    content,
    style
}: {
    content: string
    style: string
}) {
    return (
        <span
            className={`badge-sm badge-primary bg-${style} rounded m-1 font-semibold`}
        >
            {content}
        </span>
    )
}
