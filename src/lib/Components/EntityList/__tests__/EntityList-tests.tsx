import { mount } from "enzyme"
import React from "react"
import { EntityList } from "../index"

describe("EntityList", () => {
  it("correctly renders one item", () => {
    const wrapper = mount(
      <EntityList
        prefix="Works by"
        list={[{ name: "Foxy Production", href: "/foxy-production" }]}
        count={1}
        displayedItems={2}
      />
    )

    expect(wrapper.text()).toEqual("Works by Foxy Production")
  })

  it("correctly renders multiple items", () => {
    const wrapper = mount(
      <EntityList
        prefix="Works by"
        list={[
          { name: "Zarouhie Abdalian", href: "/artist/zarouhie-abdalian" },
          { name: "Derya Akay", href: "/artist/derya-akay" },
        ]}
        count={20}
        displayedItems={2}
      />
    )

    expect(wrapper.text()).toEqual("Works by Zarouhie Abdalian, Derya Akay and 18 others")
  })
})
