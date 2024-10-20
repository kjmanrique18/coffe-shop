const express = require('express')
const router = express.Router();
const Coffee = require('../models/productCoffe.model')

//middleware

const getProduct = async(req,res,next) =>{

    let product;
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({message: 'El id del producto no es valido'})
    }
    try {
        product = await Coffee.findById(id);
        if (!product) {
            return res.status(404).json({message:'El id del producto no fue encontrado'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.product = product;
    next();
}

//Listar productos del cafe [GET]
router.get('/', async (req, res)=>{
    try {
        const product = await Coffee.find();
        console.log(product)
        if(product.length === 0 || product.length ===''){
           return res.status(204).json('No se encontró ningun producto');
        }
        res.json(product);

    } catch (error) {
        res.status(500).json({menssage: error.message});
    }
})

//listar productos disponibles

//Crear producto para el café [POST]
router.post('/', async (req, res)=>{
    const { id, nameProduct, reference, price, weight, category, stock } = req.body; 

    const newProduct = new Coffee({
        id,
        nameProduct,
        reference,
        price,
        weight,
        category,
        stock,
        creationDate: Date.now()
    });
    try {
        const savedCoffee = await newProduct.save(); 
        res.status(201).json(savedCoffee); 
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
});

router.put('/:id', getProduct, async (req,res) =>{
    try {
        console.log('req', req.body);
        console.log('res', res.product);
        const product = res.product;
        //const { nameProduct, reference, price, weight, category, stock, creationDate } = req.body;
        product.nameProduct = req.body.nameProduct || product.nameProduct;
        product.reference = req.body.reference || product.reference;
        product.price = req.body.price || product.price;
        product.weight = req.body.weight || product.weight;
        product.category = req.body.category || product.category;
        product.stock = req.body.stock || product.stock;
        product.creationDate = req.body.creationDate || product.creationDate;

        const saveproduct = await product.save();

        res.json(saveproduct);


    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.delete('/:id', getProduct, async (req,res) =>{
    try {
        const product = res.product
        await product.deleteOne({
            _id: product._id
        });
        res.json({message:`El producto ${product.nameProduct} fue eliminado correctamente`})
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
module.exports = router; 
