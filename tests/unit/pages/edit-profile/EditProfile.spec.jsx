import { screen, waitFor, fireEvent } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'

import EditProfile from '~/pages/edit-profile/EditProfile'

const userId = '63f5d0ebb'
const userRole = 'tutor'

const mockState = {
  appMain: { userId: userId, userRole: userRole }
}

const userMock = {
  role: userRole,
  videoLink: { [userRole]: '' },
  mainSubjects: { [userRole]: [] }
}

vi.mock('~/containers/edit-profile/profile-tab/ProfileTab', () => ({
  default: function () {
    return <div>ProfileTab</div>
  }
}))

vi.mock(
  '~/containers/edit-profile/professional-info-tab/ProfessionalInfoTab',
  () => ({
    default: function () {
      return <div>ProfessionalTab</div>
    }
  })
)

vi.mock('~/containers/edit-profile/notification-tab/NotificationTab', () => ({
  default: function () {
    return <div>NotificationMock</div>
  }
}))

vi.mock(
  '~/containers/edit-profile/password-security-tab/PasswordSecurityTab',
  () => ({
    default: function () {
      return <div>Password&SecurityMock</div>
    }
  })
)

describe('EditProfile', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(`${URLs.users.get}/${userId}?role=${userRole}&isEdit=true`)
        .reply(200, userMock)
      renderWithProviders(<EditProfile />, {
        preloadedState: mockState
      })
    })
  })

  it('should render component with header, description and menu-tabs', async () => {
    const editProfileHeader = await screen.findByText('editProfilePage.title')
    expect(editProfileHeader).toBeInTheDocument()

    const editProfileDesc = await screen.findByText(
      'editProfilePage.description'
    )
    expect(editProfileDesc).toBeInTheDocument()

    const menuTabs = await screen.findAllByRole('listitem')
    expect(menuTabs).toHaveLength(4)
  })

  it('should render Profile Container after click on Profile menu button', async () => {
    const profileMenuTab = await screen.findByRole('button', {
      name: 'editProfilePage.profile.generalTab.tabTitle'
    })
    fireEvent.click(profileMenuTab)
    await waitFor(() => {
      const profileContent = screen.getByText('ProfileTab')
      expect(profileContent).toBeInTheDocument()
    })
  })

  it('should render Professional tab Container after click on Profile menu button', async () => {
    const professionalTab = await screen.findByRole('button', {
      name: 'editProfilePage.profile.professionalTab.tabTitle'
    })
    fireEvent.click(professionalTab)
    await waitFor(() => {
      const professionalContent = screen.getByText('ProfessionalTab')
      expect(professionalContent).toBeInTheDocument()
    })
  })

  it('should render Notification Container after click on Notification menu button', async () => {
    const notificationMenuTab = await screen.findByRole('button', {
      name: 'editProfilePage.profile.notificationsTab.tabTitle'
    })
    fireEvent.click(notificationMenuTab)
    await waitFor(() => {
      const notificationsContent = screen.getByText('NotificationMock')
      expect(notificationsContent).toBeInTheDocument()
    })
  })

  it('should render Security block after click on Password & Security menu button', async () => {
    const securityMenuTab = await screen.findByRole('button', {
      name: 'editProfilePage.profile.passwordSecurityTab.tabTitle'
    })
    fireEvent.click(securityMenuTab)
    await waitFor(() => {
      const securityContent = screen.getByText('Password&SecurityMock')
      expect(securityContent).toBeInTheDocument()
    })
  })
})
