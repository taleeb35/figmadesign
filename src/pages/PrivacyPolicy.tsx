import Header from "@/components/Header";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-foreground">
          Privacy Policy
        </h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <p className="text-muted-foreground text-lg">
            This Privacy Policy governs the manner in which The annual report ("Service Provider," "we," "us") collects, uses, maintains, and discloses information collected from users ("Client," "you") of the "theannualreport.com" website.
          </p>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              1. Information Collection and Usage
            </h2>
            <p className="text-muted-foreground mb-4">
              We collect information primarily to deliver our core service: the creation of strategic Annual Reports or any reports.
            </p>
            <ul className="space-y-3 text-muted-foreground ml-6 list-disc">
              <li>
                <strong className="text-foreground">Corporate Project Data:</strong> This includes all sensitive corporate materials provided by the Client for the execution of the contracted service, such as financial statements, audit reports, internal strategy documents, and confidential ESG data. This data is used solely for the analysis, structuring, and design of the Client's Annual Report as defined in the Statement of Work (SOW).
              </li>
              <li>
                <strong className="text-foreground">Client Contact Data:</strong> This includes names, titles, email addresses, and Financial information. This information is used for communication, project management, invoicing, and, with explicit consent, for providing information about future services.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              2. Data Security and Confidentiality
            </h2>
            <p className="text-muted-foreground mb-4">
              Confidentiality is our utmost priority. We implement robust technical and organizational security measures to protect the Corporate Project Data entrusted to us.
            </p>
            <ul className="space-y-3 text-muted-foreground ml-6 list-disc">
              <li>
                <strong className="text-foreground">Secure Storage:</strong> All project files are maintained on secure, encrypted servers with strict access controls.
              </li>
              <li>
                <strong className="text-foreground">Access Limitation:</strong> Access to confidential Corporate Project Data is strictly limited to the dedicated internal team members assigned to the Client's project.
              </li>
              <li>
                <strong className="text-foreground">Data Retention and Deletion:</strong> Project files are retained for a period of Time following final project sign-off to accommodate post-launch revisions. After this retention period, project data will be permanently deleted from our primary storage systems unless an extended retention agreement is formally executed.
              </li>
              <li>
                <strong className="text-foreground">Third-Party Sharing:</strong> We do not share Corporate Project Data with outside entities, except with trusted third-party service providers (e.g., secure cloud hosting, payment processors) who are legally bound to uphold equivalent confidentiality standards. Data may also be disclosed if legally required by valid subpoena or court order.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              3. Usage of Work for Portfolio
            </h2>
            <p className="text-muted-foreground">
              We reserve the right to display samples of the final, publicly released Annual Report design (e.g., general layout, stylistic elements, or anonymized excerpts) in our marketing and portfolio.
            </p>
          </section>

          <section className="pt-8 border-t border-border">
            <h1 className="text-3xl font-bold mb-6 text-foreground">
              Terms & Conditions
            </h1>
            <p className="text-muted-foreground mb-6">
              These Terms and Conditions ("Terms") govern the professional engagement between The annual report ("Service Provider") and the Client for the provision of Annual Report preparation and design services.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              1. Project Scope and Agreement
            </h2>
            <p className="text-muted-foreground mb-4">
              The specific scope of deliverables, project timeline, milestones, and associated fees shall be exclusively defined in the formal Statement of Work (SOW) or Project Proposal document. Once signed by both parties, the SOW incorporates these Terms by reference.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-foreground">
              Client Responsibilities:
            </h3>
            <p className="text-muted-foreground mb-4">
              The Client is required to provide all necessary source content, data, legal disclaimers, and final sign-offs by the deadlines specified in the SOW. Delays in providing necessary Client Input may necessitate a revised project schedule.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-foreground">
              Scope Changes:
            </h3>
            <p className="text-muted-foreground mb-6">
              Any request by the Client for work that materially alters the scope defined in the SOW ("Scope Creep") will be managed via a mutually agreed-upon Change Order, which will detail the resulting adjustments to the timeline and project fees.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              2. Intellectual Property (IP) Ownership
            </h2>

            <h3 className="text-xl font-semibold mb-3 text-foreground">
              Transfer of Ownership:
            </h3>
            <p className="text-muted-foreground mb-4">
              Upon full and final payment of all fees outlined in the SOW, the Service Provider transfers ownership of the final, custom design files, layouts, and unique content created specifically for that project to the Client. The Client obtains full rights to use, reproduce, and distribute the final report.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-foreground">
              Provider IP:
            </h3>
            <p className="text-muted-foreground mb-6">
              The Service Provider retains ownership of all proprietary analytical methodologies, internal tools, design frameworks, and underlying software code utilized in the creation of the report. These proprietary assets remain the intellectual property of The Annual Report.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              3. Financial and Payment Terms
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong className="text-foreground">Invoicing:</strong> Payment terms, including deposit amounts and final payment due dates, are specified in the SOW.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong className="text-foreground">Late Payments:</strong> Invoices not settled within Specific Period of the due date are subject to a late payment penalty of a specific percentage of the outstanding balance per month.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              4. Warranties and Limitation of Liability
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong className="text-foreground">Service Provider Warranty:</strong> We warrant that the deliverables will be executed in a professional manner and will substantially conform to the specifications and quality standards outlined in the SOW.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong className="text-foreground">Client Content Warranty:</strong> The Client warrants and is solely responsible for the accuracy, legality, truthfulness, and compliance of all financial figures, factual data, and textual content provided to the Service Provider for inclusion in the report. The Service Provider acts purely as a design and communication consultant and is not an auditor or legal counsel.
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Limitation of Liability:</strong> The Service Provider's total aggregate liability for any claims arising under this agreement shall be strictly limited to the total fees paid by the Client to the Service Provider for the specific project in question. We shall not be liable for any indirect, incidental, or consequential damages.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
