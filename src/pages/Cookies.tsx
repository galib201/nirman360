
import PageLayout from "@/components/layout/PageLayout";

const Cookies = () => {
  return (
    <PageLayout title="Cookie Policy" subtitle="Last updated: December 2023">
      <div className="max-w-4xl mx-auto prose prose-slate">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
            <p className="text-muted-foreground mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us provide you with a better experience by remembering your preferences and improving our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Essential Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Performance Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Functionality Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies allow the website to remember choices you make and provide enhanced, more personal features.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Marketing Cookies</h3>
                <p className="text-muted-foreground">
                  These cookies are used to deliver advertisements more relevant to you and your interests.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
            <p className="text-muted-foreground mb-4">
              You can control and manage cookies in various ways:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Browser settings: Most browsers allow you to view, manage, and delete cookies</li>
              <li>Cookie preferences: Use our cookie preference center to customize your settings</li>
              <li>Opt-out tools: Use industry opt-out tools for marketing cookies</li>
              <li>Mobile settings: Adjust your mobile device settings for app-based tracking</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
            <p className="text-muted-foreground mb-4">
              We may use third-party services that place cookies on your device. These include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Google Analytics for website analytics</li>
              <li>Payment processors for secure transactions</li>
              <li>Social media platforms for sharing features</li>
              <li>Advertising networks for relevant ads</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
            <p className="text-muted-foreground mb-4">
              We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about our use of cookies, please contact us at:
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

export default Cookies;
