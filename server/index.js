const express = require('express');
const bodyParser = require('body-parser');

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

mongoose.connect(config.DB_URL, { useNewUrlParser: true } ).then( () =>{
    const fakeDB = new FakeDB();
    // fakeDB.seeDB();
})

//<============================================================================>
//                                    ROUTES
//<============================================================================>
const rentalRoutes = require('./routers/rental');
const userRoutes = require('./routers/users');
const bookingRoutes = require('./routers/bookings');

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log('App is running!');
})