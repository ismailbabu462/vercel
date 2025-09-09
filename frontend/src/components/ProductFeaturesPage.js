import React from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  Globe, 
  Database, 
  Cpu, 
  Users, 
  FileCheck, 
  Activity,
  ArrowRight,
  Star,
  Award,
  Target,
  Clock,
  TrendingUp,
  Search,
  Network,
  Bug,
  FileText,
  Settings,
  Key,
  Server
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const ProductFeaturesPage = () => {
  const securityFeatures = [
    {
      category: "Penetration Testing Tools",
      icon: Target,
      color: "from-red-500 to-orange-500",
      features: [
        "Subfinder - Subdomain discovery and enumeration",
        "Amass - Advanced subdomain reconnaissance",
        "Nmap - Network port scanning and service detection",
        "Nuclei - Vulnerability scanner with custom templates",
        "FFuF - Web fuzzing and directory brute-forcing",
        "Gobuster - Directory and file brute-forcing"
      ]
    },
    {
      category: "AI-Powered Analysis",
      icon: Cpu,
      color: "from-blue-500 to-purple-500",
      features: [
        "Pentora AI - Intelligent vulnerability analysis",
        "Automated scan result interpretation",
        "Context-aware security recommendations",
        "Project-wide security assessment",
        "Vulnerability prioritization and scoring",
        "Automated report generation and insights"
      ]
    },
    {
      category: "Security Infrastructure",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      features: [
        "JWT-based authentication and authorization",
        "Comprehensive security headers implementation",
        "Rate limiting and DDoS protection",
        "Input validation and sanitization",
        "SQL injection prevention (SQLAlchemy ORM)",
        "XSS and CSRF protection mechanisms"
      ]
    },
    {
      category: "Project Management",
      icon: FileText,
      color: "from-yellow-500 to-amber-500",
      features: [
        "Multi-project security testing organization",
        "Vulnerability tracking and management",
        "Note-taking and documentation system",
        "Tool output storage and analysis",
        "Project-based access control",
        "Comprehensive audit logging"
      ]
    },
    {
      category: "User Management",
      icon: Users,
      color: "from-indigo-500 to-blue-500",
      features: [
        "Device-based auto-login system",
        "Tier-based access control (Essential, Professional, Teams, Enterprise, Elite)",
        "User session management",
        "Project ownership and permissions",
        "Activity tracking and monitoring",
        "Secure user data handling"
      ]
    },
    {
      category: "Data Security",
      icon: Database,
      color: "from-purple-500 to-pink-500",
      features: [
        "Secure password hashing (Passlib)",
        "Database connection pooling",
        "Encrypted data transmission (HTTPS/TLS)",
        "Secure API endpoints",
        "Data validation and sanitization",
        "Secure file upload handling"
      ]
    }
  ];

  const securityMetrics = [
    { label: "Security Tools", value: "6+", icon: Target },
    { label: "User Tiers", value: "5", icon: Users },
    { label: "Security Headers", value: "12+", icon: Shield },
    { label: "API Endpoints", value: "25+", icon: Server }
  ];

  const enterpriseFeatures = [
    "Advanced AI-powered vulnerability analysis",
    "Custom security tool integration",
    "Dedicated project management",
    "Priority support and response",
    "Custom API endpoint development",
    "White-label security solutions"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Product Features
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive security solutions designed to protect your digital assets with cutting-edge technology and expert analysis
          </p>
        </div>

        {/* Security Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {securityMetrics.map((metric, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <metric.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {securityFeatures.map((category, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{category.category}</CardTitle>
                </div>
                <CardDescription>
                  Advanced security capabilities for comprehensive protection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {category.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Security */}
        <Card className="mb-12 bg-gradient-to-r from-emerald-600 to-blue-600 text-white border-0">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Key className="w-8 h-8 text-yellow-300" />
              <CardTitle className="text-2xl">AI Security & Privacy</CardTitle>
            </div>
            <CardDescription className="text-emerald-100">
              Advanced AI capabilities with enterprise-grade security and privacy protection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* BYOK Model */}
              <div className="bg-white/10 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-yellow-300" />
                  <h3 className="text-xl font-semibold">Bring Your Own Key (BYOK)</h3>
                </div>
                <p className="text-emerald-100 mb-4">
                  We use a Bring Your Own Key (BYOK) model. Your Gemini API key is NEVER sent to our servers - 
                  it's only stored locally in your browser for maximum security and privacy.
                </p>
                <div className="flex items-center gap-2 text-sm text-emerald-200">
                  <CheckCircle className="w-4 h-4" />
                  <span>Zero data transmission to external servers</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-200 mt-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Complete control over your API keys</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-200 mt-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Enterprise-grade privacy protection</span>
                </div>
              </div>

              {/* On-Premise Option */}
              <div className="bg-white/10 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Server className="w-6 h-6 text-yellow-300" />
                  <h3 className="text-xl font-semibold">On-Premise Deployment</h3>
                </div>
                <p className="text-emerald-100 mb-4">
                  Alternatively, for on-premise installations, our Ollama engine is fully compatible, 
                  allowing you to run AI analysis completely within your own infrastructure.
                </p>
                <div className="flex items-center gap-2 text-sm text-emerald-200">
                  <CheckCircle className="w-4 h-4" />
                  <span>Complete data sovereignty</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-200 mt-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>No external API dependencies</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-200 mt-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Customizable AI models</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enterprise Features */}
        <Card className="mb-12 bg-gradient-to-r from-slate-900 to-slate-800 text-white border-0">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="w-8 h-8 text-yellow-400" />
              <CardTitle className="text-2xl">Enterprise Security Solutions</CardTitle>
            </div>
            <CardDescription className="text-slate-300">
              Tailored security solutions for large organizations and enterprises
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enterpriseFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Standards */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Globe className="w-6 h-6 text-blue-600" />
              Security Standards & Best Practices
            </CardTitle>
            <CardDescription>
              Our platform implements industry-standard security practices and follows OWASP guidelines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "OWASP Guidelines",
                "JWT Security",
                "HTTPS/TLS 1.3",
                "CORS Protection",
                "Input Validation",
                "SQL Injection Prevention",
                "XSS Protection",
                "Rate Limiting"
              ].map((standard, index) => (
                <div key={index} className="text-center p-4 border rounded-lg hover:bg-muted transition-colors">
                  <Badge variant="outline" className="text-sm font-medium">
                    {standard}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">Ready to Secure Your Digital Assets?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of organizations that trust PentoraSec for their security needs. 
              Get started with our comprehensive security suite today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => window.location.href = '/pricing'}
              >
                View Pricing Plans
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => window.location.href = '/dashboard'}
              >
                Start Free Trial
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Built with modern security practices
          </p>
          <div className="flex items-center justify-center gap-8 opacity-60">
            <div className="text-2xl font-bold">FastAPI</div>
            <div className="text-2xl font-bold">React 18</div>
            <div className="text-2xl font-bold">SQLAlchemy</div>
            <div className="text-2xl font-bold">JWT Auth</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFeaturesPage;
