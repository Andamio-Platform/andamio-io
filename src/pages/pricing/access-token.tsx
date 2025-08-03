import { Card } from "~/components/ui/card";
import ModernPageLayout from "~/components/layouts/ModernPageLayout";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function AccessTokenPage() {
  return (
    <ModernPageLayout
      title="Access Token Fee"
      description="One-time fee for minting user access tokens on the Andamio platform"
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
            <Card className="border border-green-500/50 bg-gray-800/50 p-4">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-green-500/30 bg-green-600/20">
                <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              
              <h2 className="mb-2 text-xl font-bold text-white">What is an Access Token?</h2>
              <p className="text-sm text-gray-300 mb-3">
                Unique blockchain credentials that identify users on Andamio, enabling course participation and credential verification.
              </p>

              <div className="border-t border-gray-700 pt-3">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold text-white">5</span>
                  <span className="text-lg text-gray-400">ADA</span>
                </div>
                <p className="text-sm text-gray-400">One-time fee per user</p>
              </div>
            </Card>

            <Card className="border border-gray-700 bg-gray-800/50 p-4">
              <h3 className="mb-3 text-lg font-bold text-white">Key Features</h3>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-white text-sm">Permanent Identity:</span>
                    <span className="text-gray-300 text-sm"> Valid forever on blockchain</span>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-white text-sm">Cross-Platform:</span>
                    <span className="text-gray-300 text-sm"> Works across all Andamio courses</span>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-white text-sm">Credential Ready:</span>
                    <span className="text-gray-300 text-sm"> Enables secure verification</span>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-green-400 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-white text-sm">Decentralized:</span>
                    <span className="text-gray-300 text-sm"> You own and control your token</span>
                  </div>
                </li>
              </ul>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border border-gray-700 bg-gray-800/50 p-4">
              <h3 className="mb-3 text-lg font-bold text-white">How It Works</h3>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white text-xs font-semibold flex-shrink-0">1</div>
                  <div>
                    <span className="font-semibold text-white text-sm">Connect Wallet</span>
                    <p className="text-gray-300 text-xs">Link your Cardano wallet to Andamio</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white text-xs font-semibold flex-shrink-0">2</div>
                  <div>
                    <span className="font-semibold text-white text-sm">Pay Minting Fee</span>
                    <p className="text-gray-300 text-xs">Submit 5 ADA through your wallet</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white text-xs font-semibold flex-shrink-0">3</div>
                  <div>
                    <span className="font-semibold text-white text-sm">Receive Token</span>
                    <p className="text-gray-300 text-xs">Token minted and sent to wallet</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white text-xs font-semibold flex-shrink-0">4</div>
                  <div>
                    <span className="font-semibold text-white text-sm">Start Learning</span>
                    <p className="text-gray-300 text-xs">Enroll in courses and submit work</p>
                  </div>
                </li>
              </ol>
            </Card>

          </div>
        </div>
      </div>
    </ModernPageLayout>
  );
}