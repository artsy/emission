/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FairMoreInfo_fair$ref } from "./FairMoreInfo_fair.graphql";
export type FairMoreInfoTestsQueryVariables = {};
export type FairMoreInfoTestsQueryResponse = {
    readonly fair: ({
        readonly " $fragmentRefs": FairMoreInfo_fair$ref;
    }) | null;
};
export type FairMoreInfoTestsQuery = {
    readonly response: FairMoreInfoTestsQueryResponse;
    readonly variables: FairMoreInfoTestsQueryVariables;
};



/*
query FairMoreInfoTestsQuery {
  fair(id: "sofa-chicago-2018") {
    ...FairMoreInfo_fair
    __id
  }
}

fragment FairMoreInfo_fair on Fair {
  links
  about
  tickets_link
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "sofa-chicago-2018",
    "type": "String!"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "FairMoreInfoTestsQuery",
  "id": "7f9238aeac455128eab19033e7152f54",
  "text": null,
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "FairMoreInfoTestsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "fair",
        "storageKey": "fair(id:\"sofa-chicago-2018\")",
        "args": v0,
        "concreteType": "Fair",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "FairMoreInfo_fair",
            "args": null
          },
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "FairMoreInfoTestsQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "fair",
        "storageKey": "fair(id:\"sofa-chicago-2018\")",
        "args": v0,
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
            "name": "tickets_link",
            "args": null,
            "storageKey": null
          },
          v1
        ]
      }
    ]
  }
};
})();
(node as any).hash = '8ee5bdba5101400368ead339d6554865';
export default node;
