import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export function ImageCard(props) {
    const { onLinkClick, onDeleteClick } = props;

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="clothe"
                height="140"
                image={props.url}
            />
            <CardContent>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={onLinkClick}>Go to Page</Button>
                <Button size="small" onClick={onDeleteClick}>Delete</Button>
            </CardActions>
        </Card>
    );
}


