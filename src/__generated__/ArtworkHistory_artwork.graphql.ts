/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _ArtworkHistory_artwork$ref: unique symbol;
export type ArtworkHistory_artwork$ref = typeof _ArtworkHistory_artwork$ref;
export type ArtworkHistory_artwork = {
    readonly provenance: string | null;
    readonly exhibition_history: string | null;
    readonly literature: string | null;
    readonly " $refType": ArtworkHistory_artwork$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkHistory_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "provenance",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "exhibition_history",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "literature",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'ee3b6163a6da45b7a622613984be0d6b';
export default node;
