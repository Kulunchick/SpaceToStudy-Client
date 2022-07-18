import { commonHoverShadow } from '~/styles/app-theme/custom-shadows'

export const style = {
  root: {
    display: 'flex',
    justifyContent: 'end',
    position: 'sticky',
    bottom: '0',
  },
  button: {
    m: { xs: '0 8px 8px 0', md: '0 12px 12px 0', lg: '0 20px 20px 0' },
    cursor: 'pointer',
    backgroundColor: 'primary.50',
    opacity: 0.7,
    boxShadow: commonHoverShadow,
    '&:hover': {  opacity: 1, backgroundColor: 'primary.100' }
  },
  icon: {
    fontSize: '24px', 
    color: 'primary.900'
  }
}
