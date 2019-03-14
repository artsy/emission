// @ts-check
const fs = require("fs")
const https = require("https")
const path = require("path")

const ASSETS_DIR = path.resolve(__dirname, "../Pod/Assets/PreHeatedGraphQLCache")
const CREATED_AT_FILENAME = "PreheatedCacheCreatedAt.txt"

/**
 * @typedef {Object} QueryParams
 * @property {string} query
 * @property {string} documentID
 * @property {{ [key: string]: any }} variables
 */

/**
 * @param {QueryParams} queryParams
 * @param {string} filename
 * @param {Date} freshness The date from when the pre-heated cache should be ignored.
 * @param {number} ttl The TTL applied to the cache once put in place. Defaults to the default specified in `ARGraphQLQueryCache.m`.
 */
module.exports = function preheatGraphQLCache(queryParams, filename, freshness, ttl = 0) {
  // We don't use the persisted ID here because the queries may not actually have been persisted yet.
  const { documentID: _documentID, ...queryParamsForRequest } = queryParams
  // While we fetch using the actual query test, for the cache we want to simulate a runtime query, which uses the
  // persisted ID.
  const { query: _query, ...queryParamsForCache } = queryParams

  const requestPostData = JSON.stringify(queryParamsForRequest)
  const options = {
    hostname: "metaphysics-production.artsy.net",
    port: 443,
    path: "/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": requestPostData.length,
    },
  }

  const req = https.request(options, res => {
    if (res.statusCode !== 200) {
      throw new Error(`Failed with status code: ${res.statusCode}`)
    }

    const responseData = []
    res.on("data", chunk => responseData.push(chunk))

    res.on("end", () => {
      const graphqlResponse = JSON.parse(Buffer.concat(responseData).toString("utf8"))
      if (graphqlResponse.errors && graphqlResponse.errors.length > 0) {
        throw new Error(`Failed with GraphQL errors: ${JSON.stringify(graphqlResponse.errors)}`)
      }
      fs.writeFile(
        path.join(ASSETS_DIR, filename),
        JSON.stringify({
          ttl,
          graphqlResponse,
          queryParams: queryParamsForCache,
          freshness: freshness.getTime() / 1000, // Time since UNIX epoc in seconds.
        }),
        "utf8",
        error => {
          if (error) throw error
        }
      )
      fs.writeFile(path.join(ASSETS_DIR, CREATED_AT_FILENAME), new Date().toISOString(), "utf8", error => {
        if (error) throw error
      })
    })
  })

  req.on("error", error => {
    throw error
  })

  req.write(requestPostData)
  req.end()
}
