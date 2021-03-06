import React, { Component } from 'react';

import { rentalType , toUpperCase } from './../../../helpers';

class RentailDetailInfo extends Component {
    render() {
        const rental = this.props.rental;
        return (
            <div className='rental'>
                <h2 className={`rental-type ${rental.category}`}>{ rentalType(rental.shared)} {rental.category}</h2>
                <div className="rental-owner">
                    <img src="https://api.adorable.io/avatars/285/abott@adorable.png" alt="owner"/>
                    <span>{rental.user && rental.user.username}</span>
                </div>
                <h1 className='rental-title'>{rental.title}</h1>
                <h2 className='rental-city'>{ toUpperCase(rental.city) }</h2>
                <div className='rental-room-info'>
                    <span><i className='fa fa-building'></i>{rental.bedrooms} bedrooms</span>
                    <span><i className='fa fa-user'></i> {rental.bedrooms + 4} guests</span>
                    <span><i className='fa fa-bed'></i> {rental.bedrooms + 2} beds</span>
                </div>
                <p className='rental-description'>
                    {rental.description}
                </p>
                <hr></hr>
                <div className='rental-assets'>
                    <h3 className='title'>Assets</h3>
                    <div className='row'>
                    <div className='col-md-6'>
                        <span><i className='fa fa-asterisk'></i> Cooling</span>
                        <span><i className='fa fa-thermometer'></i> Heating</span>
                        <span><i className='fa fa-location-arrow'></i> Iron</span>
                    </div>
                    <div className='col-md-6'>
                        <span><i className='fa fa-desktop'></i> Working area</span>
                        <span><i className='fa fa-cube'></i> Washing machine</span>
                        <span><i className='fa fa-cube'></i> Dishwasher</span>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RentailDetailInfo;