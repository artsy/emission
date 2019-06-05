import { storiesOf } from "@storybook/react-native"
import React from "react"
import "react-native"
import { Message } from "../Message"

const messageWithoutFromNameProps = {
  senderName: "Matt",
  firstMessage: false,
  index: 2,
  initialText: "This is initial tet",
  conversationId: "1",
  message: {
    body: "body of the message",
    created_at: null as any,
    is_from_user: false,
    invoice: null as any,
    from: {
      name: null as any,
      email: "matt@testing.com",
    },
    attachments: [] as any[],
  },
}

const messageWithFromNameProps = {
  senderName: "Matt",
  firstMessage: false,
  index: 2,
  initialText: "This is initial tet",
  conversationId: "1",
  message: {
    body: "body of the message",
    created_at: null as any,
    is_from_user: false,
    invoice: null as any,
    from: {
      name: "Matt the tester",
      email: "matt@testing.com",
    },
    attachments: [] as any[],
  },
}
storiesOf("Conversations/Message")
  .add("without fromName and not from user", () => {
    return <Message {...messageWithoutFromNameProps as any} />
  })
  .add("With fromName and not from user", () => {
    return <Message {...messageWithFromNameProps as any} />
  })
