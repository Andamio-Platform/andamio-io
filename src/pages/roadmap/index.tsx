import { useState, useRef } from "react";
import RoadmapEraComponent from "~/ui/roadmap/RoadmapEraComponent";
import { roadmap } from "../../roadmap";
import { futureRoadmap } from "../../future-roadmap";
import MenuBar from "../../ui/landing/MenuBar";
import Footer from "~/ui/landing/Footer";

const ProductRoadmap = () => {
  const [showFuture, setShowFuture] = useState(false);
  const futureRef = useRef<HTMLDivElement>(null);
  
  const toggleFuture = () => {
    setShowFuture(!showFuture);
    
    // Scroll to future section with animation when showing future
    if (!showFuture && futureRef.current) {
      setTimeout(() => {
        futureRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };
  
  return (
    <>
      <MenuBar />
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          {/* Simple, centered header */}
          <div className="mb-16 text-center">
            <h1 className="font-beckman text-5xl font-bold tracking-tight md:text-6xl">
              Andamio Roadmap
            </h1>
            
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Our journey of building the Andamio platform and ecosystem, from founding to the present day and beyond.
            </p>
          </div>
          
          {/* Main timeline container */}
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/40"></div>
            
            {/* Future section (conditionally rendered) */}
            {showFuture && (
              <div 
                ref={futureRef}
                className="animate-in fade-in slide-in-from-top-8 duration-500"
              >
                <div className="relative mb-12">
                  {/* Center the button exactly on the timeline */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <button 
                      onClick={toggleFuture}
                      className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-background transition-all hover:bg-primary/5 hover:shadow-md"
                      aria-label="Return to present day"
                    >
                      <div className="relative h-4 w-4 rounded-full bg-primary group-hover:scale-110 transition-transform"></div>
                      <span className="absolute -top-3 left-1/2 h-4 w-4 -translate-x-1/2 animate-bounce text-primary">
                        ↑
                      </span>
                    </button>
                  </div>
                  
                  {/* Text positioned to the right of the centered button */}
                  <div className="flex justify-center">
                    <div className="w-1/2"></div> {/* Empty div for spacing */}
                    <div className="pl-20 text-left w-1/2">
                      <p className="text-base font-medium text-primary">Future Vision</p>
                      <p className="text-sm text-muted-foreground">Click to return to present</p>
                    </div>
                  </div>
                </div>
                
                {/* Future roadmap eras */}
                <div className="relative z-10">
                  {futureRoadmap.map((item, index) => (
                    <RoadmapEraComponent 
                      key={`future-${index}`} 
                      {...item} 
                      position={index % 2 === 0 ? "left" : "right"} 
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Present day marker - clickable with side text */}
            <div className="relative mb-12">
              {/* Center the button exactly on the timeline */}
              <div className="absolute left-1/2 -translate-x-1/2 z-10">
                <button 
                  onClick={toggleFuture}
                  className={`group relative inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-background transition-all hover:bg-primary/5 hover:shadow-md ${!showFuture ? 'animate-pulse-slow' : ''}`}
                  aria-label={showFuture ? "Hide future roadmap" : "Show future roadmap"}
                >
                  {/* Glowing effect */}
                  <span className={`absolute -inset-0.5 rounded-full bg-primary/20 blur opacity-75 ${!showFuture ? 'animate-glow' : 'opacity-0'}`}></span>
                  
                  <div className="relative h-4 w-4 rounded-full bg-primary group-hover:scale-110 transition-transform"></div>
                  {showFuture && (
                    <span className="absolute -top-3 left-1/2 h-4 w-4 -translate-x-1/2 animate-bounce text-primary">
                      ↑
                    </span>
                  )}
                  {!showFuture && (
                    <span className="absolute -bottom-3 left-1/2 h-4 w-4 -translate-x-1/2 animate-bounce text-primary">
                      ↓
                    </span>
                  )}
                </button>
              </div>
              
              {/* Text positioned to the left of the centered button */}
              <div className="flex justify-center">
                <div className="pr-20 text-right w-1/2">
                  <p className="text-base font-medium text-primary">Present Day</p>
                  <p className="text-sm text-muted-foreground">
                    {!showFuture ? "Click to explore the future" : "Click to return to present"}
                  </p>
                </div>
                <div className="w-1/2"></div> {/* Empty div for spacing */}
              </div>
            </div>
            
            {/* Current roadmap eras - in reverse chronological order (newest to oldest) */}
            <div className="relative z-10">
              {[...roadmap].reverse().map((item, index) => (
                <RoadmapEraComponent key={index} {...item} position={index % 2 === 0 ? "left" : "right"} />
              ))}
            </div>
            
            {/* Timeline start marker */}
            <div className="relative mt-12 text-center">
              <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary bg-background">
                <div className="h-3 w-3 rounded-full bg-primary"></div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Founding</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductRoadmap;
