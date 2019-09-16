import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

export default function SimpleSnackbar(props) {
    const { message, open, handleClose } = props
    return (
        <div>
        <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            ContentProps={{
            'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{message}</span>}

        />
        </div>
  );
}
