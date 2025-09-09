import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Building2, 
  Shield, 
  Zap, 
  Code, 
  Brain, 
  Monitor, 
  Globe, 
  Mail, 
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Users,
  FileText,
  Lock,
  Target
} from 'lucide-react';

const AcquisitionPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-foreground">Strategic Acquisition Opportunity</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            PentoraSec is more than a product; it is a strategic asset. Developed by a solo founder, 
            it represents a complete, market-ready intellectual property (IP) encompassing a secure backend, 
            a dual-AI engine, and a flexible desktop agent.
          </p>
        </div>

        {/* Value Proposition */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-4">Complete Market-Ready IP</CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              A fully developed, production-ready cybersecurity platform with proven technology stack, 
              modern architecture, and comprehensive security features.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* What's for Sale */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center mb-6">What is for Sale?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Backend & Frontend */}
              <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Complete Codebase</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      FastAPI Backend
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      React Frontend
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Production Ready
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Fully Documented
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Dual AI Architecture */}
              <Card className="border-2 border-purple-200 hover:border-purple-400 transition-colors">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Dual-AI Architecture</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Gemini BYOK Integration
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      On-Premise Ollama
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Privacy-First Design
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Enterprise Ready
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Desktop Agent */}
              <Card className="border-2 border-green-200 hover:border-green-400 transition-colors">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Monitor className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Desktop Agent</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Cross-Platform
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      WebSocket Integration
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Tool Execution Engine
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Secure Communication
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Brand & Domains */}
              <Card className="border-2 border-orange-200 hover:border-orange-400 transition-colors">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg">Brand & Domains</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      PentoraSec Brand
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Associated Domains
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Trademark Rights
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Market Presence
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Technology Stack</CardTitle>
            <CardDescription className="text-center">
              Modern, scalable, and secure technology foundation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4 text-lg">Backend Technologies</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded flex items-center justify-center">
                      <Code className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">FastAPI</div>
                      <div className="text-sm text-muted-foreground">High-performance Python framework</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded flex items-center justify-center">
                      <Shield className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">SQLAlchemy</div>
                      <div className="text-sm text-muted-foreground">ORM with security features</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded flex items-center justify-center">
                      <Lock className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">JWT Authentication</div>
                      <div className="text-sm text-muted-foreground">Secure token-based auth</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-lg">Frontend Technologies</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded flex items-center justify-center">
                      <Zap className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">React</div>
                      <div className="text-sm text-muted-foreground">Modern UI framework</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/20 rounded flex items-center justify-center">
                      <Target className="w-4 h-4 text-cyan-600" />
                    </div>
                    <div>
                      <div className="font-medium">Tailwind CSS</div>
                      <div className="text-sm text-muted-foreground">Utility-first styling</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded flex items-center justify-center">
                      <FileText className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-medium">Shadcn/ui</div>
                      <div className="text-sm text-muted-foreground">Component library</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-lg">Security Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded flex items-center justify-center">
                      <Shield className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <div className="font-medium">Rate Limiting</div>
                      <div className="text-sm text-muted-foreground">DDoS protection</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded flex items-center justify-center">
                      <Lock className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-medium">Input Validation</div>
                      <div className="text-sm text-muted-foreground">XSS/SQL injection prevention</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded flex items-center justify-center">
                      <Globe className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">HTTPS/TLS</div>
                      <div className="text-sm text-muted-foreground">Encrypted communications</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Opportunity */}
        <Card className="mb-12 bg-gradient-to-r from-green-600 to-blue-600 text-white border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-4">Market Opportunity</CardTitle>
            <CardDescription className="text-green-100 text-lg">
              The cybersecurity market is experiencing unprecedented growth with increasing demand for 
              AI-powered security solutions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">$300B+</div>
                <div className="text-green-100">Global Cybersecurity Market</div>
                <div className="text-sm text-green-200 mt-1">Expected by 2025</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">25%</div>
                <div className="text-green-100">Annual Growth Rate</div>
                <div className="text-sm text-green-200 mt-1">AI Security Solutions</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">$50B+</div>
                <div className="text-green-100">Penetration Testing Market</div>
                <div className="text-sm text-green-200 mt-1">Specialized segment</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Competitive Advantages */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Competitive Advantages</CardTitle>
            <CardDescription className="text-center">
              What makes PentoraSec a unique acquisition target
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Dual-AI Architecture</h3>
                    <p className="text-muted-foreground">
                      Unique combination of cloud-based Gemini API with on-premise Ollama support, 
                      offering both flexibility and data sovereignty.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Privacy-First Design</h3>
                    <p className="text-muted-foreground">
                      BYOK model ensures customer data never leaves their control, addressing 
                      enterprise privacy concerns.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Production Ready</h3>
                    <p className="text-muted-foreground">
                      Fully developed, tested, and deployed platform with comprehensive security 
                      features and documentation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Solo Founder</h3>
                    <p className="text-muted-foreground">
                      Clean ownership structure with no complex equity arrangements or 
                      investor complications.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Proven Technology</h3>
                    <p className="text-muted-foreground">
                      Built with industry-standard tools (Nmap, Nuclei, Subfinder) and 
                      modern development practices.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Scalable Architecture</h3>
                    <p className="text-muted-foreground">
                      Microservices-based design allows for easy integration into existing 
                      security portfolios.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Acquisition Details */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Acquisition Details</CardTitle>
            <CardDescription className="text-center">
              We are seeking a full acquisition by a strategic partner who can leverage this 
              technology to enhance their existing security portfolio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">What We're Looking For</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground">Strategic partner with existing security portfolio</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground">Resources to scale and market the platform</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground">Technical expertise to maintain and enhance the codebase</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground">Commitment to preserving the privacy-first approach</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">Deal Structures</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Full Acquisition</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete transfer of all IP, codebase, brand, and associated assets.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Acqui-Hire</h4>
                    <p className="text-sm text-muted-foreground">
                      Acquisition with founder joining the acquiring company in a technical role.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Strategic Partnership</h4>
                    <p className="text-sm text-muted-foreground">
                      Joint venture or licensing arrangement for specific markets or use cases.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="text-center py-12">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">Ready to Acquire PentoraSec?</h3>
              <p className="text-blue-100 mb-8 text-lg">
                For serious inquiries, please contact İsmail Başkır directly to discuss this 
                strategic acquisition opportunity.
              </p>
              
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-yellow-300" />
                  <h4 className="text-xl font-semibold">Direct Contact</h4>
                </div>
                <p className="text-blue-100 mb-4">
                  All acquisition discussions are handled directly by the founder to ensure 
                  confidentiality and expedited decision-making.
                </p>
                <div className="text-2xl font-mono bg-white/20 rounded px-4 py-2 inline-block">
                  pentora59@gmail.com
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50"
                  onClick={() => window.open('mailto:pentora59@gmail.com?subject=PentoraSec Acquisition Inquiry', '_blank')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Inquiry
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => window.location.href = '/features'}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  View Features
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AcquisitionPage;
