import { render, screen } from '@testing-library/react'
import Logo from './Logo'

test('render logo', () => {
  render(<Logo />)
  const logo = screen.getByAltText('DAMASCUS')
  expect(logo).toBeInTheDocument()
})
