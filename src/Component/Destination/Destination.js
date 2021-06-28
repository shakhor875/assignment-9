import React from 'react';
import { useHistory, useParams } from 'react-router';
import SimpleMap from '../Map/Map';
import './Destination.css'

const Destination = () => {

    const {id} = useParams();
    const history = useHistory();

    const handleBook = () => {
        history.push (`/BookNow/${id}`)
    }
    return (
        <section className="container">
            <div className="row">
                <div className="col-md-4 mt-5 p-5 destination">
                   <form>
                       <label>Pick to</label>
                       <input  className="form-control" type="text" placeholder="Dhanmondi" /><br /><br />
                       <label>Pick From</label><br />
                       <input className="form-control" type="text" placeholder="Mirpur" /><br /><br />
                       <label>Date</label><br />
                       <input type="date" className="form-control" /><br /><br />
                       <button className="bg-info form-control text-white" onClick={() => handleBook()}>Search</button>
                   </form>
                </div>

                <div className="col-md-8 mt-5">
                    <SimpleMap/>
                </div>

            </div>

        </section>
    );
};

export default Destination;