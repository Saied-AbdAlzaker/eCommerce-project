export interface ResponseCategory {
    results: number
    metadata: Metadata
    data: ICategory[]
}

export interface Metadata {
    currentPage: number
    numberOfPages: number
    limit: number
}

export interface ICategory {
    _id: string
    name: string
    slug: string
    image: string
    createdAt: string
    updatedAt: string
}

// Specific Category
export interface ResponseSpecificCategory {
    data: ISpecificCategory
}

export interface ISpecificCategory {
    _id: string
    name: string
    slug: string
    image: string
    createdAt: string
    updatedAt: string
    __v: number
}
