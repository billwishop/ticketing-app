import React, {useContext, useEffect, useState} from 'react'
import {EventContext} from './EventProvider'
import {EventCard} from './EventCard'
import './Event.css'


export const CreatorEventList = (props) => {
    const {usersEvents, getUsersEvents} = useContext(EventContext)

    useEffect(() => {
        getUsersEvents()
    }, [])

    return (
        <div className="event--container">
            <main className="event--main">
                <div className="event--grid">
                    {usersEvents.map((e) => {
                        return <EventCard key={e.id} event={e} />
                    })}
                </div>
            </main>
        </div>
    )
}