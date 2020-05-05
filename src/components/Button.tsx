import React from "react"


type ButtonProps = React.HTMLAttributes<{}>


export default (props: ButtonProps) => (
  <button onClick={props.onClick}>{props.children}</button>
)