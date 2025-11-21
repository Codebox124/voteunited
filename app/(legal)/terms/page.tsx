const Page = () => {
  return (
    <div className="fontroboto">
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-mont font-bold text-primary dark:text-white mb-4">
            Terms of Use
          </h1>
          <p className="text-sm text-muted-foreground">
            Last Updated: November 2025
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-8">
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Welcome to Vote United. By accessing or using our website and
            services, you agree to these Terms of Use.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-mont font-bold text-primary dark:text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              By using this website, you agree to comply with all applicable
              laws and these Terms. If you do not agree, please discontinue use.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-mont font-bold text-primary dark:text-white mb-4">
              2. Use of the Website
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-3">
              You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
              <li>Engage in unlawful, harmful, or fraudulent activity</li>
              <li>
                Upload malicious code, attempt unauthorized access, or disrupt
                functionality
              </li>
              <li>Use content from this site without authorization</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-mont font-bold text-primary dark:text-white mb-4">
              3. Intellectual Property
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              All content, trademarks, logos, and materials on this website are
              owned by or licensed to Vote United. Unauthorized use is
              prohibited.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-mont font-bold text-primary dark:text-white mb-4">
              4. Accuracy of Information
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              While we strive for accuracy, we do not guarantee that all
              information is always complete, current, or error-free. Vote
              United is not liable for decisions made based on site content.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-mont font-bold text-primary dark:text-white mb-4">
              5. Third-Party Links
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              External links are provided for convenience. We are not
              responsible for their accuracy, content, or practices.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-mont font-bold text-primary dark:text-white mb-4">
              6. Disclaimer of Liability
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-3">
              Vote United is not liable for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
              <li>
                Any direct, indirect, incidental, or consequential damages
              </li>
              <li>Losses resulting from use or inability to use the website</li>
              <li>Data breaches beyond our reasonable control</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-mont font-bold text-primary dark:text-white mb-4">
              7. Changes to Terms
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              We may modify these Terms at any time. Continued use after changes
              constitutes acceptance.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-mont font-bold text-primary dark:text-white mb-4">
              8. Governing Law
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              These Terms shall be governed by the laws of your local
              jurisdiction unless otherwise required by statute.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-mont font-bold text-primary dark:text-white mb-4">
              9. Contact
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              For questions about these Terms of Use, email us at:{" "}
              <a
                href="mailto:info@voteunited.com"
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
