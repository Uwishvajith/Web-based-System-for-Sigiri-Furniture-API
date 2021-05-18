const router = require('express').Router(); // require express router
let Item = require('../models/item.model'); //require the mongoose model


//first route
router.route('/').get((req, res) => {
    Item.find() //a method to get the list of all the Item details in the mongo db atlas 
        .then(items => res.json(items)) //find method return a promise in Json format
        .catch(err => res.status(400).json('Error: ' + err)); // returning the error msg  
    
});


// handling incoming http post request
router.route('/add').post((req, res) => {
    const itemname = req.body.itemname;
    const itemcode = req.body.itemcode;
    const suppliername = req.body.suppliername;

    const newItem = new Item({
        itemname,
        itemcode,
        suppliername,
    });

    newItem.save() // saving new item to the db
        .then(() => res.json('New Item added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    
});

module.exports = router;


