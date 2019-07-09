/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { ArtistArtworkGrid_artwork$ref } from "./ArtistArtworkGrid_artwork.graphql";
import { PartnerArtworkGrid_artwork$ref } from "./PartnerArtworkGrid_artwork.graphql";
import { RelatedArtworkGrid_artwork$ref } from "./RelatedArtworkGrid_artwork.graphql";
declare const _ArtworkContextArtist_artwork$ref: unique symbol;
export type ArtworkContextArtist_artwork$ref = typeof _ArtworkContextArtist_artwork$ref;
export type ArtworkContextArtist_artwork = {
    readonly " $fragmentRefs": ArtistArtworkGrid_artwork$ref & PartnerArtworkGrid_artwork$ref & RelatedArtworkGrid_artwork$ref;
    readonly " $refType": ArtworkContextArtist_artwork$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkContextArtist_artwork",
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
    }
  ]
};
(node as any).hash = '113e469fc02115ed6481a83a64ad581f';
export default node;
