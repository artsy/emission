/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { LocationMap_location$ref } from "./LocationMap_location.graphql";
import { ShowArtistsPreview_show$ref } from "./ShowArtistsPreview_show.graphql";
import { ShowArtworksPreview_show$ref } from "./ShowArtworksPreview_show.graphql";
import { ShowHeader_show$ref } from "./ShowHeader_show.graphql";
import { Shows_show$ref } from "./Shows_show.graphql";
declare const _Detail_show$ref: unique symbol;
export type Detail_show$ref = typeof _Detail_show$ref;
export type Detail_show = {
    readonly _id: string;
    readonly id: string;
    readonly name: string | null;
    readonly description: string | null;
    readonly city: string | null;
    readonly is_local_discovery: boolean | null;
    readonly location: ({
        readonly id: string;
        readonly address: string | null;
        readonly address_2: string | null;
        readonly displayDaySchedules: ReadonlyArray<({
            readonly days: string | null;
            readonly hours: string | null;
        }) | null> | null;
        readonly " $fragmentRefs": LocationMap_location$ref;
    }) | null;
    readonly images: ReadonlyArray<({
        readonly id: string | null;
    }) | null> | null;
    readonly counts: ({
        readonly artworks: number | null;
    }) | null;
    readonly status: string | null;
    readonly partner: ({
        readonly name?: string | null;
        readonly type?: string | null;
    }) | null;
    readonly " $fragmentRefs": ShowHeader_show$ref & ShowArtworksPreview_show$ref & ShowArtistsPreview_show$ref & Shows_show$ref;
    readonly " $refType": Detail_show$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "Detail_show",
  "type": "Show",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ShowHeader_show",
      "args": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "_id",
      "args": null,
      "storageKey": null
    },
    v0,
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "description",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "city",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_local_discovery",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "location",
      "storageKey": null,
      "args": null,
      "concreteType": "Location",
      "plural": false,
      "selections": [
        v1,
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "address",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "address_2",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "displayDaySchedules",
          "storageKey": null,
          "args": null,
          "concreteType": "FormattedDaySchedules",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "days",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "hours",
              "args": null,
              "storageKey": null
            }
          ]
        },
        v2,
        {
          "kind": "FragmentSpread",
          "name": "LocationMap_location",
          "args": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "images",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": true,
      "selections": [
        v1
      ]
    },
    v1,
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
      "name": "Shows_show",
      "args": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "counts",
      "storageKey": null,
      "args": null,
      "concreteType": "ShowCounts",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "artworks",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "status",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partner",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": false,
      "selections": [
        v2,
        {
          "kind": "InlineFragment",
          "type": "Partner",
          "selections": [
            v0,
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "type",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    },
    v2
  ]
};
})();
(node as any).hash = '1bf6ac686e5e1a4802b112cc6d58bd80';
export default node;
