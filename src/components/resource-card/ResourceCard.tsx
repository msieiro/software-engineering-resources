import { type Resource } from '../../types/Resource'
import Badge from '../badge/Badge'
import TypeBadge from '../badge/TypeBadge'

export default function ResourceCard({
    title,
    languages,
    tags,
    type,
    url,
    description
}: Resource) {
    return (
        <article className="card shadow-xl rounded-md">
            <div className="card-body bg-base-100 text-base-content rounded-md">
                <TypeBadge type={type} />
                <h2 className="card-title text-4xl font-sans-bold">{title}</h2>
                <p className="text-secondary-300">
                    {description && description.length > 100
                        ? description.slice(0, 100) + ' ...'
                        : description}
                </p>
                <div className="divider m-0 text-base-content"></div>
                <div className="flex flex-wrap">
                    {tags.length > 0 &&
                        tags.map((el) => <Badge key={el} content={el} />)}
                    {languages.length > 0 &&
                        languages.map((el) => <Badge key={el} content={el} />)}
                </div>
                <div className="divider m-0 text-secondary"></div>
                <div className="inline-flex justify-end items-center">
                    <a
                        className="link text-secondary hover:text-base-content transition-colors"
                        href={url}
                        target="_blank"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-external-link"
                        >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    )
}
