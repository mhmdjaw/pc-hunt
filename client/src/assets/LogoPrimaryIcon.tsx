import React from "react";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

const LogoPrimaryIcon: React.FC<SvgIconProps> = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      id="Layer_1_1_"
      enableBackground="new 0 0 400 385.72"
      height="512"
      width="512"
      viewBox="0 0 400 385.72"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M300,357.15h0c-15.71,0-30-10-35.71-25.72,0-1.43,0-2.85-1.43-2.85H135.72c0,1.42,0,2.85-1.43,2.85C130,347.15,115.72,357.15,100,357.15h0c-8.57,0-14.28,5.71-14.28,14.28s5.71,14.29,14.28,14.29H300c8.57,0,14.29-5.72,14.29-14.29S308.54,357.15,300,357.15Z"
        transform="translate(0 0)"
      />
      <path
        d="M357.14,0H42.86C18.57,0,0,18.58,0,42.86V257.15C0,281.43,18.57,300,42.86,300H357.14c24.29,0,42.86-18.57,42.86-42.85V42.9C400,18.58,381.43,0,357.14,0ZM146.69,190.17h-22v-39H81.41v39h-22V95h22v37.54h43.25V95h22Zm109.89,0H238.49L191,132.37v57.8H169.27V95h18.22l47.33,57.8V95h21.76Zm94.79-77.25H320.91v77.25h-22V112.92H268.41V95h83Z"
        transform="translate(0 0)"
      />
    </SvgIcon>
  );
};

export default LogoPrimaryIcon;
