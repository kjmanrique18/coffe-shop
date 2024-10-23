import IProduct from "./IProduct";

interface IProductSale {
    productId: IProduct;  
    amountSale: number; 
    priceSale: number;  
    _id: string;        
}
export default  IProductSale;