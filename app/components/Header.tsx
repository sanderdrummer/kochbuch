import { ComponentProps, type ReactNode } from 'react'

export const Header = (props: { children: ReactNode }) => {
  return <header>{props.children}</header>
}

export const H1 = ({ className, children, ...props }: ComponentProps<'h1'>) => {
  return (
    <h1
      className={`${className ?? ''} font-bold text-3xl mb-10 mt-4`}
      {...props}
    >
      {children}
    </h1>
  )
}
