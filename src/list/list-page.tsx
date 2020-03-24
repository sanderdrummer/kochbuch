import React from "react";
import { useListItems } from "./list-hooks";
import {
  ListItem,
  ListItemText,
  SwipeableDrawer,
  List,
  Divider,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Checkbox
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { BottomRightFab } from "../common";

import { ListForm } from "./list-form";
import { clearList, updateListItem } from "../db";

const ClearListDialog: React.FC<{ onClearList(): void }> = ({
  onClearList
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <Button onClick={handleOpen}>Liste löschen</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="clear-list-dialog-title"
      >
        <DialogTitle id="clear-list-dialog-title">
          Die Einkaufsliste leeren ?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            nein
          </Button>
          <Button
            onClick={async () => {
              try {
                await clearList();
                onClearList();
                handleClose();
              } catch (e) {
                console.log(e);
              }
            }}
            color="primary"
            autoFocus
          >
            ja
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const ListPage = () => {
  const { list, fetchList } = useListItems();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <List>
        {list.map(item => (
          <ListItem
            button
            onClick={async () => {
              await updateListItem({ ...item, inBasket: !item.inBasket });
              fetchList();
            }}
            key={item.title}
          >
            <ListItemText>{item.title}</ListItemText>
            <Checkbox
              checked={item.inBasket}
              inputProps={{
                "aria-label": `${item.title} ist im Einkaufswagen`
              }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      {list.length > 0 && (
        <Box mt={4}>
          <ClearListDialog onClearList={fetchList} />
        </Box>
      )}
      <SwipeableDrawer
        anchor="top"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <ListForm
          onCompleted={() => {
            setOpen(false);
            fetchList();
          }}
        />
      </SwipeableDrawer>
      <BottomRightFab onClick={() => setOpen(true)} label="brauche sachen">
        <Add></Add>
      </BottomRightFab>
    </>
  );
};
