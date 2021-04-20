import React from 'react';
import {Route} from 'react-router-dom'
import { EventList } from './events/EventList';
import { EventProvider } from './events/EventProvider';
import { SearchNavBar } from '../components/nav/Nav'
import { EventDetails } from './events/EventDetails';
import { CartProvider } from './cart/CartProvider';
import { Cart } from './cart/Cart';
import { TicketProvider } from './tickets/TicketProvider';
import { TicketList } from './tickets/TicketList';
import { CreatorEventList } from './events/CreatorEventList';

export const ApplicationViews = props => {
    return (
        <>
            <EventProvider>
                <CartProvider>
                    <TicketProvider>
                        <Route exact path="/events/:event_id(\d+)" render={
                            props => <EventDetails {...props} />
                        } />
                        <Route render={props => <SearchNavBar {...props} />} />
                        <Route exact path="/events" render={
                            props => <CreatorEventList {...props} />
                        } />
                        <Route exact path="/" render={
                            props => <EventList {...props} />
                        } />                    
                        <Route exact path="/cart" render={
                            props => <Cart {...props} />
                        } />
                        <Route exact path="/tickets" render={
                            props => <TicketList {...props} />
                        } />
                    </TicketProvider>
                </CartProvider>
            </EventProvider>
        </>
    )
}