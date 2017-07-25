import { storiesOf } from "@storybook/react-native"
import * as moment from "moment"
import * as React from "react"
import "react-native"
import { ScrollView } from "react-native"

import { Conversation, ConversationSnippet } from "../ConversationSnippet"

const conversation: Conversation = {
  id: "582",
  from: {
    name: "Jean-Luc Collecteur",
    email: "luc+messaging@artsymail.com",
  },
  to: { name: "ACA Galleries" },
  last_message: "Karl and Anna... Fab!",
  last_message_at: moment().subtract(30, "minutes").toISOString(),
  items: [
    {
      title: "Karl and Anna Face Off (Diptych)",
      item: {
        __typename: "Artwork",
        id: "bradley-theodore-karl-and-anna-face-off-diptych",
        href: "/artwork/bradley-theodore-karl-and-anna-face-off-diptych",
        title: "Karl and Anna Face Off (Diptych)",
        date: "2016",
        artist_names: "Bradley Theodore",
        image: {
          url: "https://d32dm0rphc51dk.cloudfront.net/bJ9I_vJX9ksaKFJAkOAIKg/normalized.jpg",
        },
      },
    },
  ],
}

storiesOf("Conversations - Snippet")
  .add("Single row", () => <ConversationSnippet conversation={conversation} />)
  .add("A few threads", () =>
    <ScrollView>
      <ConversationSnippet conversation={conversation} />
      <ConversationSnippet conversation={conversation} />
      <ConversationSnippet conversation={conversation} />
    </ScrollView>
  )
