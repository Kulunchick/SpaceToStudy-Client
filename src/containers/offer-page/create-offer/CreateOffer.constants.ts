import { emptyField, numberField, textField } from '~/utils/validations/common'

export const initialValues = {
  categoryId: '',
  subjectId: '',
  proficiencyLevel: [],
  languages: [],
  description: '',
  price: ''
}

export const validations = {
  languages: (value: string[] | string) =>
    emptyField(
      value && value.toString(),
      'offerPage.createOffer.errorMessages.languages'
    ),
  categoryId: (value: string | null) =>
    emptyField(value, 'offerPage.createOffer.errorMessages.category'),
  subjectId: (value: string | null) =>
    emptyField(value, 'offerPage.createOffer.errorMessages.subject'),
  price: (value: string) =>
    numberField(value, 'offerPage.createOffer.errorMessages.price'),
  description: (value: string) =>
    emptyField(
      value,
      'offerPage.createOffer.errorMessages.description',
      textField(20, 1000)(value)
    ),
  proficiencyLevel: (value: string[] | string) =>
    emptyField(
      value && value.toString(),
      'offerPage.createOffer.errorMessages.proficiencyLevel'
    )
}
