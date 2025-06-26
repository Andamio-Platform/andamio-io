import { useState, useMemo } from "react";
import { roadmap, type Epic } from "../../roadmap";
import Footer from "~/ui/landing/Footer";
import { Clock, Layers } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import RoadmapEpicComponent from "~/ui/roadmap/RoadmapEpicComponent";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import Image from "next/image";

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
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Angular Grid Overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        <div className="grid h-full grid-cols-16">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border-r border-white/20"></div>
          ))}
        </div>
        <div className="absolute inset-0">
          <div className="flex h-full flex-col">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="flex-1 border-b border-white/10"></div>
            ))}
          </div>
        </div>
        {/* Additional vertical accent lines */}
        <div className="absolute left-1/4 top-0 h-full w-px bg-white/15"></div>
        <div className="absolute left-1/2 top-0 h-full w-px bg-white/20"></div>
        <div className="absolute left-3/4 top-0 h-full w-px bg-white/15"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/20 bg-gray-950/90 shadow-2xl backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center gap-3">
                  <Image
                    className="h-10 w-auto"
                    src="/andamio-logo-no-white-overflow.png"
                    alt="Andamio"
                    width={100}
                    height={100}
                  />
                  <span className="text-xl font-bold text-white">Andamio</span>
                </div>
              </Link>
            </div>
            <div className="hidden items-center space-x-8 md:flex">
              <Link
                href="/#protocol"
                className="font-medium text-gray-300 transition-colors duration-200 hover:text-white"
              >
                Docs
              </Link>
              <Link
                href="/roadmap"
                className="font-medium text-white transition-colors duration-200"
              >
                Roadmap
              </Link>
              <Link
                href="/blog"
                className="font-medium text-gray-300 transition-colors duration-200 hover:text-white"
              >
                Blog
              </Link>
              <Button
                size="sm"
                className="bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700"
              >
                Andamio 101
              </Button>
              <Link
                href="https://app.andamio.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-white/30 bg-gray-800/50 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:border-white/50 hover:bg-gray-700/50"
              >
                <span>Enter App</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative pt-20">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          {/* Header */}
          <div className="relative mb-16">
            {/* Angular accent lines */}
            <div className="absolute -top-8 left-0 h-1 w-32 bg-gradient-to-r from-blue-500 to-transparent shadow-lg shadow-blue-500/50"></div>
            <div className="absolute -top-4 left-8 h-1 w-16 bg-gradient-to-r from-white/60 to-transparent"></div>

            <div className="mb-6 flex items-center gap-4">
              <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-transparent"></div>
              <h1 className="text-4xl font-bold text-white lg:text-6xl">
                Roadmap
              </h1>
            </div>
            <p className="max-w-3xl text-xl text-gray-300">
              Our journey of building the Andamio platform and ecosystem, from
              founding to the present day and beyond.
            </p>
          </div>

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
      </main>
      <Footer />
    </div>
  );
};

export default ProductRoadmap;
