import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the starter content and increments the counter', async () => {
    const user = userEvent.setup()

    render(<App />)

    expect(screen.getByRole('heading', { name: /get started/i })).toBeVisible()

    const counter = screen.getByRole('button', { name: /count is 0/i })
    await user.click(counter)

    expect(counter).toHaveTextContent('Count is 1')
  })
})
