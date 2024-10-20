const mongoose = require('mongoose')
const Product = require('./productCoffe.model'); // Ajusta la ruta según la ubicación de tu modelo Product

const saleSchema = new mongoose.Schema({

saleDate: {
    type: Date,
    required: true
},  

total: {
    type: Number,
    required: true,
    min: [0, 'El precio total de la venta no puede ser negativo']
 
},

products: [
    {
        productId: { 
            type: mongoose.Schema.Types.ObjectId,
             ref: 'Product', 
             required: true 
            },
        amountSale: { type: Number, required: true },
        priceSale: { type: Number, required: true }
    }
],
});
const sale = mongoose.model('Sale', saleSchema);
 
module.exports = sale;
