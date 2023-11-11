import { renderHook } from '@testing-library/react-hooks'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useResources } from '../src/hooks/useResources'
import { getResources } from '../src/services/notion-service'
import { Resource } from '../src/types/Resource'

vi.mock('../src/services/notion-service', () => ({
    getResources: vi.fn()
}))

describe('useResources hook', () => {
    beforeEach(() => {
        vi.mocked(getResources).mockClear()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('should have the correct initial state', () => {
        vi.mocked(getResources).mockResolvedValueOnce([])

        const { result } = renderHook(() =>
            useResources({ type: '', search: '' })
        )

        expect(result.current.resources).toEqual([])
        expect(result.current.loading).toBe(true)
        expect(result.current.error).toBe('')
    })

    it('should set resources after a successful fetch', async () => {
        const mockResources: Resource[] = [
            {
                id: '1',
                title: 'test',
                description: 'test description'.repeat(15),
                tags: ['testing'],
                languages: ['typescript'],
                type: 'YOUTUBE',
                url: 'http://localhost'
            }
        ]

        vi.mocked(getResources).mockResolvedValueOnce(mockResources)

        const { result, waitForNextUpdate } = renderHook(() =>
            useResources({ type: 'YOUTUBE', search: 'test' })
        )

        await waitForNextUpdate()

        expect(result.current.resources).toEqual(mockResources)
        expect(result.current.loading).toBe(false)
        expect(result.current.error).toBe('')
    })

    it('should handle errors from getResources', async () => {
        const errorMessage = 'Fetch error'
        vi.mocked(getResources).mockRejectedValueOnce(new Error(errorMessage))

        const { result, waitForNextUpdate } = renderHook(() =>
            useResources({ type: 'test', search: 'query' })
        )

        await waitForNextUpdate()

        expect(result.current.error).toBe(
            'Could not obtain data from NotionAPI'
        )
        expect(result.current.loading).toBe(false)
    })

    it('should call getResources with the correct parameters', async () => {
        vi.mocked(getResources).mockResolvedValueOnce([])

        const { waitForNextUpdate } = renderHook(() =>
            useResources({ type: 'testType', search: 'testSearch' })
        )

        await waitForNextUpdate()

        expect(getResources).toHaveBeenCalledWith('testType', 'testSearch')
    })

    it('should not fetch data again if the type and search parameters have not changed', () => {
        vi.mocked(getResources).mockResolvedValueOnce([])

        const { rerender } = renderHook(() =>
            useResources({ type: 'test', search: 'query' })
        )

        rerender({ type: 'test', search: 'query' })

        expect(getResources).toHaveBeenCalledTimes(1)
    })
})
