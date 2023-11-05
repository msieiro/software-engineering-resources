export default function Badge({ content }: { content: string }) {
    return (
        <span
            className={`badge bg-accent-content text-accent rounded m-1 font-semibold`}
        >
            {content}
        </span>
    )
}
