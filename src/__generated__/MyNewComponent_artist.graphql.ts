/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _MyNewComponent_artist$ref: unique symbol;
export type MyNewComponent_artist$ref = typeof _MyNewComponent_artist$ref;
export type MyNewComponent_artist = {
    readonly name: string | null;
    readonly " $refType": MyNewComponent_artist$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "MyNewComponent_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'a3bf7ed6caf951e807d51a718f0d0502';
export default node;
