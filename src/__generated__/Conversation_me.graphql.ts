/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { Messages_conversation$ref } from "./Messages_conversation.graphql";
declare const _Conversation_me$ref: unique symbol;
export type Conversation_me$ref = typeof _Conversation_me$ref;
export type Conversation_me = {
    readonly conversation: {
        readonly internalID: string | null;
        readonly id: string;
        readonly lastMessageID: string | null;
        readonly unread: boolean | null;
        readonly to: {
            readonly name: string;
        };
        readonly " $fragmentRefs": Messages_conversation$ref;
    } | null;
    readonly " $refType": Conversation_me$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Conversation_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "conversationID",
      "type": "String!"
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "conversation",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "conversationID"
        }
      ],
      "concreteType": "Conversation",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "internalID",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "lastMessageID",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "unread",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "to",
          "storageKey": null,
          "args": null,
          "concreteType": "ConversationResponder",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "name",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "FragmentSpread",
          "name": "Messages_conversation",
          "args": null
        }
      ]
    }
  ]
};
(node as any).hash = 'f942db068b99586de9bfe5a5eb26cc49';
export default node;
