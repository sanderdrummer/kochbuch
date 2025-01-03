import { NavLink, type NavLinkProps } from '@remix-run/react'
import { type ReactNode } from 'react'

export type IconLinkProps = NavLinkProps & {
  icon: ReactNode
  label: ReactNode
}
export const IconLink = ({ icon, to, ...props }: IconLinkProps) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `font-extralight gap-1 grid align-items-center justify-items-center ${isActive ? 'text-stone-300 fill-stone-300' : 'text-stone-500 fill-stone-500 hover:text-stone-300 hover:fill-stone-300'}`
      }
      to={to}
    >
      <span className="size-8">{icon}</span>
      {props.label}
    </NavLink>
  )
}
