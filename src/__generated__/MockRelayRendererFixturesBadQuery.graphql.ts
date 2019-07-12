/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { MockRelayRendererFixtures_artwork$ref } from "./MockRelayRendererFixtures_artwork.graphql";
export type MockRelayRendererFixturesBadQueryVariables = {};
export type MockRelayRendererFixturesBadQueryResponse = {
    readonly something_that_is_not_expected: {
        readonly " $fragmentRefs": MockRelayRendererFixtures_artwork$ref;
    } | null;
};
export type MockRelayRendererFixturesBadQuery = {
    readonly response: MockRelayRendererFixturesBadQueryResponse;
    readonly variables: MockRelayRendererFixturesBadQueryVariables;
};



/*
query MockRelayRendererFixturesBadQuery {
  something_that_is_not_expected: artwork(id: "mona-lisa") {
    ...MockRelayRendererFixtures_artwork
    id
  }
}

fragment MockRelayRendererFixtures_artwork on Artwork {
  image {
    url
  }
  artist {
    slug
    id
  }
  ...MockRelayRendererFixtures_artworkMetadata
}

fragment MockRelayRendererFixtures_artworkMetadata on Artwork {
  title
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "mona-lisa"
  }
],
v1 = {
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
    "name": "MockRelayRendererFixturesBadQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "something_that_is_not_expected",
        "name": "artwork",
        "storageKey": "artwork(id:\"mona-lisa\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "MockRelayRendererFixtures_artwork",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "MockRelayRendererFixturesBadQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "something_that_is_not_expected",
        "name": "artwork",
        "storageKey": "artwork(id:\"mona-lisa\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "image",
            "storageKey": null,
            "args": null,
            "concreteType": "Image",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "url",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artist",
            "storageKey": null,
            "args": null,
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "slug",
                "args": null,
                "storageKey": null
              },
              (v1/*: any*/)
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          },
          (v1/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "MockRelayRendererFixturesBadQuery",
    "id": "fb272ba544200e2e2beef09e1fe0a2f3",
    "text": null,
    "metadata": {}
  }
};
})();
(node as any).hash = 'ab040493eb68f4cb47eb0f983cd4fdb2';
export default node;
