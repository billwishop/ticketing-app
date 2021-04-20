import React from 'react';
import {Route} from 'react-router-dom'
import { EventList } from './events/EventList';
import { EventProvider } from './events/EventProvider';
import { SearchNavBar } from '../components/nav/Nav'

export const ApplicationViews = props => {
    console.log('hello from applicationViews')
    return (
        <>
            <EventProvider>
                <Route render={props => <SearchNavBar {...props} />} />
                <Route exact path="/" render={
                    props => <EventList {...props} />
                } />
            </EventProvider>
        </>
    )
}