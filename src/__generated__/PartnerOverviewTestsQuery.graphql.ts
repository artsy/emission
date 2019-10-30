/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerOverviewTestsQueryVariables = {};
export type PartnerOverviewTestsQueryResponse = {
    readonly partner: {
        readonly internalID: string;
        readonly name: string | null;
        readonly locations: ReadonlyArray<{
            readonly city: string | null;
        } | null> | null;
        readonly profile: {
            readonly bio: string | null;
        } | null;
        readonly artists: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                    readonly " $fragmentRefs": FragmentRefs<"ArtistListItem_artist">;
                } | null;
            } | null> | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"PartnerLocationSection_partner">;
    } | null;
};
export type PartnerOverviewTestsQueryRawResponse = {
    readonly partner: ({
        readonly internalID: string;
        readonly name: string | null;
        readonly locations: ReadonlyArray<({
            readonly city: string | null;
            readonly id: string | null;
        }) | null> | null;
        readonly profile: ({
            readonly bio: string | null;
            readonly id: string | null;
        }) | null;
        readonly artists: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly id: string;
                    readonly internalID: string;
                    readonly slug: string;
                    readonly name: string | null;
                    readonly initials: string | null;
                    readonly href: string | null;
                    readonly is_followed: boolean | null;
                    readonly nationality: string | null;
                    readonly birthday: string | null;
                    readonly deathday: string | null;
                    readonly image: ({
                        readonly url: string | null;
                    }) | null;
                }) | null;
                readonly id: string | null;
            }) | null> | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type PartnerOverviewTestsQuery = {
    readonly response: PartnerOverviewTestsQueryResponse;
    readonly variables: PartnerOverviewTestsQueryVariables;
    readonly rawResponse: PartnerOverviewTestsQueryRawResponse;
};



/*
query PartnerOverviewTestsQuery {
  partner(id: "gagosian") {
    internalID
    name
    locations {
      city
      id
    }
    profile {
      bio
      id
    }
    artists: artistsConnection(first: 10) {
      edges {
        node {
          id
          ...ArtistListItem_artist
        }
        id
      }
    }
    ...PartnerLocationSection_partner
    id
  }
}

fragment ArtistListItem_artist on Artist {
  id
  internalID
  slug
  name
  initials
  href
  is_followed: isFollowed
  nationality
  birthday
  deathday
  image {
    url
  }
}

fragment PartnerLocationSection_partner on Partner {
  name
  locations {
    city
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "gagosian"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "city",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "bio",
  "args": null,
  "storageKey": null
},
v5 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "PartnerOverviewTestsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "partner",
        "storageKey": "partner(id:\"gagosian\")",
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "locations",
            "storageKey": null,
            "args": null,
            "concreteType": "Location",
            "plural": true,
            "selections": [
              (v3/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "profile",
            "storageKey": null,
            "args": null,
            "concreteType": "Profile",
            "plural": false,
            "selections": [
              (v4/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artists",
            "name": "artistsConnection",
            "storageKey": "artistsConnection(first:10)",
            "args": (v5/*: any*/),
            "concreteType": "ArtistPartnerConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtistPartnerEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Artist",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      {
                        "kind": "FragmentSpread",
                        "name": "ArtistListItem_artist",
                        "args": null
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "FragmentSpread",
            "name": "PartnerLocationSection_partner",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "PartnerOverviewTestsQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "partner",
        "storageKey": "partner(id:\"gagosian\")",
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "locations",
            "storageKey": null,
            "args": null,
            "concreteType": "Location",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v6/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "profile",
            "storageKey": null,
            "args": null,
            "concreteType": "Profile",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v6/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artists",
            "name": "artistsConnection",
            "storageKey": "artistsConnection(first:10)",
            "args": (v5/*: any*/),
            "concreteType": "ArtistPartnerConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtistPartnerEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Artist",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v1/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "slug",
                        "args": null,
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "initials",
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
                        "alias": "is_followed",
                        "name": "isFollowed",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "nationality",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "birthday",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "deathday",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "image",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Image",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "url",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      }
                    ]
                  },
                  (v6/*: any*/)
                ]
              }
            ]
          },
          (v6/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "PartnerOverviewTestsQuery",
    "id": "faebf469b73a4524348a90b0325d5a8f",
    "text": null,
    "metadata": {}
  }
};
})();
(node as any).hash = 'de903dd9a84cf8057b5738d77832cbd3';
export default node;
