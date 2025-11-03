import React from "react";
import NavigationBar from "~/components/shared/NavigationBar";
import AngularGridOverlay from "~/components/shared/AngularGridOverlay";
import Footer from "~/ui/landing/Footer";

interface ModernPageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  currentPage?: string;
}

export default function ModernPageLayout({
  children,
  title,
  description,
  currentPage,
}: ModernPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AngularGridOverlay />
      <NavigationBar currentPage={currentPage} />

      <main className="relative pt-20">
        {/* Page Header */}
        {(title ?? description) && (
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="relative">
              {/* Angular accent lines */}
              <div className="absolute -top-8 left-0 h-1 w-32 bg-gradient-to-r from-primary to-transparent shadow-lg shadow-primary/50"></div>
              <div className="absolute -top-4 left-8 h-1 w-16 bg-gradient-to-r from-muted-foreground/60 to-transparent"></div>

              {title && (
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-1 w-12 bg-gradient-to-r from-primary to-transparent"></div>
                  <h1 className="text-4xl font-bold text-foreground lg:text-6xl">
                    {title}
                  </h1>
                </div>
              )}
              {description && (
                <p className="max-w-3xl text-xl text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
