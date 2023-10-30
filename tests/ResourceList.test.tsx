import { render } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import ResourceList from '../src/components/ResourceList'
import * as useResourcesHook from '../src/hooks/useResources'
import { Resource } from '../src/types/Resource'

describe('<ResourceList />', () => {
    const useResourcesSpy = vi.spyOn(useResourcesHook, 'useResources')

    afterEach(() => {
        useResourcesSpy.mockClear()
    })

    test('should show error', () => {
        const items = []

        useResourcesSpy.mockReturnValue({
            resources: items,
            loading: false
        })

        const { getByTestId } = render(<ResourceList />)

        expect(getByTestId('api-error')).toBeDefined()
    })

    test('should show loader', () => {
        const items = []

        useResourcesSpy.mockReturnValue({
            resources: items,
            loading: true
        })

        const { getByTestId } = render(<ResourceList />)

        expect(getByTestId('loader')).toBeDefined()
    })

    test('should show elements', () => {
        const items: Resource[] = [
            {
                id: '1',
                title: 'test',
                description: 'test desc',
                tags: ['testing'],
                languages: ['typescript'],
                type: 'test',
                url: 'http://localhost'
            }
        ]

        useResourcesSpy.mockReturnValue({
            resources: items,
            loading: false
        })

        const { getByTestId } = render(<ResourceList />)

        expect(getByTestId('resources-list').children.length).toBe(items.length)
    })
})
