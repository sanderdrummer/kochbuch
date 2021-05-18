import React from "react";
import { Fab, FabProps, Theme } from "@material-ui/core";
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

export const BottomRightFab = ({
  onClick,
  label,
  children,
  isLoading,
}: Pick<FabProps, "onClick" | "children"> & {
  isLoading?: boolean;
  label?: string;
}) => {
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
