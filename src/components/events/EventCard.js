import React, {useContext} from 'react'
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {yearLast, getTime} from '../utility/Date'
import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {EventContext} from './EventProvider'

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
    },
    media: {
        height: 140,
    },
});

export const EventCard = ({event}) => {
    const history = useHistory();
    const classes = useStyles();

    const {getSingleEvent} = useContext(EventContext)

    return (
    <Card className={classes.root}>
        <CardActionArea>
        {
                history.location.pathname === '/events'
                ? ''
                : 
                <CardMedia
                    className={classes.media}
                    image={event.image_url}
                    title={event.event_name}
                />
            }
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2" 
            onClick={()=> {
                if (history.location.pathname === '/events') {
                    history.push(`/myevent/${event.id}`)
                } else {
                    history.push(`/events/${event.id}`)
                }
            }}>
            {event.event_name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {yearLast(event.date)} {getTime(event.time)}
            </Typography>
            {
                history.location.pathname === '/events'
                ? 
                <>
                <Divider />
                <Button onClick={evt => {
                    getSingleEvent(event.id)
                    .then(history.push(`/edit/${event.id}`))
                }} color="primary">
                Edit
                </Button>
                </>
                : ''
            }
        </CardContent>
        </CardActionArea>
    </Card>
    );
}
