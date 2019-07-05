/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { ArtistArtworkGrid_artwork$ref } from "./ArtistArtworkGrid_artwork.graphql";
import { AuctionArtworkGrid_artwork$ref } from "./AuctionArtworkGrid_artwork.graphql";
import { RelatedArtworkGrid_artwork$ref } from "./RelatedArtworkGrid_artwork.graphql";
declare const _ArtworkContextAuction_artwork$ref: unique symbol;
export type ArtworkContextAuction_artwork$ref = typeof _ArtworkContextAuction_artwork$ref;
export type ArtworkContextAuction_artwork = {
    readonly " $fragmentRefs": AuctionArtworkGrid_artwork$ref & ArtistArtworkGrid_artwork$ref & RelatedArtworkGrid_artwork$ref;
    readonly " $refType": ArtworkContextAuction_artwork$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkContextAuction_artwork",
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
      "name": "AuctionArtworkGrid_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistArtworkGrid_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "RelatedArtworkGrid_artwork",
      "args": null
    }
  ]
};
(node as any).hash = '45d13c4ac2a20119f9520e771786614b';
export default node;
