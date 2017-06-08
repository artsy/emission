export const dsl = {
  "Follow Artist": {
    intent: (object) => ({ artist_id: object.artist.id }),
    success: (object) => ({ artist_id: object.artist.id }),
    fail: (object) => ({ artist_id: object.artist.id }),
  },
  "Unfollow Artist": {
    intent: (object) => ({ artist_id: object.artist.id }),
    success: (object) => ({ artist_id: object.artist.id }),
    fail: (object) => ({ artist_id: object.artist.id }),
  },
}