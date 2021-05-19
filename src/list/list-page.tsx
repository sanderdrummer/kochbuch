import React from "react";
import {
  useListItems,
  clearList,
  checkListItem,
  unCheckListItem,
} from "./list-hooks";
import {
  ListItem,
  ListItemText,
  Drawer,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Checkbox,
  CardHeader,
  Card,
  CardContent,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { BottomRightFab } from "../common/fab";

import { ListForm } from "./list-form";

const ClearListDialog: React.FC<{ onClearList(): void }> = ({
  onClearList,
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
                clearList();
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
  items: string[];
  onSelect(item: string): void;
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
        {items.map((item) => (
          <ListItem
            button
            onClick={() => {
              onSelect(item);
            }}
            key={item}
          >
            <ListItemText>{item}</ListItemText>
            <Checkbox
              checked={isChecked}
              inputProps={{
                "aria-label": `${item} ist im Einkaufswagen`,
              }}
            />
          </ListItem>
        ))}
      </CardContent>
    </Card>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ListPage = () => {
  const { list, fetchList } = useListItems();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      {list.list.length === 0 && list.basket.length === 0 && (
        <Box display="flex" alignContent="center" justifyContent="center">
          Du hast noch nichts auf der Einkaufsliste
        </Box>
      )}
      <CardList
        items={list.list}
        isChecked={false}
        headline="In den Einkaufswagen"
        onSelect={async (item) => {
          checkListItem(item);
          fetchList();
        }}
      />
      <Box mt={3} mb={3}></Box>
      <CardList
        items={list.basket}
        isChecked={true}
        headline="Schon dabei"
        onSelect={async (item) => {
          unCheckListItem(item);
          fetchList();
        }}
      />

      {list.basket.length > 0 && (
        <Box mt={4}>
          <ClearListDialog onClearList={fetchList} />
        </Box>
      )}
      <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
        <ListForm
          onCompleted={() => {
            setOpen(false);
            fetchList();
          }}
        />
      </Drawer>
      <BottomRightFab onClick={() => setOpen(true)} label="brauche sachen">
        <Add></Add>
      </BottomRightFab>
    </>
  );
};
