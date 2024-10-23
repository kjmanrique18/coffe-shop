import 'react';
// import IProduct from './IProduct';
import IProductSale from './IProductSale';

interface ISale {
    _id: string;
    saleDate: string;
    total: number;
    products: IProductSale[]; 
  }

  export default ISale;