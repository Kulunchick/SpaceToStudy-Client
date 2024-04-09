import {
  CategoryInterface,
  CategoryNameInterface,
  LanguageFilter,
  Offer,
  ProficiencyLevelEnum,
  RangeArray,
  RequestParams,
  SubjectNameInterface,
  UpdateFiltersInQuery,
  UserRole
} from '~/types'

export interface FindOffersFilters {
  categoryId: CategoryInterface['_id']
  subjectId: string
  sort: string
  language: LanguageFilter
  native: string
  rating: string
  authorRole: UserRole
  price?: RangeArray
  search: string
  proficiencyLevel: ProficiencyLevelEnum[]
  page: string | number
}

export interface FindOffersFiltersActions<T> {
  updateFiltersInQuery: UpdateFiltersInQuery<T>
  resetFilters: () => void
  updateQueryParams: () => void
}

export interface CreateOfferBlockProps<T> {
  data: T
  errors: Record<keyof T, string>
  handleNonInputValueChange: <K extends keyof T>(key: K, value: T[K]) => void
  handleBlur: (
    key: keyof T
  ) => (event: React.FocusEvent<HTMLInputElement>) => void
  handleInputChange: (
    key: keyof T
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface FilterQueryHook<T> {
  filters: FindOffersFilters
  countActiveFilters: number
  filterQueryActions: FindOffersFiltersActions<T>
}

export interface GetOffersParams
  extends Partial<FindOffersFilters>,
    Partial<Omit<RequestParams, 'sort'>> {
  status?: Offer['status']
  excludedOfferId?: Offer['_id']
  languages?: Offer['languages']
}

export interface CreateOrUpdateOfferData
  extends Pick<
    Offer,
    | 'proficiencyLevel'
    | 'languages'
    | 'enrolledUsers'
    | 'description'
    | 'title'
    | 'status'
    | 'FAQ'
  > {
  category: CategoryNameInterface['name']
  subject: SubjectNameInterface['name']
  price: string
}

export interface PriceRange {
  maxPrice: number
  minPrice: number
}
