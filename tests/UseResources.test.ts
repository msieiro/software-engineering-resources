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

    it('initial state is correct', () => {
        vi.mocked(getResources).mockResolvedValueOnce([])

        const { result } = renderHook(() =>
            useResources({ type: '', search: '' })
        )

        expect(result.current.resources).toEqual([])
        expect(result.current.loading).toBe(true)
        expect(result.current.error).toBe('')
    })

    it('sets resources after successful fetch', async () => {
        const mockResources: Resource[] = [
            {
                id: '1',
                title: 'test',
                description: 'test descs'.repeat(15),
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

    it('handles errors from getResources', async () => {
        vi.mocked(getResources).mockRejectedValueOnce(new Error('Fetch error'))

        const { result, waitForNextUpdate } = renderHook(() =>
            useResources({ type: 'test', search: 'query' })
        )

        await waitForNextUpdate()

        expect(result.current.error).toBe(
            'Could not obtain data from NotionAPI'
        )
        expect(result.current.loading).toBe(false)
    })

    it('calls getResources with correct parameters', async () => {
        vi.mocked(getResources).mockResolvedValueOnce([])

        const { waitForNextUpdate } = renderHook(() =>
            useResources({ type: 'testType', search: 'testSearch' })
        )

        await waitForNextUpdate()

        expect(getResources).toHaveBeenCalledWith('testType', 'testSearch')
    })

    it('does not fetch data again if the type and search have not changed', () => {
        vi.mocked(getResources).mockResolvedValueOnce([])

        const { rerender } = renderHook(() =>
            useResources({ type: 'test', search: 'query' })
        )

        rerender({ type: 'test', search: 'query' })

        expect(getResources).toHaveBeenCalledTimes(1)
    })
})
