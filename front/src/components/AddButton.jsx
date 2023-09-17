import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function AddButton (props){
    const { onAddClick } = props;

    return (
        <Fab size="small" color="secondary" aria-label="add">
            <AddIcon onClick={onAddClick}/>
        </Fab>
    );
}

export { AddButton };
