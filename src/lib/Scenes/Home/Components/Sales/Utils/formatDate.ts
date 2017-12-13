import moment from "moment"

export function liveDate(auction) {
  if (moment(auction.registration_ends_at) > moment()) {
    return formatDate(auction.registration_ends_at, { isStarted: false, isRegister: true })
  } else if (moment(auction.live_start_at) > moment()) {
    return formatDate(auction.live_start_at)
  } else {
    return "In Progress"
  }
}

export function timedDate(auction) {
  if (moment(auction.start_at) > moment()) {
    return formatDate(auction.start_at)
  } else {
    return formatDate(auction.end_at, { isStarted: true })
  }
}

function formatDate(date, { isStarted = false, isRegister = false } = {}) {
  const diff = moment().diff(moment(date), "hours")
  // return moment(date).format("MMM D, ha") // FIXME:
  let formatted

  if (isStarted) {
    formatted = moment(date).fromNow().replace("in", "").replace("ago", "").trim() + " left"
  } else if (isRegister) {
    if (diff > -24) {
      formatted = "Register by\n" + moment(date).format("ha")
    } else {
      formatted = "Register by\n" + moment(date).format("MMM D, ha")
    }
  } else {
    formatted = "Live " + moment(date).fromNow()
  }
  return formatted
}
