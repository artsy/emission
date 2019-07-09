/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { ArtistArtworkGrid_artwork$ref } from "./ArtistArtworkGrid_artwork.graphql";
import { PartnerArtworkGrid_artwork$ref } from "./PartnerArtworkGrid_artwork.graphql";
import { RelatedArtworkGrid_artwork$ref } from "./RelatedArtworkGrid_artwork.graphql";
import { ShowArtworkGrid_artwork$ref } from "./ShowArtworkGrid_artwork.graphql";
declare const _ArtworkContextShow_artwork$ref: unique symbol;
export type ArtworkContextShow_artwork$ref = typeof _ArtworkContextShow_artwork$ref;
export type ArtworkContextShow_artwork = {
    readonly " $fragmentRefs": ArtistArtworkGrid_artwork$ref & PartnerArtworkGrid_artwork$ref & RelatedArtworkGrid_artwork$ref & ShowArtworkGrid_artwork$ref;
    readonly " $refType": ArtworkContextShow_artwork$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkContextShow_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "excludeArtworkIDs",
      "type": "[String!]",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ArtistArtworkGrid_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "PartnerArtworkGrid_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "RelatedArtworkGrid_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ShowArtworkGrid_artwork",
      "args": null
    }
  ]
};
(node as any).hash = '9c6144af9b31c5d1f42d80d318417e7a';
export default node;
