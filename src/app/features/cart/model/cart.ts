export interface IResponseCart {
    status: string
    numOfCartItems: number
    cartId: string
    data: Cart
}

export interface Cart {
    _id: string
    cartOwner: string
    products: ICart[]
    createdAt: string
    updatedAt: string
    __v: number
    totalCartPrice: number
}

export interface ICart {
    count: number
    _id: string
    product: IProduct
    price: number
}

export interface IProduct {
    subcategory: Subcategory[]
    _id: string
    title: string
    quantity: number
    imageCover: string
    category: Category
    brand: Brand
    ratingsAverage: number
    id: string
}

export interface Subcategory {
    _id: string
    name: string
    slug: string
    category: string
}

export interface Category {
    _id: string
    name: string
    slug: string
    image: string
}

export interface Brand {
    _id: string
    name: string
    slug: string
    image: string
}

export interface IResponseShippingAddress {
  status: string
  session: Session
}

export interface Session {
  url: string
  success_url: string
  cancel_url: string
}

export interface IShippingAddress {
    details: string
    phone: string
    city: string
}


