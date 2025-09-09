import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import api, { setAuthToken } from "./lib/api";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import ProjectsPage from "./components/ProjectsPage";
import ProjectDetail from "./components/ProjectDetail";
import NotesPage from "./components/NotesPage";
import ToolsPage from "./components/ToolsPage";
import PolicyPage from "./components/PolicyPage";
import ProductFeaturesPage from "./components/ProductFeaturesPage";
import SettingsPage from "./components/SettingsPage";
import WelcomePage from "./components/WelcomePage";
import PricingPage from "./pages/PricingPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import MockCheckoutPage from "./pages/MockCheckoutPage";
import AIPanel from "./components/ai/AIPanel";

// Token management is now handled in lib/api.js

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthTokenState] = useState(null);

  // Auto device login on app start
  useEffect(() => {
    const deviceLogin = async () => {
      try {
        console.log('App: Starting device login...');
        const response = await api.post('/auth/device-login');
        console.log('App: Device login response:', response.data);
        
        const token = response.data.access_token;
        console.log('App: Setting device auth token:', token ? 'Present' : 'Missing');
        setAuthToken(token);
        setAuthTokenState(token);
        setIsAuthenticated(true);
        console.log('App: Device login successful');
      } catch (error) {
        console.error('App: Device login failed:', error);
        // Still allow access for development
        setIsAuthenticated(true);
      } finally {
        setIsLoading(false);
      }
    };

    deviceLogin();
  }, []);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show loading
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Initializing Device...</h1>
          <p className="text-muted-foreground">Setting up your device session</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider initialToken={authToken}>
      <ThemeProvider>
        <div className="App">
          <BrowserRouter>
          <div className="flex h-screen bg-background">
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Navigate to="/welcome" replace />} />
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:projectId" element={<ProjectDetail />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/features" element={<ProductFeaturesPage />} />
                <Route path="/policy" element={<PolicyPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/payment/mock-checkout" element={<MockCheckoutPage />} />
                <Route path="/payment/success" element={<PaymentSuccessPage />} />
              </Routes>
            </main>
            <AIPanel />
          </div>
          <Toaster />
        </BrowserRouter>
      </div>
    </ThemeProvider>
    </AuthProvider>
  );
}

export default App;