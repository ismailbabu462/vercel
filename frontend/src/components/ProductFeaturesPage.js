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
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const ProductFeaturesPage = () => {
  const securityFeatures = [
    {
      category: "Penetration Testing",
      icon: Target,
      color: "from-red-500 to-orange-500",
      features: [
        "Automated vulnerability scanning across web applications",
        "Manual penetration testing with expert security analysts",
        "OWASP Top 10 compliance verification",
        "API security testing and endpoint validation",
        "Network infrastructure penetration testing",
        "Social engineering simulation and awareness testing"
      ]
    },
    {
      category: "AI-Powered Security",
      icon: Cpu,
      color: "from-blue-500 to-purple-500",
      features: [
        "Machine learning-based threat detection",
        "Intelligent vulnerability prioritization",
        "Automated security report generation",
        "Behavioral analysis and anomaly detection",
        "Predictive security risk assessment",
        "AI-driven remediation recommendations"
      ]
    },
    {
      category: "Compliance & Standards",
      icon: FileCheck,
      color: "from-green-500 to-emerald-500",
      features: [
        "ISO 27001 compliance framework",
        "SOC 2 Type II certification support",
        "GDPR and data privacy compliance",
        "PCI DSS validation for payment systems",
        "HIPAA compliance for healthcare data",
        "Custom regulatory framework implementation"
      ]
    },
    {
      category: "Real-time Monitoring",
      icon: Activity,
      color: "from-yellow-500 to-amber-500",
      features: [
        "24/7 security monitoring and alerting",
        "Real-time threat intelligence feeds",
        "Automated incident response workflows",
        "Security event correlation and analysis",
        "Performance impact monitoring",
        "Custom dashboard and reporting"
      ]
    },
    {
      category: "Team Collaboration",
      icon: Users,
      color: "from-indigo-500 to-blue-500",
      features: [
        "Multi-user project management",
        "Role-based access control (RBAC)",
        "Collaborative vulnerability tracking",
        "Team communication and notifications",
        "Audit trail and activity logging",
        "Custom workflow automation"
      ]
    },
    {
      category: "Data Protection",
      icon: Database,
      color: "from-purple-500 to-pink-500",
      features: [
        "End-to-end encryption for all data",
        "Secure data storage and backup",
        "Data anonymization and pseudonymization",
        "Cross-border data transfer compliance",
        "Data retention policy enforcement",
        "Secure data disposal and destruction"
      ]
    }
  ];

  const securityMetrics = [
    { label: "Vulnerabilities Detected", value: "10,000+", icon: AlertTriangle },
    { label: "Security Tests Run", value: "50,000+", icon: CheckCircle },
    { label: "Compliance Frameworks", value: "15+", icon: Award },
    { label: "Uptime Guarantee", value: "99.9%", icon: Clock }
  ];

  const enterpriseFeatures = [
    "Advanced threat hunting capabilities",
    "Custom security policy development",
    "Dedicated security consultant",
    "Priority support and response",
    "Custom integration development",
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
              Industry Standards & Certifications
            </CardTitle>
            <CardDescription>
              Our platform adheres to the highest security standards and industry best practices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "ISO 27001",
                "SOC 2 Type II",
                "PCI DSS",
                "GDPR",
                "HIPAA",
                "NIST Framework",
                "OWASP Guidelines",
                "CIS Controls"
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
            Trusted by security professionals worldwide
          </p>
          <div className="flex items-center justify-center gap-8 opacity-60">
            <div className="text-2xl font-bold">500+</div>
            <div className="text-2xl font-bold">Enterprise Clients</div>
            <div className="text-2xl font-bold">99.9%</div>
            <div className="text-2xl font-bold">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFeaturesPage;
