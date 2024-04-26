import React,{ ReactNode } from "react"


interface WrapperProps {
    children: ReactNode
}
const ContentWrapper:React.FC<WrapperProps> = ({children}) => {
  return (
    <div className="w-[100%] max-w-[1800px] relative my-0 mx-auto py-0">{children}</div>
  )
}

export default ContentWrapper