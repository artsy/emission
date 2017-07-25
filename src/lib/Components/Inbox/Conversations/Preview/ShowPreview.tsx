import * as React from "react"
import * as Relay from "react-relay"

import { TouchableHighlight } from "react-native"

import { PreviewText as P, Subtitle } from "../../Typography"

import styled from "styled-components/native"
import colors from "../../../../../data/colors"
import fonts from "../../../../../data/fonts"
import OpaqueImageView from "../../../OpaqueImageView"

const Container = styled.View`
  border-width: 1;
  border-color: ${colors["gray-regular"]};
  flex-direction: row;
`

const VerticalLayout = styled.View`
  flex: 1;
  flex-direction: column;
`

const Image = styled(OpaqueImageView)`
  margin-top: 12;
  margin-left: 12;
  margin-bottom: 12;
  width: 80;
  height: 55;
`

const TextContainer = styled(VerticalLayout)`
  margin-left: 25;
  align-self: center;
`

const SerifText = styled(P)`
  font-size: 14;
`

interface Props extends RelayProps {
  onSelected?: () => void
}

export class ShowPreview extends React.Component<Props, any> {
  render() {
    const show = this.props.show

    return (
      <TouchableHighlight underlayColor={colors["gray-light"]} onPress={this.props.onSelected}>
        <Container>
          <Image imageURL={show.cover_image.url} />
          <TextContainer>
            <SerifText>
              {show.name}
            </SerifText>
          </TextContainer>
        </Container>
      </TouchableHighlight>
    )
  }
}

export default Relay.createContainer(ShowPreview, {
  fragments: {
    show: () => Relay.QL`
      fragment on Show {
        name
        cover_image {
          url
        }
      }
    `,
  },
})

interface RelayProps {
  show: {
    name: string | null
    cover_image: {
      url: string | null
    } | null
  }
}
