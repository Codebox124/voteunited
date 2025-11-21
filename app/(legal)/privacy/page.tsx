const Page = () => {
  return (
    <div className="fontroboto">
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-mont font-bold text-primary dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Last Updated: November 2025
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-8">
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Vote United (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
            committed to protecting your privacy. This Privacy Policy explains
            how we collect, use, store, and safeguard your information when you
            visit our website or interact with our services.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-mont font-bold text-primary dark:text-white mb-4">
              1. Information We Collect
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-3">
              We may collect:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
              <li>
                <strong>Personal Information:</strong> Name, email address,
                phone number, and any information voluntarily provided through
                forms.
              </li>
              <li>
                <strong>Usage Data:</strong> Browser type, device information,
                IP address, pages visited, and interaction patterns.
              </li>
              <li>
                <strong>Cookies & Tracking Technologies:</strong> Used to
                improve user experience and analyze website performance.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-mont font-bold text-primary dark:text-white mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-3">
              Your information may be used to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
              <li>Provide and improve our services</li>
              <li>Respond to inquiries or communication</li>
              <li>Send updates, newsletters, or relevant announcements</li>
              <li>Analyze usage and optimize user experience</li>
              <li>Ensure platform security and prevent fraud</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-mont font-bold text-primary dark:text-white mb-4">
              3. How We Share Information
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-3">
              We do not sell your data. We may share information only:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
              <li>With trusted service providers assisting in operations</li>
              <li>When required by law, regulation, or legal request</li>
              <li>To protect our rights, users, or the public</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-mont font-bold text-primary dark:text-white mb-4">
              4. Data Security
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              We use appropriate administrative, technical, and physical
              safeguards to protect your data. While we take measures to secure
              information, no method of transmission is 100% risk-free.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-mont font-bold text-primary dark:text-white mb-4">
              5. Your Rights
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-3">You may:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
              <li>Request access to the personal data we hold</li>
              <li>Request correction or deletion</li>
              <li>Opt-out of communications</li>
              <li>Disable cookies through your browser settings</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-mont font-bold text-primary dark:text-white mb-4">
              6. Third-Party Links
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Our website may contain links to external sites. We are not
              responsible for their content or privacy practices.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-mont font-bold text-primary dark:text-white mb-4">
              7. Changes to This Policy
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with the updated date.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-mont font-bold text-primary dark:text-white mb-4">
              8. Contact
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              For privacy-related inquiries, email us at:{" "}
              <a
                href="mailto:privacy@voteunited.com"
                className="text-primary dark:text-blue-400 hover:underline"
              >
                info@voteunited.com
              </a>
            </p>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground italic">
            Together, we can build a more informed, engaged, and united society.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Page;
