import { Dispatch, useState } from 'react'
import { useLanguages } from '../../hooks/useLanguages'
import { useTags } from '../../hooks/useTags'
import DebouncedTextInput from './DebouncedTextInput'
import Selector from './Selector'
import SelectorMultiple from './SelectorMultiple'

const RESOURCE_TYPES = ['TOOL', 'YOUTUBE', 'BLOG']

export default function FilterForm({
    selectedType,
    setSelectedType,
    setSearchTerm,
    tagFilter,
    setTagFilter,
    languagesFilter,
    setLanguagesFilter
}: {
    selectedType: string
    setSelectedType: Dispatch<React.SetStateAction<string>>
    setSearchTerm: Dispatch<React.SetStateAction<string>>
    tagFilter: string[]
    setTagFilter: Dispatch<React.SetStateAction<string[]>>
    languagesFilter: string[]
    setLanguagesFilter: Dispatch<React.SetStateAction<string[]>>
}) {
    const { tags } = useTags()
    const { languages } = useLanguages()

    const [inputValue, setInputValue] = useState<string>('')

    const resetFilters = () => {
        setSelectedType('')
        setInputValue('')
        setSearchTerm('')
        setTagFilter([])
    }

    return (
        <form className="flex flex-wrap justify-center md:justify-end items-end gap-1 px-2">
            <DebouncedTextInput
                label="Search by term"
                inputValue={inputValue}
                setInputValue={setInputValue}
                setSearchTerm={setSearchTerm}
            />
            <SelectorMultiple
                label="Tags"
                options={tags}
                selected={tagFilter}
                setSelected={setTagFilter}
            />
            <SelectorMultiple
                label="Languages"
                options={languages}
                selected={languagesFilter}
                setSelected={setLanguagesFilter}
            />
            <Selector
                label="Type"
                options={RESOURCE_TYPES}
                selected={selectedType}
                setSelected={setSelectedType}
            />

            <div className="form-control max-w-xs">
                <button
                    type="reset"
                    className="btn btn-secondary ml-5 min-w-xs inline-block px-6 py-3 mr-3 text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-110 hover:rotate-2 hover:shadow-lg active:opacity-85 font-sans-bold"
                    onClick={resetFilters}
                >
                    Reset
                </button>
            </div>
        </form>
    )
}
