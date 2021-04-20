import React, {useContext, useEffect, useState} from 'react'
import {EventContext} from './EventProvider'
import {EventCard} from './EventCard'

export const EventList = () => {
    const {events, getEvents} = useContext(EventContext)
    const [filteredEvents, setFilteredEvents] = useState([])

    useEffect(() => {
        getEvents()
    }, [])

    // filter out the logged in user's events for the homepage
    useEffect(() => {
        const otherUsersEvents = events.filter(e => 
            e.organizer !== parseInt(localStorage.getItem("ticketing_user"))
        )
        setFilteredEvents(otherUsersEvents)
    }, [events])


    return (
        <>
        {filteredEvents.map((e) => {
            return <EventCard key={e.id} event={e} />
        })}
        </>
    )
}