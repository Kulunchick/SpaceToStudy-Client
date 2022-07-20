import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import PopularCategories from '~/containers/student-home-page/popular-categories/PopularCategories'
import useShowMore from '~/hooks/use-show-more'
import { mockCategories } from '~tests/unit/hooks/mock-categories'

jest.mock('~/hooks/use-show-more')

describe('PopularCategories component', () => {
  it('should expand list of items after click on View More', () => {
    useShowMore
      .mockReturnValueOnce({
        items: mockCategories.slice(0, 3),
        isExpandable: true,
        showMore: jest.fn()
      })
      .mockReturnValueOnce({
        items: mockCategories,
        isExpandable: false,
        showMore: jest.fn()
      })

    const { rerender } = renderWithProviders(<PopularCategories />)
    const beforeExpand = screen.getAllByTestId('clickable-card')
    const btn = screen.getByText(/studentHomePage.popularCategories.viewMore/)

    fireEvent.click(btn)

    rerender(<PopularCategories />)

    const afterExpand = screen.getAllByTestId('clickable-card')

    expect(afterExpand.length).toBeGreaterThan(beforeExpand.length)
  })
})
