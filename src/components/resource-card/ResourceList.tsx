import debounce from 'lodash.debounce'
import { useEffect, useMemo, useState } from 'react'
import { useResources } from '../../hooks/useResources'
import { Resource } from '../../types/Resource'
import ErrorAlert from '../alert/ErrorAlert'
import InfoAlert from '../alert/InfoAlert'
import Loader from '../loader/Loader'
import ResourceCard from './ResourceCard'

export default function ResourceList() {
    const [selectedType, setSelectedType] = useState<string>('')
    const [searchTerm, setSearchTerm] = useState<string>('')
    const { resources, loading, error } = useResources({
        type: selectedType,
        search: searchTerm
    })

    const resetFilters = () => {
        setSelectedType('')
        setSearchTerm('')
    }

    const showResetButton: boolean = selectedType || searchTerm ? true : false

    const changeHandler = (event) => {
        setSearchTerm(event.target.value)
    }

    const debouncedChangeHandler = useMemo(
        () => debounce(changeHandler, 300),
        []
    )

    useEffect(() => {
        return () => {
            debouncedChangeHandler.cancel()
        }
    }, [])

    return (
        <>
            <section className="p-4 bg-primary-content">
                <h2 className="text-primary text-center">Filters</h2>
                <form className="flex flex-wrap justify-center items-center ">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered w-full max-w-xs mx-1 my-1 bg-primary-content text-primary font-bold rounded-md"
                        onChange={debouncedChangeHandler}
                    />
                    <select
                        className="select select-bordered w-full max-w-xs mx-1 my-1 bg-primary-content text-primary font-bold rounded-md"
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option
                            disabled
                            selected
                            className=" bg-primary-content text-primary font-bold"
                        >
                            Type
                        </option>
                        <option
                            className=" bg-primary-content text-primary font-bold"
                            value={'BLOG'}
                        >
                            BLOG
                        </option>
                        <option
                            className=" bg-primary-content text-primary font-bold"
                            value={'TOOL'}
                        >
                            UTILITY
                        </option>
                        <option
                            className=" bg-primary-content text-primary font-bold"
                            value={'YOUTUBE'}
                        >
                            YOUTUBE
                        </option>
                    </select>
                    {showResetButton && (
                        <button
                            className="btn btn-primary bg-primary-content text-primary"
                            onClick={resetFilters}
                        >
                            Reset
                        </button>
                    )}
                </form>
            </section>
            {loading && <Loader />}
            {!loading && resources.length !== 0 && (
                <section
                    className="grid grid-cols-[repeat(auto-fill,minmax(325px,1fr))] place-items-center gap-5 p-5 bg-gray-500"
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
