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
  Checkbox,
  CardHeader,
  Card,
  CardContent
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { BottomRightFab } from "../common";

import { ListForm } from "./list-form";
import {
  clearList,
  checkListItem,
  unCheckListItem,
  ListItem as ListItemType
} from "../db";

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

const CardList: React.FC<{
  items: ListItemType[];
  onSelect(item: ListItemType): void;
  isChecked: boolean;
  headline: string;
}> = ({ items, onSelect, isChecked, headline }) => {
  if (items.length === 0) {
    return null;
  }
  return (
    <Card>
      <CardHeader subheader={headline}></CardHeader>
      <CardContent>
        {items.map(item => (
          <ListItem
            button
            onClick={() => {
              onSelect(item);
            }}
            key={item.title}
          >
            <ListItemText>{item.title}</ListItemText>
            <Checkbox
              checked={isChecked}
              inputProps={{
                "aria-label": `${item.title} ist im Einkaufswagen`
              }}
            />
          </ListItem>
        ))}
      </CardContent>
    </Card>
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
      <CardList
        items={list.list}
        isChecked={false}
        headline="In den Einkaufswagen"
        onSelect={async item => {
          await checkListItem(item);
          fetchList();
        }}
      />
      <Box mt={3} mb={3}></Box>
      <CardList
        items={list.basket}
        isChecked={true}
        headline="Schon dabei"
        onSelect={async item => {
          await unCheckListItem(item);
          fetchList();
        }}
      />

      {list.basket.length > 0 && (
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
