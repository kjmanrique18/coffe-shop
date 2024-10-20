const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true, 
        unique: true // Asegura que no haya IDs duplicados
    },
nameProduct: {
    type: String,
    required: true 
},  
reference: {
    type: String,
    required: true 
},
price: {
    type: Number,
    required: true,
    min: [0, 'El precio no puede ser negativo']
 
},
weight: {
    type: Number,
    required: true,
    min: [0, 'El peso no puede ser negativo']
 
},
category: {
    type: String,
    required: true 
},
stock: {
    type: Number,
    required: true,
    min: [0, 'El stock no puede ser negativo']
 
},
creationDate: {
    type: Date,
    required: true, 
    //default: Date.now 
}
    
});

const Product = mongoose.model('Product', productSchema);
 
module.exports = Product;
