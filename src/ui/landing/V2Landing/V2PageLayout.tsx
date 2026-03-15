"use client";

import React from "react";
import { motion } from "framer-motion";
import V2Navigation from "./V2Navigation";
import Footer from "~/ui/landing/Footer";

interface V2PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function V2PageLayout({
  children,
  title,
  description,
}: V2PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <V2Navigation />

      <main className="relative pt-20">
        {/* Page Header */}
        {(title ?? description) && (
          <div className="relative overflow-hidden border-b border-border bg-muted/40 py-16 sm:py-20">
            {/* Dot grid texture */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, currentColor 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <motion.div
              className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {title && (
                <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
                  {title}
                </h1>
              )}
              {description && (
                <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
                  {description}
                </p>
              )}
            </motion.div>
          </div>
        )}

        {/* Page Content */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
