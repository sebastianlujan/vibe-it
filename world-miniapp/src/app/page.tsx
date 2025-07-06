import { Page } from '@/components/PageLayout';
import { AuthButton } from '../components/AuthButton';
import { Calendar, Map, Star, User } from 'iconoir-react';

export default function Home() {
  return (
    <Page className="bg-gradient-to-br from-yellow-200  via-white to-yellow-600 min-h-screen">
      <Page.Main className="flex flex-col items-center justify-center p-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-2xl">
          {/* Logo */}
          <div className="flex justify-center">
            <img src="/logo.png" className="h-24 w-auto"/>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Welcome!
            </h1>
            <p className="text-xl text-gray-600 max-w-lg mx-auto">
              The best way to find your next side event
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <Calendar className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Discover Events</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <Map className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Find Locations</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Rate & Review</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <User className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Connect</span>
            </div>
          </div>
        </div>

        {/* Auth Section */}
        <div className="w-full max-w-md space-y-4 mx-auto">
          <div className="flex justify-center">
            <AuthButton />
          </div>
          
          {/* Optional: Add some stats or info */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Join thousands of event-goers discovering the best side events
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-yellow-400/20 to-yellow-800/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-yellow-400/20 to-yellow-800/20 rounded-full blur-3xl"></div>
        </div>
      </Page.Main>
    </Page>
  );
}
