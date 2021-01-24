import React from "react";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

export const CategoryIcon: React.FC<SvgIconProps> = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      enableBackground="new 0 0 32 32"
      height="32px"
      id="svg2"
      version="1.1"
      viewBox="0 0 32 32"
      width="32px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="background">
        <rect fill="none" height="32" width="32" />
      </g>
      <g id="category">
        <polygon points="20,20 20,12 12,12 12,14 8,14 8,10 10,10 10,2 2,2 2,10 6,10 6,26 12,26 12,30 20,30 20,22 12,22 12,24.001 8,24    8,16 12,16 12,20  " />
      </g>
    </SvgIcon>
  );
};
