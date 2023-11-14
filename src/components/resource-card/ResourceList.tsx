import { useState } from 'react'
import { useResources } from '../../hooks/useResources'
import { Resource } from '../../types/Resource'
import ErrorAlert from '../alert/ErrorAlert'
import InfoAlert from '../alert/InfoAlert'
import FilterForm from '../form/FilterForm'
import Loader from '../loader/Loader'
import ResourceCard from './ResourceCard'

export default function ResourceList() {
    const [selectedType, setSelectedType] = useState<string>('')
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [tagFilter, setTagFilter] = useState<string[]>([])
    const [languagesFilter, setLanguagesFilter] = useState<string[]>([])
    const { resources, loading, error } = useResources({
        type: selectedType,
        search: searchTerm,
        tags: tagFilter,
        languages: languagesFilter
    })

    return (
        <>
            <section className="p-4 bg-base-100">
                <FilterForm
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    setSearchTerm={setSearchTerm}
                    tagFilter={tagFilter}
                    setTagFilter={setTagFilter}
                    languagesFilter={languagesFilter}
                    setLanguagesFilter={setLanguagesFilter}
                />
            </section>
            {loading && <Loader />}
            {!loading && resources.length !== 0 && (
                <section
                    className="grid grid-cols-[repeat(auto-fill,minmax(325px,1fr))] place-items-center gap-5 p-5 bg-base-300"
                    data-testid="resources-list"
                >
                    {resources.map((el: Resource) => (
                        <ResourceCard
                            key={el.id}
                            id={el.id}
                            title={el.title}
                            description={el.description}
                            languages={el.languages}
                            tags={el.tags}
                            type={el.type}
                            url={el.url}
                        />
                    ))}
                </section>
            )}
            {!loading && resources.length === 0 && !error && (
                <InfoAlert message={'No results for the current filters'} />
            )}
            {!loading && error && <ErrorAlert message={error} />}
        </>
    )
}
