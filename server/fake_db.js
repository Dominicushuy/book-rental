const Rental = require('./models/rental');
const User = require('./models/user');
const fakeDbData = require('./data.json');
const Booking = require('./models/booking');

class FakeDB {
    constructor(){
        this.rentals = fakeDbData.rentals;
        this.users = fakeDbData.users;   
    }

    async cleanDB(){
        await User.remove({});
        await Rental.remove({});
        await Booking.remove({});
    }

    pushRentalToDB(){
        const user = new User( this.users[0] ); 
        const user1 = new User( this.users[1] );

        this.rentals.forEach( (rental) =>{
            const newRental = new Rental(rental);
            
            newRental.user = user;
            user.rentals.push( newRental );
            newRental.save();
        })

        user.save();
        user1.save();
    }

    async seeDB(){
        await this.cleanDB();
        this.pushRentalToDB();
    }
}

module.exports = FakeDB;