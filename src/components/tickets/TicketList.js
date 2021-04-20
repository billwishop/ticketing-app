import React, {useContext, useEffect, useState} from 'react'
import { TicketCard } from './TicketCard'
import {TicketContext} from './TicketProvider'
import { Link } from "react-router-dom"

export const TicketList = props => {
    const {tickets, getTickets} = useContext(TicketContext)
    const [usersTickets, setUsersTickets] = useState([])

    useEffect(() => {
        getTickets()
    }, [])

    useEffect(() => {
        const loggedInUsersTickets = tickets.filter(t => {
            return t.userId === parseInt(localStorage.getItem("ticketing_user"))
        })
        setUsersTickets(loggedInUsersTickets)
    }, [tickets])

    return (
        <div className="ticket--list">
        <h1>Tickets</h1>
        {usersTickets.length === 0 
        ? <div className="ticket--empty">No tickets to display. 
            <Link to={"/"}> Browse events by clicking here.</Link></div>
            
        : usersTickets.map(ticket => {
            return <TicketCard key={ticket.id} ticket={ticket} />
        })
        }
        </div>
    )
}