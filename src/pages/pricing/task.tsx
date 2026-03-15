import { Card } from "~/components/ui/card";
import ModernPageLayout from "~/components/layouts/ModernPageLayout";
import Link from "next/link";

export default function TaskCompletionPage() {
  return (
    <ModernPageLayout
      title="Project Commission"
      description="Protocol-level commission on task reward payouts, with per-project NFT discount add-ons"
      currentPage="pricing"
    >
      <div className="pb-8">
        <Link href="/pricing" className="mb-4 inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Protocol Costs
        </Link>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            <Card className="border border-orange-500/50 bg-gray-800/50 p-4">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-orange-500/30 bg-orange-600/20">
                <svg className="h-6 w-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h2 className="mb-2 text-xl font-bold text-white">Project Commission</h2>
              <p className="text-sm text-gray-300 mb-3">
                A percentage charged on task reward payouts from project treasuries. This is a protocol-level fee that applies regardless of whether you use the API or Platform.
              </p>

              <div className="border-t border-gray-700 pt-3">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold text-white">5%</span>
                  <span className="text-sm text-gray-400">base rate</span>
                </div>
                <p className="text-sm text-gray-400">Buy down to 0% with NFT add-ons</p>
                <p className="text-xs text-gray-500 mt-1">Minimum: 1 ADA per task</p>
              </div>
            </Card>

            <Card className="border border-gray-700 bg-gray-800/50 p-4">
              <h3 className="mb-3 text-lg font-bold text-white">How It Works</h3>
              <ol className="space-y-2">
                <li className="flex gap-2 items-start">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-white text-xs font-semibold flex-shrink-0">1</div>
                  <span className="text-xs text-gray-300">Task submitted & approved by manager</span>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-white text-xs font-semibold flex-shrink-0">2</div>
                  <span className="text-xs text-gray-300">Payment calculated from project treasury</span>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-white text-xs font-semibold flex-shrink-0">3</div>
                  <span className="text-xs text-gray-300">Commission rate read from Project NFT metadata</span>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-white text-xs font-semibold flex-shrink-0">4</div>
                  <span className="text-xs text-gray-300">Commission deducted, net amount sent to contributor</span>
                </li>
              </ol>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border border-gray-700 bg-gray-800/50 p-4">
              <h3 className="mb-3 text-lg font-bold text-white">Commission Tiers</h3>
              <p className="text-xs text-gray-400 mb-3">
                Purchase one-time NFT add-ons to permanently reduce commission for a specific project.
              </p>
              <div className="space-y-2">
                <div className="border border-gray-700 rounded p-2 bg-gray-900/50">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">Base (included)</span>
                    <span className="text-orange-400 font-semibold text-xs">5%</span>
                  </div>
                </div>
                <div className="border border-gray-700 rounded p-2 bg-gray-900/50">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">Tier 1 (~500 ADA)</span>
                    <span className="text-yellow-400 font-semibold text-xs">3%</span>
                  </div>
                </div>
                <div className="border border-gray-700 rounded p-2 bg-gray-900/50">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">Tier 2 (~1,500 ADA)</span>
                    <span className="text-green-400 font-semibold text-xs">2%</span>
                  </div>
                </div>
                <div className="border border-gray-700 rounded p-2 bg-gray-900/50">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">Tier 3 (~2,500 ADA)</span>
                    <span className="text-emerald-400 font-semibold text-xs">1%</span>
                  </div>
                </div>
                <div className="border border-primary/30 rounded p-2 bg-primary/5">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-xs font-medium">Lifetime Zero (~25,000 ADA)</span>
                    <span className="text-blue-400 font-bold text-xs">0%</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border border-gray-700 bg-gray-800/50 p-4">
              <h3 className="mb-3 text-lg font-bold text-white">Fee Examples (at 5% base)</h3>
              <div className="space-y-2">
                <div className="border border-gray-700 rounded p-2 bg-gray-900/50">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">100 ADA reward</span>
                    <span className="text-orange-400 text-xs">-5 ADA</span>
                    <span className="text-green-400 font-semibold text-xs">95 ADA</span>
                  </div>
                </div>
                <div className="border border-gray-700 rounded p-2 bg-gray-900/50">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">1,000 ADA reward</span>
                    <span className="text-orange-400 text-xs">-50 ADA</span>
                    <span className="text-green-400 font-semibold text-xs">950 ADA</span>
                  </div>
                </div>
                <div className="border border-gray-700 rounded p-2 bg-gray-900/50">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">10,000 ADA reward</span>
                    <span className="text-orange-400 text-xs">-500 ADA</span>
                    <span className="text-green-400 font-semibold text-xs">9,500 ADA</span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-500">
                With Tier 3 add-on (1%), the 10,000 ADA example becomes: -100 ADA fee, 9,900 ADA net.
              </p>
            </Card>

            <Card className="border border-gray-700 bg-gray-800/50 p-4">
              <h3 className="mb-2 text-lg font-bold text-white">Why This Model?</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold text-white text-sm">Progressive:</span>
                  <span className="text-gray-300 text-xs"> Only invest in discounts when your project justifies it</span>
                </div>
                <div>
                  <span className="font-semibold text-white text-sm">Per-project:</span>
                  <span className="text-gray-300 text-xs"> Each project has its own economics and commission tier</span>
                </div>
                <div>
                  <span className="font-semibold text-white text-sm">Permanent:</span>
                  <span className="text-gray-300 text-xs"> One-time purchase, encoded on-chain in Project NFT</span>
                </div>
                <div>
                  <span className="font-semibold text-white text-sm">Transparent:</span>
                  <span className="text-gray-300 text-xs"> On-chain verifiable commission rates for every project</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ModernPageLayout>
  );
}
