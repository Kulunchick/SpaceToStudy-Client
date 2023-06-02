import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'

import AppCard from '~/components/app-card/AppCard'
import AppChip from '~/components/app-chip/AppChip'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import StatusChip from '~/components/status-chip/StatusChip'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { getFormatedDate } from '~/utils/helper-functions'
import { Cooperation } from '~/types'
import { styles } from '~/containers/my-cooperations/cooperation-card/CooperationCard.styles'

interface CooperationCardProps {
  cooperation: Cooperation
}

const CooperationCard: FC<CooperationCardProps> = ({ cooperation }) => {
  const { t } = useTranslation()
  return (
    <AppCard sx={styles.root}>
      <Box sx={styles.userInfo}>
        <ImgTitleDescription
          description={getFormatedDate(cooperation.updatedAt)}
          img={cooperation.user.photo}
          imgComponent={Avatar}
          style={styles.imgTitleDescription}
          title={`${cooperation.user.firstName} ${cooperation.user.lastName}`}
        />
        <Box sx={styles.priceWithStatus}>
          <StatusChip status={cooperation.status} />
          <TitleWithDescription
            description={`/ ${t('common.hour')}`}
            style={styles.price}
            title={`${cooperation.price} ${t('common.uah')}`}
          />
        </Box>
      </Box>
      <Box sx={styles.chipBox}>
        <AppChip labelSx={styles.chipLabel}>
          {cooperation.offer.subject.name}
        </AppChip>
        <AppChip labelSx={styles.chipLabel}>
          {cooperation.proficiencyLevel}
        </AppChip>
      </Box>
      <Typography sx={styles.title}>{cooperation.offer.title}</Typography>
    </AppCard>
  )
}

export default CooperationCard
