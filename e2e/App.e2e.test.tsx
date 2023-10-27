import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, test } from 'vitest'
import App from '../src/App'

describe('<App/> component', () => {
    test('it should navigate to external links', () => {
        render(<App />)

        const reactLink = screen.getByAltText('React logo')
        const viteLink = screen.getByAltText('Vite logo')

        expect(reactLink.closest('a')).toHaveAttribute(
            'href',
            'https://react.dev'
        )
        expect(viteLink.closest('a')).toHaveAttribute(
            'href',
            'https://vitejs.dev'
        )
    })
})
