/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type FollowArtistInput = {
    readonly artistID: string;
    readonly unfollow?: boolean | null;
    readonly clientMutationId?: string | null;
};
export type FeaturedArtists_collectionMutationVariables = {
    input: FollowArtistInput;
};
export type FeaturedArtists_collectionMutationResponse = {
    readonly followArtist: {
        readonly artist: {
            readonly id: string;
            readonly isFollowed: boolean | null;
        } | null;
    } | null;
};
export type FeaturedArtists_collectionMutation = {
    readonly response: FeaturedArtists_collectionMutationResponse;
    readonly variables: FeaturedArtists_collectionMutationVariables;
};



/*
mutation FeaturedArtists_collectionMutation(
  $input: FollowArtistInput!
) {
  followArtist(input: $input) {
    artist {
      id
      isFollowed
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "FollowArtistInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "followArtist",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "FollowArtistPayload",
    "plural": false,
    "selections": [
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
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "isFollowed",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "FeaturedArtists_collectionMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "FeaturedArtists_collectionMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "FeaturedArtists_collectionMutation",
    "id": "cdd4d48f5ea091ceac1a252d7ae93dad",
    "text": null,
    "metadata": {}
  }
};
})();
(node as any).hash = '519d3a14a067d272b121c9f377097357';
export default node;
