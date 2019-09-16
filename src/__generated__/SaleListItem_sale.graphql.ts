/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _SaleListItem_sale$ref: unique symbol;
export type SaleListItem_sale$ref = typeof _SaleListItem_sale$ref;
export type SaleListItem_sale = {
    readonly name: string | null;
    readonly href: string | null;
    readonly live_url_if_open: string | null;
    readonly live_start_at: string | null;
    readonly display_timely_at: string | null;
    readonly cover_image: {
        readonly url: string | null;
    } | null;
    readonly " $refType": SaleListItem_sale$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "SaleListItem_sale",
  "type": "Sale",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "live_url_if_open",
      "name": "liveURLIfOpen",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "live_start_at",
      "name": "liveStartAt",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "display_timely_at",
      "name": "displayTimelyAt",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": "cover_image",
      "name": "coverImage",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "url",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "large"
            }
          ],
          "storageKey": "url(version:\"large\")"
        }
      ]
    }
  ]
};
(node as any).hash = 'e1afb9785fb7826a2a32eee309d6d0ad';
export default node;
