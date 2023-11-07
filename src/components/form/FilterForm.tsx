import debounce from 'lodash.debounce'
import { ChangeEvent, Dispatch, useEffect, useMemo, useState } from 'react'

export default function FilterForm({
    selectedType,
    setSelectedType,
    searchTerm,
    setSearchTerm
}: {
    selectedType: string
    setSelectedType: Dispatch<React.SetStateAction<string>>
    searchTerm: string
    setSearchTerm: Dispatch<React.SetStateAction<string>>
}) {
    const [inputValue, setInputValue] = useState<string>('')

    const resetFilters = () => {
        setSelectedType('')
        setInputValue('')
        setSearchTerm('')
    }

    const showResetButton: boolean = selectedType || searchTerm ? true : false

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
        debouncedChangeHandler(event.target.value)
    }

    const debouncedChangeHandler = useMemo(
        () => debounce((value: string) => setSearchTerm(value), 300),
        [setSearchTerm]
    )

    useEffect(() => {
        return () => {
            debouncedChangeHandler.cancel()
        }
    }, [debouncedChangeHandler])

    return (
        <form className="flex flex-wrap justify-center md:justify-end items-end gap-1 px-2">
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text text-base-content font-sans-bold">
                        Search by term
                    </span>
                </label>
                <input
                    type="text"
                    placeholder="Write here"
                    className="input input-bordered w-full max-w-xs bg-base-100 text-base-content font-sans-bold rounded-md"
                    value={inputValue}
                    onChange={changeHandler}
                />
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text text-base-content font-sans-bold">
                        Filter by type
                    </span>
                </label>
                <select
                    className="select select-bordered w-full max-w-xs bg-base-100 text-base-content font-sans-bold rounded-md"
                    onChange={(e) => setSelectedType(e.target.value)}
                    value={selectedType}
                    defaultValue={''}
                >
                    <option
                        disabled
                        className="bg-base-100 text-base-content font-sans-bold"
                        value={''}
                    >
                        Type
                    </option>
                    <option
                        className="bg-base-100 text-base-content font-sans-bold"
                        value={'BLOG'}
                    >
                        Blog
                    </option>
                    <option
                        className="bg-base-100 text-base-content font-sans-bold"
                        value={'TOOL'}
                    >
                        Utility
                    </option>
                    <option
                        className="bg-base-100 text-base-content font-sans-bold"
                        value={'YOUTUBE'}
                    >
                        Youtube
                    </option>
                </select>
            </div>
            {showResetButton && (
                <div className="form-control w-full max-w-xs">
                    <button
                        type="reset"
                        className="btn btn-primary bg-primary text-base-content-content rounded-md font-sans-bold"
                        onClick={resetFilters}
                    >
                        Reset
                    </button>
                </div>
            )}
        </form>
    )
}
