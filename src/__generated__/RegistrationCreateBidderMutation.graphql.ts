/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CreateBidderInput = {
    readonly sale_id: string;
    readonly clientMutationId?: string | null;
};
export type RegistrationCreateBidderMutationVariables = {
    readonly input: CreateBidderInput;
};
export type RegistrationCreateBidderMutationResponse = {
    readonly createBidder: {
        readonly bidder: {
            readonly internalID: string;
            readonly qualified_for_bidding: boolean | null;
        } | null;
    } | null;
};
export type RegistrationCreateBidderMutation = {
    readonly response: RegistrationCreateBidderMutationResponse;
    readonly variables: RegistrationCreateBidderMutationVariables;
};



/*
mutation RegistrationCreateBidderMutation(
  $input: CreateBidderInput!
) {
  createBidder(input: $input) {
    bidder {
      internalID
      qualified_for_bidding
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateBidderInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "qualified_for_bidding",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "RegistrationCreateBidderMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createBidder",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBidderPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "bidder",
            "storageKey": null,
            "args": null,
            "concreteType": "Bidder",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "RegistrationCreateBidderMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createBidder",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateBidderPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "bidder",
            "storageKey": null,
            "args": null,
            "concreteType": "Bidder",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "RegistrationCreateBidderMutation",
    "id": "69d40b5b15c7778008cfb5bb845c53dd",
    "text": null,
    "metadata": {}
  }
};
})();
(node as any).hash = '3021c683a42e9818aceb538819dc714b';
export default node;
