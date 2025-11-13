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
    // Get the first year from the years array
    const yearStr = epic.years[0] ?? "0";
    const epicYear = parseInt(yearStr);
    const year = isNaN(epicYear) ? 0 : epicYear;
    return { year, quarter: epic.quarter ?? 0 };
  };

  // Sort roadmap items by category, with epics inside each category sorted chronologically
  const categorySortedItems = useMemo(() => {
    const sorted = [...roadmap].map((category) => {
      // Sort epics within each category chronologically
      const sortedEpics = [...category.epics].sort((a, b) => {
        const aTimestamp = getEpicTimestamp(a);
        const bTimestamp = getEpicTimestamp(b);

        // Compare years first
        if (aTimestamp.year !== bTimestamp.year) {
          return aTimestamp.year - bTimestamp.year;
        }

        // If years are equal, compare quarters
        // Treat undefined quarters as coming after defined quarters (sort to end of year)
        if (aTimestamp.quarter === 0 && bTimestamp.quarter === 0) {
          return 0; // Both undefined, maintain relative order
        }
        if (aTimestamp.quarter === 0) {
          return 1; // a is undefined, b comes first
        }
        if (bTimestamp.quarter === 0) {
          return -1; // b is undefined, a comes first
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

      // Compare years first
      if (aTimestamp.year !== bTimestamp.year) {
        return aTimestamp.year - bTimestamp.year;
      }

      // If years are equal, compare quarters
      // Treat undefined quarters as coming after defined quarters (sort to end of year)
      if (aTimestamp.quarter === 0 && bTimestamp.quarter === 0) {
        return 0; // Both undefined, maintain relative order
      }
      if (aTimestamp.quarter === 0) {
        return 1; // a is undefined, b comes first
      }
      if (bTimestamp.quarter === 0) {
        return -1; // b is undefined, a comes first
      }
      return aTimestamp.quarter - bTimestamp.quarter;
    });

    // Set the first year as active by default if not already set
    if (sorted.length > 0 && !activeYear) {
      // Use setTimeout to avoid React warning about state updates during render
      setTimeout(() => {
        const firstYear = sorted[0]?.epic.years[0] ?? "";
        setActiveYear(firstYear);
      }, 0);
    }

    return sorted;
  }, [activeYear]);

  // Get unique years from all epics for year tabs
  const uniqueYears = useMemo(() => {
    const years: string[] = [];

    timeSortedItems.forEach((item) => {
      // Extract all years from the years array
      item.epic.years.forEach((yearStr) => {
        if (yearStr && !years.includes(yearStr)) {
          years.push(yearStr);
        }
      });
    });

    return years.sort();
  }, [timeSortedItems]);

  // Filter time-sorted items by selected year
  const filteredByYear = useMemo(() => {
    if (!activeYear) return timeSortedItems;

    return timeSortedItems.filter((item) => {
      // Check if any of the epic's years matches the active year
      return item.epic.years.includes(activeYear);
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
              <TabsList className="grid w-full grid-cols-2 rounded-md border border-border bg-muted">
                <TabsTrigger
                  value="time"
                  className="flex items-center justify-center space-x-2 rounded-md text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Clock className="h-4 w-4" />
                  <span>Timeline</span>
                </TabsTrigger>
                <TabsTrigger
                  value="category"
                  className="flex items-center justify-center space-x-2 rounded-md text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
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
                            className="w-full justify-start rounded-md border border-border bg-card px-4 py-3 text-left text-sm font-medium text-foreground shadow-sm hover:bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                          >
                            {year}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      <Link href="https://andamio.notion.site/1fb44d820e1d804ebec4f0142d3f267a?pvs=105">
                        <Button className="w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
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
                            <h2 className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-6xl font-bold tracking-tight text-transparent">
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
                                return item.epic.years.includes(year);
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
                            <p className="text-sm text-muted-foreground">
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
                            className="w-full justify-start rounded-md border border-border bg-card px-4 py-3 text-left text-sm font-medium text-foreground shadow-sm hover:bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                          >
                            {category.category}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      <Link href="https://andamio.notion.site/1fb44d820e1d804ebec4f0142d3f267a?pvs=105">
                        <Button className="w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
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
                            <h2 className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-6xl font-bold tracking-tight text-transparent">
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
                            <p className="text-sm text-muted-foreground">
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
