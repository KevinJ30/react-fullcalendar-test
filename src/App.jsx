import './App.css';
import React, {useState, useCallback} from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function App() {
    const [customer, setCustomer] = useState({});
    const [post, setPost] = useState({});
    const [appointment, setAppointment] = useState([
        {
            "id": 1,
             "title" : "something",
             "start" : "2022-01-05T05:30",
             "end" : "2022-01-05T06:30"
        },

        {
            "id": 2,
            "title" : "Mon nouveau client",
            "start" : "2022-01-07"  
        }
    ]);

    const events = useCallback((info, success) => {
        fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(response => response.json())
            .then(customer => {
                setAppointment(appointment)
                success(appointment)
            })
         
    }, [appointment]);

    const handleClickEvent = (info) => {
        fetch('https://jsonplaceholder.typicode.com/todos/' + info.event.id)
            .then(response => response.json())
            .then(customer => {
                setCustomer(customer);
            })

        fetch('https://jsonplaceholder.typicode.com/posts/' + info.event.id)
            .then(response => response.json())
            .then(post => {
                setPost(post);
            })
    };

    const handleReportEvent = () => {
        const events = appointment.map((event) => {
            if(event.id === 2) {
                return {
                    ...event,
                    "start" : "2022-01-06"
                }
            }

            return event;
        })

        setAppointment(events)
    }

    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <div className="shadow col-md-3" style={{marginTop:'4em'}}>
                        { customer &&
                            <div className='row'>
                                <div className="col-md-12">
                                    <div className='customer-title'>
                                        <h4>{ customer.title }</h4>
                                    </div>

                                    <div className='customer-content'>
                                        <p>{  post.body }</p>
                                    </div>

                                    <div className="actions">
                                        <button className='btn btn-warning' onClick={handleReportEvent}>Déplacer rendez-vous</button>
                                    </div>
                                </div>
                            </div> 
                        }
                    </div>
                    <div className="col-md-9">
                    <FullCalendar
                        plugins={[ dayGridPlugin ]}
                        initialView="dayGridMonth"
                        weekends={false}
                        eventSources={[events]}
                        eventClick={handleClickEvent}
                    />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
