import React from 'react'
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {yearLast} from '../utility/Date'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export const EventCard = ({event}) => {
    const history = useHistory();
    const classes = useStyles();
    console.log(history.location.pathname)
return (
    <Card className={classes.root}
    onClick={()=> {
        if (history.location.pathname === '/events') {
            history.push(`/myevent/${event.id}`)
        } else {
            history.push(`/events/${event.id}`)
        }
    }}>
        <CardActionArea>
        <CardMedia
            className={classes.media}
            image={event.image_url}
            title={event.event_name}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {event.event_name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {event.date} {event.time}
            </Typography>
        </CardContent>
        </CardActionArea>
    </Card>
    );
}
