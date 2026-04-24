import ModernPageLayout from "~/components/layouts/ModernPageLayout";

export default function TermsAndConditionsPage() {
  return (
    <ModernPageLayout
      title="Terms of Use"
      description="The terms and conditions governing your use of Andamio's services."
    >
      <div className="prose prose-lg prose-invert max-w-none pb-20">
        <div className="mb-8 rounded-sm border border-white/20 bg-gray-800/50 p-6 backdrop-blur-sm">
          <p className="mb-2 text-lg text-gray-300">
            <strong className="text-white">Version 1.0.0</strong>
          </p>
          <p className="text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          1. Introduction
        </h2>
        <p className="mb-6 leading-relaxed text-gray-300">
          Welcome to Andamio, a trust protocol for distributed work that enables
          organizations to create educational materials, manage contributions,
          and build trust networks. These Terms and Conditions ("Terms") govern
          your use of our services. By accessing or using Andamio, you agree to
          be bound by these Terms. If you do not agree to these Terms, you may
          not use the services.
        </p>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          2. Company Information
        </h2>
        <div className="mb-6 rounded-sm border border-white/20 bg-gray-800/50 p-4">
          <ul className="space-y-2 text-gray-300">
            <li>
              <strong className="text-white">Company Name:</strong> Andamio
            </li>
            <li>
              <strong className="text-white">Registered Address:</strong> 2232
              Dell Range BLVD., Suite 245 Cheyenne, WY 82009
            </li>
            <li>
              <strong className="text-white">Jurisdiction:</strong> Wyoming, USA
            </li>
          </ul>
        </div>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          3. User Information
        </h2>

        <h3 className="mb-4 text-xl font-semibold text-white">
          Types of Users
        </h3>
        <p className="mb-4 text-gray-300">
          Andamio serves multiple types of users:
        </p>
        <ul className="mb-6 list-inside list-disc space-y-2 text-gray-300">
          <li>
            <strong className="text-white">Organizations:</strong> Entities that
            create and manage educational content, onboarding materials, and
            contributor management systems
          </li>
          <li>
            <strong className="text-white">Contributors:</strong> Individuals
            who participate in courses, complete assignments, and earn
            credentials
          </li>
          <li>
            <strong className="text-white">Developers:</strong> Users who build
            and integrate applications using Andamio's infrastructure
          </li>
        </ul>

        <h3 className="mb-4 text-xl font-semibold text-white">
          Account Registration
        </h3>
        <p className="mb-6 text-gray-300">
          To use certain features of Andamio, you must register for an account.
          You agree to provide accurate, current, and complete information and
          to update such information as necessary to maintain its accuracy.
        </p>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          4. Service Description
        </h2>
        <p className="mb-4 text-gray-300">Andamio provides:</p>
        <ul className="mb-6 list-inside list-disc space-y-2 text-gray-300">
          <li>Trust protocol infrastructure for distributed work</li>
          <li>Decentralized access control and credential issuance</li>
          <li>Contributor onboarding and treasury management tools</li>
          <li>Educational content creation and management platforms</li>
          <li>Blockchain-based credential verification</li>
        </ul>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          5. Acceptable Use
        </h2>

        <h3 className="mb-4 text-xl font-semibold text-white">
          Permitted Uses
        </h3>
        <p className="mb-4 text-gray-300">You may use Andamio for:</p>
        <ul className="mb-6 list-inside list-disc space-y-2 text-gray-300">
          <li>Creating and managing educational content</li>
          <li>Participating in courses and earning credentials</li>
          <li>Building trust networks for distributed work</li>
          <li>Managing contributions and treasury allocation</li>
        </ul>

        <h3 className="mb-4 text-xl font-semibold text-white">
          Prohibited Uses
        </h3>
        <p className="mb-4 text-gray-300">You may not use Andamio to:</p>
        <ul className="mb-6 list-inside list-disc space-y-2 text-gray-300">
          <li>Violate any applicable laws or regulations</li>
          <li>Infringe on intellectual property rights</li>
          <li>Distribute malicious software or content</li>
          <li>Impersonate others or provide false information</li>
          <li>Interfere with the security or operation of the platform</li>
        </ul>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          6. Intellectual Property
        </h2>
        <p className="mb-6 text-gray-300">
          The Andamio platform and its original content, features, and
          functionality are owned by Andamio and are protected by intellectual
          property laws. Users retain ownership of content they create, while
          granting Andamio necessary licenses to operate the platform.
        </p>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          7. Blockchain and Cryptocurrency
        </h2>
        <p className="mb-4 text-gray-300">
          Andamio utilizes blockchain technology for credential verification and
          trust protocols. Users acknowledge:
        </p>
        <ul className="mb-6 list-inside list-disc space-y-2 text-gray-300">
          <li>Blockchain transactions are irreversible</li>
          <li>Credential data recorded on-chain is permanent and public</li>
          <li>
            Users are responsible for managing their own cryptographic keys
          </li>
          <li>Network fees may apply to blockchain transactions</li>
        </ul>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          8. Limitation of Liability
        </h2>
        <p className="mb-6 text-gray-300">
          To the fullest extent permitted by law, Andamio shall not be liable
          for any indirect, incidental, special, consequential, or punitive
          damages, including without limitation, loss of profits, data, use,
          goodwill, or other intangible losses.
        </p>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          9. Termination
        </h2>
        <p className="mb-6 text-gray-300">
          We may terminate or suspend your account and access to the service
          immediately, without prior notice, for any reason, including but not
          limited to a breach of these Terms. Upon termination, your right to
          use the service will cease immediately.
        </p>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          10. Governing Law
        </h2>
        <p className="mb-6 text-gray-300">
          These Terms shall be interpreted and governed by the laws of the State
          of Wyoming, United States, without regard to its conflict of law
          provisions.
        </p>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          11. Changes to Terms
        </h2>
        <p className="mb-6 text-gray-300">
          We reserve the right to modify these Terms at any time. We will notify
          users of any material changes by posting the new Terms on this page
          and updating the "Last updated" date. Your continued use of the
          service after any such changes constitutes your acceptance of the new
          Terms.
        </p>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          12. Contact Information
        </h2>
        <p className="mb-4 text-gray-300">
          If you have any questions about these Terms, please contact us at:
        </p>
        <div className="rounded-sm border border-white/20 bg-gray-800/50 p-4">
          <p className="text-gray-300">
            <strong className="text-white">Email:</strong>{" "}
            <a
              href="mailto:legal@andamio.io"
              className="text-blue-400 hover:text-blue-300"
            >
              legal@andamio.io
            </a>
          </p>
        </div>
      </div>
    </ModernPageLayout>
  );
}
