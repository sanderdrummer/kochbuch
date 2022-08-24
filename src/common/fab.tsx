import React from "react";

export const BottomRightFab = ({ onClick, label, children, isLoading }) => {
  const styles = fabStyles();
  return (
    <div
      onClick={onClick}
      disabled={isLoading}
      className={styles.fab}
      color="primary"
      aria-label={label}
    >
      {children}
    </div>
  );
};
