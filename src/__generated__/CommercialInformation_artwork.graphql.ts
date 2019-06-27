/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { ArtworkAvailability_artwork$ref } from "./ArtworkAvailability_artwork.graphql";
import { ArtworkExtraLinks_artwork$ref } from "./ArtworkExtraLinks_artwork.graphql";
import { SellerInfo_artwork$ref } from "./SellerInfo_artwork.graphql";
declare const _CommercialInformation_artwork$ref: unique symbol;
export type CommercialInformation_artwork$ref = typeof _CommercialInformation_artwork$ref;
export type CommercialInformation_artwork = {
    readonly availability: string | null;
    readonly partner: {
        readonly name: string | null;
    } | null;
    readonly " $fragmentRefs": ArtworkAvailability_artwork$ref & SellerInfo_artwork$ref & ArtworkExtraLinks_artwork$ref;
    readonly " $refType": CommercialInformation_artwork$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "CommercialInformation_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "availability",
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
      "name": "ArtworkAvailability_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "SellerInfo_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkExtraLinks_artwork",
      "args": null
    }
  ]
};
(node as any).hash = 'c5ec1793deb204d0e8de84e030a411df';
export default node;
