import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export function ImageCard(props) {
    const { shop_url, img_path, clothe_id, handleDelete, handleAddClick } = props;

    const handleLink = (url) => {
        window.open(url, '_blank');
    };


    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="clothe"
                height="140"
                image={img_path}
            />
            <CardContent>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleLink}>Go to Page</Button>
                <Button size="small" onClick={() => handleDelete(clothe_id)}>Delete</Button>
            </CardActions>
        </Card>
    );
}


