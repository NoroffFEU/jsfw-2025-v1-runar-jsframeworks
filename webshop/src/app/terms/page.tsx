import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Chopping Mall",
  description:
    "The terms and conditions for using Chopping Mall and purchasing goods from our online shop.",
};

export default function TermsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Terms & Conditions</h1>

      <div className="space-y-4 text-white/80">
        <p>
          Welcome to Chopping Mall. These Terms & Conditions govern your access to and use of our website,
          products, and services. By visiting our site, creating an account, or placing an order, you agree to
          these Terms. If you do not agree, please do not use our services.
        </p>

        <h2 className="text-lg font-medium">1. About Us</h2>
        <p>
          Chopping Mall operates an online retail store offering quality goods at cut-rate prices. You can
          contact us at <span className="underline">example@example.com</span>.
        </p>

        <h2 className="text-lg font-medium">2. Eligibility & Account</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>You must be at least 18 years old, or the age of majority in your jurisdiction, to purchase.</li>
          <li>You are responsible for keeping your account credentials confidential and for all activity under your account.</li>
          <li>Please notify us immediately of any unauthorised use of your account.</li>
        </ul>

        <h2 className="text-lg font-medium">3. Orders & Pricing</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Placing products in your basket does not reserve them. An order is accepted only when we confirm dispatch.</li>
          <li>Prices may change without notice. Obvious pricing errors may be cancelled or corrected.</li>
          <li>All orders are subject to availability and our acceptance.</li>
        </ul>

        <h2 className="text-lg font-medium">4. Payment</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>We accept the payment methods shown at checkout via our secure payment partners.</li>
          <li>We do not store full card details. Payments may be subject to verification and fraud checks.</li>
        </ul>

        <h2 className="text-lg font-medium">5. Shipping & Delivery</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Estimated delivery windows are provided at checkout and may vary by destination and carrier.</li>
          <li>Risk in the goods passes to you upon delivery. Please inspect parcels on arrival and report issues promptly.</li>
        </ul>

        <h2 className="text-lg font-medium">6. Returns & Refunds</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Eligible items may be returned within the stated return period, in original condition and packaging.</li>
          <li>Some products (for example, perishable or hygiene-sealed items opened by you) may be non-returnable where permitted by law.</li>
          <li>Refunds are processed to the original payment method after inspection of the returned item.</li>
        </ul>

        <h2 className="text-lg font-medium">7. Promotions & Discount Codes</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Promotional offers are subject to terms stated with the offer and may be withdrawn at any time.</li>
          <li>Only one code may be used per order unless expressly stated otherwise.</li>
        </ul>

        <h2 className="text-lg font-medium">8. Acceptable Use</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Do not misuse the site, interfere with its operation, or attempt unauthorised access.</li>
          <li>Do not post or transmit unlawful, infringing, or harmful content.</li>
        </ul>

        <h2 className="text-lg font-medium">9. Intellectual Property</h2>
        <p>
          All content on the site (including text, graphics, logos, and images) is owned by or licensed to
          Chopping Mall and protected by applicable intellectual property laws. You may not copy, distribute,
          or create derivative works without our prior written consent.
        </p>

        <h2 className="text-lg font-medium">10. Third-Party Services</h2>
        <p>
          We may link to or integrate third-party sites and services. We are not responsible for their content,
          policies, or practices. Use of such services is at your own risk and subject to their terms.
        </p>

        <h2 className="text-lg font-medium">11. Warranty Disclaimer</h2>
        <p>
          Except where required by law, the site and services are provided on an “as is” and “as available”
          basis without warranties of any kind, whether express or implied, including fitness for a particular
          purpose and non-infringement. This does not affect statutory rights that cannot be excluded.
        </p>

        <h2 className="text-lg font-medium">12. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, we are not liable for indirect, incidental, special, or
          consequential losses, or loss of profits, revenue, data, or goodwill. Our total liability for any claim
          relating to an order is limited to the amount paid for that order. Nothing limits liability for death or
          personal injury caused by negligence, fraud, or any liability that cannot be limited by law.
        </p>

        <h2 className="text-lg font-medium">13. Indemnity</h2>
        <p>
          You agree to indemnify and hold Chopping Mall harmless from claims arising out of your breach of
          these Terms or misuse of the site, to the extent permitted by law.
        </p>

        <h2 className="text-lg font-medium">14. Governing Law & Venue</h2>
        <p>
          These Terms are governed by the laws of Norway. Courts of Norway shall have exclusive jurisdiction,
          without prejudice to mandatory consumer protections in your country of residence within the EEA/UK.
        </p>

        <h2 className="text-lg font-medium">15. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. Material changes will be posted on this page. Your
          continued use of the site after changes take effect constitutes acceptance of the updated Terms.
        </p>

        <h2 className="text-lg font-medium">16. Contact</h2>
        <p>
          Questions about these Terms? Email <span className="underline">runar@choppingmall.com</span>.
        </p>
      </div>

      <p className="text-sm text-white/60">
        Last updated: {new Date().toLocaleDateString("en-GB")}
      </p>
    </section>
  );
}