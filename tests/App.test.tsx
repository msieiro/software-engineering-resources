import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, test } from 'vitest'
import App from '../src/App'

describe('App.tsx', () => {
    test('<App />', () => {
        render(<App />)

        const button = screen.getByText('count is 0')

        fireEvent.click(button)

        expect(button.textContent).toEqual('count is 1')
    })
})
