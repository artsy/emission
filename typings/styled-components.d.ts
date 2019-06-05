// Just here to make tsc recognize this file as a module and thus extend the existing ambient declarations
import styled from "styled-components"

declare module "styled-components" {
  // FIXME: This type is from an older @types/styled-components and should be gone from newer Palette builds
  export type StyledComponentClass<C, T, O> = any
}
