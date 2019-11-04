/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerOverviewTestsQueryVariables = {};
export type PartnerOverviewTestsQueryResponse = {
    readonly partner: {
        readonly " $fragmentRefs": FragmentRefs<"PartnerOverview_partner">;
    } | null;
};
export type PartnerOverviewTestsQuery = {
    readonly response: PartnerOverviewTestsQueryResponse;
    readonly variables: PartnerOverviewTestsQueryVariables;
};



/*
query PartnerOverviewTestsQuery {
  partner(id: "gagosian") {
    ...PartnerOverview_partner
    id
  }
}

fragment PartnerOverview_partner on Partner {
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
  artists: artistsConnection(representedBy: true, sort: SORTABLE_ID_ASC, first: 10) {
    pageInfo {
      hasNextPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        ...ArtistListItem_artist
        __typename
      }
      cursor
      id
    }
  }
  ...PartnerLocationSection_partner
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
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Literal",
    "name": "representedBy",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "SORTABLE_ID_ASC"
  }
],
v5 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v6 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v7 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v8 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
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
          {
            "kind": "FragmentSpread",
            "name": "PartnerOverview_partner",
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
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "city",
                "args": null,
                "storageKey": null
              },
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
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "bio",
                "args": null,
                "storageKey": null
              },
              (v3/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artists",
            "name": "artistsConnection",
            "storageKey": "artistsConnection(first:10,representedBy:true,sort:\"SORTABLE_ID_ASC\")",
            "args": (v4/*: any*/),
            "concreteType": "ArtistPartnerConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pageInfo",
                "storageKey": null,
                "args": null,
                "concreteType": "PageInfo",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "hasNextPage",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "startCursor",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "endCursor",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
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
                      (v3/*: any*/),
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
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "__typename",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "cursor",
                    "args": null,
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ]
              }
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": "artists",
            "name": "artistsConnection",
            "args": (v4/*: any*/),
            "handle": "connection",
            "key": "Partner_artists",
            "filters": [
              "representedBy",
              "sort"
            ]
          },
          (v3/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "PartnerOverviewTestsQuery",
    "id": "f8c63de527fac832522c902825c7a3c6",
    "text": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "partner": {
          "type": "Partner",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.id": (v5/*: any*/),
        "partner.internalID": (v6/*: any*/),
        "partner.name": (v7/*: any*/),
        "partner.locations": {
          "type": "Location",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "partner.profile": {
          "type": "Profile",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.artists": {
          "type": "ArtistPartnerConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.locations.city": (v7/*: any*/),
        "partner.locations.id": (v5/*: any*/),
        "partner.profile.bio": (v7/*: any*/),
        "partner.profile.id": (v5/*: any*/),
        "partner.artists.pageInfo": {
          "type": "PageInfo",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "partner.artists.edges": {
          "type": "ArtistPartnerEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "partner.artists.pageInfo.hasNextPage": {
          "type": "Boolean",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "partner.artists.pageInfo.startCursor": (v7/*: any*/),
        "partner.artists.pageInfo.endCursor": (v7/*: any*/),
        "partner.artists.edges.node": {
          "type": "Artist",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.artists.edges.id": (v5/*: any*/),
        "partner.artists.edges.node.id": (v5/*: any*/),
        "partner.artists.edges.cursor": (v8/*: any*/),
        "partner.artists.edges.node.internalID": (v6/*: any*/),
        "partner.artists.edges.node.slug": (v6/*: any*/),
        "partner.artists.edges.node.name": (v7/*: any*/),
        "partner.artists.edges.node.initials": (v7/*: any*/),
        "partner.artists.edges.node.href": (v7/*: any*/),
        "partner.artists.edges.node.is_followed": {
          "type": "Boolean",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.artists.edges.node.nationality": (v7/*: any*/),
        "partner.artists.edges.node.birthday": (v7/*: any*/),
        "partner.artists.edges.node.deathday": (v7/*: any*/),
        "partner.artists.edges.node.image": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "partner.artists.edges.node.__typename": (v8/*: any*/),
        "partner.artists.edges.node.image.url": (v7/*: any*/)
      }
    }
  }
};
})();
(node as any).hash = '4b7d031ac66c1c1ad81faba41fe3bb99';
export default node;
