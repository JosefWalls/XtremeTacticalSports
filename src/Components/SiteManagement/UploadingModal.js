import React, {useState} from 'react';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Loop } from '@material-ui/icons';

function getModalStyle(){
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    }
};

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}))

function ImageUploading({stateOfDisplay, message}){

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle());
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <Modal open={stateOfDisplay} onClose={stateOfDisplay}>
                <div style={modalStyle} className={classes.paper}>
                    <h1>{message}.....<Loop/></h1>
                </div>
            </Modal>
        </div>
    )
};

export default ImageUploading;