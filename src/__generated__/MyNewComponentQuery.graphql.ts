/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { MyNewComponent_artist$ref } from "./MyNewComponent_artist.graphql";
export type MyNewComponentQueryVariables = {
    readonly artistID: string;
};
export type MyNewComponentQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": MyNewComponent_artist$ref;
    } | null;
};
export type MyNewComponentQuery = {
    readonly response: MyNewComponentQueryResponse;
    readonly variables: MyNewComponentQueryVariables;
};



/*
query MyNewComponentQuery(
  $artistID: String!
) {
  artist(id: $artistID) {
    ...MyNewComponent_artist
    id
  }
}

fragment MyNewComponent_artist on Artist {
  name
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "MyNewComponentQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "MyNewComponent_artist",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "MyNewComponentQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          },
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
  },
  "params": {
    "operationKind": "query",
    "name": "MyNewComponentQuery",
    "id": "83b21c0fb269fa6200cb8a81bec6ba11",
    "text": null,
    "metadata": {}
  }
};
})();
(node as any).hash = 'f6b01d447d58751f11294860e591d882';
export default node;
