import React from "react";
import { EXTERNAL_LINKS } from "~/lib/external-links";

export default function V2CodeSection() {
  return (
    <section className="bg-surface-dark py-24 sm:py-32">
      <div className="mx-auto max-w-none px-5 sm:px-8 lg:px-14 2xl:px-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Build apps anchored on interoperable credentials. Andamio handles
              the blockchain.
            </h2>
            <p className="mt-6 max-w-lg text-lg text-gray-300">
              You send an API request. We build the transaction, validate the
              scripts, and submit to Cardano.
            </p>
            <a
              href={EXTERNAL_LINKS.apiReference}
              className="mt-8 inline-block text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline"
            >
              View Full API Reference
            </a>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/10 opacity-50 blur-xl" />
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-surface-dark-elevated">
              <div className="flex items-center gap-2 border-b border-white/10 bg-surface-dark px-4 py-3">
                <span className="font-mono text-xs text-gray-500">
                  api.andamio.io
                </span>
              </div>

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
      </div>
    </section>
  );
}
