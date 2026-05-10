import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from './App'
import { LanguageProvider } from './i18n/LanguageContext'

describe('App', () => {
  it('renders the home page and links to the profile setup', async () => {
    const user = userEvent.setup()

    render(
      <LanguageProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>,
    )

    expect(screen.getByRole('heading', { name: /build a personalised career growth plan/i })).toBeVisible()

    await user.click(screen.getByRole('link', { name: /start my career plan/i }))

    expect(screen.getByRole('heading', { name: /tell the planner where you are now/i })).toBeVisible()
  })
})
