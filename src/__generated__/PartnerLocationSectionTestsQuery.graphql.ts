/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type PartnerLocationSectionTestsQueryVariables = {};
export type PartnerLocationSectionTestsQueryResponse = {
    readonly partner: {
        readonly name: string | null;
        readonly locations: ReadonlyArray<{
            readonly city: string | null;
        } | null> | null;
    } | null;
};
export type PartnerLocationSectionTestsQueryRawResponse = {
    readonly partner: ({
        readonly name: string | null;
        readonly locations: ReadonlyArray<({
            readonly city: string | null;
            readonly id: string | null;
        }) | null> | null;
        readonly id: string | null;
    }) | null;
};
export type PartnerLocationSectionTestsQuery = {
    readonly response: PartnerLocationSectionTestsQueryResponse;
    readonly variables: PartnerLocationSectionTestsQueryVariables;
    readonly rawResponse: PartnerLocationSectionTestsQueryRawResponse;
};



/*
query PartnerLocationSectionTestsQuery {
  partner(id: "gagosian") {
    name
    locations {
      city
      id
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "gagosian"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "city",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "PartnerLocationSectionTestsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "partner",
        "storageKey": "partner(id:\"gagosian\")",
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "locations",
            "storageKey": null,
            "args": null,
            "concreteType": "Location",
            "plural": true,
            "selections": [
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "PartnerLocationSectionTestsQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "partner",
        "storageKey": "partner(id:\"gagosian\")",
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "locations",
            "storageKey": null,
            "args": null,
            "concreteType": "Location",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ]
          },
          (v3/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "PartnerLocationSectionTestsQuery",
    "id": "0f203e17af8776598a98062f945a0383",
    "text": null,
    "metadata": {}
  }
};
})();
(node as any).hash = 'fd337c8bd322d808612808d7611be8f4';
export default node;
