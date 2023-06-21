import React, { useState } from 'react'
import './Header.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import LocationMarker from '../LocationMarker/LocationMarker';
import { useTrackIpQuery } from '../../services/IpAddress';
import { skipToken } from '@reduxjs/toolkit/dist/query';


export default function Header() {

    const [inputValue, setInputValue] = useState("");
    const [searchTerm, setSearchTerm] = useState(skipToken)

    
    // conditional fetching
    const {data, error, isLoading} = useTrackIpQuery(searchTerm)   


    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchTerm(inputValue)
    };

    return (
        <>
            <section className="header-container">
                <h1>IP Address Tracker</h1>
                <form className="input-container" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Search for IP address"
                        className="search-input"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit" className="input-arrow">
                        <i
                            className="fa-solid fa-angle-right fa-xl"
                            style={{ color: "#fff" }}
                        ></i>
                    </button>
                </form>

                <div className={data==undefined ? "hide" : "data-container"}>
                {
                    error ? (
                        <>Opps error ocurred</>
                    ) : isLoading ? (
                        <>Loading ...</>
                    ) : data ? (
                        <>
                        <div className="address data-container-items">
                        <p className="data-title">ip address</p>
                        <p className="data">{data.ip}</p>
                    </div>

                    <div className="location data-container-items">
                        <p className="data-title">location</p>
                        <p className="data">{data.location.city},{data.location.region},{data.location.country}</p>
                    </div>

                    <div className="timezone data-container-items">
                        <p className="data-title">timezone</p>
                        <p className="data">{data.location.timezone}</p>
                    </div>

                    <div className="isp data-container-items">
                        <p className="data-title">isp</p>
                        <p className="data">{data.isp}</p>
                    </div>
                        </>
                    ) : null
                }
                </div>
            </section>
            {
                data && data.location && (
                    <MapContainer center={[data.location.lat, data.location.lng]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker position={{lat:data.location.lat, lng:data.location.lng}}/>
            </MapContainer>   
                )
            }       
        </>
    )
}
