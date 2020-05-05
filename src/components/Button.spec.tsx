import React from "react"
import { render, act, fireEvent } from "@testing-library/react"

import Button from "./Button"


describe("<Button/>", () => {

  it("Renders a button.", () => {
    const { getByRole } = render(<Button></Button>)

    expect(getByRole("button")).toBeInTheDocument()
  })

  it("Renders the label text passed into it.", () => {
    const { getByText } = render(<Button>Hello!</Button>)

    expect(getByText("Hello!")).toBeInTheDocument()
  })

  it("Calls the onClick callback when clicked.", () => {
    const onClick = jest.fn()

    const { getByRole } = render(<Button onClick={onClick}/>)

    act(() => {
      fireEvent.click(getByRole("button"))
    })

    expect(onClick).toBeCalledTimes(1)
  })

})