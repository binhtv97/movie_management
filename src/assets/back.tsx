import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const BackIcon = (props: SvgProps) => (
    <Svg
        width={32}
        height={38}
        fill="none"
        {...props}
    >
        <Path
            fill="#fff"
            fillRule="evenodd"
            d="M19.324 10 10 19l9.324 9 1.997-1.933L13.999 19l7.322-7.067L19.324 10Z"
            clipRule="evenodd"
        />
    </Svg>
)
export default BackIcon
