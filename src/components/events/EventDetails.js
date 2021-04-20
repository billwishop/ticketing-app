import React, {useContext, useEffect, useState} from 'react'
import {EventContext} from './EventProvider'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import './Event.css'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { CartContext } from '../cart/CartProvider';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    }));

export const EventDetails = props => {
    const classes = useStyles();
    const {cart, setCart} = useContext(CartContext)
    const {getSingleEvent, singleEvent} = useContext(EventContext)
    const {soldOut, setSoldOut} = useState(false)
    const [open, setOpen] = useState(true)
    const [ticketCount, setTicketCount] = useState(1)

    const addToCart = () => {
        const addition = {
            id: cart.length + 1,
            event: singleEvent.id,
            number_of_tickets: ticketCount
        }
        cart.push(addition)
        setCart(cart)
    }

    useEffect(() => {
        getSingleEvent(parseInt(props.match.params.event_id))
    }, [])

    console.log({ticketCount})
    console.log('cart', cart)

    return (
        <>
        <Dialog open={open} aria-labelledby="form-dialog-title" onClose={() => {props.history.push("/")}}>
        <DialogTitle id="form-dialog-title">{singleEvent.event_name}</DialogTitle>
        <DialogContent>
        <div className="image--container">
            <img
                className="event--image"
                src={singleEvent.image_url}
                />
        </div>
        <DialogContentText>
            <h3>Date And Time </h3>
        </DialogContentText>
        <DialogContentText>
            {singleEvent.date}
            {singleEvent.time}
        </DialogContentText>
        <DialogContentText>
            <h3>About this Event </h3>
        </DialogContentText>
        <DialogContentText>
            {singleEvent.description}
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-helper">Tickets</InputLabel>
        <NativeSelect
        onChange={(e)=>{setTicketCount(parseInt(e.target.value))}}
        >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
        </NativeSelect>
        <FormHelperText>Specify the number of tickets</FormHelperText>
        </FormControl>
        <Button  onClick={evt => {
                    evt.preventDefault()
                    addToCart()
                    props.history.push("/")
                }} color="primary">
        Add to Cart
        </Button> 
        </DialogActions>
    </Dialog>
        </>
    )
}