import { type Resource } from '../types/Resource'
import Badge from './Badge'

export default function ResourceCard({
    title,
    languages,
    tags,
    type,
    url,
    description
}: Resource) {
    return (
        <div className="card w-50 bg-gray-800 shadow-xl relative">
            {type === 'YOUTUBE' && (
                <span className="absolute badge-md badge-primary rounded m-1 -top-1 -right-4 rotate-12 bg-error text-white font-semibold">
                    Youtube
                </span>
            )}
            {type === 'BLOG' && (
                <span className="absolute badge-md badge-primary rounded m-1 -top-1 -right-4 rotate-12 bg-accent text-black font-semibold">
                    Blog
                </span>
            )}
            {type === 'TOOL' && (
                <span className="absolute badge-md badge-primary rounded m-1 -top-1 -right-4 rotate-12 bg-info text-black font-semibold">
                    Utility
                </span>
            )}
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                {tags.length > 0 && (
                    <>
                        <div className="divider m-0"></div>
                        <div className="flex flex-wrap">
                            {tags.map((el) => (
                                <Badge key={el} content={el} style="primary" />
                            ))}
                        </div>
                    </>
                )}
                {languages.length > 0 && (
                    <>
                        <div className="divider m-0"></div>
                        <div className="flex flex-wrap">
                            {languages.map((el) => (
                                <Badge
                                    key={el}
                                    content={el}
                                    style="secondary"
                                />
                            ))}
                        </div>
                    </>
                )}
                <div className="divider m-0"></div>
                <div className="inline-flex justify-end items-center">
                    <a className="link link-info" href={url} target="_blank">
                        Go to resource -{'>'}
                    </a>
                </div>
            </div>
        </div>
    )
}
