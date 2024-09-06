import { ColourSchemeToggle } from "@/features/Home/components/ColourSchemeToggle";
import { Welcome } from "@/features/Home/components/Welcome";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <>
      <Welcome />
      <ColourSchemeToggle />
    </>
  );
};

export const Component = HomePage;
Component.displayName = "HomePage";

export default HomePage;
