import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert, Color } from "@material-ui/lab";

export const Toast: React.FC<{
  open: boolean;
  onClose(): void;
  severity: Color;
}> = ({ open, onClose, children, severity }) => {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity}>
        {children}
      </Alert>
    </Snackbar>
  );
};
