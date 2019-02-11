/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtistListItem_artist$ref: unique symbol;
export type ArtistListItem_artist$ref = typeof _ArtistListItem_artist$ref;
export type ArtistListItem_artist = {
    readonly id: string;
    readonly __id: string;
    readonly name: string | null;
    readonly is_followed: boolean | null;
    readonly nationality: string | null;
    readonly birthday: string | null;
    readonly deathday: string | null;
    readonly image: ({
        readonly url: string | null;
    }) | null;
    readonly " $refType": ArtistListItem_artist$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtistListItem_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
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
      "name": "__id",
      "args": null,
      "storageKey": null
    },
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
      "name": "is_followed",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "nationality",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "birthday",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "deathday",
      "args": null,
      "storageKey": null
    },
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
    }
  ]
};
(node as any).hash = 'b2fa018759c31171e3d5137d7d4e22f8';
export default node;
