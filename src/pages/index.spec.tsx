import React from "react"
import { render } from "@testing-library/react"

import LandingPage from "./index"


describe("<LandingPage/>", () => {

  it("Has a button for signing in.", () => {
    const { getByRole } = render(
      <LandingPage data={{
        site: {
          siteMetadata: {
            name: "",
            tagline: ""
          }
        }
      }}/>
    )

    expect(getByRole("button")).toHaveTextContent(/sign in/i)
  })

})