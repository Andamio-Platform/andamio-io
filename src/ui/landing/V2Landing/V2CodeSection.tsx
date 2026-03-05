"use client";

import React from "react";
import { motion } from "framer-motion";

export default function V2CodeSection() {
  return (
    <section className="bg-[#0d1117] py-16 sm:py-24">
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
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
              SEE IT WORK
            </p>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Credential issuance via API
            </h2>
            <p className="mb-6 text-lg text-gray-400">
              Build a credential transaction with a POST request. The API
              returns an unsigned transaction for wallet signing and on-chain
              submission.
            </p>
            <a
              href="https://docs.andamio.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              View Full API Reference &rarr;
            </a>
          </div>

          {/* Right column — code block */}
          <div className="overflow-hidden rounded-lg border border-white/10 bg-[#161b22]">
            {/* Terminal header */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-[#0d1117] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs text-gray-500">Terminal</span>
            </div>

            {/* Code content */}
            <div className="overflow-x-auto px-4 py-4">
              <pre className="font-mono text-sm leading-relaxed">
                <code>
                  <span className="text-gray-500">{"# Step 1: Build credential transaction"}</span>
                  {"\n"}
                  <span className="text-[#79c0ff]">curl</span>
                  <span className="text-[#ff7b72]"> -X</span>
                  <span className="text-gray-300"> POST \</span>
                  {"\n"}
                  <span className="text-gray-300">{"  "}</span>
                  <span className="text-[#a5d6ff]">
                    api.andamio.io/api/v2/tx/credential/claim
                  </span>
                  <span className="text-gray-300"> \</span>
                  {"\n"}
                  <span className="text-gray-300">{"  "}</span>
                  <span className="text-[#ff7b72]">-H</span>
                  <span className="text-gray-300"> </span>
                  <span className="text-[#a5d6ff]">
                    &quot;X-API-Key: sk_live_...&quot;
                  </span>
                  <span className="text-gray-300"> \</span>
                  {"\n"}
                  <span className="text-gray-300">{"  "}</span>
                  <span className="text-[#ff7b72]">-d</span>
                  <span className="text-gray-300"> </span>
                  <span className="text-[#a5d6ff]">&apos;{"{"}</span>
                  {"\n"}
                  <span className="text-gray-300">{"    "}</span>
                  <span className="text-[#79c0ff]">
                    &quot;alias&quot;
                  </span>
                  <span className="text-gray-300">: </span>
                  <span className="text-[#a5d6ff]">
                    &quot;addr1q8x...&quot;
                  </span>
                  <span className="text-gray-300">,</span>
                  {"\n"}
                  <span className="text-gray-300">{"    "}</span>
                  <span className="text-[#79c0ff]">
                    &quot;course_id&quot;
                  </span>
                  <span className="text-gray-300">: </span>
                  <span className="text-[#a5d6ff]">
                    &quot;d7d6c8a9...&quot;
                  </span>
                  {"\n"}
                  <span className="text-[#a5d6ff]">
                    {"  }"}&apos;
                  </span>
                  {"\n"}
                  {"\n"}
                  <span className="italic text-gray-500">
                    # Response &mdash; <span className="text-[#7ee787]">unsigned transaction</span>
                  </span>
                  {"\n"}
                  <span className="text-gray-300">{"{"}</span>
                  {"\n"}
                  <span className="text-gray-300">{"  "}</span>
                  <span className="text-[#79c0ff]">
                    &quot;unsigned_tx&quot;
                  </span>
                  <span className="text-gray-300">: </span>
                  <span className="text-[#a5d6ff]">
                    &quot;d8799f4100ff...&quot;
                  </span>
                  {"\n"}
                  <span className="text-gray-300">{"}"}</span>
                  {"\n"}
                  {"\n"}
                  <span className="text-gray-500">{"# Step 2: Sign with wallet & submit"}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
