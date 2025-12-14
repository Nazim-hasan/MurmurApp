import * as React from "react";
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg";

type FriendIconProps = {
  color?: string;
  size?: number;
};

function FriendIcon({ color = "#000", size = 25, ...props }: FriendIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 682.667 682.667"
      {...props}
    >
      <Defs>
        <ClipPath id="a" clipPathUnits="userSpaceOnUse">
          <Path d="M0 512h512V0H0z" />
        </ClipPath>
      </Defs>
      <G
        clipPath="url(#a)"
        transform="matrix(1.33333 0 0 -1.33333 0 682.667)"
        fill="none"
        stroke={color}  // 🔥 dynamic color
        strokeWidth={30}
        strokeMiterlimit={10}
      >
        <Path
          d="M257.86 336.496c0-49.569-39.33-89.753-87.848-89.753-48.516 0-87.847 40.184-87.847 89.753 0 49.57 39.331 89.754 87.847 89.754 48.518 0 87.848-40.184 87.848-89.754zM39.284 86.25c-14.967 0-26.5 13.786-23.828 28.833 13.294 74.877 77.435 131.66 154.557 131.66 77.122 0 141.262-56.783 154.557-131.66 2.671-15.047-8.861-28.833-23.829-28.833zM445.13 348.975c0-38.372-30.445-69.479-68.003-69.479-37.557 0-68.003 31.107-68.003 69.479 0 38.371 30.446 69.478 68.003 69.478 37.558 0 68.003-31.107 68.003-69.478z"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
        />
        <Path
          d="M268.548 211.248c20.04 40.488 61.138 68.248 108.58 68.248 59.7 0 109.352-43.955 119.643-101.918 2.068-11.647-6.86-22.319-18.446-22.319h-166.45"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
        />
      </G>
    </Svg>
  );
}

export default FriendIcon;
