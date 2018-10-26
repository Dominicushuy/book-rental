import React, { Component } from 'react';

import RentalList from './RentalList';

import { toUpperCase } from './../../../helpers';

import { connect } from "react-redux";
import * as actions from './../../../actions';


class RentalSearch extends Component {
    constructor(){
        super();
        this.state = {
            searchedCity : "",
            title:""
        }
    }

    componentWillMount(){
        this.searchRentalsByCity();
    }

    componentDidUpdate(prevProps){
        const currentUrlParam = this.props.match.params.city;
        const prevUrlParam = prevProps.match.params.city;

        if (currentUrlParam !== prevUrlParam) {
            this.searchRentalsByCity();
        }
    }

    searchRentalsByCity = () =>{
        const searchedCity = this.props.match.params.city;
        this.setState({ searchedCity });

        this.props.dispatch( actions.fetchRentals(searchedCity) );
    }

    renderTitle = () =>{
        const { errors , data } = this.props.rentals;
        const { searchedCity } = this.state;
        let title = '';

        if(errors.length > 0){
            title = errors[0].detail;
        }

        if(data.length > 0) {
            title = `Your Home in City of ${toUpperCase(searchedCity)}`;
        }

       return title;
    }

    render() {
        return (
            <section>
                <RentalList
                    title={this.renderTitle()} 
                    rentals={this.props.rentals.data} 
                />
            </section>
        );
    }
}

const mapStateToProps = state =>{
    return {
        rentals : state.rentals
    }
}

export default connect(mapStateToProps)(RentalSearch) ;