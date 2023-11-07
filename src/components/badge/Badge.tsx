export default function Badge({ content }: { content: string }) {
    return (
        <span
            className={`badge bg-accent text-accent-content rounded m-1 font-sans-bold`}
        >
            {content}
        </span>
    )
}
