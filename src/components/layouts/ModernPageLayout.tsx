import React from "react";
import V2Navigation from "~/ui/landing/V2Landing/V2Navigation";
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
}: ModernPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <V2Navigation />

      <main className="relative pt-20">
        {/* Page Header */}
        {(title ?? description) && (
          <div className="border-b border-border py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              {title && (
                <h1 className="font-display text-4xl font-extrabold tracking-[-0.025em] text-foreground sm:text-5xl">
                  {title}
                </h1>
              )}
              {description && (
                <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
