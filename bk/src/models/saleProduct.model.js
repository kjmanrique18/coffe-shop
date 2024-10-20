const mongoose = require('mongoose')
const Product = require('./productCoffe.model'); // Ajusta la ruta según la ubicación de tu modelo Product

const saleSchema = new mongoose.Schema({
    idSale: {
        type: Number,
        required: true, 
        unique: true 
    },
saleDate: {
    type: Date,
    required: true
},  
amountSale: {
    type: Number,
    required: true,
    min: [0, 'La cantidad de productos no puede ser negativo']
 
},
priceSale: {
    type: Number,
    required: true,
    min: [0, 'El precio total de la venta no puede ser negativo']
 
},
category: {
    type: String,
    required: true 
},
productId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
}

  });

const sale = mongoose.model('Sale', saleSchema);
 
module.exports = sale;
