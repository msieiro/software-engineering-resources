import debounce from 'lodash.debounce'
import { ChangeEvent, Dispatch, useEffect, useMemo } from 'react'

export default function DebouncedTextInput({
    label,
    inputValue,
    setInputValue,
    setSearchTerm
}: {
    label: string
    inputValue: string
    setInputValue: Dispatch<React.SetStateAction<string>>
    setSearchTerm: Dispatch<React.SetStateAction<string>>
}) {
    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
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
        <div className="form-control w-full max-w-xs">
            <label
                htmlFor="textInput"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                <input
                    type="text"
                    name="textInput"
                    id="textInput"
                    className="input block w-full  rounded-md bg-primary-content text-primary border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={inputValue}
                    onChange={changeHandler}
                />
            </div>
        </div>
    )
}
