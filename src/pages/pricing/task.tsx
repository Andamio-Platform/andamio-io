import { Card } from "~/components/ui/card";
import ModernPageLayout from "~/components/layouts/ModernPageLayout";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function TaskCompletionPage() {
  return (
    <ModernPageLayout
      title="Task Completion Fee"
      description="Transaction fee for processing task payments from project treasuries"
      currentPage="pricing"
    >
      <div className="pb-8">
        <Link href="/pricing" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Pricing
        </Link>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <Card className="border border-orange-500/50 bg-gray-800/50 p-4">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-orange-500/30 bg-orange-600/20">
                <svg className="h-6 w-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h2 className="mb-2 text-xl font-bold text-white">Task Completion Fee</h2>
              <p className="text-sm text-gray-300 mb-3">
                Small percentage charged on successful task payments from project treasuries.
              </p>

              <div className="border-t border-gray-700 pt-3">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold text-white">0.25%</span>
                </div>
                <p className="text-sm text-gray-400">Of task payment</p>
                <p className="text-xs text-gray-500 mt-1">Minimum: 1 ADA</p>
              </div>
            </Card>

            <Card className="border border-gray-700 bg-gray-800/50 p-4">
              <h3 className="mb-3 text-lg font-bold text-white">How It Works</h3>
              <ol className="space-y-2">
                <li className="flex gap-2 items-start">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-white text-xs font-semibold flex-shrink-0">1</div>
                  <span className="text-xs text-gray-300">Task submitted & approved</span>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-white text-xs font-semibold flex-shrink-0">2</div>
                  <span className="text-xs text-gray-300">Payment calculated from treasury</span>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-white text-xs font-semibold flex-shrink-0">3</div>
                  <span className="text-xs text-gray-300">0.25% fee automatically deducted</span>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-white text-xs font-semibold flex-shrink-0">4</div>
                  <span className="text-xs text-gray-300">Smart contract processes payment</span>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-white text-xs font-semibold flex-shrink-0">5</div>
                  <span className="text-xs text-gray-300">Net amount sent to contributor</span>
                </li>
              </ol>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border border-gray-700 bg-gray-800/50 p-4">
              <h3 className="mb-3 text-lg font-bold text-white">Fee Examples</h3>
              <div className="space-y-2">
                <div className="border border-gray-700 rounded p-2 bg-gray-900/50">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">100 ADA</span>
                    <span className="text-orange-400 text-xs">-1 ADA</span>
                    <span className="text-green-400 font-semibold text-xs">99 ADA</span>
                  </div>
                </div>
                <div className="border border-gray-700 rounded p-2 bg-gray-900/50">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">1,000 ADA</span>
                    <span className="text-orange-400 text-xs">-2.5 ADA</span>
                    <span className="text-green-400 font-semibold text-xs">997.5 ADA</span>
                  </div>
                </div>
                <div className="border border-gray-700 rounded p-2 bg-gray-900/50">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">10,000 ADA</span>
                    <span className="text-orange-400 text-xs">-25 ADA</span>
                    <span className="text-green-400 font-semibold text-xs">9,975 ADA</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border border-gray-700 bg-gray-800/50 p-4">
              <h3 className="mb-2 text-lg font-bold text-white">Why This Fee?</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold text-white text-sm">Infrastructure:</span>
                  <span className="text-gray-300 text-xs"> Smart contract execution costs</span>
                </div>
                <div>
                  <span className="font-semibold text-white text-sm">Platform:</span>
                  <span className="text-gray-300 text-xs"> Maintains and improves Andamio</span>
                </div>
                <div>
                  <span className="font-semibold text-white text-sm">Low Rate:</span>
                  <span className="text-gray-300 text-xs"> Just 0.25% transaction fee</span>
                </div>
                <div>
                  <span className="font-semibold text-white text-sm">Transparent:</span>
                  <span className="text-gray-300 text-xs"> Clear calculation before completion</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ModernPageLayout>
  );
}