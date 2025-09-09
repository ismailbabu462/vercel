import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  Mail, 
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Info,
  FileText,
  Users,
  Globe
} from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Last updated: January 2025
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Our Commitment to Privacy</CardTitle>
            <CardDescription className="text-blue-100">
              At PentoraSec, we are committed to protecting your privacy and ensuring the security of your data. 
              This Privacy Policy explains how we collect, use, and protect your information.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-6 h-6 text-green-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Device Information</h3>
                <p className="text-muted-foreground mb-3">
                  We collect device-specific information to create a unique device identifier for authentication purposes:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>Operating system information</li>
                  <li>Browser type and version</li>
                  <li>Screen resolution</li>
                  <li>Time zone</li>
                  <li>Language preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Usage Information</h3>
                <p className="text-muted-foreground mb-3">
                  We collect information about how you use our platform:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>Tool execution logs and results</li>
                  <li>Project creation and management data</li>
                  <li>Feature usage statistics</li>
                  <li>Error logs and performance metrics</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">AI Integration Data</h3>
                <p className="text-muted-foreground mb-3">
                  For AI-powered features, we support two privacy models:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-green-600">Bring Your Own Key (BYOK)</h4>
                    <p className="text-sm text-muted-foreground">
                      Your Gemini API key is stored locally in your browser and never transmitted to our servers.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-blue-600">On-Premise Option</h4>
                    <p className="text-sm text-muted-foreground">
                      Use Ollama engine for complete data sovereignty with no external API calls.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-6 h-6 text-blue-600" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Service Provision</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Provide penetration testing tools</li>
                    <li>Execute security scans</li>
                    <li>Generate vulnerability reports</li>
                    <li>Enable AI-powered analysis</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Platform Improvement</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Analyze usage patterns</li>
                    <li>Improve tool performance</li>
                    <li>Develop new features</li>
                    <li>Optimize user experience</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-6 h-6 text-red-600" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">Security Measures</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Encryption</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>HTTPS/TLS 1.3 for all communications</li>
                      <li>End-to-end encryption for sensitive data</li>
                      <li>Encrypted database storage</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Access Control</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>JWT-based authentication</li>
                      <li>Role-based access control</li>
                      <li>Rate limiting and abuse prevention</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Privacy Protection</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Data Minimization</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Collect only necessary information</li>
                      <li>Automatic data retention policies</li>
                      <li>Regular data cleanup</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">User Control</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>BYOK model for AI features</li>
                      <li>On-premise deployment options</li>
                      <li>Data export and deletion rights</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-purple-600" />
                Data Sharing and Third Parties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2 text-amber-800 dark:text-amber-200">We Do NOT Share Your Data</h3>
                    <p className="text-sm text-muted-foreground">
                      We do not sell, rent, or share your personal information with third parties for marketing purposes. 
                      Your scan results and project data remain private and are not shared with external parties.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Limited Exceptions</h3>
                <p className="text-muted-foreground mb-3">
                  We may share information only in these limited circumstances:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>With service providers under strict confidentiality agreements</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-indigo-600" />
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Access and Control</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate information</li>
                    <li>Delete your account and data</li>
                    <li>Export your data</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Privacy Choices</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Opt out of data collection</li>
                    <li>Use BYOK for AI features</li>
                    <li>Choose on-premise deployment</li>
                    <li>Control data retention</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-orange-600" />
                Cookies and Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Essential Cookies</h3>
                <p className="text-muted-foreground mb-3">
                  We use essential cookies for:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>Authentication and session management</li>
                  <li>Security and fraud prevention</li>
                  <li>Basic platform functionality</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Analytics</h3>
                <p className="text-muted-foreground">
                  We use privacy-focused analytics to understand platform usage without collecting personal information. 
                  All analytics data is anonymized and aggregated.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-6 h-6 text-teal-600" />
                Data Retention
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Retention Periods</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Account data: Until account deletion</li>
                    <li>Scan results: 90 days (configurable)</li>
                    <li>Logs: 30 days</li>
                    <li>Analytics: 12 months (anonymized)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Automatic Cleanup</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Regular data purging</li>
                    <li>Inactive account cleanup</li>
                    <li>Secure data destruction</li>
                    <li>Compliance monitoring</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* International Transfers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-cyan-600" />
                International Data Transfers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Our services are hosted on Google Cloud Platform with data centers in multiple regions. 
                We ensure that any international data transfers comply with applicable privacy laws and 
                include appropriate safeguards.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Safeguards</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Standard Contractual Clauses (SCCs)</li>
                  <li>Adequacy decisions where applicable</li>
                  <li>Technical and organizational measures</li>
                  <li>Regular compliance assessments</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-6 h-6 text-pink-600" />
                Changes to This Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes 
                by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Notification Methods</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Email notification to registered users</li>
                  <li>In-app notification</li>
                  <li>Website banner announcement</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <Card className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="text-center py-8">
            <h3 className="text-2xl font-bold mb-4">Questions About Privacy?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              If you have any questions about this Privacy Policy or our data practices, 
              please don't hesitate to contact us.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => window.open('mailto:pentora59@gmail.com?subject=Privacy Policy Questions', '_blank')}
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

export default PrivacyPolicyPage;
