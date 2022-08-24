import React from "react";
import {
  useListItems,
  clearList,
  checkListItem,
  unCheckListItem,
} from "./list-hooks";
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
      <button onClick={handleOpen}>Liste löschen</button>
      <div
        open={open}
        onClose={handleClose}
        aria-labelledby="clear-list-dialog-title"
      >
        <div id="clear-list-dialog-title">Die Einkaufsliste leeren ?</div>

        <div>
          <div onClick={handleClose} color="primary">
            nein
          </div>
          <div
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
          </div>
        </div>
      </div>
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
    <div>
      <div title={headline}></div>
      <div>
        {items.map((item) => (
          <div
            onClick={() => {
              onSelect(item);
            }}
            key={item}
          >
            <div>{item}</div>
            <input checked={isChecked} />
          </div>
        ))}
      </div>
    </div>
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
        <div display="flex" alignContent="center" justifyContent="center">
          Du hast noch nichts auf der Einkaufsliste
        </div>
      )}
      <div
        items={list.list}
        isChecked={false}
        headline="In den Einkaufswagen"
        onSelect={async (item) => {
          checkListItem(item);
          fetchList();
        }}
      />
      <div mt={3} mb={3}></div>
      <div
        items={list.basket}
        isChecked={true}
        headline="Schon dabei"
        onSelect={async (item) => {
          unCheckListItem(item);
          fetchList();
        }}
      />

      {list.basket.length > 0 && (
        <div mt={4}>
          <div onClearList={fetchList} />
        </div>
      )}
      <div anchor="top" open={open} onClose={() => setOpen(false)}>
        <div
          onCompleted={() => {
            setOpen(false);
            fetchList();
          }}
        />
      </div>
      <div onClick={() => setOpen(true)} label="brauche sachen">
        <div></div>
      </div>
    </>
  );
};
