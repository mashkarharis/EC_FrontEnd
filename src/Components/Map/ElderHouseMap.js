import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import "./marker.css";
export function ElderHouseMap({homes}) {
  
  const defaultProps = {
    center: {
      lat: 6.92,
      lng: 79.8
    },
    zoom: 7
  };
  const Marker = props => {
    return <div id="parent" >
    <div class="hidden-child" style={{marginLeft:21,width:"200px",background:'white',display:"inline-block", justifyContent:'center',borderRadius:"13px",padding:"10px"}}>
    <a style={{color:"black", fontSize:15, fontWeight:"normal"}}>{props.title}</a>
    <hr class="solid"></hr>
    <a style={{color:"black", fontSize:14, fontWeight:"normal"}}>{props.homeAddress}</a>
    <hr class="solid"></hr>
    <a style={{color:"black", fontSize:13, fontWeight:"normal"}}>{props.phone}</a>

    </div>
   
      <div className="pin"></div>
      <div className="pulse"></div>
      
    </div>
  }

  var markers=[]
  homes.forEach(element => {
    console.log(element.lat)
    console.log(element.lon)
    markers.push( <Marker     lat={element.lat} lng={element.lon} title={element.homeName} homeAddress={element.homeAddress} phone={element.phone}/>)
  });
  
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
         {markers}
      </GoogleMapReact>
    </div>
  );
  
}
//AIzaSyCk-BmW4vQzuFhKrqy_5Lf-tEgS1oMBYxk