import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg"

function LockWithKeyIcon(props: SvgProps) {
  return (
    <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_448_1049)" fill={props.color || "#6F6F6F"}>
        <Path d="M19.88 9.804h-1.63V5.828a5.331 5.331 0 00-1.583-3.814A5.332 5.332 0 0012.853.432a5.403 5.403 0 00-5.397 5.396v3.976H5.825a2.314 2.314 0 00-2.31 2.311v9.142a2.313 2.313 0 002.31 2.31H19.88a2.313 2.313 0 002.311-2.31v-9.142a2.314 2.314 0 00-2.31-2.31zM8.992 5.828a3.865 3.865 0 015.337-3.57c.468.194.893.48 1.249.84l.005.005a3.806 3.806 0 011.13 2.725v3.976h-7.72V5.828zm11.663 15.429a.776.776 0 01-.775.775H5.825a.775.775 0 01-.775-.775v-9.142a.776.776 0 01.775-.774H19.88a.776.776 0 01.775.774v9.142z" />
        <Path d="M12.852 13.701a1.54 1.54 0 00-.768 2.873v2.329a.768.768 0 001.536 0v-2.329a1.539 1.539 0 00-.768-2.873zm-.001 1.537h.004v.004l-.001.002h-.002a.01.01 0 01-.003-.002v-.002l.002-.002z" />
      </G>
      <Defs>
        <ClipPath id="clip0_448_1049">
          <Path fill="#fff" transform="translate(.853)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default LockWithKeyIcon
