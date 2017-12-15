import { flatten, shuffle, unzip } from "lodash"
import moment from "moment"
import { sortLiveSales, sortTimedSales } from "../sortSales"

describe("home/sales/utils/sortSales", () => {
  describe("#sortLiveSales", () => {
    const testData = [
      [
        [
          {
            is_live_open: true,
            live_start_at: moment().subtract(1, "days"),
            registration_ends_at: moment().subtract(2, "days"),
          },
        ],
        "In Progress",
      ],
      [
        [
          {
            is_live_open: true,
            live_start_at: moment().subtract(2, "days"),
            registration_ends_at: moment().subtract(3, "days"),
          },
        ],
        "In Progress",
      ],
      [
        [
          {
            live_start_at: moment().add(10, "minutes"),
            registration_ends_at: moment().subtract(2, "days"),
          },
        ],
        "Live in 10 minutes",
      ],
      [
        [
          {
            live_start_at: moment().add(20, "minutes"),
            registration_ends_at: moment().subtract(2, "days"),
          },
        ],
        "Live in 20 minutes",
      ],
      [
        [
          {
            live_start_at: moment().add(20, "days"),
            registration_ends_at: moment().add(10, "minutes"),
          },
        ],
        `Register by\n${moment(moment().add(10, "minutes")).format("ha")}`,
      ],
      [
        [
          {
            live_start_at: moment().add(30, "days"),
            registration_ends_at: moment().add(10, "days"),
          },
        ],
        `Register by\n${moment(moment().add(10, "days")).format("MMM D, ha")}`,
      ],
    ]

    it("renders correct labels", () => {
      testData.forEach(([input, expectedLabelOutput]) => {
        sortLiveSales(input).forEach(([_sale, label]) => {
          expect(label).toEqual(expectedLabelOutput)
        })
      })
    })

    it("sorts sales", () => {
      const [, labels] = unzip(testData)
      const [shuffledSales] = unzip(shuffle(testData))
      const [, sortedLabels] = unzip(sortLiveSales(flatten(shuffledSales)))
      expect(sortedLabels).toEqual(labels)
    })
  })

  describe("#sortTimedSales", () => {
    const testData = [
      [
        [
          {
            start_at: moment().add(10, "minutes"),
            end_at: moment().add(2, "days"),
          },
        ],
        "10 minutes left",
      ],
      [
        [
          {
            start_at: moment().add(20, "minutes"),
            end_at: moment().add(2, "days"),
          },
        ],
        "20 minutes left",
      ],
      [
        [
          {
            start_at: moment().add(10, "hours"),
            end_at: moment().add(2, "days"),
          },
        ],
        "10 hours left",
      ],
      [
        [
          {
            start_at: moment().add(20, "hours"),
            end_at: moment().add(2, "days"),
          },
        ],
        "20 hours left",
      ],
      [
        [
          {
            start_at: moment().add(2, "days"),
            end_at: moment().add(4, "days"),
          },
        ],
        "2 days left",
      ],
      [
        [
          {
            start_at: moment().add(5, "days"),
            end_at: moment().add(10, "days"),
          },
        ],
        "5 days left",
      ],
      [
        [
          {
            start_at: moment().add(20, "days"),
            end_at: moment().add(30, "days"),
          },
        ],
        `Ends on ${moment(moment().add(30, "days")).format("MMM D, ha")}`,
      ],
      [
        [
          {
            start_at: moment().add(30, "days"),
            end_at: moment().add(40, "days"),
          },
        ],
        `Ends on ${moment(moment().add(40, "days")).format("MMM D, ha")}`,
      ],
    ]

    it("renders correct labels", () => {
      testData.forEach(([input, expectedLabelOutput]) => {
        sortTimedSales(input).forEach(([_sale, label]) => {
          expect(label).toEqual(expectedLabelOutput)
        })
      })
    })

    it("sorts sales", () => {
      const [, labels] = unzip(testData)
      const [shuffledSales] = unzip(shuffle(testData))
      const [, sortedLabels] = unzip(sortTimedSales(flatten(shuffledSales)))
      expect(sortedLabels).toEqual(labels)
    })
  })
})
