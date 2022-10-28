import '@testing-library/jest-dom'
import { Globals } from '@react-spring/web'
import { vi } from 'vitest'

import { fireEvent, render, screen, waitFor } from '@/utils/test-utils'

import { DropdownMenu } from './DropdownMenu'

describe('DropdownMenu', async () => {
  beforeAll(() => {
    Globals.assign({
      skipAnimation: true,
    })
  })
  it('should render the input', () => {
    render(
      <DropdownMenu open={true}>
        <ul>
          <li>Hello</li>
        </ul>
      </DropdownMenu>
    )

    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('should correctly render list based on state', async () => {
    // need to mock the ULs client height
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      value: 120,
    })

    const { rerender } = render(
      <DropdownMenu open={false}>
        <ul>
          <li>Hello</li>
        </ul>
      </DropdownMenu>
    )
    expect(screen.getByRole('menu')).toHaveStyle('height: 0px')
    rerender(
      <DropdownMenu open={true}>
        <ul>
          <li>Hello</li>
        </ul>
      </DropdownMenu>
    )

    await waitFor(() => {
      expect(screen.getByRole('menu')).not.toHaveStyle({ height: '0px' })
    })
  })

  it('should render the activator properly', () => {
    render(
      <DropdownMenu open={false}>
        <ul>
          <li>Hello</li>
        </ul>
        <DropdownMenu.Activator label="Click Me" />
      </DropdownMenu>
    )

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click Me')
  })
})

describe('DropdownMenu.Activator', async () => {
  it('should render the button', () => {
    render(<DropdownMenu.Activator>Hello</DropdownMenu.Activator>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
  it('should trigger the event when clicked', () => {
    const onButtonClicked = vi.fn()
    render(<DropdownMenu.Activator openFn={onButtonClicked}>Hello</DropdownMenu.Activator>)
    fireEvent.click(screen.getByRole('button'))
    expect(onButtonClicked).toBeCalledTimes(1)
  })
  it('will use default activator content', () => {
    render(<DropdownMenu.Activator label="Foobar" />)
    expect(screen.getByRole('button')).toHaveTextContent('Foobar')
  })
})
