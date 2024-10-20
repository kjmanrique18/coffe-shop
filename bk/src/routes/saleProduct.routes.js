const express = require('express')
const router = express.Router();
const SaleProduct = require('../models/saleProduct.model');

//middleware

const getSale = async(req,res,next) =>{

    let sale;
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({message: 'El id del producto no es valido'})
    }
    try {
        sale = await SaleProduct.findById(id);
        if (!sale) {
            return res.status(404).json({message:'El id del producto no fue encontrado'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.sale = sale;
    next();
}

//Listar ventas realizadas [GET]
router.get('/', async (req, res)=>{
    try {
        const sale = await SaleProduct.find().populate('products.productId');
        console.log(sale)
        if(sale.length === 0 || sale.length ===''){
           return res.status(204).json('No se encontró ningun producto');
        }
        res.json(sale);

    } catch (error) {
        res.status(500).json({menssage: error.message});
    }
})
 

//Crear una venta [POST]
router.post('/', async (req, res)=>{
    const { idSale, saleDate, total, products} = req.body; 

    const newSale = new SaleProduct({
        idSale,
        saleDate,
        total,
        products
    });
    try {
        const saveSale = await newSale.save(); 
        res.status(201).json(saveSale); 
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
});

//Editar venta 
router.put('/:id', getSale, async (req,res) =>{
    try {
       
        const sale = res.sale;

        sale.saleDate = req.body.saleDate || sale.saleDate;
        sale.amountSale = req.body.amountSale || sale.amountSale;
        sale.priceSale = req.body.priceSale || sale.priceSale;
        sale.products = req.body.products || sale.products;

        const saveSale = await sale.save();

        res.json(saveSale);


    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

module.exports = router;
