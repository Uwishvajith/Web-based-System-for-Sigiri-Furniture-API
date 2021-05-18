const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    itemname: { type: String, required: true },
    itemcode: { type: String, required: true }, 
    suppliername: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true, minlength: 5},
    currentstock: { type: Number, required: true },
    newstock: { type: Number, required: true },
    minrequired: { type: Number, required: true },
    dateofmanufactured: { type: String, required: true },
    lastupdated: { type: String, required: true },

}, {
    timestamps: true,
});

const Inventory = mongoose.model('Inventories', inventorySchema); //creating a schema called Inventory

module.exports = Inventory;