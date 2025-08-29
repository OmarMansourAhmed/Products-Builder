import type { ButtonHTMLAttributes, ReactNode } from "react"

interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    className?: string
}


const Button = ({children, className, ...rest}: Iprops) => {
  return (
    <button className={`${className} text-white w-full rounded-md p-2 cursor-pointer`} {...rest}>{children}</button>
  )
}

export default Button