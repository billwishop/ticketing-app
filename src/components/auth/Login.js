import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

export const Login = props => {
    const username = useRef()
    const password = useRef()
    const existDialog = useRef()
    const passwordDialog = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?username=${username}`)
            .then(r => r.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = e => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists && exists.password === password.current.value) {
                    localStorage.setItem("ticketing_user", exists.id)
                    props.history.push("/")
                } else if (exists && exists.password !== password.current.value) {
                    passwordDialog.current.showModal()
                } else if (!exists) {
                    existDialog.current.showModal()
                }
            })
    }
    console.log(username)

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>                
            </dialog>
            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Password does not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>                
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Ticketing App</h1>
                    <h3>Please sign in</h3>
                    <input ref={username} type="username"
                            id="username"
                            className="form-control"
                            placeholder="username"
                            required 
                            autoFocus />
                    <input ref={password} type="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            required />
                    <button type="submit">
                        Sign in
                    </button>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )

}