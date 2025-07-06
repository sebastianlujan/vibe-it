import { Page } from '@/components/PageLayout';
import { AuthButton } from '../components/AuthButton';
import { Calendar, Map, Star, User } from 'iconoir-react';

export default function Home() {
  return (
    <Page className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
      <Page.Main className="flex flex-col items-center justify-center p-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-2xl">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-3xl">V</span>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                vibe-it
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg mx-auto">
              The best way to find your next side event in Cannes
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <Calendar className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium text-gray-700">Discover Events</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <Map className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium text-gray-700">Find Locations</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <Star className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium text-gray-700">Rate & Review</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <User className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium text-gray-700">Connect</span>
            </div>
          </div>
        </div>

        {/* Auth Section */}
        <div className="w-full max-w-md space-y-4 mx-auto">
          <AuthButton />
          
          {/* Optional: Add some stats or info */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Join thousands of event-goers discovering the best side events
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        </div>
      </Page.Main>
    </Page>
  );
}
