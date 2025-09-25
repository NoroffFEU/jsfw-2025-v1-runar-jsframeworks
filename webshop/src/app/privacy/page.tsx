import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Chopping Mall",
  description:
    "How Chopping Mall collects, uses, and protects your personal data. Read about cookies, payments, retention, and your rights.",
};

export default function PrivacyPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Privacy Policy</h1>

      <div className="space-y-4 text-white/80">
        <p>
          This Privacy Policy explains how Chopping Mall (“we”, “us”, “our”) collects, uses, and shares
          information about you when you visit our website, create an account, place an order, or otherwise
          interact with us. We are committed to handling your data responsibly and in accordance with
          applicable data protection laws, including the GDPR.
        </p>

        <h2 className="text-lg font-medium">Who we are (Data Controller)</h2>
        <p>
          Chopping Mall operates an online retail store offering quality goods at cut-rate prices. If you have
          questions about this notice or how we use your data, contact us at{" "}
          <span className="underline">runar@choppingmall.com</span>.
        </p>

        <h2 className="text-lg font-medium">Personal data we collect</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Account and profile details: name, email address, password (hashed), delivery addresses, and
            saved preferences.
          </li>
          <li>
            Order and payment details: items purchased, order totals, delivery method, billing and shipping
            addresses. Card details are processed by our payment provider; we do not store full card numbers.
          </li>
          <li>
            Communications: messages you send to us (for example, customer support or product enquiries).
          </li>
          <li>
            Device and usage data: IP address, browser type, pages viewed, and interactions with our site,
            collected via cookies or similar technologies to keep the site secure and improve performance.
          </li>
          <li>
            Local storage: we may use your browser’s localStorage to maintain your basket and preferences.
          </li>
        </ul>

        <h2 className="text-lg font-medium">How and why we use your data</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>To provide the shop, process orders, take payment, and arrange delivery.</li>
          <li>To manage your account and provide customer support.</li>
          <li>To prevent fraud, secure our services, and comply with legal obligations.</li>
          <li>To analyse and improve site performance and our product offering.</li>
          <li>With your consent, to send updates or marketing you can opt out of at any time.</li>
        </ul>

        <h2 className="text-lg font-medium">Lawful bases for processing</h2>
        <p>
          We rely on one or more of the following: performance of a contract (fulfilling your order), consent
          (for optional cookies or marketing), legitimate interests (site security and improvement), and legal
          obligations (tax and accounting).
        </p>

        <h2 className="text-lg font-medium">Cookies and similar technologies</h2>
        <p>
          We use essential cookies for core site functions (for example, keeping you signed in and maintaining
          your basket). With consent, we may use optional analytics cookies to understand how the site is used.
          You can control cookies via your browser or our cookie settings panel, but essential cookies cannot
          be disabled as they are necessary for the site to work.
        </p>

        <h2 className="text-lg font-medium">Sharing your information</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Payment processors to handle secure card transactions. We do not receive or store full card data.
          </li>
          <li>Delivery and logistics partners to ship your orders.</li>
          <li>Service providers (for example, hosting and analytics) under confidentiality agreements.</li>
          <li>
            Authorities or advisers where required by law or to protect our rights, users, or the public.
          </li>
        </ul>

        <h2 className="text-lg font-medium">International transfers</h2>
        <p>
          Where data is transferred outside the EEA/UK, we use appropriate safeguards such as adequacy
          decisions or Standard Contractual Clauses.
        </p>

        <h2 className="text-lg font-medium">Data retention</h2>
        <p>
          We keep order records for as long as necessary to meet legal and tax requirements (typically up to
          7 years in many jurisdictions). Account data is retained while your account is active; you can request
          deletion at any time. Information stored locally in your browser can be cleared by you at any time.
        </p>

        <h2 className="text-lg font-medium">Your rights</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Access, rectification, and deletion of your personal data.</li>
          <li>Restriction or objection to processing in certain circumstances.</li>
          <li>Data portability, where applicable.</li>
          <li>Withdrawal of consent for optional processing (for example, marketing) at any time.</li>
          <li>
            Complaints to your local data protection authority if you believe your rights have been infringed.
          </li>
        </ul>

        <h2 className="text-lg font-medium">Security</h2>
        <p>
          We implement technical and organisational measures to protect your data. No method of transmission
          or storage is completely secure, but we strive to use industry-standard safeguards.
        </p>

        <h2 className="text-lg font-medium">Children</h2>
        <p>
          Our services are intended for adults. We do not knowingly collect personal data from children. If you
          believe a child has provided us with personal data, please contact us to remove it.
        </p>

        <h2 className="text-lg font-medium">Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Material changes will be highlighted on this
          page. Please review it periodically to stay informed.
        </p>

        <h2 className="text-lg font-medium">Contact us</h2>
        <p>
          For privacy questions or requests, email{" "}
          <span className="underline">runar@choppingmall.com</span>.
        </p>
      </div>

      <p className="text-sm text-white/60">
        Last updated: {new Date().toLocaleDateString("en-GB")}
      </p>
    </section>
  );
}