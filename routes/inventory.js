const router = require('express').Router(); // require express router
let Inventory = require('../models/inventory.model'); //require the mongoose model


//first route
router.route('/').get((req, res) => {
    Inventory.find()                        //a method to get the list of all the Item details in the mongo db atlas 
        .then(inventories => res.json(inventories)) //find method return a promise in Json format
        .catch(err => res.status(400).json('Error: ' + err)); // returning the error msg  
    
});


// handling incoming http post request
router.route('/add').post((req, res) => {
    const itemname = req.body.itemname;
    const itemcode = req.body.itemcode;
    const suppliername = req.body.suppliername;
    const category = req.body.category;
    const quantity = Number(req.body.quantity);
    const description = req.body.description;
    const currentstock = Number(req.body.currentstock);
    const newstock = Number(req.body.newstock);
    const minrequired = Number(req.body.minrequired);
    const dateofmanufactured = new Date(req.body.dateofmanufactured);
    const lastupdated = new Date(req.body.lastupdated);

    const newInventory = new Inventory({
        itemname,
        itemcode,
        suppliername,
        category,
        quantity,
        description,
        currentstock,
        newstock,
        minrequired,
        dateofmanufactured,
        lastupdated,
    });

    newInventory.save() // saving new inventory to the db
        .then(() => res.json('Inventory added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    
});


router.route('/:id').get((req, res) => {
    Inventory.findById(req.params.id)
        .then(inventory => res.json(inventory)) 
        .catch(err => res.status(400).json('Error: ' + err)); 
});



router.route('/:id').delete((req, res) => {
    Inventory.findByIdAndDelete(req.params.id)
        .then(inventory => res.json('Inventory deleted!')) 
        .catch(err => res.status(400).json('Error: ' + err)); 
});


router.route('/update/:id').post((req, res) => {
    Inventory.findById(req.params.id)
        .then(inventory => {
            inventory.itemname = req.body.itemname; // getting new information to the exsiting fields
            inventory.itemcode = req.body.itemcode;
            inventory.suppliername = req.body.suppliername;
            inventory.category = req.body.category;
            inventory.quantity = Number(req.body.quantity);
            inventory.description = req.body.description;
            inventory.currentstock = Number(req.body.currentstock);
            inventory.newstock = Number(req.body.newstock);
            inventory.minrequired = Number(req.body.minrequired);
            inventory.dateofmanufactured = new Date(req.body.dateofmanufactured);
            inventory.lastupdated = new Date(req.body.lastupdated);



            inventory.save() // saving new inventory to the db
                .then(() => res.json('Inventory updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        
    })
    .catch(err => res.status(400).json('Error: ' + err));

});


module.exports = router;


