const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

//<============================================================================>
//                                    EXPRESS
//<============================================================================>
const app = express();
app.use(bodyParser.json())


//<============================================================================>
//                                    MODELS
//<============================================================================>
const RenTal = require('./models/rental');


//<============================================================================>
//                                    DATABASE
//<============================================================================>
const mongoose = require('mongoose');
const config = require('./config/dev');

const FakeDB = require('./fake_db');

mongoose.connect("http:mongodb://localhost:27017/Book-rental", { useCreateIndex: true , useNewUrlParser: true } ).then( () =>{
  // const fakeDB = new FakeDB();
  // fakeDB.seeDB();
})

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });
  

//<============================================================================>
//                                    ROUTES
//<============================================================================>
const rentalRoutes = require('./routers/rental');
const userRoutes = require('./routers/users');
const bookingRoutes = require('./routers/bookings');
const imageUploadRoutes = require('./routers/image-upload');
const paymentRoutes = require('./routers/payment');

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/', imageUploadRoutes);
app.use('/api/v1/payments', paymentRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log('App is running!');
})