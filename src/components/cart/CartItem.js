import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        minWidth: 345
    },
    media: {
        height: 140,
    },
});

export const CartItem = ({item}) => {
    const classes = useStyles();
return (
    <Card className={classes.root}>
        <CardActionArea>
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {item.event_name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            Ticket Quantity: {item.number_of_tickets}
            </Typography>
        </CardContent>
        </CardActionArea>
    </Card>
    );
}