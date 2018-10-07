import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React,{Component} from 'react'

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        markers:[],
        APIKEY:'6286ba4b73755ef30f2e7366ae0c6fb5',
        pictures:[]
    };
componentDidMount() {
    this.setState({
            markers: [
                {name: "Catedral de San Juan Bautista", lat: 18.4656722, lng: -66.1180264},
                {name: "Paseo de La Princesa", lat: 18.463370, lng: -66.118666},
                {name: "El Morro", lat: 18.4709583, lng: -66.1236127}
            ]
        }
    );
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + this.state.APIKEY + '&tags=nyc&per_page=10&page=1&format=json&nojsoncallback=1')
        .then(function (response) {
            return response.json();
        })
        .then(function (j) {
            alert(JSON.stringify(j));
            let picArray = j.photos.photo.map((pic) => {

                return 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg';
            });
            this.setState({pictures: picArray});
        }.bind(this));
}

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    };

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };


    render() {
        const markers = this.state.markers;
        return (
            <Map google={this.props.google}
                 zoom={14}
                 initialCenter={{
                     lat:18.471103,
                 lng: -66.124498
                 }}
                 onClick={this.onMapClicked}>

                {
                    markers.map((marker)=>

                    <Marker key={marker.name} onClick =  {this.onMarkerClick}
                            position = { {lat:marker.lat, lng:marker.lng} }
                            name = {marker.name}
                    />
                )}

                <InfoWindow
                    marker = {this.state.activeMarker}
                    visible = {this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        <div>
                            {

                                this.state.pictures.map((url)=>(

                                    <img key={url} src={url}/>
                                    )
                                )
                            }
                    </div>
                    </div>
                </InfoWindow>

            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA4mGbTg2azsVzhvMhPRY8pTht8HAcD-5g'
})(MapContainer)