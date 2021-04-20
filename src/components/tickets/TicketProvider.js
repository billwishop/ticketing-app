import React, {useState} from 'react'

export const TicketContext = React.createContext()

export const TicketProvider = props => {
    const [tickets, setTickets] = useState([])

    const getTickets = () => {
        return fetch("http://localhost:8088/tickets/?_expand=event&_expand=user")
            .then(r => r.json())
            .then(setTickets)
    }

    const createTicket = ticket => {
        return fetch("http://localhost:8088/tickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
    }

    return (
        <TicketContext.Provider value={
            {
                tickets, getTickets, createTicket
            }
        }>
            {props.children}
        </TicketContext.Provider>
    )
}