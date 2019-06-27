/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FollowArtistButton_artist$ref } from "./FollowArtistButton_artist.graphql";
export type FollowArtistButtonTestsQueryVariables = {};
export type FollowArtistButtonTestsQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FollowArtistButton_artist$ref;
    } | null;
};
export type FollowArtistButtonTestsQuery = {
    readonly response: FollowArtistButtonTestsQueryResponse;
    readonly variables: FollowArtistButtonTestsQueryVariables;
};



/*
query FollowArtistButtonTestsQuery {
  artist(id: "artistID") {
    ...FollowArtistButton_artist
    id
  }
}

fragment FollowArtistButton_artist on Artist {
  id
  slug
  is_followed
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "artistID"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "FollowArtistButtonTestsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": "artist(id:\"artistID\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "FollowArtistButton_artist",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "FollowArtistButtonTestsQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": "artist(id:\"artistID\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
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
            "name": "slug",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_followed",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "FollowArtistButtonTestsQuery",
    "id": "67526adead0e6583785dbdb1db7b2723",
    "text": null,
    "metadata": {}
  }
};
})();
(node as any).hash = '3acf00c64be9e5d7ce2cbe1e7ef96619';
export default node;
