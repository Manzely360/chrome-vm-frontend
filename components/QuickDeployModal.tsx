'use client';

import { useState } from 'react';
import { 
  CloudIcon, 
  ZapIcon, 
  ServerIcon,
  CheckCircleIcon,
  XCircleIcon,
  LoaderIcon
} from 'lucide-react';

interface QuickDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeploy: (provider: 'cloudflare' | 'google_cloud' | 'railway') => void;
}

interface CloudProvider {
  id: 'cloudflare' | 'google_cloud' | 'railway';
  name: string;
  logo: string;
  description: string;
  status: 'ready' | 'deploying' | 'error' | 'offline';
  features: string[];
  pricing: string;
}

const cloudProviders: CloudProvider[] = [
  {
    id: 'cloudflare',
    name: 'Cloudflare Workers',
    logo: '⚡',
    description: 'Serverless VM hosting with global edge deployment',
    status: 'ready',
    features: ['Global CDN', 'Serverless', 'Free Tier', 'Auto-scaling'],
    pricing: 'Free tier available'
  },
  {
    id: 'google_cloud',
    name: 'Google Cloud Platform',
    logo: '☁️',
    description: 'Enterprise-grade VM hosting with full Docker support',
    status: 'ready',
    features: ['Docker Support', 'Persistent Storage', 'High Performance', 'Global Regions'],
    pricing: 'Pay-as-you-go'
  },
  {
    id: 'railway',
    name: 'Railway',
    logo: '🚂',
    description: 'Simple container deployment with instant scaling',
    status: 'ready',
    features: ['Easy Deploy', 'Git Integration', 'Auto-scaling', 'Monitoring'],
    pricing: 'Usage-based'
  }
];

export default function QuickDeployModal({ isOpen, onClose, onDeploy }: QuickDeployModalProps) {
  const [selectedProvider, setSelectedProvider] = useState<CloudProvider['id'] | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);

  if (!isOpen) return null;

  const handleDeploy = async (provider: CloudProvider['id']) => {
    setIsDeploying(true);
    setSelectedProvider(provider);
    
    try {
      await onDeploy(provider);
    } catch (error) {
      console.error('Deployment failed:', error);
    } finally {
      setIsDeploying(false);
      setSelectedProvider(null);
    }
  };

  const getStatusIcon = (status: CloudProvider['status']) => {
    switch (status) {
      case 'ready':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'deploying':
        return <LoaderIcon className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'error':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'offline':
        return <XCircleIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: CloudProvider['status']) => {
    switch (status) {
      case 'ready':
        return 'Ready to Deploy';
      case 'deploying':
        return 'Deploying...';
      case 'error':
        return 'Deployment Failed';
      case 'offline':
        return 'Offline';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <ZapIcon className="h-6 w-6 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Quick Deploy VM
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XCircleIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Choose a cloud provider to deploy your Chrome VM instantly. Each provider offers different features and pricing.
          </p>

          {/* Cloud Providers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cloudProviders.map((provider) => (
              <div
                key={provider.id}
                className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                  selectedProvider === provider.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => !isDeploying && handleDeploy(provider.id)}
              >
                {/* Provider Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{provider.logo}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {provider.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(provider.status)}
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {getStatusText(provider.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {provider.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Features:
                  </h4>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    {provider.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircleIcon className="h-3 w-3 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Pricing: 
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                    {provider.pricing}
                  </span>
                </div>

                {/* Deploy Button */}
                <button
                  className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    provider.status === 'ready' && !isDeploying
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                  }`}
                  disabled={provider.status !== 'ready' || isDeploying}
                >
                  {selectedProvider === provider.id && isDeploying ? (
                    <div className="flex items-center justify-center">
                      <LoaderIcon className="h-4 w-4 animate-spin mr-2" />
                      Deploying...
                    </div>
                  ) : (
                    'Deploy VM'
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <ServerIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  What happens when you deploy?
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 mt-2 space-y-1">
                  <li>• A Chrome VM container is created on your selected cloud provider</li>
                  <li>• NoVNC viewer is automatically configured for remote control</li>
                  <li>• Chrome browser is installed and ready for automation</li>
                  <li>• VM is added to your dashboard for management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
