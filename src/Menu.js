import React,{Component} from 'react'
import "./Menu.css"

class  Menu extends Component {
    constructor(props){
        super(props);
this.state = {
    markers: []
};


    }


    componentDidMount() {
        this.setState(
            {
                markers: this.props.markers
            }
        )
    }

    render() {
        const markers = this.state.markers;
        return (
           <ul className={'menu-container'}>
               {
                   markers.map((marker,index) => {
                       return (
                           <li key={marker.lat} className='menu-item' onClick={()=>{
                               console.log(marker.active);
                               this.props.visibilityChanger(marker,index);
                           }
                           }
                           > {marker.name} </li>
                       )
                   })
               }
           </ul>
        )
    }
}


export default Menu