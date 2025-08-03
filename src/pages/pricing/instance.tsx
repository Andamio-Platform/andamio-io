import { Card } from "~/components/ui/card";
import ModernPageLayout from "~/components/layouts/ModernPageLayout";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function InstancePage() {
  return (
    <ModernPageLayout
      title="Course/Project Creation Fee"
      description="Create comprehensive learning environments or collaborative workspaces on Andamio"
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
            <Card className="border border-blue-500/50 bg-gray-800/50 p-4">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-600/20">
                <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              
              <h2 className="mb-2 text-xl font-bold text-white">What is a Course/Project?</h2>
              <p className="text-sm text-gray-300 mb-3">
                Full learning environments or collaborative workspaces with tools for managing learners, credentials, and treasuries.
              </p>

              <div className="border-t border-gray-700 pt-3">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold text-white">150</span>
                  <span className="text-lg text-gray-400">ADA</span>
                </div>
                <p className="text-sm text-gray-400">Per course or project</p>
              </div>
            </Card>

            <Card className="border border-gray-700 bg-gray-800/50 p-4">
              <h3 className="mb-3 text-lg font-bold text-white">What's Included</h3>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                  <div className="text-sm">
                    <span className="font-semibold text-white">Platform Access:</span>
                    <span className="text-gray-300"> Full Andamio features</span>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                  <div className="text-sm">
                    <span className="font-semibold text-white">API Integration:</span>
                    <span className="text-gray-300"> Custom integrations</span>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                  <div className="text-sm">
                    <span className="font-semibold text-white">Credentials:</span>
                    <span className="text-gray-300"> Blockchain-verified</span>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                  <div className="text-sm">
                    <span className="font-semibold text-white">Treasury:</span>
                    <span className="text-gray-300"> Fund management</span>
                  </div>
                </li>
              </ul>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border border-gray-700 bg-gray-800/50 p-4">
              <h3 className="mb-3 text-lg font-bold text-white">Course vs Project</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-1 text-sm flex items-center gap-1">
                    <svg className="h-4 w-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Courses
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-400">
                    <li>• Sequential modules</li>
                    <li>• Assignments & grading</li>
                    <li>• Certificates</li>
                    <li>• Cohort management</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1 text-sm flex items-center gap-1">
                    <svg className="h-4 w-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Projects
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-400">
                    <li>• Task management</li>
                    <li>• Contribution tracking</li>
                    <li>• Treasury payments</li>
                    <li>• Flexible teams</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="border border-gray-700 bg-gray-800/50 p-4">
              <h3 className="mb-2 text-lg font-bold text-white">Setup Process</h3>
              <ol className="space-y-2">
                <li className="flex gap-2 items-start">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold flex-shrink-0">1</div>
                  <span className="text-xs text-gray-300">Choose Course or Project type</span>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold flex-shrink-0">2</div>
                  <span className="text-xs text-gray-300">Configure name and details</span>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold flex-shrink-0">3</div>
                  <span className="text-xs text-gray-300">Pay 150 ADA creation fee</span>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold flex-shrink-0">4</div>
                  <span className="text-xs text-gray-300">Launch your instance</span>
                </li>
              </ol>
            </Card>
          </div>
        </div>
      </div>
    </ModernPageLayout>
  );
}