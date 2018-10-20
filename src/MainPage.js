/* global google */
import React, {Component} from 'react'
import MapContainer from './Map'
import Menu from './Menu'
import './MainPage.css'

/**
 * Holds the Main page container
 * */
class MainPage extends Component {
    state = {
        markers: [
            {name: "Catedral de San Juan Bautista", lat: 18.4656722, lng: -66.1180264, active: true},
            {name: "Paseo de La Princesa", lat: 18.463370, lng: -66.118666, active: true},
            {name: "El Morro", lat: 18.4709583, lng: -66.1236127, active: true}
        ],
        APIKEY: '6286ba4b73755ef30f2e7366ae0c6fb5',
        pictures: [],
        selectedPlace: {},
        activeMarker: {},
        showingInfoWindow: false,
    };
    //Gets the pictures from Flickr
    getPictures = (name) => {
        fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + this.state.APIKEY + '&tags=' + name.replace(/\s+/g, '') + '& per_page=10&page=1&format=json&nojsoncallback=1')
            .then(function (response) {
                return response.json();
            }).catch((e)=>console.log(e))
            .then(function (j) {
                let picArray = j.photos.photo.map((pic) => {

                    return 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg';
                });
                this.setState({pictures: picArray});
            }.bind(this)).catch((e)=>{console.log(e)});

    };

    visibilityChanger = (marker, index) => {

        console.log('Marker: ' + JSON.stringify(marker));

        let newArray = this.state.markers;
        let oldState = marker.active;
        oldState === true ? oldState = false : oldState = true;
        newArray[index].active = oldState;
        console.log(newArray);
        this.setState({
            markers: newArray
        });

        console.log(this.state.markers);

    };
    onListClick=(props,marker)=>{
        this.setState({
            selectedPlace:props,
            activeMarker: marker,
            showingInfoWindow:true
    });
        this.getPictures(this.state.selectedPlace.name)
};
    onMarkerClick = (props, marker) => {

        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            pictures: []
        });
        this.getPictures(this.state.selectedPlace.name);
    };

    onMapClicked = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }

    };


    render() {

        return (

            <div className='main-container'>
                <Menu markers={this.state.markers} visibilityChanger={this.visibilityChanger} onListClick={this.onListClick}/>
                <MapContainer markers={this.state.markers} onMarkerClick={this.onMarkerClick} getPictures={this.getPictures}
                              pictures={this.state.pictures} selectedPlace={this.state.selectedPlace} activeMarker={this.state.activeMarker}
                              showingInfoWindow={this.state.showingInfoWindow} onMapClicked={this.onMapClicked}
                />
            </div>
        )
    }

}

export default MainPage
