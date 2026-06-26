import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for XM Charity Foundation — how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Your privacy matters to us. This policy outlines how we collect, use, and safeguard your information."
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl space-y-8 text-pretty leading-relaxed text-muted-foreground">
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Information We Collect
            </h2>
            <p className="mt-3">
              We collect personal information such as your name, email address,
              phone number, and donation details when you voluntarily provide it
              through our website forms, donation pages, or newsletter sign-up.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              How We Use Your Information
            </h2>
            <p className="mt-3">
              Your information is used to process donations, respond to inquiries,
              send updates about our programs and impact, and improve our services.
              We do not sell, rent, or share your personal data with third parties
              for marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Data Protection
            </h2>
            <p className="mt-3">
              We implement reasonable security measures to protect your personal
              information from unauthorized access, alteration, or disclosure.
              However, no online transmission is completely secure, and we cannot
              guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Cookies
            </h2>
            <p className="mt-3">
              Our website may use cookies to enhance your browsing experience. You
              can choose to disable cookies through your browser settings, though
              this may affect some functionality.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Contact Us
            </h2>
            <p className="mt-3">
              If you have questions about this privacy policy or wish to request
              deletion of your data, please contact us at{' '}
              <a
                href="mailto:hello@xmcharityfoundation.org"
                className="text-primary underline underline-offset-3 hover:text-accent"
              >
                hello@xmcharityfoundation.org
              </a>
              .
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
