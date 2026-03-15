import { Card } from "~/components/ui/card";
import V2PageLayout from "~/ui/landing/V2Landing/V2PageLayout";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function PricingPage() {
  return (
    <V2PageLayout
      title="Protocol Costs"
      description="On-chain fees that apply to both the Andamio API and Platform products. All transactions are processed with ADA on the Cardano blockchain."
    >
      <div className="pb-12">
        {/* Intro note */}
        <div className="mx-auto mb-8 max-w-3xl rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            These are <strong className="text-foreground">protocol-level costs</strong> that apply regardless
            of whether you use the{" "}
            <Link href="/#pricing" className="text-primary underline hover:text-primary/80">
              Andamio API or Platform
            </Link>
            . API and Platform subscription pricing is separate.
          </p>
        </div>

        {/* Transaction Fee Cards */}
        <div className="mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          {/* Access Token Minting */}
          <Card className="relative overflow-hidden border border-green-500/50 bg-card shadow-xl">
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
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Access Token
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">5</span>
                      <span className="text-sm text-muted-foreground">ADA</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Mint access tokens for users
                </p>
              </div>

              <div className="mb-4 space-y-2 text-muted-foreground">
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
          <Card className="relative overflow-hidden border border-blue-500/50 bg-card shadow-xl">
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
                    <h3 className="text-2xl font-bold text-foreground">
                      Course/Project
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">150</span>
                      <span className="text-sm text-muted-foreground">ADA</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Create a new course or project (mints a Project NFT)
                </p>
              </div>

              <div className="mb-4 space-y-2 text-muted-foreground">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-blue-400"></div>
                    Protocol access & APIs
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
          <Card className="relative overflow-hidden border border-purple-500/50 bg-card shadow-xl">
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
                    <h3 className="text-2xl font-bold text-foreground">
                      Add Manager
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">10</span>
                      <span className="text-sm text-muted-foreground">ADA</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Add managers to courses/projects
                </p>
              </div>

              <div className="mb-4 space-y-2 text-muted-foreground">
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
          <Card className="relative overflow-hidden border border-orange-500/50 bg-card shadow-xl">
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
                    <h3 className="text-2xl font-bold text-foreground">
                      Task Completion
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">5%</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Base commission on task reward payouts
                </p>
              </div>

              <div className="mb-4 space-y-2 text-muted-foreground">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-orange-400"></div>
                    Buy down to 0% with NFT add-ons
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-orange-400"></div>
                    Per-project granularity
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-orange-400"></div>
                    On-chain verifiable rates
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

        {/* Commission Discount Add-Ons Section */}
        <div className="mt-12">
          <h2 className="mb-2 text-center text-2xl font-bold text-foreground">
            Commission Discount Add-Ons
          </h2>
          <p className="mb-6 text-center text-sm text-muted-foreground">
            Purchase one-time NFT add-ons to permanently reduce commission on a per-project basis.
          </p>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Add-On</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Cost (ADA)</th>
                  <th className="hidden px-4 py-3 text-left font-semibold text-foreground sm:table-cell">Cost (USD)*</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Commission</th>
                  <th className="hidden px-4 py-3 text-left font-semibold text-foreground md:table-cell">Best For</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">Base (included)</td>
                  <td className="px-4 py-3">~150</td>
                  <td className="hidden px-4 py-3 sm:table-cell">~$68</td>
                  <td className="px-4 py-3 font-semibold text-orange-400">5%</td>
                  <td className="hidden px-4 py-3 md:table-cell">Testing, pilots</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">Tier 1</td>
                  <td className="px-4 py-3">~500</td>
                  <td className="hidden px-4 py-3 sm:table-cell">~$225</td>
                  <td className="px-4 py-3 font-semibold text-yellow-400">3%</td>
                  <td className="hidden px-4 py-3 md:table-cell">Growing projects</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">Tier 2</td>
                  <td className="px-4 py-3">~1,500</td>
                  <td className="hidden px-4 py-3 sm:table-cell">~$675</td>
                  <td className="px-4 py-3 font-semibold text-green-400">2%</td>
                  <td className="hidden px-4 py-3 md:table-cell">Established projects</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">Tier 3</td>
                  <td className="px-4 py-3">~2,500</td>
                  <td className="hidden px-4 py-3 sm:table-cell">~$1,125</td>
                  <td className="px-4 py-3 font-semibold text-emerald-400">1%</td>
                  <td className="hidden px-4 py-3 md:table-cell">High-volume enterprise</td>
                </tr>
                <tr className="border-t border-border bg-primary/5">
                  <td className="px-4 py-3 font-medium text-foreground">Lifetime Zero</td>
                  <td className="px-4 py-3">~25,000</td>
                  <td className="hidden px-4 py-3 sm:table-cell">~$11,250</td>
                  <td className="px-4 py-3 font-bold text-blue-400">0%</td>
                  <td className="hidden px-4 py-3 md:table-cell">Strategic partners</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-center text-xs text-muted-foreground/70">
            *USD estimates at $0.45/ADA. All prices are one-time, permanent, per-project. Commission tier is encoded in the Project NFT on-chain.
          </p>
        </div>

        {/* Transaction Sponsorship */}
        <div className="mt-12">
          <h2 className="mb-2 text-center text-2xl font-bold text-foreground">
            Transaction Sponsorship Bundles
          </h2>
          <p className="mb-6 text-center text-sm text-muted-foreground">
            Pre-purchase ADA to cover on-chain costs for your users. Unused ADA stays with you.
          </p>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Pilot", ada: "500", usd: "$225", courses: "1", students: "~15" },
              { name: "Starter", ada: "2,500", usd: "$1,125", courses: "1", students: "~100" },
              { name: "Growth", ada: "10,000", usd: "$4,500", courses: "3", students: "~350" },
              { name: "Scale", ada: "25,000", usd: "$11,250", courses: "5", students: "~900" },
            ].map((bundle) => (
              <Card key={bundle.name} className="border border-border bg-card">
                <div className="p-5">
                  <p className="text-lg font-bold text-foreground">{bundle.name}</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {bundle.ada} <span className="text-sm font-normal text-muted-foreground">ADA</span>
                  </p>
                  <p className="text-xs text-muted-foreground/70">~{bundle.usd}</p>
                  <div className="mt-3 border-t border-border pt-3">
                    <p className="text-xs text-muted-foreground">Covers approx.</p>
                    <p className="text-sm text-muted-foreground">{bundle.courses} course, {bundle.students} students</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <p className="mt-3 text-center text-xs text-muted-foreground/70">
            Enterprise sponsorship with custom amounts and auto-replenish available.{" "}
            <a href="mailto:hello@andamio.io" className="text-primary hover:underline">Contact sales</a>.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="mb-4 text-center text-xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-3xl space-y-3">
            <Card className="border border-border bg-card">
              <div className="p-4">
                <h3 className="mb-2 text-base font-bold text-foreground">
                  Why do you charge transaction fees in ADA?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Andamio operates on the Cardano blockchain, leveraging its
                  security and decentralization for credential verification and
                  trust protocols. All transactions are recorded on-chain,
                  ensuring transparency and immutability.
                </p>
              </div>
            </Card>

            <Card className="border border-border bg-card">
              <div className="p-4">
                <h3 className="mb-2 text-base font-bold text-foreground">
                  Are these fees separate from API / Platform subscriptions?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Yes. Protocol costs (on-chain fees, commission) apply to all
                  Andamio users regardless of which product they use. API and
                  Platform subscriptions cover access to the software layer on
                  top of the protocol.
                </p>
              </div>
            </Card>

            <Card className="border border-border bg-card">
              <div className="p-4">
                <h3 className="mb-2 text-base font-bold text-foreground">
                  Can I get a refund on transaction fees?
                </h3>
                <p className="text-sm text-muted-foreground">
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
    </V2PageLayout>
  );
}
