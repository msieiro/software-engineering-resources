import { Listbox, Transition } from '@headlessui/react'
import { Dispatch, Fragment } from 'react'
import { classNames } from '../../utils/class-names'

export default function Selector({
    label,
    options,
    selected,
    setSelected
}: {
    label: string
    options: string[]
    selected: string
    setSelected: Dispatch<React.SetStateAction<string>>
}) {
    return (
        <div className="form-control w-full max-w-xs max-h-xs">
            <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                    <>
                        <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                            {label}
                        </Listbox.Label>
                        <div className="relative mt-2 rounded-md bg-primary-content text-primary">
                            <Listbox.Button
                                className={`relative block w-full rounded-md border-0 ${
                                    selected !== undefined &&
                                    selected.length > 0
                                        ? 'py-3'
                                        : 'py-6'
                                } text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                            >
                                <span className="flex items-center">
                                    <span className="ml-2 block">
                                        {selected}
                                    </span>
                                </span>
                            </Listbox.Button>
                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-primary-content txt-primary py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {options.map((option) => (
                                        <Listbox.Option
                                            key={option}
                                            className={({ active }) =>
                                                classNames(
                                                    active
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'text-primary',
                                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                                )
                                            }
                                            value={option}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <div className="flex items-center">
                                                        <span
                                                            className={classNames(
                                                                selected
                                                                    ? 'font-semibold'
                                                                    : 'font-normal',
                                                                'ml-3 block truncate'
                                                            )}
                                                        >
                                                            {option}
                                                        </span>
                                                    </div>

                                                    {selected ? (
                                                        <span
                                                            className={classNames(
                                                                active
                                                                    ? 'text-white'
                                                                    : 'text-indigo-600',
                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                            )}
                                                        >
                                                            ✅
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
        </div>
    )
}
