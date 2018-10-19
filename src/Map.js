import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React,{Component} from 'react'
import './Map.css'

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        markers:[],
        APIKEY:'6286ba4b73755ef30f2e7366ae0c6fb5',
        pictures:[]//Holds the pictures to be rendered later on
    };

getPictures=  (name)=>
{fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + this.state.APIKEY + '&tags='+ name.replace(/\s+/g, '') +'& per_page=10&page=1&format=json&nojsoncallback=1')
    .then(function (response) {
        return response.json();
    })
    .then(function (j) {
        let picArray = j.photos.photo.map((pic) => {

            return 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg';
        });
        this.setState({pictures: picArray});
    }.bind(this));};
    componentDidMount() {
        this.setState(
            {
                markers: this.props.markers
            }

        );
        this.getPictures('PaseoLaPrincesa');

    }

    onMarkerClick = (props, marker) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            pictures:[]
        });
        this.getPictures(this.state.selectedPlace.name)};


    onMapClicked = () => {
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
                    {if(marker.active){
                        return(   <Marker key={marker.name} onClick =  {this.onMarkerClick}
                                          position = { {lat:marker.lat, lng:marker.lng} }
                                          name = {marker.name}
                        />)
                    }

                    }
                )}

                <InfoWindow
                    marker = {this.state.activeMarker}
                    visible = {this.state.showingInfoWindow}>
                    
<div>
    <h1>{this.state.selectedPlace.name}</h1>
</div>

                    <div>
                    {

                        this.state.pictures.map((url) => ( //TODO: Add  better aesthetic
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