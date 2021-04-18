import {Route, Redirect} from 'react-router-dom'
import {ApplicationViews} from './ApplicationViews'
import {Login} from "./auth/Login"
import {Register} from "./auth/Register"

export const TicketingApp = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("ticketing_user")) {
                return (
                    <>
                        <Route render={props => <ApplicationViews {...props} />} />
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />
        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
    </>
)
