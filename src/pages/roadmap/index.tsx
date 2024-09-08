import React from "react";
import RoadmapEraComponent from "~/ui/roadmap/RoadmapEraComponent";
import { roadmap } from "../../roadmap";
import MenuBar from "../../ui/landing/MenuBar";
const ProductRoadmap = () => {
  return (
    <>
      <MenuBar />
      <main
        className="items-center justify-center"
        style={{ minHeight: "calc(100vh - 5rem)" }}
      >
        <div className="mx-auto max-w-6xl rounded-lg p-8 shadow-lg md:mt-[150px] md:border md:border-primary">
          <h2 className="text-center font-beckman text-6xl font-bold">
            Andamio Roadmap
          </h2>
          <div className="">
            {roadmap.map((item, index) => (
              <RoadmapEraComponent key={index} {...item} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductRoadmap;
