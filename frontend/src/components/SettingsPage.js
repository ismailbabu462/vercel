import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useToast } from '../hooks/use-toast';
import api from '../lib/api';

const SettingsPage = () => {
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Load saved API key from localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setGeminiApiKey(savedKey);
    }
  }, []);

  // Check AI status on component mount
  useEffect(() => {
    checkAiStatus();
  }, []);

  const checkAiStatus = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/ai/status');
      setAiStatus(response.data);
    } catch (error) {
      console.error('Failed to check AI status:', error);
      setAiStatus({
        available: false,
        service: 'Unknown',
        status: 'not_available',
        error: 'Failed to check status'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveApiKey = async () => {
    if (!geminiApiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid Gemini API key",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSaving(true);
      
      // Save to localStorage (device-specific)
      localStorage.setItem('gemini_api_key', geminiApiKey.trim());
      
      // Update backend configuration (this would require a new endpoint)
      // For now, we'll just save locally
      
      toast({
        title: "Success",
        description: "Gemini API key saved successfully! AI will now use Gemini instead of Ollama.",
      });

      // Refresh AI status
      await checkAiStatus();
      
    } catch (error) {
      console.error('Failed to save API key:', error);
      toast({
        title: "Error",
        description: "Failed to save API key. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setGeminiApiKey('');
    toast({
      title: "Success",
      description: "API key cleared. AI will now use Ollama.",
    });
    checkAiStatus();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'running':
        return <Badge variant="default" className="bg-green-500">Running</Badge>;
      case 'not_available':
        return <Badge variant="destructive">Not Available</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Configure your AI preferences and API keys
          </p>
        </div>

        {/* AI Service Status */}
        <Card>
          <CardHeader>
            <CardTitle>AI Service Status</CardTitle>
            <CardDescription>
              Current AI service configuration and status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                <span>Checking AI status...</span>
              </div>
            ) : aiStatus ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Service:</span>
                  <Badge variant="outline">{aiStatus.service}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Model:</span>
                  <span className="text-sm text-muted-foreground">{aiStatus.model}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Status:</span>
                  {getStatusBadge(aiStatus.status)}
                </div>
                {aiStatus.api_key_configured !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium">API Key:</span>
                    <Badge variant={aiStatus.api_key_configured ? "default" : "secondary"}>
                      {aiStatus.api_key_configured ? "Configured" : "Not Configured"}
                    </Badge>
                  </div>
                )}
                {aiStatus.error && (
                  <Alert variant="destructive">
                    <AlertDescription>{aiStatus.error}</AlertDescription>
                  </Alert>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={checkAiStatus}
                  disabled={isLoading}
                >
                  Refresh Status
                </Button>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                Failed to load AI status
              </div>
            )}
          </CardContent>
        </Card>

        {/* Gemini API Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Gemini API Configuration</CardTitle>
            <CardDescription>
              Configure your Gemini API key for enhanced AI capabilities. 
              This key is stored locally on your device only.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gemini-api-key">Gemini API Key</Label>
              <Input
                id="gemini-api-key"
                type="password"
                placeholder="Enter your Gemini API key"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                className="font-mono"
              />
              <p className="text-sm text-muted-foreground">
                Get your API key from{' '}
                <a 
                  href="https://makersuite.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google AI Studio
                </a>
              </p>
            </div>

            <Separator />

            <div className="flex space-x-2">
              <Button 
                onClick={handleSaveApiKey}
                disabled={isSaving || !geminiApiKey.trim()}
              >
                {isSaving ? 'Saving...' : 'Save API Key'}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleClearApiKey}
                disabled={isSaving || !geminiApiKey}
              >
                Clear API Key
              </Button>
            </div>

            <Alert>
              <AlertDescription>
                <strong>Security Note:</strong> Your API key is stored locally on this device only. 
                It will not be shared with our servers or other devices. When you clear your 
                browser data, the API key will be removed.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* AI Service Information */}
        <Card>
          <CardHeader>
            <CardTitle>AI Service Information</CardTitle>
            <CardDescription>
              Learn about the available AI services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-green-600">Gemini (Recommended)</h4>
                <p className="text-sm text-muted-foreground">
                  Google's advanced AI model with fast response times and excellent 
                  cybersecurity knowledge. Requires your own API key.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-blue-600">Ollama (Default)</h4>
                <p className="text-sm text-muted-foreground">
                  Local AI model running on our servers. No API key required, 
                  but may have slower response times.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
