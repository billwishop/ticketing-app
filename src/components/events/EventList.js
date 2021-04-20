import React, {useContext, useEffect, useState} from 'react'
import {EventContext} from './EventProvider'
import {EventCard} from './EventCard'

export const EventList = (props) => {
    const {homePageEvents, getHPEvents, searchTerms} = useContext(EventContext)
    const [searchedEvents, setSearchedEvents] = useState([])
    console.log(searchTerms)
    useEffect(() => {
        getHPEvents()
    }, [])


    useEffect(() => {
        if (searchTerms !== "") {
            const subset = homePageEvents.filter(event => event.event_name.toLowerCase().includes(searchTerms.toLowerCase()) )
            setSearchedEvents(subset)
        } else {
            setSearchedEvents(homePageEvents)
        }
        console.log('yes')
    }, [searchTerms])


    return (
        <>
        {searchedEvents.map((e) => {
            return <EventCard key={e.id} event={e} />
        })}
        </>
    )
}