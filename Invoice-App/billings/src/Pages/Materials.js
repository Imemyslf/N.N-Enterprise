import React from "react";

import { AddMaterial } from "../Components/Materials/AddMaterial";
import { ListMaterial } from "../Components/Materials/ListMaterial";

const AddMaterials = () => {
  return (
    <>
      <AddMaterial />
    </>
  );
};

const MaterialsList = () => {
  return (
    <>
      <ListMaterial />
    </>
  );
};

const SearchMaterial = () => {
  return <h1>Search Company</h1>;
};

export { AddMaterials, MaterialsList, SearchMaterial };
