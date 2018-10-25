import React, { Component } from 'react';

import { MapWithGeocode } from './../../map/GoogleMap';

class RentalMap extends Component {
    render() {
        const { location } = this.props;
        
        return (
            <MapWithGeocode
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCpffFx5sZstG6aclYoEnodK4Nj5DF14F4z&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                location={location}
            />
        );
    }
}

export default RentalMap;