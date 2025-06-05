
import PageLayout from "@/components/layout/PageLayout";

const Terms = () => {
  return (
    <PageLayout title="Terms of Service" subtitle="Last updated: December 2023">
      <div className="max-w-4xl mx-auto prose prose-slate">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing and using Nirman360, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="text-muted-foreground mb-4">
              Permission is granted to temporarily download one copy of the materials on Nirman360's website for personal, non-commercial transitory viewing only.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>This is the grant of a license, not a transfer of title</li>
              <li>Under this license you may not modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Property Listings</h2>
            <p className="text-muted-foreground mb-4">
              Nirman360 serves as a platform connecting property buyers, sellers, and renters. We do not own, sell, or rent properties directly.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>All property information is provided by third parties</li>
              <li>We strive to verify listings but cannot guarantee accuracy</li>
              <li>Users are responsible for verifying property details independently</li>
              <li>We are not liable for any disputes arising from property transactions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities</h2>
            <p className="text-muted-foreground mb-4">
              Users must provide accurate information and use the platform responsibly.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Provide truthful and accurate information</li>
              <li>Respect other users and property owners</li>
              <li>Not engage in fraudulent or illegal activities</li>
              <li>Maintain the confidentiality of your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Payment and Fees</h2>
            <p className="text-muted-foreground mb-4">
              Certain services on our platform require payment. All fees are clearly stated before any transaction.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Contact unlock fees are non-refundable</li>
              <li>Service fees are clearly displayed before payment</li>
              <li>Refunds are processed according to our refund policy</li>
              <li>All payments are processed securely</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Privacy and Data Protection</h2>
            <p className="text-muted-foreground mb-4">
              We are committed to protecting your privacy. Please review our Privacy Policy for details on how we collect, use, and protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              Nirman360 shall not be liable for any damages arising from the use of this website or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms of Service, please contact us at:
              <br />
              Email: legal@nirman360.com
              <br />
              Phone: +880 171 234 5678
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default Terms;
