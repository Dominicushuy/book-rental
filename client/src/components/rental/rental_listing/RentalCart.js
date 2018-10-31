import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { rentalType  } from '../../../helpers';

class RentalCard extends Component {

    render() {
        const rental = this.props.rental;

        return (
            <div className='col-md-3 col-xs-6'>
            <Link className='rental-detail-link' to={`/rentals/${rental._id}`}>
              <div className='card bwm-card'>
                <img className='card-img-top' style={{maxHeight:"165px"}}  src={rental.image} alt={rental.title}></img>
                <div className='card-block'>
                  <h6 className={`card-subtitle ${rental.category}`}> {rentalType(rental.share)} {rental.category} &#183; {rental.city}</h6>
                  <h4 className='card-title'>{rental.title}</h4>
                  <p className='card-text'>${rental.dailyRate} per Night &#183; Free Cancelation</p>
                </div>
              </div>
            </Link>
          </div>
        );
    }
}

export default RentalCard ;