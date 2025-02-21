import { FC, PropsWithChildren } from "react";
import SharedLayout from "../SharedLayout";

const HomeLayout: FC<PropsWithChildren> = ({ children }) => {
  return <SharedLayout>{children}</SharedLayout>;
};

export default HomeLayout;
