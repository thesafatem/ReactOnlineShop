import { Product } from './Product';
export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    basket: Product[];
}