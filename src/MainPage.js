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
    render() {
        return(
                    <div className='main-container'>
                        <Menu/>
                        <MapContainer/>
                    </div>
                )
    }
}
export default MainPage
