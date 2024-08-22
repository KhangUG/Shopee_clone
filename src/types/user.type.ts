type Role = 'User' | 'Admin'

export interface User {
  roles: Role[]
  _id: string
  email: string
  name: string
  address: string
  date_of_birth: null
  createdAt: string
  updatedAt: string
}
