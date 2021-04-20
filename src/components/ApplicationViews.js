import React from 'react';
import {Route} from 'react-router-dom'
import { EventList } from './events/EventList';
import { EventProvider } from './events/EventProvider';
import { SearchNavBar } from '../components/nav/Nav'
import { EventDetails } from './events/EventDetails';
import { CartProvider } from './cart/CartProvider';
import { Cart } from './cart/Cart';

export const ApplicationViews = props => {
    return (
        <>
            <EventProvider>
                <CartProvider>
                    <Route exact path="/events/:event_id(\d+)" render={
                        props => <EventDetails {...props} />
                    } />
                    <Route render={props => <SearchNavBar {...props} />} />
                    <Route exact path="/" render={
                        props => <EventList {...props} />
                    } />
                    <Route exact path="/cart" render={
                        props => <Cart {...props} />
                    } />
                </CartProvider>
            </EventProvider>
        </>
    )
}