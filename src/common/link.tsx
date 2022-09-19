import { NavLinkProps,Link as RouterLink, NavLink as RouterNavLink, LinkProps } from "react-router-dom";

export const Link = (props: LinkProps) => {
  return (
    <RouterLink
      css={{
        display: "block",
        color: "var(--text)",
        textDecoration: "none",
        transitionDuration: '0.4s',
        "&:hover": {
          color: "var(--primary)",
        },
      }}
      {...props}
    />
  );
};

export const NavLink = (props: NavLinkProps) => {
  return (
    <RouterNavLink
      css={{
        display: "block",
        color: "var(--text)",
        textDecoration: "none",
        transitionDuration: '0.4s',
        "&:hover": {
          color: "var(--primary)",
        },
        "&.active": {
          color: "var(--primary)",
        },
      }}
      {...props}
    />
  );
};
