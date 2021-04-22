import React, {useState} from 'react'

export const EventContext = React.createContext()

export const EventProvider = props => {
    const [events, setEvents] = useState([])
    const [homePageEvents, setHPEvents] = useState([])
    const [usersEvents, setUsersEvents] = useState([])
    const [singleEvent, setSingleEvent] = useState({})
    const [searchTerms, setTerms] = useState("")
    const [eventTypes, setEventTypes] = useState([])

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

    const getUsersEvents = () => {
        return fetch("http://localhost:8088/events")
            .then(res => res.json())
            .then((events) => {
                const loggedInUserEvents = events.filter(e => 
                    e.organizer === parseInt(localStorage.getItem("ticketing_user"))
                )
                setUsersEvents(loggedInUserEvents)
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

    const editEvent = (event) => {
        return fetch(`http://localhost:8088/events/${event.id}`, {
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

    const getEventTypes = () => {
        return fetch('http://localhost:8088/eventtypes')
            .then(r => r.json())
            .then(setEventTypes)
    }

    return (
        <EventContext.Provider value={
            {
                events, singleEvent, setEvents, 
                getHPEvents, createEvent, deleteEvent,
                editEvent, getSingleEvent, setSingleEvent,
                searchTerms, setTerms, homePageEvents,
                getUsersEvents, usersEvents, setUsersEvents,
                eventTypes, getEventTypes
            }
        }>
            {props.children}
        </EventContext.Provider>
    )
}