import { FC, memo, SVGProps } from "react";

const FillHeartIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="15"
      height="14"
      viewBox="0 0 13 12"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6.71436 2.37318L3.71435 0.552368L0.714355 2.37318V6.27491L6.71436 11.3905L12.7144 6.27491V2.37318L9.71436 0.552368L6.71436 2.37318Z" />
    </svg>
  );
};

export default memo(FillHeartIcon);
