import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker, faMapMarkerAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router';
import fakeData from '../../FakeData/FakeData.json';
import './BookNow.css'
import SimpleMap from '../Map/Map';
const BookNow = () => {
    const { id } = useParams();

    const transport = fakeData.find(transport => transport.id === id);
    const { location1, location2, image, name, capacity, cost1, cost2, cost3 } = transport;
    return (
        <section className="container">
            <div className="row">

                <div className="Book-detail col-md-4 mt-5 p-5">
                    <div className="location-name p-3">
                        <h5><span><FontAwesomeIcon icon={faMapMarker} /></span>{location1}</h5>
                        <h5><span><FontAwesomeIcon icon={faMapMarkerAlt} />{location2}</span></h5>
                    </div>

                    <div className="transport-quality p-2">
                        <span className="transport-image"><img src={image} alt=".." /></span>
                        <span className="transport-name">{name}</span>
                        <span className="transport-capacity">
                            <span ><FontAwesomeIcon icon={faUserFriends} /> </span>
                            {capacity}
                        </span>
                        <span className="transport-cost">{cost1}</span>
                    </div>

                    <div className="transport-quality p-2">
                        <span className="transport-image"><img src={image} alt=".." /></span>
                        <span className="transport-name">{name}</span>
                        <span className="transport-capacity">
                            <span ><FontAwesomeIcon icon={faUserFriends} /> </span>
                            {capacity}</span>
                        <span className="transport-cost">{cost2}</span>
                    </div>

                    <div className="transport-quality p-2">
                        <span className="transport-image"><img src={image} alt=".." /></span>
                        <span className="transport-name">{name}</span>
                        <span className="transport-capacity">
                            <span ><FontAwesomeIcon icon={faUserFriends} /> </span>
                            {capacity}</span>
                        <span className="transport-cost">{cost3}</span>
                    </div>
                </div>

                <div className="col-md-8 mt-5">
                   <SimpleMap/>
                </div>
            
            </div>
        </section>
    );
};

export default BookNow;