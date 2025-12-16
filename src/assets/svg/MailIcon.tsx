import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
import { Theme } from "../../theme/Theme"

function MailIcon(props: SvgProps) {
  return (
    <Svg
      width={props?.width || 21}
      height={props?.height || 17}
      viewBox="0 0 21 17"
      fill="none"
      {...props}
    >
      <Path
        d="M18.742.084H2.258C1.287.084.5.994.5 2.105v12.129c0 1.118.792 2.022 1.758 2.022h16.484c.963 0 1.758-.9 1.758-2.022V2.105c0-1.11-.784-2.021-1.758-2.021zm-.246 1.347l-6.753 7.725c-.332.382-.774.592-1.243.592-.47 0-.91-.21-1.244-.593L2.504 1.431h15.992zM1.672 13.96V2.38l5.064 5.793-5.064 5.787zm.833.948l5.062-5.784.861.985c.554.637 1.29.987 2.072.987.783 0 1.518-.35 2.07-.985l.863-.987 5.062 5.784H2.505zm16.823-.948l-5.064-5.787 5.064-5.793v11.58z"
        fill={props?.color || Theme.colors.gray800}
      />
    </Svg>
  )
}

export default MailIcon
