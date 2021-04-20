import React, {useContext, useState} from 'react'
import { CartItem } from './CartItem'
import { CartContext } from './CartProvider'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TicketContext } from '../tickets/TicketProvider';

export const Cart = props => {
    const {cart, setCart, setCartLength} = useContext(CartContext)
    const {createTicket} = useContext(TicketContext)

    const clearCart = () => {
        setCart([])
        setCartLength(0)
    }

    const handleCheckout = () => {
        cart.forEach(item => {
            var i
            for (i=0;; i++) {
                let ticket = {
                    event: item.event,
                    attendee: parseInt(localStorage.getItem("ticketing_user"))
                }
                createTicket(ticket)
                if (i === item.number_of_tickets - 1) {
                    clearCart()
                    break
                }
                
            }
            
        })
    }

    return (
        <div className="cart">
            <Dialog open={true} aria-labelledby="form-dialog-title" onClose={() => {props.history.push("/")}}>
                <DialogTitle id="form-dialog-title">Order Summary</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    {cart.map((item) => {
                            return <CartItem key={item.id} item={item} />
                        })}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button  onClick={evt => {
                            evt.preventDefault()
                            setCart([])
                            setCartLength(0)
                            props.history.push("/")
                        }} color="secondary">
                Empty Cart
                </Button> 
                <Button  onClick={evt => {
                            evt.preventDefault()
                            handleCheckout()
                            props.history.push("tickets")
                        }} color="primary">
                Checkout
                </Button> 
                </DialogActions>
            </Dialog>
        </div>
    )
}