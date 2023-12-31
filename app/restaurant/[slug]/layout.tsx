import React from "react";
import Header from "./components/Header";
import "react-datepicker/dist/react-datepicker.css";

const RestaurantLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  return (
    <>
      <Header name={params.slug} />
      <div className="flex m-auto w-2/3 justify-between items-start -mt-11">
        {children}
      </div>
    </>
  );
};

export default RestaurantLayout;
