/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { ArtworkPreview_artwork$ref } from "./ArtworkPreview_artwork.graphql";
declare const _Inquiry_artwork$ref: unique symbol;
export type Inquiry_artwork$ref = typeof _Inquiry_artwork$ref;
export type Inquiry_artwork = {
    readonly slug: string;
    readonly internalID: string;
    readonly contact_message: string | null;
    readonly partner: {
        readonly name: string | null;
    } | null;
    readonly " $fragmentRefs": ArtworkPreview_artwork$ref;
    readonly " $refType": Inquiry_artwork$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Inquiry_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "contact_message",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partner",
      "storageKey": null,
      "args": null,
      "concreteType": "Partner",
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
      "name": "ArtworkPreview_artwork",
      "args": null
    }
  ]
};
(node as any).hash = '07d3f3cc54e2c4b963c657eecc855572';
export default node;
