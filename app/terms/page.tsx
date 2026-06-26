import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of service for XM Charity Foundation website — rules and guidelines for using our website and services.',
}

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="Please read these terms carefully before using our website or services."
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl space-y-8 text-pretty leading-relaxed text-muted-foreground">
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Acceptance of Terms
            </h2>
            <p className="mt-3">
              By accessing or using the XM Charity Foundation website, you agree to
              be bound by these terms of service. If you do not agree, please do not
              use our website.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Donations
            </h2>
            <p className="mt-3">
              All donations are voluntary and non-refundable. Donations are used
              solely to fund our charitable programs and operations. You will
              receive a tax-deductible receipt for your contribution.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Website Use
            </h2>
            <p className="mt-3">
              You agree to use our website only for lawful purposes and in a way
              that does not infringe on the rights of others. You may not use our
              site to distribute harmful content, spam, or malicious software.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Intellectual Property
            </h2>
            <p className="mt-3">
              All content on this website — including text, images, logos, and
              designs — is the property of XM Charity Foundation unless otherwise
              stated. You may not reproduce, distribute, or modify our content
              without prior written permission.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Limitation of Liability
            </h2>
            <p className="mt-3">
              XM Charity Foundation is not liable for any damages arising from your
              use of this website. We provide the site on an &ldquo;as is&rdquo;
              basis and make no warranties regarding its availability or accuracy.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Changes to Terms
            </h2>
            <p className="mt-3">
              We reserve the right to update these terms at any time. Continued use
              of the website after changes constitutes acceptance of the new terms.
            </p>
          </div>

          <p className="pt-4 text-sm">
            Last updated: January 2026
          </p>
        </div>
      </section>
    </>
  )
}
