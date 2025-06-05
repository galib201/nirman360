
import PageLayout from "@/components/layout/PageLayout";

const Privacy = () => {
  return (
    <PageLayout title="Privacy Policy" subtitle="Last updated: December 2023">
      <div className="max-w-4xl mx-auto prose prose-slate">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect information you provide directly to us, such as when you create an account, list a property, or contact us.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Personal information (name, email, phone number)</li>
              <li>Property information and photos</li>
              <li>Payment and billing information</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect to provide, maintain, and improve our services.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>To facilitate property transactions</li>
              <li>To communicate with you about our services</li>
              <li>To process payments and prevent fraud</li>
              <li>To improve our platform and user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>With service providers who assist our operations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking</h2>
            <p className="text-muted-foreground mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              You have certain rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Access and review your personal information</li>
              <li>Correct inaccuracies in your data</li>
              <li>Delete your account and personal information</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@nirman360.com
              <br />
              Phone: +880 171 234 5678
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default Privacy;
