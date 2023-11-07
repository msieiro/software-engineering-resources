import { render } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import ResourceList from '../src/components/resource-card/ResourceList'
import * as useResourcesHook from '../src/hooks/useResources'
import { Resource } from '../src/types/Resource'

describe('<ResourceList />', () => {
    const useResourcesSpy = vi.spyOn(useResourcesHook, 'useResources')

    afterEach(() => {
        useResourcesSpy.mockClear()
    })

    test('should show error-alert', () => {
        const items: Resource[] = []

        useResourcesSpy.mockReturnValue({
            resources: items,
            loading: false,
            error: 'This is an error'
        })

        const { getByTestId } = render(<ResourceList />)

        expect(getByTestId('error-alert')).toBeDefined()
    })

    test('should show loader', () => {
        const items: Resource[] = []

        useResourcesSpy.mockReturnValue({
            resources: items,
            loading: true,
            error: ''
        })

        const { getByTestId } = render(<ResourceList />)

        expect(getByTestId('loader')).toBeDefined()
    })

    test('should show info-alert', () => {
        const items: Resource[] = []

        useResourcesSpy.mockReturnValue({
            resources: items,
            loading: false,
            error: ''
        })

        const { getByTestId } = render(<ResourceList />)

        expect(getByTestId('info-alert')).toBeDefined()
    })

    test('should show loader', () => {
        const items: Resource[] = []

        useResourcesSpy.mockReturnValue({
            resources: items,
            loading: true,
            error: ''
        })

        const { getByTestId } = render(<ResourceList />)

        expect(getByTestId('loader')).toBeDefined()
    })

    test('should show elements', () => {
        const items: Resource[] = [
            {
                id: '1',
                title: 'test',
                description: 'test descs'.repeat(15),
                tags: ['testing'],
                languages: ['typescript'],
                type: 'YOUTUBE',
                url: 'http://localhost'
            },
            {
                id: '2',
                title: 'test',
                description: 'test desc',
                tags: ['testing'],
                languages: ['typescript'],
                type: 'TOOL',
                url: 'http://localhost'
            },
            {
                id: '3',
                title: 'test',
                description: 'test desc',
                tags: ['testing'],
                languages: ['typescript'],
                type: 'BLOG',
                url: 'http://localhost'
            }
        ]

        useResourcesSpy.mockReturnValue({
            resources: items,
            loading: false,
            error: ''
        })

        const { getByTestId } = render(<ResourceList />)

        expect(getByTestId('resources-list').children.length).toBe(items.length)
    })
})
