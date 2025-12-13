import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function EyeCloseIcon(props: SvgProps) {
  return (
    <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      {...props}
    >
      <Path
        d="M19.458 8.56c.924.919 1.638 1.83 2.105 2.485.304.426.456.64.456.955 0 .315-.152.528-.456.955C20.197 14.87 16.708 19 12.019 19c-.908 0-1.771-.155-2.582-.419m-2.671-1.329c-2.016-1.36-3.505-3.195-4.291-4.297-.304-.427-.456-.64-.456-.955 0-.316.152-.529.456-.955C3.84 9.129 7.329 5 12.019 5c1.99 0 3.765.744 5.252 1.747"
        stroke="#64748B"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.876 14a2.929 2.929 0 114.142-4.142"
        stroke="#64748B"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M3.019 21l18-18"
        stroke="#64748B"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default EyeCloseIcon
