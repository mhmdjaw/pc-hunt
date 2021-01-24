import React from "react";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

export const OrdersIcon: React.FC<SvgIconProps> = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      height="512px"
      id="Layer_1"
      enableBackground="new 0 0 512 512"
      version="1.1"
      viewBox="0 0 512 512"
      width="512px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M112,400h288V208H112V400z M224,240h64c8.8,0,16,7.2,16,16s-7.2,16-16,16h-64c-8.8,0-16-7.2-16-16S215.2,240,224,240z" />
        <polygon points="96,112 96,192 112,192 400,192 416,192 416,112  " />
      </g>
    </SvgIcon>
  );
};
