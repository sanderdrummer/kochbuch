import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.background.paper,
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      position: "sticky",
      top: theme.spacing(1),
      zIndex: 1,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

export const SearchInput: React.FC<{
  onSubmit(query: string): void;
  label: string;
}> = ({ onSubmit, label }) => {
  const classes = useStyles();
  const [query, setQuery] = React.useState("");
  const reset = () => {
    setQuery("");
    onSubmit("");
  };
  React.useEffect(() => {
    onSubmit(query);
  }, [onSubmit, query]);
  return (
    <Paper
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(query);
      }}
      component="form"
      className={classes.root}
    >
      <InputBase
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={classes.input}
        placeholder={label}
        inputProps={{ "aria-label": label }}
      />
      <IconButton
        type="button"
        color="secondary"
        className={classes.iconButton}
        aria-label="Suche löschen"
        onClick={reset}
      >
        <Clear />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="suchen"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
