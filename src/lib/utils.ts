import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const base_url: string = "http://localhost:4000"

type LoginForm = { email: string; password: string };

type RegisterForm = {
    userName: string;
    email: string;
    password: string;
    role?: string;
}

type AddData = {
    name: string,
    productType: string,
    price: number,
    stock: number,
    companyName?: string
}

type SelectedProp = {
    _id: string,
    name: string,
    productType: string,
    price: number,
    stock: number,
    companyName?: string,
    createdAt: string,
    updatedAt: string
}

type HeaderItem = {
  key: string;
  value: string;
}

type UserItem = {
  _id: string,
  userName: string,
  password: string,
  role: string,
  createdAt: string,
  updatedAt: string
}

type TotalTableProp<T> = {
    header: HeaderItem[], 
    data: T[],
    action?: (row: T) => React.ReactNode;
}

type AddCartProp = {
    productId: string,
    productName: string,
    userId: string,
    price: number,
    quantity: number
}

type UpdateCartProp = {
    _id: string,
    productId: string,
    productName: string,
    userId: string,
    price: number,
    quantity : number,
    createdAt: string,
    updatedAt: string
}

type ErrorProp = {
    success: boolean,
    message: string
}

type ChartProp = {
    data: ChartDataprop[]
    head: string
}

type ChartDataprop = {
    name: string,
    value:number
}

type AddOrderProp = {
    productId: string,
    productName: string,
    user: string,
    quantity: number,
    cost: number,
    OrderDate: Date,
    status: string
}

type UpdateOrderProp = {
    _id: string,
    productId: string,
    productName: string,
    user: string,
    quantity: number,
    cost: number,
    OrderDate: string,
    status: string,
    createdAt: string,
    updatedAt: string
}

type MessageProp = {
    _id: string,
    senderId: string,
    receiverId: string,
    message: string,
    createdAt: string,
    updatedAt: string
}

export { base_url }

export type { 
  LoginForm, 
  RegisterForm, 
  AddData, 
  HeaderItem,
  SelectedProp,
  TotalTableProp,
  UserItem,
  AddCartProp,
  UpdateCartProp,
  ErrorProp,
  ChartProp,
  ChartDataprop,
  AddOrderProp,
  UpdateOrderProp,
  MessageProp
}
