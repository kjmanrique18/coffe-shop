import 'react';
import IProduct from './IProduct';

interface ISale {
    _id: string;
    saleDate: string;
    total: number;
    products: IProduct[]; 
  }

  export default ISale;