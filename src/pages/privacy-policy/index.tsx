import ModernPageLayout from "~/components/layouts/ModernPageLayout";

export default function PrivacyPolicyPage() {
  return (
    <ModernPageLayout
      title="Privacy Policy"
      description="Our commitment to protecting your privacy and personal data."
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
          Andamio ("we", "our", "us") is committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you use our services. By accessing or
          using Andamio, you agree to the collection and use of information in
          accordance with this policy.
        </p>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          2. Information We Collect
        </h2>

        <h3 className="mb-4 text-xl font-semibold text-white">
          Personal Information
        </h3>
        <p className="mb-4 text-gray-300">
          When you create an account, contact us, or participate in our
          services, we may collect personal information, including but not
          limited to:
        </p>
        <ul className="mb-6 list-inside list-disc space-y-2 text-gray-300">
          <li>Name</li>
          <li>Email address</li>
          <li>Username</li>
          <li>Discord user data</li>
          <li>Other contact information</li>
        </ul>

        <h3 className="mb-4 text-xl font-semibold text-white">
          Course and Contribution Data
        </h3>
        <p className="mb-4 text-gray-300">
          We collect data related to your course activities and contributions,
          such as:
        </p>
        <ul className="mb-6 list-inside list-disc space-y-2 text-gray-300">
          <li>Course content you create or contribute to</li>
          <li>Progress and completion status</li>
          <li>Assignments and assessments</li>
          <li>Credentials acquired (publicly recorded on blockchain)</li>
        </ul>

        <h3 className="mb-4 text-xl font-semibold text-white">Usage Data</h3>
        <p className="mb-4 text-gray-300">
          We may collect information on how the service is accessed and used,
          including:
        </p>
        <ul className="mb-6 list-inside list-disc space-y-2 text-gray-300">
          <li>IP address</li>
          <li>Browser type</li>
          <li>Device information</li>
          <li>Pages visited and time spent</li>
        </ul>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          3. How We Use Your Information
        </h2>

        <h3 className="mb-4 text-xl font-semibold text-white">
          To Provide and Maintain Our Service
        </h3>
        <ul className="mb-6 list-inside list-disc space-y-2 text-gray-300">
          <li>To manage user accounts and provide access to our platform</li>
          <li>To process transactions and send confirmations</li>
          <li>To provide customer support</li>
        </ul>

        <h3 className="mb-4 text-xl font-semibold text-white">
          To Improve Our Services
        </h3>
        <ul className="mb-6 list-inside list-disc space-y-2 text-gray-300">
          <li>To understand and analyze usage trends</li>
          <li>To enhance the user experience and develop new features</li>
        </ul>

        <h3 className="mb-4 text-xl font-semibold text-white">
          For Communication
        </h3>
        <ul className="mb-6 list-inside list-disc space-y-2 text-gray-300">
          <li>
            To send administrative information, such as updates and changes to
            our terms and policies
          </li>
          <li>
            To send marketing and promotional communications (with opt-out
            options)
          </li>
        </ul>

        <h3 className="mb-4 text-xl font-semibold text-white">
          For Legal Compliance
        </h3>
        <ul className="mb-6 list-inside list-disc space-y-2 text-gray-300">
          <li>To comply with legal obligations and protect our rights</li>
          <li>To prevent and address fraud, security, and technical issues</li>
        </ul>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          4. How We Share Your Information
        </h2>

        <h3 className="mb-4 text-xl font-semibold text-white">
          Third-Party Service Providers
        </h3>
        <p className="mb-4 text-gray-300">
          We may share your information with third-party service providers for
          purposes such as:
        </p>
        <ul className="mb-6 list-inside list-disc space-y-2 text-gray-300">
          <li>Payment processing</li>
          <li>Email and communication services</li>
          <li>Data analysis and marketing assistance</li>
          <li>KYC providers (Know Your Customer)</li>
        </ul>

        <h3 className="mb-4 text-xl font-semibold text-white">
          Legal Requirements
        </h3>
        <p className="mb-6 text-gray-300">
          We may disclose your information if required by law or in response to
          valid requests by public authorities (e.g., court orders or government
          agencies).
        </p>

        <h3 className="mb-4 text-xl font-semibold text-white">
          Business Transfers
        </h3>
        <p className="mb-6 text-gray-300">
          If Andamio is involved in a merger, acquisition, or asset sale, your
          information may be transferred. We will provide notice before your
          personal information is transferred and becomes subject to a different
          privacy policy.
        </p>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          5. Data Security
        </h2>
        <p className="mb-6 text-gray-300">
          We implement reasonable security measures to protect your data from
          unauthorized access, use, alteration, and disclosure. However, no
          method of transmission over the Internet or electronic storage is 100%
          secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          6. Data Retention
        </h2>
        <p className="mb-6 text-gray-300">
          We retain your personal information for as long as necessary to
          fulfill the purposes outlined in this Privacy Policy, unless a longer
          retention period is required or permitted by law. Inactive account
          data is deleted after 5 years unless requested for earlier deletion.
        </p>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          7. Your Data Privacy Rights
        </h2>

        <h3 className="mb-4 text-xl font-semibold text-white">
          Access and Correction
        </h3>
        <p className="mb-6 text-gray-300">
          You have the right to access and correct your personal data. You can
          update your information through your account settings or by contacting
          us.
        </p>

        <h3 className="mb-4 text-xl font-semibold text-white">Deletion</h3>
        <p className="mb-6 text-gray-300">
          You have the right to request the deletion of your personal data. We
          will remove your data from our databases within 90 days of your
          request. Note that on-chain data cannot be deleted.
        </p>

        <h3 className="mb-4 text-xl font-semibold text-white">
          Objection and Restriction
        </h3>
        <p className="mb-6 text-gray-300">
          You have the right to object to the processing of your personal data
          and to request the restriction of processing. You can withdraw consent
          at any time, without affecting the lawfulness of processing based on
          consent before its withdrawal.
        </p>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          8. Children's Privacy
        </h2>
        <p className="mb-6 text-gray-300">
          Our services are not intended for children under the age of 18. We do
          not knowingly collect personal information from children under 13. If
          we become aware that we have collected personal information from a
          child under 18 without verification of parental consent, we will take
          steps to remove that information.
        </p>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          9. Data Protection Officer
        </h2>
        <p className="mb-4 text-gray-300">
          To ensure compliance with GDPR and other privacy laws, we have
          appointed a Data Protection Officer (DPO). You can contact our DPO for
          any questions or concerns about your data privacy.
        </p>
        <div className="mb-6 rounded-sm border border-white/20 bg-gray-800/50 p-4">
          <ul className="space-y-2 text-gray-300">
            <li>
              <strong className="text-white">Data Protection Officer:</strong>{" "}
              Andrew Nishigaya
            </li>
            <li>
              <strong className="text-white">Email:</strong>{" "}
              <a
                href="mailto:dpo@andamio.io"
                className="text-blue-400 hover:text-blue-300"
              >
                dpo@andamio.io
              </a>
            </li>
          </ul>
        </div>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          10. Changes to This Privacy Policy
        </h2>
        <p className="mb-6 text-gray-300">
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page and
          sending an email notification if we have your email address. You are
          advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2 className="mb-6 border-b border-white/20 pb-3 text-2xl font-bold text-white">
          11. Contact Us
        </h2>
        <p className="mb-4 text-gray-300">
          If you have any questions about this Privacy Policy, please contact us
          at:
        </p>
        <div className="rounded-sm border border-white/20 bg-gray-800/50 p-4">
          <p className="text-gray-300">
            <strong className="text-white">Email:</strong>{" "}
            <a
              href="mailto:support@andamio.io"
              className="text-blue-400 hover:text-blue-300"
            >
              support@andamio.io
            </a>
          </p>
        </div>
      </div>
    </ModernPageLayout>
  );
}
