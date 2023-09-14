import React from "react";
import FeaturedComponent from "../featured/Featured.Component";
import GalleryComponent from "./gallery.Component";
import NewProductComponent from "../shop/NewProduct/NewProduct.Component";

const HomeComponent: React.FC = () => {
  return (
      <div className="">
        <FeaturedComponent/>
        <NewProductComponent/>
        <GalleryComponent/>
      </div>

  );
};

export default HomeComponent;
