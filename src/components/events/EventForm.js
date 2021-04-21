import React, {useContext, useState, useEffect} from 'react'
import {EventContext} from './EventProvider'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export const EventForm = props => {
    const {singleEvent, getSingleEvent, editEvent, 
            eventTypes, createEvent, setSingleEvent, getEventTypes} = useContext(EventContext)

    const [open, setOpen] = useState(true)

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState()

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (date) => {
        setSelectedTime(date);
    };

    const [event, setEvent] = useState({
        location:"",
        event_name:"",
        description:"",
        date:"",
        time:"",
        ticket_quantity:"",
        event_typeId:"",
        refund_policy:"",
        image_url:""
    })

    const editMode = props.match.params.hasOwnProperty('event_id')

    useEffect(() => {
        getEventTypes()
        if (editMode) {
            getSingleEvent(parseInt(props.match.params.event_id))
        }
    }, [])

    const handleControlledInputChange = e => {
        const newEvent = Object.assign({}, event)
        newEvent[e.target.name] = e.target.value
        setEvent(newEvent)
        console.log(e)
    }

    const constructEvent = () => {
        if (editMode) {
            editEvent({
                id: singleEvent.id,
                organizer: parseInt(localStorage.getItem("ticketing_user")),
                location: event.location,
                event_name: event.event_name,
                description: event.description,
                date: event.date,
                time: event.time,
                ticket_quantity: event.ticket_quantity,
                event_typeId: event.event_typeId,
                refund_policy: event.refund_policy,
                image_url: event.image_url
            }) 
        } else {
            createEvent({
                organizer: parseInt(localStorage.getItem("ticketing_user")),
                location: event.location,
                event_name: event.event_name,
                description: event.description,
                date: selectedDate,
                time: selectedTime,
                ticket_quantity: event.ticket_quantity,
                event_typeId: event.event_typeId,
                refund_policy: event.refund_policy,
                image_url: event.image_url
            })
        }
    }


    console.log({editMode})
    console.log(editMode ?singleEvent.location : "")

    return (
        <div className="event--form">
            <Dialog open={open} onClose={()=>setOpen(!open)} aria-labelledby="form-dialog-title" disableBackdropClick disableEscapeKeyDown>
                <DialogTitle id="form-dialog-title">{editMode ? "Update Event" : "Add Event"}</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Location"
                    type="text"
                    name="location"
                    fullWidth
                    required={true}
                    defaultValue={editMode ?singleEvent.location :""}
                    onChange={handleControlledInputChange}
                />
                <TextField
                    margin="dense"
                    label="Event Name"
                    type="text"
                    name="event_name"
                    fullWidth
                    required={true}
                    defaultValue={editMode ?singleEvent.event_name :""}
                    onChange={handleControlledInputChange}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    type="text"
                    name="description"
                    fullWidth
                    required={true}
                    defaultValue={editMode ?singleEvent.description :""}
                    onChange={handleControlledInputChange}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Time picker"
                            value={selectedTime}
                            onChange={handleTimeChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
                <TextField
                    margin="dense"
                    label="Ticket Quantity"
                    type="number"
                    name="ticket_quantity"
                    fullWidth
                    required={true}
                    defaultValue={editMode ?singleEvent.ticket_quantity :""}
                    onChange={handleControlledInputChange}
                />
                <TextField
                    margin="dense"
                    label="Refund Policy"
                    type="text"
                    name="refund_policy"
                    fullWidth
                    required={true}
                    defaultValue={editMode ?singleEvent.refund_policy :""}
                    onChange={handleControlledInputChange}
                />
                <div className="event--select">
                    <InputLabel id="event--select--label">Select Tenant</InputLabel>
                    <Select
                    labelId="event--select--label"
                    id="event--select"
                    required={true}
                    onChange={handleControlledInputChange}
                    name="event_typeId"
                    >
                    <MenuItem>Select Event Type</MenuItem>
                            {eventTypes.map(t => {
                                return (
                                <MenuItem value={t.id} key={t.id}>
                                    {t.event_type}
                                </MenuItem>)})}
                    </Select>
                </div>
                <TextField
                    margin="dense"
                    label="Image URL"
                    type="text"
                    name="image_url"
                    fullWidth
                    required={true}
                    defaultValue={editMode ?singleEvent.image_url :""}
                    onChange={handleControlledInputChange}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={() => {
                    setSingleEvent([])
                    props.history.push("/events")
                }} color="primary">
                    Cancel
                </Button>
                <Button type="submit" onClick={evt => {
                            evt.preventDefault()
                            constructEvent()
                            props.history.push("/events")
                        }} color="primary">
                {editMode ? "Save Updates" : "Add Event"}
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}