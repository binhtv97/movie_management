import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const ChevronDown = (props: SvgProps) => (
  <Svg
    width={15}
    height={10}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M7.298 9.386 1.07 2.67a.343.343 0 0 1-.09-.233c0-.087.033-.17.09-.233L2.796.344a.294.294 0 0 1 .216-.097c.08 0 .158.035.215.097L7.73 5.198 12.232.344a.294.294 0 0 1 .215-.097c.081 0 .159.035.216.097l1.726 1.86c.057.062.09.146.09.233 0 .087-.033.171-.09.233L8.16 9.386a.61.61 0 0 1-.198.143.572.572 0 0 1-.665-.143Z"
    />
  </Svg>
)
export default ChevronDown
