/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { FairBoothHeader_show$ref } from "./FairBoothHeader_show.graphql";
import { ShowArtistsPreview_show$ref } from "./ShowArtistsPreview_show.graphql";
import { ShowArtists_show$ref } from "./ShowArtists_show.graphql";
import { ShowArtworksPreview_show$ref } from "./ShowArtworksPreview_show.graphql";
import { ShowArtworks_show$ref } from "./ShowArtworks_show.graphql";
declare const _FairBooth_show$ref: unique symbol;
export type FairBooth_show$ref = typeof _FairBooth_show$ref;
export type FairBooth_show = {
    readonly " $fragmentRefs": FairBoothHeader_show$ref & ShowArtworksPreview_show$ref & ShowArtistsPreview_show$ref & ShowArtists_show$ref & ShowArtworks_show$ref;
    readonly " $refType": FairBooth_show$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "FairBooth_show",
  "type": "Show",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "FairBoothHeader_show",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ShowArtworksPreview_show",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ShowArtistsPreview_show",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ShowArtists_show",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ShowArtworks_show",
      "args": null
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
(node as any).hash = 'a09b925fec62958663d3153cbcbafdc4';
export default node;
