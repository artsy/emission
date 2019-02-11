/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type FairMoreInfoTestsQueryVariables = {};
export type FairMoreInfoTestsQueryResponse = {
    readonly fair: ({
        readonly links: string | null;
        readonly about: string | null;
        readonly ticketsLink: string | null;
    }) | null;
};
export type FairMoreInfoTestsQuery = {
    readonly response: FairMoreInfoTestsQueryResponse;
    readonly variables: FairMoreInfoTestsQueryVariables;
};



/*
query FairMoreInfoTestsQuery {
  fair(id: "sofa-chicago-2018") {
    links
    about
    ticketsLink
    __id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "fair",
    "storageKey": "fair(id:\"sofa-chicago-2018\")",
    "args": [
      {
        "kind": "Literal",
        "name": "id",
        "value": "sofa-chicago-2018",
        "type": "String!"
      }
    ],
    "concreteType": "Fair",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "links",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "about",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "ticketsLink",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "__id",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "FairMoreInfoTestsQuery",
  "id": "5f94084efd2a3b38df04063bfd4d7b3d",
  "text": null,
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "FairMoreInfoTestsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": v0
  },
  "operation": {
    "kind": "Operation",
    "name": "FairMoreInfoTestsQuery",
    "argumentDefinitions": [],
    "selections": v0
  }
};
})();
(node as any).hash = '2ed3205d94bc196c8fe618fdc3db1933';
export default node;
