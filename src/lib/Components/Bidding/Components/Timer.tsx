import moment from "moment-timezone"
import React from "react"
import { Flex } from "../Elements/Flex"
import { Sans12, Sans14 } from "../Elements/Typography"

interface BidResultProps {
  liveStartsAt?: string
  endsAt?: string
}

interface BidResultState {
  timeLeftInMilliseconds: number
}

export class Timer extends React.Component<BidResultProps, BidResultState> {
  private intervalId: number

  constructor(props) {
    super(props)

    const { liveStartsAt, endsAt } = props
    const timeLeftInMilliseconds = Date.parse(liveStartsAt || endsAt) - Date.now()

    this.state = { timeLeftInMilliseconds }
  }

  componentDidMount() {
    this.intervalId = setInterval(this.timer, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  timer = () => {
    this.setState({
      timeLeftInMilliseconds: this.state.timeLeftInMilliseconds - 1000,
    })
  }

  render() {
    const { liveStartsAt, endsAt } = this.props
    const duration = moment.duration(this.state.timeLeftInMilliseconds)

    return (
      <Flex alignItems="center">
        <Sans12>
          {liveStartsAt ? "Live " : "Ends "}
          {moment(liveStartsAt || endsAt, moment.ISO_8601)
            .tz(moment.tz.guess(true))
            .format("MMM D, ha")}
        </Sans12>
        <Sans14>
          {this.padWithZero(duration.days())}d{"  "}
          {this.padWithZero(duration.hours())}h{"  "}
          {this.padWithZero(duration.minutes())}m{"  "}
          {this.padWithZero(duration.seconds())}s
        </Sans14>
      </Flex>
    )
  }

  private padWithZero(number: number) {
    return (number.toString() as any).padStart(2, "0")
  }
}
