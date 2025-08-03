import { Card } from "~/components/ui/card";
import ModernPageLayout from "~/components/layouts/ModernPageLayout";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function InstanceManagerPage() {
  return (
    <ModernPageLayout
      title="Add Manager Fee"
      description="Grant management permissions to team members for courses and projects"
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
            <Card className="border border-purple-500/50 bg-gray-800/50 p-4">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-purple-500/30 bg-purple-600/20">
                <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              
              <h2 className="mb-2 text-xl font-bold text-white">What is a Manager?</h2>
              <p className="text-sm text-gray-300 mb-3">
                Authorized team members who help administer courses and projects with elevated permissions.
              </p>

              <div className="border-t border-gray-700 pt-3">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold text-white">10</span>
                  <span className="text-lg text-gray-400">ADA</span>
                </div>
                <p className="text-sm text-gray-400">Per manager added</p>
              </div>
            </Card>

            <Card className="border border-gray-700 bg-gray-800/50 p-4">
              <h3 className="mb-3 text-lg font-bold text-white">Manager Permissions</h3>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-purple-400 flex-shrink-0"></div>
                  <div className="text-sm">
                    <span className="font-semibold text-white">Credential Approval:</span>
                    <span className="text-gray-300"> Review & approve</span>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-purple-400 flex-shrink-0"></div>
                  <div className="text-sm">
                    <span className="font-semibold text-white">Treasury Management:</span>
                    <span className="text-gray-300"> Fund operations</span>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-purple-400 flex-shrink-0"></div>
                  <div className="text-sm">
                    <span className="font-semibold text-white">Content Management:</span>
                    <span className="text-gray-300"> Course materials</span>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-purple-400 flex-shrink-0"></div>
                  <div className="text-sm">
                    <span className="font-semibold text-white">Analytics:</span>
                    <span className="text-gray-300"> Performance reports</span>
                  </div>
                </li>
              </ul>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border border-gray-700 bg-gray-800/50 p-4">
              <h3 className="mb-3 text-lg font-bold text-white">Why Add Managers?</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-white mb-1 text-sm">Scale Operations</h4>
                  <p className="text-gray-300 text-xs">Distribute tasks to handle larger cohorts efficiently</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1 text-sm">Ensure Continuity</h4>
                  <p className="text-gray-300 text-xs">Prevent single points of failure with multiple managers</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1 text-sm">Specialized Roles</h4>
                  <p className="text-gray-300 text-xs">Assign experts for technical reviews and community</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1 text-sm">Time Zone Coverage</h4>
                  <p className="text-gray-300 text-xs">24/7 support and approvals across regions</p>
                </div>
              </div>
            </Card>

            <Card className="border border-gray-700 bg-gray-800/50 p-4">
              <h3 className="mb-2 text-lg font-bold text-white">Adding Process</h3>
              <ol className="space-y-2">
                <li className="flex gap-2 items-start">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-white text-xs font-semibold flex-shrink-0">1</div>
                  <span className="text-xs text-gray-300">Access project settings</span>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-white text-xs font-semibold flex-shrink-0">2</div>
                  <span className="text-xs text-gray-300">Enter manager wallet address</span>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-white text-xs font-semibold flex-shrink-0">3</div>
                  <span className="text-xs text-gray-300">Pay 10 ADA addition fee</span>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-white text-xs font-semibold flex-shrink-0">4</div>
                  <span className="text-xs text-gray-300">Manager immediately activated</span>
                </li>
              </ol>
            </Card>
          </div>
        </div>
      </div>
    </ModernPageLayout>
  );
}