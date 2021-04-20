import React, {useState} from 'react'

export const EventContext = React.createContext()

export const EventProvider = props => {
    const [events, setEvents] = useState([])
    const [homePageEvents, setHPEvents] = useState([])
    const [singleEvent, setSingleEvent] = useState({})
    const [searchTerms, setTerms] = useState("")

    const getHPEvents = () => {
        return fetch("http://localhost:8088/events")
            .then(res => res.json())
            .then((events) => {
                const otherUsersEvents = events.filter(e => 
                    e.organizer !== parseInt(localStorage.getItem("ticketing_user"))
                )
                setHPEvents(otherUsersEvents)
            })
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
        .then(getHPEvents)
    }

    const editEvent = (id, event) => {
        return fetch(`http://localhost:8088/events/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        })
        .then(getHPEvents)
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
                getHPEvents, createEvent, deleteEvent,
                editEvent, getSingleEvent, 
                searchTerms, setTerms, homePageEvents
            }
        }>
            {props.children}
        </EventContext.Provider>
    )
}