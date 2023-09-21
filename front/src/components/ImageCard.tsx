import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export function ImageCard(props) {
    const { shop_url, img_path, clothe_id, handleDelete, handleAddClick } = props;

    const handleLink = (url) => {
        window.open(shop_url, '_blank');
    };


    return (
        <Card sx={{ minWidth: 120 }}>
            <CardMedia
                component="img"
                alt="clothe"
                height="140"
                image={img_path}
                sx={{ objectFit: 'contain' }}
            />
            <CardContent>
            </CardContent>
            <CardActions
            sx={{ justifyContent: 'space-between' }}
            >
                <OpenInNewIcon  onClick={handleLink}>Page</OpenInNewIcon>
                <DeleteSweepIcon  onClick={() => handleDelete(clothe_id)}>Delete</DeleteSweepIcon>
            </CardActions>
        </Card>
    );
}


