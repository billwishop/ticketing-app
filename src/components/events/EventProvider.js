import React, {useState} from 'react'

export const EventContext = React.createContext()

export const EventProvider = props => {
    const [events, setEvents] = useState([])
    const [singleEvent, setSingleEvent] = useState({})

    const getEvents = () => {
        return fetch("http://localhost:8088/events")
            .then(res => res.json())
            .then(setEvents)
    }

    const createEvent = event => {
        return fetch("http://localhost:8088/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        })
    }

    const deleteEvent = id => {
        return fetch(`http://localhost:8088/events/${id}`, {
            method: "DELETE"
        })
        .then(getEvents)
    }

    const editEvent = (id, event) => {
        return fetch(`http://localhost:8088/events/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        })
        .then(getEvents)
    }

    const getSingleEvent = id => {
        return fetch(`http://localhost:8088/events/${id}`)
            .then(r => r.json())
            .then(setSingleEvent)
    }

    return (
        <EventContext.Provider value={
            {
                events, singleEvent, setEvents, 
                getEvents, createEvent, deleteEvent,
                editEvent, getSingleEvent
            }
        }>
            {props.children}
        </EventContext.Provider>
    )
}