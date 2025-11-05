export interface ResponseBrands {
  results: number
  metadata: Metadata
  data: IBrands[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface IBrands {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}

// Specific Brand
export interface ResponseSpecificBrand {
  data: ISpecificBrand
}

export interface ISpecificBrand {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
  __v: number
}
