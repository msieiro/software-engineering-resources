import { useResources } from '../hooks/useResources'
import { Resource } from '../types/Resource'
import ErrorAlert from './ErrorAlert'
import Loader from './Loader'
import ResourceCard from './ResourceCard'

export default function ResourceList() {
    const { resources, loading } = useResources()

    if (loading) {
        return <Loader />
    }

    if (resources.length === 0) {
        return <ErrorAlert />
    }

    return (
        <section
            className="grid grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-4 p-5 bg-base-100"
            data-testid="resources-list"
        >
            {resources.map((el: Resource) => (
                <ResourceCard
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    languages={el.languages}
                    tags={el.tags}
                    type={el.type}
                    url={el.url}
                    description={el.description}
                />
            ))}
        </section>
    )
}
