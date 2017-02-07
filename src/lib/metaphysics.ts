import { NativeModules } from 'react-native'
const { Emission } = NativeModules

import { metaphysicsURL } from './relay/config'
import { NetworkError } from './system/errors'

export default function metaphysics(query: string): Promise<Object> {
  return fetch(metaphysicsURL, { method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'X-USER-ID': Emission.userID,
                            'X-ACCESS-TOKEN': Emission.authenticationToken,
                          },
                          body: JSON.stringify({ query }) })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response
      } else {
        const error = new NetworkError(response.statusText)
        error.response = response
        throw error
      }
    })
    .then((response) => response.json())
    .then(({ data }) => data)
}
