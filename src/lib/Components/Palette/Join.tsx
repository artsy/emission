import React, { SFC } from "react"

interface JoinProps {
  separator: React.ReactElement<any>
}

export const Join: SFC<JoinProps> = ({ separator, children }) => {
  const childArray = React.Children.toArray(children)

  return childArray.reduce((acc, curr, currentIndex) => {
    acc.push(
      React.cloneElement(curr as React.ReactElement<any>, {
        key: `join-${currentIndex}`,
      })
    )

    if (currentIndex !== childArray.length - 1) {
      acc.push(
        separator &&
          React.cloneElement(separator, {
            key: `join-sep-${currentIndex}`,
          })
      )
    }

    return acc
  }, []) as any
}
