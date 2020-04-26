import React, { FC, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  DialogContent,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { updateSession, setDisplayName } from "../../store/system/actions";

export interface UsernameModalProps {
  open: boolean;
  toggleOpen: () => void;
}

const UsernameModal: FC<UsernameModalProps> = (props) => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleUsernameClose = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    if (event && username !== "") {
      dispatch(setDisplayName(username));
    }
    props.toggleOpen();
  };
  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Username</DialogTitle>
      <form onSubmit={handleUsernameClose}>
        <DialogContent>
          <DialogContentText>
            Choose an username that will help others recognize you.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="usernameValue"
            name="usernameValue"
            label="Username"
            type="username"
            value={username}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUsernameClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={handleUsernameClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UsernameModal;
