import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  FileText, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Mail, 
  ArrowRight,
  Scale,
  Users,
  Lock,
  Zap,
  Target
} from 'lucide-react';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Last updated: January 2025
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Agreement to Terms</CardTitle>
            <CardDescription className="text-blue-100">
              By accessing and using PentoraSec, you agree to be bound by these Terms of Service. 
              Please read these terms carefully before using our platform.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Acceptance of Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                By accessing, browsing, or using the PentoraSec platform, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms of Service and our Privacy Policy.
              </p>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2 text-amber-800 dark:text-amber-200">Important Notice</h3>
                    <p className="text-sm text-muted-foreground">
                      If you do not agree to these terms, you must not use our platform. Continued use of the 
                      platform constitutes acceptance of any modifications to these terms.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-600" />
                Service Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                PentoraSec is a penetration testing platform that provides security professionals with tools 
                and capabilities to conduct authorized security assessments. Our platform includes:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Core Features</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Penetration testing tools (Nmap, Nuclei, Subfinder, etc.)</li>
                    <li>AI-powered vulnerability analysis</li>
                    <li>Project management and reporting</li>
                    <li>Real-time tool execution</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Security Features</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Bring Your Own Key (BYOK) AI integration</li>
                    <li>On-premise deployment options</li>
                    <li>Encrypted data storage</li>
                    <li>Role-based access control</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-purple-600" />
                User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-red-800 dark:text-red-200">Critical Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li><strong>Authorization Only:</strong> Only test systems you own or have explicit written permission to test</li>
                  <li><strong>Legal Compliance:</strong> Comply with all applicable laws and regulations</li>
                  <li><strong>Ethical Use:</strong> Use the platform only for legitimate security testing purposes</li>
                  <li><strong>No Malicious Activity:</strong> Do not use the platform for unauthorized access or malicious purposes</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">General Responsibilities</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Provide accurate information when creating projects</li>
                  <li>Respect rate limits and usage policies</li>
                  <li>Report security vulnerabilities responsibly</li>
                  <li>Keep your account information up to date</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Uses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                Prohibited Uses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-red-800 dark:text-red-200">Strictly Prohibited</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  The following activities are strictly prohibited and may result in immediate account termination:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Unauthorized penetration testing of systems you don't own</li>
                  <li>Attempting to gain unauthorized access to any system</li>
                  <li>Distributing malware or malicious code</li>
                  <li>Violating any applicable laws or regulations</li>
                  <li>Interfering with the platform's security or functionality</li>
                  <li>Reverse engineering or attempting to extract source code</li>
                  <li>Using the platform for competitive intelligence gathering</li>
                  <li>Sharing account credentials with unauthorized users</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Subscription and Billing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-6 h-6 text-indigo-600" />
                Subscription and Billing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Subscription Tiers</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Essential</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Basic tools (Subfinder, Nmap, Gobuster)</li>
                      <li>3 projects maximum</li>
                      <li>5-second tool delay</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Professional</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>All tools available</li>
                      <li>10 projects maximum</li>
                      <li>3-second tool delay</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Enterprise</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>All tools + priority support</li>
                      <li>Unlimited projects</li>
                      <li>1-second tool delay</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Billing Terms</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Subscriptions are billed in advance</li>
                  <li>All fees are non-refundable unless otherwise specified</li>
                  <li>You may cancel your subscription at any time</li>
                  <li>Access continues until the end of the current billing period</li>
                  <li>We reserve the right to change pricing with 30 days notice</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-6 h-6 text-amber-600" />
                Intellectual Property
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Our Rights</h3>
                <p className="text-muted-foreground mb-3">
                  The PentoraSec platform, including its design, functionality, and content, is protected by 
                  intellectual property laws. We retain all rights, title, and interest in the platform.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Platform software and source code</li>
                  <li>User interface design and layout</li>
                  <li>Documentation and help content</li>
                  <li>Trademarks and branding</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Your Rights</h3>
                <p className="text-muted-foreground mb-3">
                  You retain ownership of your scan results and project data. However, you grant us a 
                  limited license to use this data to provide our services.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Ownership of your scan results</li>
                  <li>Ownership of your project data</li>
                  <li>Right to export your data</li>
                  <li>Right to delete your data</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Privacy and Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-600" />
                Privacy and Data Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Your privacy is important to us. Our data practices are governed by our Privacy Policy, 
                which is incorporated into these Terms of Service by reference.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Data Security</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Encrypted data transmission and storage</li>
                    <li>Regular security audits and updates</li>
                    <li>Access controls and monitoring</li>
                    <li>Secure data centers</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Your Control</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>BYOK model for AI features</li>
                    <li>On-premise deployment options</li>
                    <li>Data export and deletion rights</li>
                    <li>Transparent data practices</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-600" />
                Service Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Uptime Commitment</h3>
                <p className="text-muted-foreground mb-3">
                  We strive to maintain 99.9% uptime, but we cannot guarantee uninterrupted service. 
                  The platform may be temporarily unavailable due to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Scheduled maintenance and updates</li>
                  <li>Technical issues or bugs</li>
                  <li>Third-party service disruptions</li>
                  <li>Force majeure events</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Service Modifications</h3>
                <p className="text-muted-foreground">
                  We reserve the right to modify, suspend, or discontinue any part of the platform at any time. 
                  We will provide reasonable notice for significant changes that affect your use of the platform.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-orange-800 dark:text-orange-200">Important Disclaimer</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  PentoraSec is provided "as is" without warranties of any kind. We disclaim all warranties, 
                  express or implied, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Warranties of merchantability and fitness for a particular purpose</li>
                  <li>Warranties regarding the accuracy or completeness of scan results</li>
                  <li>Warranties that the platform will be error-free or uninterrupted</li>
                  <li>Warranties regarding third-party tools and integrations</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Liability Limitation</h3>
                <p className="text-muted-foreground">
                  To the maximum extent permitted by law, PentoraSec shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages, including but not limited to loss 
                  of profits, data, or business opportunities.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-red-600" />
                Termination
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Termination by You</h3>
                <p className="text-muted-foreground mb-3">
                  You may terminate your account at any time by contacting us or using the account deletion 
                  feature in your settings.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Termination by Us</h3>
                <p className="text-muted-foreground mb-3">
                  We may terminate or suspend your account immediately if you:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Violate these Terms of Service</li>
                  <li>Engage in prohibited activities</li>
                  <li>Fail to pay required fees</li>
                  <li>Pose a security risk to our platform or other users</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Effect of Termination</h3>
                <p className="text-muted-foreground">
                  Upon termination, your right to use the platform ceases immediately. We will retain your 
                  data for a reasonable period to allow for data export, after which it will be securely deleted.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-6 h-6 text-purple-600" />
                Governing Law and Disputes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Governing Law</h3>
                <p className="text-muted-foreground">
                  These Terms of Service are governed by and construed in accordance with the laws of the 
                  jurisdiction where PentoraSec is incorporated, without regard to conflict of law principles.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Dispute Resolution</h3>
                <p className="text-muted-foreground">
                  Any disputes arising from these terms or your use of the platform will be resolved through 
                  binding arbitration, except for claims that may be brought in small claims court.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-cyan-600" />
                Changes to Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We may update these Terms of Service from time to time. We will notify you of any material 
                changes by posting the new terms on this page and updating the "Last updated" date.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Your Continued Use</h3>
                <p className="text-sm text-muted-foreground">
                  Your continued use of the platform after any changes to these terms constitutes acceptance 
                  of the new terms. If you do not agree to the changes, you must stop using the platform.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <Card className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="text-center py-8">
            <h3 className="text-2xl font-bold mb-4">Questions About These Terms?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              If you have any questions about these Terms of Service or need clarification on any point, 
              please contact us.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => window.open('mailto:pentora59@gmail.com?subject=Terms of Service Questions', '_blank')}
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Us
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
