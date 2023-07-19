import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import TextField from "./TextField";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const styleByEdit = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log("no good");
  };

  const handleGood = () => {
    setOpen(false);
    console.log("good");
  };

  return (
    <div>
      <Box color="blue" onClick={handleClickOpen} sx={styleByEdit}>
        <SettingsIcon />
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xl"
      >
        <DialogTitle>{"Редагування данних"}</DialogTitle>
        <DialogContent>
          <TextField />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} type="submit" color="error">
            Відмінити
          </Button>
          <Button onClick={handleGood} type="submit" sx={{ color: "#00e676" }}>
            Зберегти
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
