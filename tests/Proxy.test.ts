import { VercelRequest, VercelResponse } from '@vercel/node'
import { describe, expect, test, vi } from 'vitest'
import vercelFunction from '../api/query'

vi.mock('@notionhq/client')

describe('Vercel Function', () => {
    test('should respond with 400 on invalid request method', async () => {
        const mockReq: Partial<VercelRequest> = { method: 'POST' }
        const mockRes: Partial<VercelResponse> = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
        }

        await vercelFunction(
            mockReq as VercelRequest,
            mockRes as VercelResponse
        )

        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.send).toHaveBeenCalledWith('The request is not valid')
    })

    test('should respond with 500 Internal Server Error on failure', async () => {
        const mockReq: Partial<VercelRequest> = {
            method: 'GET',
            query: { type: 'INVALID_TYPE' }
        }
        const mockRes: Partial<VercelResponse> = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
        }

        await vercelFunction(
            mockReq as VercelRequest,
            mockRes as VercelResponse
        )

        expect(mockRes.status).toHaveBeenCalledWith(500)
        expect(mockRes.send).toHaveBeenCalledWith('Internal Server Error')
    })
})
