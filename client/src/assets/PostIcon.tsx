import React from "react";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

export const PostIcon: React.FC<SvgIconProps> = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      enableBackground="new 0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M3 3V21H21V3H3M18 18H6V17H18V18M18 16H6V15H18V16M18 12H6V6H18V12Z"
      />
    </SvgIcon>
  );
};
