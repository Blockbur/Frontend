import { render, screen } from '@testing-library/react'
import { Header } from '.'

describe('Header component', () => {
  it('renders correctly', () => {
    render(<Header />)

    expect(screen.getByText('HOME')).toBeInTheDocument()
  })
})
