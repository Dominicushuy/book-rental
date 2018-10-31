import React, { Component } from 'react';

import { MapWithGeocode } from './../../map/GoogleMap';
import { connect } from 'react-redux';
import * as actions from './../../../actions';

class RentalMap extends Component {

    reloadMapFinish(){
        this.props.dispatch( actions.reloadMapFinish() );
    }

    render() {
        const { location } = this.props;

        
        return (
            <MapWithGeocode
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCpffFx5sZstG6aclYoEnodK4Nj5DF14F4&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                location={location}
                isReloading={this.props.map.isReloading}
                mapLoaded={() => this.reloadMapFinish()}
            />
        );
    }
}

const mapStateTpProps = state =>{

    return{
        map : state.map
    }
}

export default connect(mapStateTpProps)(RentalMap);