import React from "react";
import Head from "next/head";
import { nav, footer as footerData } from "~/ui/explore/content";
import { color, font } from "~/ui/system/tokens";
import { Page, Section, Kicker, Display, Footer } from "~/ui/system/kit";

const mono = { fontFamily: font.mono };

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mt-14 border-b pb-3 text-2xl font-semibold tracking-[-0.02em]"
      style={{ color: color.ink, borderColor: color.cell }}
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="mt-8 text-xl font-semibold tracking-[-0.01em]"
      style={{ color: color.ink }}
    >
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 leading-relaxed" style={{ color: color.inkMuted }}>
      {children}
    </p>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul
      className="mt-4 list-inside list-disc space-y-2 leading-relaxed"
      style={{ color: color.inkMuted }}
    >
      {children}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
        <meta
          name="description"
          content="Our commitment to protecting your privacy and personal data."
        />
      </Head>

      <Page nav={{ items: nav.items, cta: nav.cta }} sections={null}>
        {/* Header */}
        <Section bordered={false}>
          <div className="pb-12 pt-16 sm:pt-24">
            <Kicker>Legal</Kicker>
            <Display as="h1" size="lg" className="mt-5">
              Privacy Policy
            </Display>
            <p
              className="mt-5 max-w-2xl text-lg leading-relaxed"
              style={{ color: color.inkMuted }}
            >
              Our commitment to protecting your privacy and personal data.
            </p>
          </div>
        </Section>

        {/* Body */}
        <Section bordered={false}>
          <div className="max-w-3xl py-16 sm:py-20">
            <div
              className="p-6"
              style={{ border: `1px solid ${color.cell}` }}
            >
              <p className="text-lg" style={{ color: color.ink }}>
                <strong style={{ fontWeight: 600 }}>Version 1.0.0</strong>
              </p>
              <p className="mt-2 text-[12px] uppercase tracking-[0.1em]" style={{ ...mono, color: color.inkFaint }}>
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <H2>1. Introduction</H2>
            <P>
              Andamio (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is
              committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when
              you use our services. By accessing or using Andamio, you agree to
              the collection and use of information in accordance with this
              policy.
            </P>

            <H2>2. Information We Collect</H2>

            <H3>Personal Information</H3>
            <P>
              When you create an account, contact us, or participate in our
              services, we may collect personal information, including but not
              limited to:
            </P>
            <UL>
              <li>Name</li>
              <li>Email address</li>
              <li>Username</li>
              <li>Discord user data</li>
              <li>Other contact information</li>
            </UL>

            <H3>Course and Contribution Data</H3>
            <P>
              We collect data related to your course activities and
              contributions, such as:
            </P>
            <UL>
              <li>Course content you create or contribute to</li>
              <li>Progress and completion status</li>
              <li>Assignments and assessments</li>
              <li>Credentials acquired (publicly recorded on blockchain)</li>
            </UL>

            <H3>Usage Data</H3>
            <P>
              We may collect information on how the service is accessed and used,
              including:
            </P>
            <UL>
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Pages visited and time spent</li>
            </UL>

            <H2>3. How We Use Your Information</H2>

            <H3>To Provide and Maintain Our Service</H3>
            <UL>
              <li>To manage user accounts and provide access to our platform</li>
              <li>To process transactions and send confirmations</li>
              <li>To provide customer support</li>
            </UL>

            <H3>To Improve Our Services</H3>
            <UL>
              <li>To understand and analyze usage trends</li>
              <li>To enhance the user experience and develop new features</li>
            </UL>

            <H3>For Communication</H3>
            <UL>
              <li>
                To send administrative information, such as updates and changes
                to our terms and policies
              </li>
              <li>
                To send marketing and promotional communications (with opt-out
                options)
              </li>
            </UL>

            <H3>For Legal Compliance</H3>
            <UL>
              <li>To comply with legal obligations and protect our rights</li>
              <li>
                To prevent and address fraud, security, and technical issues
              </li>
            </UL>

            <H2>4. How We Share Your Information</H2>

            <H3>Third-Party Service Providers</H3>
            <P>
              We may share your information with third-party service providers
              for purposes such as:
            </P>
            <UL>
              <li>Payment processing</li>
              <li>Email and communication services</li>
              <li>Data analysis and marketing assistance</li>
              <li>KYC providers (Know Your Customer)</li>
            </UL>

            <H3>Legal Requirements</H3>
            <P>
              We may disclose your information if required by law or in response
              to valid requests by public authorities (e.g., court orders or
              government agencies).
            </P>

            <H3>Business Transfers</H3>
            <P>
              If Andamio is involved in a merger, acquisition, or asset sale,
              your information may be transferred. We will provide notice before
              your personal information is transferred and becomes subject to a
              different privacy policy.
            </P>

            <H2>5. Data Security</H2>
            <P>
              We implement reasonable security measures to protect your data from
              unauthorized access, use, alteration, and disclosure. However, no
              method of transmission over the Internet or electronic storage is
              100% secure, and we cannot guarantee absolute security.
            </P>

            <H2>6. Data Retention</H2>
            <P>
              We retain your personal information for as long as necessary to
              fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required or permitted by law. Inactive
              account data is deleted after 5 years unless requested for earlier
              deletion.
            </P>

            <H2>7. Your Data Privacy Rights</H2>

            <H3>Access and Correction</H3>
            <P>
              You have the right to access and correct your personal data. You
              can update your information through your account settings or by
              contacting us.
            </P>

            <H3>Deletion</H3>
            <P>
              You have the right to request the deletion of your personal data.
              We will remove your data from our databases within 90 days of your
              request. Note that on-chain data cannot be deleted.
            </P>

            <H3>Objection and Restriction</H3>
            <P>
              You have the right to object to the processing of your personal
              data and to request the restriction of processing. You can withdraw
              consent at any time, without affecting the lawfulness of processing
              based on consent before its withdrawal.
            </P>

            <H2>8. Children&apos;s Privacy</H2>
            <P>
              Our services are not intended for children under the age of 18. We
              do not knowingly collect personal information from children under
              13. If we become aware that we have collected personal information
              from a child under 18 without verification of parental consent, we
              will take steps to remove that information.
            </P>

            <H2>9. Data Protection Officer</H2>
            <P>
              To ensure compliance with GDPR and other privacy laws, we have
              appointed a Data Protection Officer (DPO). You can contact our DPO
              for any questions or concerns about your data privacy.
            </P>
            <div
              className="mt-6 p-4"
              style={{ border: `1px solid ${color.cell}` }}
            >
              <ul className="space-y-2 leading-relaxed" style={{ color: color.inkMuted }}>
                <li>
                  <strong style={{ color: color.ink, fontWeight: 600 }}>
                    Data Protection Officer:
                  </strong>{" "}
                  Andrew Nishigaya
                </li>
                <li>
                  <strong style={{ color: color.ink, fontWeight: 600 }}>
                    Email:
                  </strong>{" "}
                  <a
                    href="mailto:dpo@andamio.io"
                    className="transition-colors hover:underline"
                    style={{ color: color.blue }}
                  >
                    dpo@andamio.io
                  </a>
                </li>
              </ul>
            </div>

            <H2>10. Changes to This Privacy Policy</H2>
            <P>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and sending an email notification if we have your email address.
              You are advised to review this Privacy Policy periodically for any
              changes.
            </P>

            <H2>11. Contact Us</H2>
            <P>
              If you have any questions about this Privacy Policy, please contact
              us at:
            </P>
            <div
              className="mt-4 p-4"
              style={{ border: `1px solid ${color.cell}` }}
            >
              <p style={{ color: color.inkMuted }}>
                <strong style={{ color: color.ink, fontWeight: 600 }}>
                  Email:
                </strong>{" "}
                <a
                  href="mailto:support@andamio.io"
                  className="transition-colors hover:underline"
                  style={{ color: color.blue }}
                >
                  support@andamio.io
                </a>
              </p>
            </div>
          </div>
        </Section>

        <Footer
          tagline={footerData.tagline}
          meta={footerData.meta}
          copyright={footerData.copyright}
          columns={footerData.columns}
          backHref="/"
          backLabel="← Back to home"
          caption="Privacy Policy"
        />
      </Page>
    </>
  );
}
