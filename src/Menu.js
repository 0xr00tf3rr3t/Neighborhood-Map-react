import React, {Component} from 'react'
import "./Menu.css"

class Menu extends Component {
  
    render() {
        const markers = this.props.markers;
        return (
            <ul className={'menu-container'}>
                {
                    markers.map((marker, index) => {
                        return (
                            <div className={'menu-item-container'}>
                                <li key={marker.lat} className='menu-item' onClick={() => {

                                    this.props.onListClick(marker);

                                }
                                }
                                > {marker.name} </li>
                                <div className={"toggleBtn"} onClick={() => {
                                    console.log(marker.active);
                                    this.props.visibilityChanger(marker, index);
                                }
                                }>

                                </div>
                            </div>

                        )
                    })
                }
            </ul>
        )
    }
}


export default Menu