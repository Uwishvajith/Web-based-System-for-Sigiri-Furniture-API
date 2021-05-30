const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;


mongoose.connect(URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection Success!");
})


// FINANCIAL_ROUTES

const postRoutes = require("./routes/posts.js");
const billRoutes = require("./routes/bills.js");
const payment = require("./routes/payments.js");
const salary = require("./routes/salary.js");
const ledger = require("./routes/ledger.js");


app.use(postRoutes);
app.use(billRoutes);
app.use(payment);
app.use(salary);
app.use(ledger);


// ORDER_ROUTES

const customerRouter = require("./routes/customerProfile.js");
const orderRouter = require("./routes/orders.js");
const orderItemRouter= require("./routes/orderItems.js");



app.use("/customer",customerRouter);//table name is created at this point
app.use("/order",orderRouter);
app.use("/orderItem",orderItemRouter);


// PRODUCT_ROUTES

const addRouter = require("./routes/addProduct.js");
const readRouter = require("./routes/readProduct.js");
const updateRouter = require("./routes/updateProduct.js");
const deleteRouter = require("./routes/deleteProduct.js");

app.use("/products",addRouter);
app.use("/products",readRouter);
app.use("/products",updateRouter);
app.use("/products",deleteRouter);


// PROMOTION_ROUTES

const promotionRouter = require("./routes/promotions.js");
const productpriceRouter = require("./routes/productprices.js");

app.use("/promotion", promotionRouter);//database table name(route)
app.use("/productprice", productpriceRouter);


// SUPPLIER_ROUTES

const supplierRouter = require("./routes/Suppliers.js");
const tenderRounter = require("./routes/Tenders.js");

app.use("/Supplier",supplierRouter);
app.use("/Tender", tenderRounter);

// TRANSPORT_ROUTES

const VehicleRouter = require("./routes/vehicles.js");
const MaintenanceRouter = require("./routes/Maintenances.js");
const TransportDetailRouter = require("./routes/TransportDetails.js");
const DriverRouter = require("./routes/Drivers.js")

app.use("/vehicle",VehicleRouter);
app.use("/Maintenance",MaintenanceRouter);
app.use("/TransportDetail",TransportDetailRouter);
app.use("/Driver",DriverRouter);


//EMPLOYEE_ROUTES

const userRoutes = require("./controller/attendanceController.js");
const empRoutes = require("./controller/employeeController.js");
const leaveRoutes = require("./controller/leaveController.js");

app.use("/api", userRoutes);
app.use("/api", empRoutes);
app.use("/api", leaveRoutes);

// //INVENTORY_ROUTES

const inventoryRouter  = require('./routes/inventory');
const itemsRouter = require('./routes/items');

app.use('/inventories', inventoryRouter); // using these files
app.use('/items', itemsRouter);

//LOGIN ROUTES
const loginRouter = require("./routes/login.js");
app.use("/login",loginRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`)
});

