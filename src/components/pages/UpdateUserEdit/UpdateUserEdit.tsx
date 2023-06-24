import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import TextField from './TextField'
// import handleClick from './SnackBar'


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log('no good');
  };

  const handleGood = () => {
    setOpen(false);
    console.log('good');
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Відредагувати данні користувача
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Редагування данних"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} type='submit'>Відмінити</Button>
          <Button onClick={handleGood} type='submit'>Зберегти</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
