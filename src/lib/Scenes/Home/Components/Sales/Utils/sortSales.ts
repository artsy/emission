import { compose, filter, flatten, map, prop, sortBy, zip } from "lodash/fp"
import moment from "moment"

/**
 * Live Auctions are sorted top to bottom by auctions that are in progress, the soonest
 * to open and the soonest to have registration close.
 *
 * Labels should read:
 * - In Progress
 * - Live in x minutes
 * - Live in x hours
 * - Live in x days
 * - Register by x time (once registered should display live in x days/hours/mins)
 */
export function sortLiveSales(saleData) {
  const dateField = prop("live_start_at")
  const upcoming = filter(sale => moment(dateField(sale)) > moment() && moment(sale.registration_ends_at) < moment())
  const inProgress = filter(sale => sale.is_live_open)
  const registrationEndsAt = filter(sale => moment(sale.registration_ends_at) > moment())
  const doSort = sortFn => compose(sortBy(dateField), sortFn)

  const sorted = [
    {
      sortFn: doSort(inProgress),
      getLabel: () => "In Progress",
    },
    {
      sortFn: doSort(upcoming),
      getLabel: sale => {
        const label = `Live ${moment(sale.live_start_at).fromNow()}`
        return label
      },
    },
    {
      sortFn: doSort(registrationEndsAt),
      getLabel: sale => {
        const date = sale.registration_ends_at
        const diff = moment().diff(moment(date), "hours")
        const format = diff > -24 ? "ha" : "MMM D, ha"
        const label = `Register by\n${moment(date).format(format)}`
        return label
      },
    },
  ].map(({ sortFn, getLabel }) => {
    const results = sortFn(saleData)
    const labels = map(getLabel)(results)
    return zip(results, labels)
  })

  // console.log("Live:", sorted)

  return flatten(sorted)
  // return sorted
}

/**
 * Timed auctions are sorted top to bottom by the auction closing the soonest.
 *
 * Labels should read:
 * - X min left
 * - X hours left
 * - X days left
 * - Ends on <closing date> (if greater than 5 days away)
 */
export function sortTimedSales(saleData) {
  const dateField = prop("start_at")
  const range = moment().add(5, "days")
  const inProgress = filter(sale => moment(dateField(sale)) < moment())
  const upcoming = filter(sale => moment(dateField(sale)) > moment() && moment(dateField(sale)) < range)
  const nearFuture = filter(sale => moment(dateField(sale)) > range)
  const dateLabel = date => moment(date).fromNow().replace("in", "").trim() + " left"
  const doSort = sortFn => compose(sortBy(dateField), sortFn)

  const sorted = [
    {
      sortFn: doSort(inProgress),
      getLabel: sale => {
        const label = dateLabel(sale.end_at)
        return label
      },
    },
    {
      sortFn: doSort(upcoming),
      getLabel: sale => {
        const label = dateLabel(sale.start_at)
        return label
      },
    },
    {
      sortFn: doSort(nearFuture),
      getLabel: sale => {
        const label = `Ends on ${moment(sale.end_at).format("MMM D, ha")}`
        return label
      },
    },
  ].map(({ sortFn, getLabel }) => {
    const results = sortFn(saleData)
    const labels = map(getLabel)(results)
    return zip(results, labels)
  })

  // console.log("Timed:", sorted)

  return flatten(sorted)
}
