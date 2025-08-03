import { Card } from "~/components/ui/card";
import ModernPageLayout from "~/components/layouts/ModernPageLayout";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function PricingPage() {
  return (
    <ModernPageLayout
      title="Transaction-Based Pricing"
      description="Transparent pay-per-use pricing model. All transactions are processed with ADA on the Cardano blockchain."
      currentPage="pricing"
    >
      <div className="pb-12">
        {/* Transaction Fee Cards */}
        <div className="mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          {/* Access Token Minting */}
          <Card className="relative overflow-hidden border border-green-500/50 bg-gray-800/50 shadow-xl backdrop-blur-sm">
            <div className="absolute -right-12 -top-12 h-20 w-20 bg-green-500/20 blur-2xl"></div>
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-green-500/30 bg-green-600/20">
                      <svg
                        className="h-5 w-5 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Access Token
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white">5</span>
                      <span className="text-sm text-gray-400">ADA</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-300">
                  Mint access tokens for users
                </p>
              </div>

              <div className="mb-4 space-y-2 text-gray-300">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-green-400"></div>
                    One-time fee per user
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-green-400"></div>
                    Enables credential verification
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-green-400"></div>
                    Blockchain-secured identity
                  </li>
                </ul>
              </div>

              <Link href="/pricing/access-token">
                <Button className="w-full bg-green-600 text-white hover:bg-green-700 text-sm py-2">
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>

          {/* Course/Project Creation */}
          <Card className="relative overflow-hidden border border-blue-500/50 bg-gray-800/50 shadow-xl backdrop-blur-sm">
            <div className="absolute -right-12 -top-12 h-20 w-20 bg-blue-500/20 blur-2xl"></div>
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-blue-500/30 bg-blue-600/20">
                      <svg
                        className="h-5 w-5 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Course/Project
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white">150</span>
                      <span className="text-sm text-gray-400">ADA</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-300">
                  Create a new course or project
                </p>
              </div>

              <div className="mb-4 space-y-2 text-gray-300">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-blue-400"></div>
                    Platform access & APIs
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-blue-400"></div>
                    Credential issuance system
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-blue-400"></div>
                    Treasury management
                  </li>
                </ul>
              </div>

              <Link href="/pricing/instance">
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 text-sm py-2">
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>

          {/* Manager Addition */}
          <Card className="relative overflow-hidden border border-purple-500/50 bg-gray-800/50 shadow-xl backdrop-blur-sm">
            <div className="absolute -right-12 -top-12 h-20 w-20 bg-purple-500/20 blur-2xl"></div>
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-purple-500/30 bg-purple-600/20">
                      <svg
                        className="h-5 w-5 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Add Manager
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white">10</span>
                      <span className="text-sm text-gray-400">ADA</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-300">
                  Add managers to courses/projects
                </p>
              </div>

              <div className="mb-4 space-y-2 text-gray-300">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-purple-400"></div>
                    Full management access
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-purple-400"></div>
                    Credential approval rights
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-purple-400"></div>
                    Treasury permissions
                  </li>
                </ul>
              </div>

              <Link href="/pricing/instance-manager">
                <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 text-sm py-2">
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>

          {/* Task Completion Fee */}
          <Card className="relative overflow-hidden border border-orange-500/50 bg-gray-800/50 shadow-xl backdrop-blur-sm">
            <div className="absolute -right-12 -top-12 h-20 w-20 bg-orange-500/20 blur-2xl"></div>
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-orange-500/30 bg-orange-600/20">
                      <svg
                        className="h-5 w-5 text-orange-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Task Completion
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white">0.25%</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-300">
                  Fee on successful task payments
                </p>
              </div>

              <div className="mb-4 space-y-2 text-gray-300">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-orange-400"></div>
                    Automated payment processing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-orange-400"></div>
                    Smart contract execution
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-orange-400"></div>
                    Transparent fee structure
                  </li>
                </ul>
              </div>

              <Link href="/pricing/task">
                <Button className="w-full bg-orange-600 text-white hover:bg-orange-700 text-sm py-2">
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-8">
          <h2 className="mb-4 text-center text-xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-3xl space-y-3">
            <Card className="border border-white/20 bg-gray-800/50 backdrop-blur-sm">
              <div className="p-4">
                <h3 className="mb-2 text-base font-bold text-white">
                  Why do you charge transaction fees in ADA?
                </h3>
                <p className="text-sm text-gray-300">
                  Andamio operates on the Cardano blockchain, leveraging its
                  security and decentralization for credential verification and
                  trust protocols. All transactions are recorded on-chain,
                  ensuring transparency and immutability.
                </p>
              </div>
            </Card>

            <Card className="border border-white/20 bg-gray-800/50 backdrop-blur-sm">
              <div className="p-4">
                <h3 className="mb-2 text-base font-bold text-white">
                  Can I get a refund on transaction fees?
                </h3>
                <p className="text-sm text-gray-300">
                  Since all transactions are processed on the Cardano blockchain
                  and are immutable once confirmed, transaction fees cannot be
                  refunded. However, we provide clear pricing upfront so you
                  know exactly what each action costs.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ModernPageLayout>
  );
}
