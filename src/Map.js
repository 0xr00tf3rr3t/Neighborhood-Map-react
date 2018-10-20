import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, {Component} from 'react'
import './Map.css'

export class MapContainer extends Component {
    render() {
        const markers = this.props.markers;
        return (
            <Map google={this.props.google}
                 zoom={14}
                 initialCenter={{
                     lat: 18.471103,
                     lng: -66.124498
                 }}
                 onClick={this.props.onMapClicked}>
                {
                    markers.map((marker) => {
                            if (marker.active) {

                                return (<Marker key={marker.name} onClick={this.props.onMarkerClick}
                                                position={{lat: marker.lat, lng: marker.lng}}
                                                name={marker.name}
                                />)
                            }
                        }
                    )}
                <InfoWindow
                    marker={this.props.activeMarker}
                    visible={this.props.showingInfoWindow}>

                    <div>{
                        <h1>{this.props.selectedPlace.name}</h1>
                    }
                    </div>

                    <div>
                        {

                            this.props.pictures.map((url) => ( //TODO: Add  better aesthetic
                                    <img className={'marker-picture'} key={url} src={url}/>
                                )
                            )
                        }
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA4mGbTg2azsVzhvMhPRY8pTht8HAcD-5g'
})(MapContainer)