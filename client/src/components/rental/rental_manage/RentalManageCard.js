import React, { Component } from 'react';
import { toUpperCase, pretifyDate } from '../../../helpers';
import { Link } from 'react-router-dom';

class RentalManageCard extends Component {
    constructor() {
        super();
    
        this.state = {
          wantDelete: false
        }
    }

    showDeleteMenu = () =>{
        this.setState({
            wantDelete : true
        })
    }

    closeDeleteMenu = () =>{
        this.setState({
            wantDelete : false
        })
    }

    deleteRental = (id, index) =>{
        this.setState({ wantDelete:false });
        this.props.deleteRental( id, index );
    }

    render() {
        const { rental , modal , rentalIndex } = this.props;
        const { wantDelete } =this.state;

        const deleteClass = wantDelete ? 'toBeDeleted' : '';

        return (
            <div className='col-md-4'>
                <div className={`card text-center ${deleteClass}`}>
                    <div className='card-block'>
                        <h3 className='card-title'>{rental.title}</h3>
                        <h4 style={{fontSize:'15px'}} >{toUpperCase(rental.city)}</h4>
                        <Link className='btn btn-bwm' to={`/rentals/${rental._id}`}>Go to Rental</Link>
                        { rental.bookings && rental.bookings.length > 0 && modal }
                    </div>
                    <div className='card-footer text-muted'>
                        Created at {pretifyDate(rental.createdAt)}
                        { !wantDelete &&
                        <React.Fragment>
                            <button onClick={() => { this.showDeleteMenu() }} className='btn btn-danger'> Delete </button>
                            <Link className='btn btn-warning' to={{pathname: `/rentals/${rental._id}/edit`, state: { isUpdate: true }}}> Edit </Link>
                        </React.Fragment>
                        }
                        { wantDelete &&
                            <div className='delete-menu'>
                                Do you confirm?
                                <button onClick={() => {this.deleteRental(rental._id, rentalIndex)}} className='btn btn-danger'> Yes </button>
                                <button onClick={() => { this.closeDeleteMenu() }} className='btn btn-success'> No </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default RentalManageCard;