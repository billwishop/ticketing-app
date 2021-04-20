import React from 'react';
import {Route} from 'react-router-dom'
import { EventList } from './events/EventList';
import { EventProvider } from './events/EventProvider';

export const ApplicationViews = props => {
    console.log('hello from applicationViews')
    return (
        <>
            <EventProvider>
                <Route exact path="/" render={
                    props => <EventList {...props} />
                } />
            </EventProvider>
        </>
    )
}