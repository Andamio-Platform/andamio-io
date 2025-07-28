import { useState, useMemo } from "react";
import { roadmap, type Epic } from "../../roadmap";
import ModernPageLayout from "~/components/layouts/ModernPageLayout";
import { Clock, Layers } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import RoadmapEpicComponent from "~/ui/roadmap/RoadmapEpicComponent";
import { Button } from "~/components/ui/button";
import Link from "next/link";

const ProductRoadmap = () => {
  // Default to oldest first for chronological view
  const newestFirst = false;

  // State to control view mode (time-based or category-based)
  const [viewMode, setViewMode] = useState<"time" | "category">("time");

  // State to track the active category tab
  const [activeCategory, setActiveCategory] = useState<string>("");

  // State to track the active year tab in chronological view
  const [activeYear, setActiveYear] = useState<string>("");

  // Helper function to get timestamp from an epic for sorting
  const getEpicTimestamp = (epic: Epic): { year: number; quarter: number } => {
    // Handle potential undefined year and ranges like "2025-2026"
    const yearStr = epic.year ?? "0";
    const epicYear = parseInt(yearStr);
    const year = isNaN(epicYear)
      ? parseInt(yearStr.split("-")[0] ?? "0")
      : epicYear;
    return { year, quarter: epic.quarter };
  };

  // Sort roadmap items by category, with epics inside each category sorted chronologically
  const categorySortedItems = useMemo(() => {
    const sorted = [...roadmap].map((category) => {
      // Sort epics within each category chronologically
      const sortedEpics = [...category.epics].sort((a, b) => {
        const aTimestamp = getEpicTimestamp(a);
        const bTimestamp = getEpicTimestamp(b);

        if (aTimestamp.year !== bTimestamp.year) {
          return aTimestamp.year - bTimestamp.year;
        }
        return aTimestamp.quarter - bTimestamp.quarter;
      });

      return {
        ...category,
        epics: sortedEpics,
      };
    });

    // Set the first category as active by default if not already set
    if (sorted.length > 0 && !activeCategory) {
      // Use setTimeout to avoid React warning about state updates during render
      setTimeout(() => {
        setActiveCategory(sorted[0]?.category ?? "");
      }, 0);
    }

    return sorted;
  }, [activeCategory]);

  // For time-based view: flatten all epics across categories and sort chronologically
  const timeSortedItems = useMemo(() => {
    // Create a flattened array of all epics with their category info
    const allEpics: Array<{ epic: Epic; category: string }> = [];

    roadmap.forEach((category) => {
      category.epics.forEach((epic) => {
        allEpics.push({
          epic,
          category: category.category,
        });
      });
    });

    // Sort all epics chronologically
    const sorted = allEpics.sort((a, b) => {
      const aTimestamp = getEpicTimestamp(a.epic);
      const bTimestamp = getEpicTimestamp(b.epic);

      if (aTimestamp.year !== bTimestamp.year) {
        return aTimestamp.year - bTimestamp.year;
      }
      return aTimestamp.quarter - bTimestamp.quarter;
    });

    // Set the first year as active by default if not already set
    if (sorted.length > 0 && !activeYear) {
      // Use setTimeout to avoid React warning about state updates during render
      setTimeout(() => {
        const firstYear = sorted[0]?.epic.year ?? "";
        setActiveYear(firstYear);
      }, 0);
    }

    return sorted;
  }, [activeYear]);

  // Get unique years from all epics for year tabs
  const uniqueYears = useMemo(() => {
    const years: string[] = [];

    timeSortedItems.forEach((item) => {
      // Safely handle potentially undefined year values
      const yearStr = item.epic.year ?? "";
      if (yearStr) {
        // Handle year ranges like "2025-2026" by taking the first year
        const year = yearStr.includes("-") ? yearStr.split("-")[0] : yearStr;

        // Only add if not already in the array
        if (!!year && !years.includes(year)) {
          years.push(year);
        }
      }
    });

    return years.sort();
  }, [timeSortedItems]);

  // Filter time-sorted items by selected year
  const filteredByYear = useMemo(() => {
    if (!activeYear) return timeSortedItems;

    return timeSortedItems.filter((item) => {
      // Safely handle potentially undefined year values
      const yearStr = item.epic.year ?? "";
      // Check if the year starts with the active year or matches it exactly
      return yearStr.startsWith(activeYear) || yearStr === activeYear;
    });
  }, [timeSortedItems, activeYear]);

  return (
    <ModernPageLayout
      title="Roadmap"
      description="Our journey of building the Andamio platform and ecosystem, from founding to the present day and beyond."
      currentPage="roadmap"
    >
      <div className="pb-20">
        {/* View mode controls */}
        <div className="mb-8 w-full md:w-80">
          <Tabs
              defaultValue="time"
              value={viewMode}
              onValueChange={(value) =>
                setViewMode(value as "time" | "category")
              }
              className="rounded-none"
            >
              <TabsList className="grid w-full grid-cols-2 rounded-sm border border-white/20 bg-gray-800/50 backdrop-blur-sm">
                <TabsTrigger
                  value="time"
                  className="flex items-center justify-center space-x-2 rounded-sm text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Clock className="h-4 w-4" />
                  <span>Timeline</span>
                </TabsTrigger>
                <TabsTrigger
                  value="category"
                  className="flex items-center justify-center space-x-2 rounded-sm text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Layers className="h-4 w-4" />
                  <span>Categories</span>
                </TabsTrigger>
              </TabsList>
          </Tabs>
        </div>

        {/* Main content container */}
        <div className="relative">
          {/* Time-based view */}
          {viewMode === "time" && (
              <div className="relative z-10">
                <div className="mb-8 mt-2">
                  <Tabs
                    value={activeYear}
                    onValueChange={setActiveYear}
                    orientation="vertical"
                    className="flex flex-col md:flex-row"
                  >
                    {/* Sidebar with year tabs */}
                    <div className="w-full md:w-80 md:shrink-0 md:pr-8">
                      <TabsList className="mb-2 flex w-full flex-row gap-2 overflow-x-auto bg-transparent p-0 md:flex-col md:overflow-visible">
                        {uniqueYears.map((year) => (
                          <TabsTrigger
                            key={year}
                            value={year}
                            className="w-full justify-start rounded-sm border border-white/20 bg-gray-800/50 px-4 py-3 text-left text-sm font-medium text-white backdrop-blur-sm hover:bg-gray-700/50 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                          >
                            {year}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      <Link href="https://andamio.notion.site/1fb44d820e1d804ebec4f0142d3f267a?pvs=105">
                        <Button className="w-full rounded-sm bg-blue-600 text-white hover:bg-blue-700">
                          Give Feedback
                        </Button>
                      </Link>
                    </div>

                    {/* Content area */}
                    <div className="mt-6 flex-1 md:-mt-12">
                      {uniqueYears.map((year) => (
                        <TabsContent key={year} value={year} className="mt-0">
                          {/* Year heading */}
                          <div className="mb-8 text-right">
                            <h2 className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-6xl font-bold tracking-tight text-transparent">
                              {year}
                            </h2>
                          </div>

                          {/* Timeline items */}
                          <div className="mb-16 grid grid-cols-1 gap-6">
                            {(newestFirst
                              ? [...filteredByYear].reverse()
                              : filteredByYear
                            )
                              .filter((item) => {
                                const yearStr = item.epic.year ?? "";
                                return (
                                  yearStr.startsWith(year) || yearStr === year
                                );
                              })
                              .map((item, index) => (
                                <div key={index} className="w-full">
                                  <RoadmapEpicComponent
                                    epic={item.epic}
                                    category={item.category}
                                  />
                                </div>
                              ))}
                          </div>

                          {/* End marker */}
                          <div className="mt-12 text-center">
                            <p className="text-sm text-gray-400">
                              End of {year}
                            </p>
                          </div>
                        </TabsContent>
                      ))}
                    </div>
                  </Tabs>
                </div>
              </div>
          )}

          {/* Category-based view */}
          {viewMode === "category" && (
              <div className="relative z-10">
                <div className="mb-8 mt-2">
                  <Tabs
                    value={activeCategory}
                    onValueChange={setActiveCategory}
                    orientation="vertical"
                    className="flex flex-col md:flex-row"
                  >
                    {/* Sidebar with category tabs */}
                    <div className="w-full md:w-80 md:shrink-0 md:pr-8">
                      <TabsList className="mb-2 flex w-full flex-row gap-2 overflow-x-auto bg-transparent p-0 md:flex-col md:overflow-visible">
                        {categorySortedItems.map((category, index) => (
                          <TabsTrigger
                            key={index}
                            value={category.category}
                            className="w-full justify-start rounded-sm border border-white/20 bg-gray-800/50 px-4 py-3 text-left text-sm font-medium text-white backdrop-blur-sm hover:bg-gray-700/50 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                          >
                            {category.category}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      <Link href="https://andamio.notion.site/1fb44d820e1d804ebec4f0142d3f267a?pvs=105">
                        <Button className="w-full rounded-sm bg-blue-600 text-white hover:bg-blue-700">
                          Give Feedback
                        </Button>
                      </Link>
                    </div>

                    {/* Content area */}
                    <div className="mt-6 flex-1 md:-mt-12">
                      {categorySortedItems.map((category, index) => (
                        <TabsContent
                          key={index}
                          value={category.category}
                          className="mt-0"
                        >
                          {/* Category heading */}
                          <div className="mb-8 text-right">
                            <h2 className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-6xl font-bold tracking-tight text-transparent">
                              {category.category}
                            </h2>
                          </div>

                          {/* Epics in this category */}
                          <div className="mb-16 grid grid-cols-1 gap-6">
                            {category.epics.map((epic, epicIndex) => (
                              <div key={epicIndex} className="w-full">
                                <RoadmapEpicComponent epic={epic} />
                              </div>
                            ))}
                          </div>

                          {/* End marker */}
                          <div className="mt-12 text-center">
                            <p className="text-sm text-gray-400">
                              End of {category.category}
                            </p>
                          </div>
                        </TabsContent>
                      ))}
                    </div>
                  </Tabs>
                </div>
              </div>
          )}
        </div>
      </div>
    </ModernPageLayout>
  );
};

export default ProductRoadmap;
