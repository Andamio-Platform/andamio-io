"use client";

import React from "react";
import { motion } from "framer-motion";
import { EXTERNAL_LINKS } from "~/lib/external-links";

export default function V2CodeSection() {
  return (
    <section className="flex min-h-screen items-center bg-[#0d1117] py-20 sm:py-32">
      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column — copy */}
          <div>
            <p className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
              FOR DEVELOPERS
            </p>
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
              Build apps anchored on interoperable credentials.
              <br />
              <span className="mt-2 inline-block text-gray-400">Andamio handles the blockchain.</span>
            </h2>
            <p className="mb-8 text-lg text-gray-300">
              You send an API request. We build the transaction, validate the scripts, and submit to Cardano.
            </p>
            <a
              href={EXTERNAL_LINKS.apiReference}
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              View Full API Reference &rarr;
            </a>
          </div>

          {/* Right column — code block */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/10 opacity-50 blur-xl" />
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#161b22]">
            {/* Terminal header */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-[#0d1117] px-4 py-3">
              <span className="font-mono text-xs text-gray-500">api.andamio.io</span>
            </div>

            {/* Code content */}
            <div className="overflow-x-auto px-4 py-4">
              <pre className="font-mono text-sm leading-relaxed">
                <code>
                  <span className="text-gray-500">{"# Claim a credential"}</span>
                  {"\n"}
                  <span className="text-[#79c0ff]">curl</span>
                  <span className="text-[#ff7b72]"> -X</span>
                  <span className="text-gray-300"> POST \</span>
                  {"\n"}
                  <span className="text-gray-300">{"  "}</span>
                  <span className="text-[#a5d6ff]">
                    api.andamio.io/api/v2/tx/course/student/credential/claim
                  </span>
                  <span className="text-gray-300"> \</span>
                  {"\n"}
                  <span className="text-gray-300">{"  "}</span>
                  <span className="text-[#ff7b72]">-H</span>
                  <span className="text-gray-300"> </span>
                  <span className="text-[#a5d6ff]">
                    &quot;X-API-Key: $ANDAMIO_API_KEY&quot;
                  </span>
                  <span className="text-gray-300"> \</span>
                  {"\n"}
                  <span className="text-gray-300">{"  "}</span>
                  <span className="text-[#ff7b72]">-d</span>
                  <span className="text-gray-300"> </span>
                  <span className="text-[#a5d6ff]">&apos;{"{"}</span>
                  {"\n"}
                  <span className="text-gray-300">{"    "}</span>
                  <span className="text-[#79c0ff]">&quot;alias&quot;</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-[#a5d6ff]">&quot;alice&quot;</span>
                  <span className="text-gray-300">,</span>
                  {"\n"}
                  <span className="text-gray-300">{"    "}</span>
                  <span className="text-[#79c0ff]">&quot;course_id&quot;</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-[#a5d6ff]">&quot;d7d6c8a9...&quot;</span>
                  {"\n"}
                  <span className="text-[#a5d6ff]">{"  }"}&apos;</span>
                  {"\n"}
                  {"\n"}
                  <span className="italic text-gray-500">
                    {"# "}
                    <span className="text-[#7ee787]">200 OK</span>
                    {" — sign this with any Cardano wallet, then submit"}
                  </span>
                  {"\n"}
                  <span className="text-gray-300">{"{ "}</span>
                  <span className="text-[#79c0ff]">&quot;unsigned_tx&quot;</span>
                  <span className="text-gray-300">: </span>
                  <span className="text-[#a5d6ff]">&quot;84a700...&quot;</span>
                  <span className="text-gray-300">{" }"}</span>
                </code>
              </pre>
            </div>
          </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
