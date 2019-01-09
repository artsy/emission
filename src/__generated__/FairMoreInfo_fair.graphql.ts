/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _FairMoreInfo_fair$ref: unique symbol;
export type FairMoreInfo_fair$ref = typeof _FairMoreInfo_fair$ref;
export type FairMoreInfo_fair = {
    readonly links: string | null;
    readonly about: string | null;
    readonly tickets_link: string | null;
    readonly " $refType": FairMoreInfo_fair$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "FairMoreInfo_fair",
  "type": "Fair",
  "metadata": null,
  "argumentDefinitions": [],
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
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '83dc96f1567e06f265608b5bc6a48678';
export default node;
