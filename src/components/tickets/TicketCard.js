import React from 'react'
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';


const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        marginBottom: 20
    },
    media: {
        height: 140,
    }
});

export const TicketCard = ({ticket}) => {
    const classes = useStyles();
    const history = useHistory();

return (
    <Card className={classes.root}
    onClick={()=> {
        history.push(`/events/${ticket.event.id}`)
    }}>
        <CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                {ticket.event.event_name}
                </Typography>
                <Divider />
                <Typography gutterBottom variant="h6" component="h3">
                General Admission
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {ticket.event.date} {ticket.event.time}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {ticket.user.first_name} {ticket.user.last_name}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
    );
}