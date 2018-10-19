/* global google */
import React,{Component} from 'react'
import MapContainer from './Map'
import Menu from './Menu'
import './MainPage.css'

/**
 * Holds the Main page container
 * */
class MainPage extends Component
{
    state={
        markers: [
            {name: "Catedral de San Juan Bautista", lat: 18.4656722, lng: -66.1180264, active:true},
            {name: "Paseo de La Princesa", lat: 18.463370, lng: -66.118666,active:true},
            {name: "El Morro", lat: 18.4709583, lng: -66.1236127,active:true}
        ]

    };
    visibilityChanger= (marker,index)=> {

        console.log('Marker: '+ JSON.stringify(marker));

       let newArray = this.state.markers;
        let oldState = marker.active;
        oldState===true ? oldState=false : oldState=true;
        newArray[index].active=oldState;
        console.log(newArray);
        this.setState({
            markers: newArray
        });

        console.log(this.state.markers);

    };
    render() {
        return(
                    <div className='main-container'>
                        <Menu markers={this.state.markers} visibilityChanger={this.visibilityChanger} />
                        <MapContainer markers={this.state.markers} />
                    </div>
                )
    }
}
export default MainPage
