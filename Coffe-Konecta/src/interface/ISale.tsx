import 'react';
import IProduct from './IProduct';
import IProductSale from './IProductSale';

interface ISale {
    _id: string;
    saleDate: string;
    total: number;
    products: IProduct[]; 
    detailsSale: IProductSale[];
  }

  export default ISale;