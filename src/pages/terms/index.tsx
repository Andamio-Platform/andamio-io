import React from "react";
import Metatags from "~/components/site/metatags";
import { nav, footer as footerData } from "~/ui/explore/content";
import { color } from "~/ui/system/tokens";
import { Page, Section, Kicker, Display, Footer } from "~/ui/system/kit";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mb-6 mt-14 border-b pb-3 text-2xl font-semibold tracking-[-0.03em]"
      style={{ borderColor: color.cell, color: color.ink }}
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="mb-4 mt-8 text-xl font-semibold tracking-[-0.02em]"
      style={{ color: color.ink }}
    >
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-6 text-[16px] leading-relaxed" style={{ color: color.inkMuted }}>
      {children}
    </p>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul
      className="mb-6 list-disc space-y-2 pl-5 text-[16px] leading-relaxed"
      style={{ color: color.inkMuted }}
    >
      {children}
    </ul>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-semibold" style={{ color: color.ink }}>
      {children}
    </strong>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 p-5" style={{ border: `1px solid ${color.hairline}` }}>
      {children}
    </div>
  );
}

export default function TermsAndConditionsPage() {
  return (
    <>
      <Metatags
        title="Terms of Use"
        description="The terms and conditions governing your use of Andamio's services."
      />

      <Page nav={{ items: nav.items, cta: nav.cta }} sections={null}>
        {/* Header */}
        <Section bordered={false}>
          <div className="pb-12 pt-16 sm:pt-24">
            <Kicker>Legal</Kicker>
            <Display as="h1" size="lg" className="mt-5">
              Terms of Use
            </Display>
            <p
              className="mt-5 max-w-2xl text-lg leading-relaxed"
              style={{ color: color.inkMuted }}
            >
              The terms and conditions governing your use of Andamio&apos;s services.
            </p>
          </div>
        </Section>

        {/* Body */}
        <Section bordered={false}>
          <div className="max-w-3xl pb-20 pt-4">
            <InfoBox>
              <p className="mb-2 text-lg">
                <Strong>Version 1.0.0</Strong>
              </p>
              <p className="text-[15px]" style={{ color: color.inkFaint }}>
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </InfoBox>

            <H2>1. Introduction</H2>
            <P>
              Welcome to Andamio, a trust protocol for distributed work that enables
              organizations to create educational materials, manage contributions,
              and build trust networks. These Terms and Conditions (&quot;Terms&quot;) govern
              your use of our services. By accessing or using Andamio, you agree to
              be bound by these Terms. If you do not agree to these Terms, you may
              not use the services.
            </P>

            <H2>2. Company Information</H2>
            <InfoBox>
              <ul className="space-y-2 text-[16px]" style={{ color: color.inkMuted }}>
                <li>
                  <Strong>Company Name:</Strong> Andamio
                </li>
                <li>
                  <Strong>Registered Address:</Strong> 2232 Dell Range BLVD., Suite
                  245 Cheyenne, WY 82009
                </li>
                <li>
                  <Strong>Jurisdiction:</Strong> Wyoming, USA
                </li>
              </ul>
            </InfoBox>

            <H2>3. User Information</H2>

            <H3>Types of Users</H3>
            <P>Andamio serves multiple types of users:</P>
            <UL>
              <li>
                <Strong>Organizations:</Strong> Entities that create and manage
                educational content, onboarding materials, and contributor
                management systems
              </li>
              <li>
                <Strong>Contributors:</Strong> Individuals who participate in
                courses, complete assignments, and earn credentials
              </li>
              <li>
                <Strong>Developers:</Strong> Users who build and integrate
                applications using Andamio&apos;s infrastructure
              </li>
            </UL>

            <H3>Account Registration</H3>
            <P>
              To use certain features of Andamio, you must register for an account.
              You agree to provide accurate, current, and complete information and
              to update such information as necessary to maintain its accuracy.
            </P>

            <H2>4. Service Description</H2>
            <P>Andamio provides:</P>
            <UL>
              <li>Trust protocol infrastructure for distributed work</li>
              <li>Decentralized access control and credential issuance</li>
              <li>Contributor onboarding and treasury management tools</li>
              <li>Educational content creation and management platforms</li>
              <li>Blockchain-based credential verification</li>
            </UL>

            <H2>5. Acceptable Use</H2>

            <H3>Permitted Uses</H3>
            <P>You may use Andamio for:</P>
            <UL>
              <li>Creating and managing educational content</li>
              <li>Participating in courses and earning credentials</li>
              <li>Building trust networks for distributed work</li>
              <li>Managing contributions and treasury allocation</li>
            </UL>

            <H3>Prohibited Uses</H3>
            <P>You may not use Andamio to:</P>
            <UL>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Distribute malicious software or content</li>
              <li>Impersonate others or provide false information</li>
              <li>Interfere with the security or operation of the platform</li>
            </UL>

            <H2>6. Intellectual Property</H2>
            <P>
              The Andamio platform and its original content, features, and
              functionality are owned by Andamio and are protected by intellectual
              property laws. Users retain ownership of content they create, while
              granting Andamio necessary licenses to operate the platform.
            </P>

            <H2>7. Blockchain and Cryptocurrency</H2>
            <P>
              Andamio utilizes blockchain technology for credential verification and
              trust protocols. Users acknowledge:
            </P>
            <UL>
              <li>Blockchain transactions are irreversible</li>
              <li>Credential data recorded on-chain is permanent and public</li>
              <li>Users are responsible for managing their own cryptographic keys</li>
              <li>Network fees may apply to blockchain transactions</li>
            </UL>

            <H2>8. Limitation of Liability</H2>
            <P>
              To the fullest extent permitted by law, Andamio shall not be liable
              for any indirect, incidental, special, consequential, or punitive
              damages, including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses.
            </P>

            <H2>9. Termination</H2>
            <P>
              We may terminate or suspend your account and access to the service
              immediately, without prior notice, for any reason, including but not
              limited to a breach of these Terms. Upon termination, your right to
              use the service will cease immediately.
            </P>

            <H2>10. Governing Law</H2>
            <P>
              These Terms shall be interpreted and governed by the laws of the State
              of Wyoming, United States, without regard to its conflict of law
              provisions.
            </P>

            <H2>11. Changes to Terms</H2>
            <P>
              We reserve the right to modify these Terms at any time. We will notify
              users of any material changes by posting the new Terms on this page
              and updating the &quot;Last updated&quot; date. Your continued use of the
              service after any such changes constitutes your acceptance of the new
              Terms.
            </P>

            <H2>12. Contact Information</H2>
            <P>
              If you have any questions about these Terms, please contact us at:
            </P>
            <InfoBox>
              <p className="text-[16px]" style={{ color: color.inkMuted }}>
                <Strong>Email:</Strong>{" "}
                <a
                  href="mailto:legal@andamio.io"
                  className="transition-colors hover:underline"
                  style={{ color: color.blue }}
                >
                  legal@andamio.io
                </a>
              </p>
            </InfoBox>
          </div>
        </Section>

        <Footer
          tagline={footerData.tagline}
          meta={footerData.meta}
          copyright={footerData.copyright}
          columns={footerData.columns}
          backHref="/"
          backLabel="← Back to home"
          caption="Terms of Use"
        />
      </Page>
    </>
  );
}
