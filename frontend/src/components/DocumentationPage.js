import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  BookOpen, 
  Play, 
  Shield, 
  Zap, 
  Target, 
  Download, 
  Settings, 
  Users, 
  FileText,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

const DocumentationPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-foreground">Documentation</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete guide to using PentoraSec for comprehensive penetration testing and security analysis
          </p>
        </div>

        {/* Quick Start */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Play className="w-6 h-6" />
              <CardTitle className="text-2xl">Quick Start Guide</CardTitle>
            </div>
            <CardDescription className="text-blue-100">
              Get up and running with PentoraSec in minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <h3 className="font-semibold">Download Agent</h3>
                </div>
                <p className="text-blue-100 text-sm">
                  Download and install the PentoraSec Desktop Agent from our GitHub repository
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <h3 className="font-semibold">Create Project</h3>
                </div>
                <p className="text-blue-100 text-sm">
                  Create a new project and configure your target domain or IP address
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <h3 className="font-semibold">Run Tools</h3>
                </div>
                <p className="text-blue-100 text-sm">
                  Execute penetration testing tools and analyze results with AI assistance
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a href="#getting-started" className="block text-sm text-blue-600 hover:text-blue-800">Getting Started</a>
                <a href="#tools" className="block text-sm text-blue-600 hover:text-blue-800">Available Tools</a>
                <a href="#ai-features" className="block text-sm text-blue-600 hover:text-blue-800">AI Features</a>
                <a href="#projects" className="block text-sm text-blue-600 hover:text-blue-800">Project Management</a>
                <a href="#security" className="block text-sm text-blue-600 hover:text-blue-800">Security Best Practices</a>
                <a href="#troubleshooting" className="block text-sm text-blue-600 hover:text-blue-800">Troubleshooting</a>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Getting Started */}
            <Card id="getting-started">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. Installation</h3>
                  <p className="text-muted-foreground mb-3">
                    Download the PentoraSec Desktop Agent from our GitHub repository:
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono text-sm">
                    git clone https://github.com/ismailbabu462/pentorasec-demo-desktop-agent-fix
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">2. Configuration</h3>
                  <p className="text-muted-foreground mb-3">
                    Install dependencies and configure the agent:
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono text-sm">
                    pip install -r requirements.txt<br/>
                    python agent.py
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3. First Project</h3>
                  <p className="text-muted-foreground">
                    Create your first project by clicking "New Project" and entering your target domain or IP address.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Available Tools */}
            <Card id="tools">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Available Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Subfinder</h4>
                    <p className="text-sm text-muted-foreground mb-2">Subdomain discovery tool</p>
                    <Badge variant="secondary">Essential+</Badge>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Nmap</h4>
                    <p className="text-sm text-muted-foreground mb-2">Network port scanner</p>
                    <Badge variant="secondary">Essential+</Badge>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Gobuster</h4>
                    <p className="text-sm text-muted-foreground mb-2">Directory/file brute-forcer</p>
                    <Badge variant="secondary">Essential+</Badge>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">FFuF</h4>
                    <p className="text-sm text-muted-foreground mb-2">Web fuzzer</p>
                    <Badge variant="outline">Professional+</Badge>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Nuclei</h4>
                    <p className="text-sm text-muted-foreground mb-2">Vulnerability scanner</p>
                    <Badge variant="outline">Professional+</Badge>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Amass</h4>
                    <p className="text-sm text-muted-foreground mb-2">Attack surface mapping</p>
                    <Badge variant="outline">Professional+</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Features */}
            <Card id="ai-features">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  AI Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Bring Your Own Key (BYOK)</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your Gemini API key is stored locally in your browser and never sent to our servers.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Complete privacy protection</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">On-Premise Option</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Use Ollama engine for complete data sovereignty in on-premise installations.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>No external dependencies</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Best Practices */}
            <Card id="security">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  Security Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Authorization Required</h3>
                    <p className="text-sm text-muted-foreground">
                      Only test systems you own or have explicit permission to test. Unauthorized testing is illegal.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Rate Limiting</h3>
                    <p className="text-sm text-muted-foreground">
                      Tools are rate-limited based on your subscription tier to prevent abuse and ensure fair usage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Data Protection</h3>
                    <p className="text-sm text-muted-foreground">
                      All scan results are encrypted and stored securely. Your data never leaves your control.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Troubleshooting */}
            <Card id="troubleshooting">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-orange-600" />
                  Troubleshooting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Common Issues</h3>
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium">Tool execution fails</h4>
                      <p className="text-sm text-muted-foreground">
                        Ensure the Desktop Agent is running and connected to the web interface.
                      </p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-medium">Rate limit exceeded</h4>
                      <p className="text-sm text-muted-foreground">
                        Wait for the cooldown period or upgrade your subscription plan.
                      </p>
                    </div>
                    <div className="border-l-4 border-amber-500 pl-4">
                      <h4 className="font-medium">AI features not working</h4>
                      <p className="text-sm text-muted-foreground">
                        Check your API key configuration in the AI panel settings.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Support Section */}
        <Card className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="text-center py-8">
            <h3 className="text-2xl font-bold mb-4">Need More Help?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Our support team is here to help you with any questions or issues you might encounter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => window.open('mailto:pentora59@gmail.com?subject=Documentation Support', '_blank')}
              >
                Contact Support
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => window.open('https://github.com/ismailbabu462/pentorasec-demo-desktop-agent-fix', '_blank')}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Agent
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentationPage;
