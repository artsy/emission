import exportsFromIndex from "../"

jest.mock("tipsi-stripe", () => ({ setOptions: jest.fn() }))
jest.mock("lib/options", () => ({ options: {} }))

it("should export all components", () => {
  expect(Object.keys(exportsFromIndex)).toEqual([
    "Artist",
    "BidFlow",
    "Conversation",
    "Gene",
    "Fair",
    "Home",
    "Inbox",
    "Inquiry",
    "MyProfile",
    "RegistrationFlow",
    "Sale",
    "Show",
    "WorksForYou",
  ])
})
