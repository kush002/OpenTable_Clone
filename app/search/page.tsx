import React from "react";
import NavBar from "../components/NavBar";
import Header from "./components/Header";
import FilterSideBar from "./components/FilterSideBar";
import RestaurantCard from "./components/RestaurantCard";

const SearchPage = () => {
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <FilterSideBar />
        <RestaurantCard />
      </div>
    </>
  );
};

export default SearchPage;
