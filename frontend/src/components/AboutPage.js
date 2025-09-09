import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Users, 
  Shield, 
  Target, 
  Zap, 
  Globe, 
  Award, 
  Mail, 
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Lock
} from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-foreground">About PentoraSec</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leading the future of cybersecurity with AI-powered penetration testing and comprehensive security analysis
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-4">Our Mission</CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              To democratize cybersecurity by making advanced penetration testing tools accessible, 
              intelligent, and easy to use for security professionals and organizations worldwide.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-green-600" />
                Our Story
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Founded in 2024, PentoraSec emerged from a simple observation: traditional penetration testing 
                tools were either too complex for beginners or too expensive for small organizations.
              </p>
              <p className="text-muted-foreground">
                We set out to create a platform that combines the power of industry-standard tools like Nmap, 
                Nuclei, and Subfinder with the intelligence of AI to make security testing more accessible and effective.
              </p>
              <p className="text-muted-foreground">
                Today, PentoraSec serves security professionals, ethical hackers, and organizations of all sizes, 
                helping them identify and remediate vulnerabilities before malicious actors can exploit them.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-600" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We envision a world where every organization, regardless of size or budget, has access to 
                enterprise-grade security testing capabilities.
              </p>
              <p className="text-muted-foreground">
                Our goal is to make cybersecurity proactive rather than reactive, helping organizations 
                stay one step ahead of emerging threats through continuous security assessment.
              </p>
              <p className="text-muted-foreground">
                By combining human expertise with AI intelligence, we're building the future of 
                cybersecurity testing.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-4">Our Values</CardTitle>
            <CardDescription>
              The principles that guide everything we do
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Security First</h3>
                <p className="text-sm text-muted-foreground">
                  We prioritize security in everything we build and every decision we make.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Accessibility</h3>
                <p className="text-sm text-muted-foreground">
                  Making advanced security tools accessible to everyone, everywhere.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  Continuously pushing the boundaries of what's possible in cybersecurity.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Community</h3>
                <p className="text-sm text-muted-foreground">
                  Building a strong community of security professionals and ethical hackers.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">Privacy</h3>
                <p className="text-sm text-muted-foreground">
                  Protecting user privacy and data sovereignty through BYOK and on-premise options.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="font-semibold mb-2">Excellence</h3>
                <p className="text-sm text-muted-foreground">
                  Committed to delivering the highest quality tools and services.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Our Technology</CardTitle>
            <CardDescription className="text-center">
              Built with modern, secure, and scalable technologies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">FastAPI</Badge>
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">SQLAlchemy</Badge>
                  <Badge variant="secondary">JWT</Badge>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <Badge variant="secondary">Shadcn/ui</Badge>
                  <Badge variant="secondary">Vite</Badge>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Security Tools</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Nmap</Badge>
                  <Badge variant="outline">Nuclei</Badge>
                  <Badge variant="outline">Subfinder</Badge>
                  <Badge variant="outline">Gobuster</Badge>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">AI Integration</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Gemini API</Badge>
                  <Badge variant="outline">Ollama</Badge>
                  <Badge variant="outline">BYOK</Badge>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Infrastructure</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Google Cloud</Badge>
                  <Badge variant="outline">Docker</Badge>
                  <Badge variant="outline">Vercel</Badge>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Security</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">HTTPS/TLS</Badge>
                  <Badge variant="outline">Rate Limiting</Badge>
                  <Badge variant="outline">Input Validation</Badge>
                  <Badge variant="outline">CORS</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Our Team</CardTitle>
            <CardDescription>
              Passionate security professionals dedicated to making cybersecurity accessible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Security Experts</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our team consists of experienced penetration testers, security researchers, and software engineers 
                who are passionate about cybersecurity and committed to building tools that make a difference.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold">Penetration Testers</h4>
                  <p className="text-sm text-muted-foreground">Certified ethical hackers with years of experience</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold">AI Engineers</h4>
                  <p className="text-sm text-muted-foreground">Experts in machine learning and AI integration</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold">Security Architects</h4>
                  <p className="text-sm text-muted-foreground">Designing secure and scalable systems</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="mb-12 bg-gradient-to-r from-green-600 to-blue-600 text-white border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Our Impact</CardTitle>
            <CardDescription className="text-green-100">
              Making a difference in the cybersecurity landscape
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div className="text-green-100">Vulnerabilities Found</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-green-100">Security Professionals</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-green-100">Organizations Secured</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">99.9%</div>
                <div className="text-green-100">Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="text-center py-12">
            <h3 className="text-3xl font-bold mb-4">Ready to Secure Your Organization?</h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Join thousands of security professionals who trust PentoraSec for their penetration testing needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => window.location.href = '/pricing'}
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => window.open('mailto:pentora59@gmail.com?subject=About PentoraSec', '_blank')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
