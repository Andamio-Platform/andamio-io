import React from "react";
import RoadmapEpicComponent from "~/ui/roadmap/RoadmapEpicComponent";
import RoadmapEraComponent from "~/ui/roadmap/RoadmapEraComponent";
import { roadmap } from "../../roadmap";
const ProductRoadmap = () => {
  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-green-50 p-8 shadow-lg">
      <h2 className="mb-8 text-3xl font-bold text-green-900">
        Product Roadmap
      </h2>
      <div className="relative border-l-2 border-green-300 pl-8">
        {roadmap.map((item, index) => (
          <RoadmapEraComponent key={index} {...item} />
        ))}
      </div>
      <RoadmapEpicComponent />
    </div>
  );
};

export default ProductRoadmap;
