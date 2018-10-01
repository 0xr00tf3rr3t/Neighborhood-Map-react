import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React,{Component} from 'react'

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };
    render() {
        return (

            <Map google={this.props.google}
                 zoom={14}
                 initialCenter={{
                     lat:18.471103,
                 lng: -66.124498
                 }}
                 onClick={this.onMapClicked}>
                <Marker onClick={this.onMarkerClick}
                position={{lat: 18.463370, lng: -66.118666}}
                name={'Paseo La Princesa'}
                />
                <Marker onClick={this.onMarkerClick}
                        name={'El Morro'} />

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA4mGbTg2azsVzhvMhPRY8pTht8HAcD-5g'
})(MapContainer)