import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";
import { Save } from "@material-ui/icons";
import { API_URL_KEY } from "../api";
import { Alert } from "@material-ui/lab";
export const ApiUrlSetting = () => {
  const [url, setUrl] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const submit = () => {
    localStorage.setItem(API_URL_KEY, url);
    setOpen(true);
  };
  React.useEffect(() => {
    const url = localStorage.getItem(API_URL_KEY);
    if (url) {
      setUrl(url);
    }
  }, []);
  return (
    <Box mt={3}>
      <Card>
        <CardHeader title="Api Url" />
        <CardContent>
          <TextField
            label="API URL"
            placeholder="https://your-api.com/"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          ></TextField>
          <Box m={1}></Box>
          <Button variant="outlined" onClick={submit}>
            <Save />
          </Button>
        </CardContent>
      </Card>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Neue url gespeichert
        </Alert>
      </Snackbar>
    </Box>
  );
};
