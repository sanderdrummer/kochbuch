import React from "react";
import { Fab, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const fabStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: theme.spacing(8),

      right: theme.spacing(2),
    },
  })
);

export const BottomRightFab: React.FC<{
  onClick: (e: any) => void;
  label: string;
  isLoading?: boolean;
  children: any;
}> = ({ onClick, label, children, isLoading }) => {
  const styles = fabStyles();
  return (
    <Fab
      onClick={onClick}
      disabled={isLoading}
      className={styles.fab}
      color="primary"
      aria-label={label}
    >
      {children}
    </Fab>
  );
};
