import { useState } from 'react';
import { Building2, Users, Briefcase, Search, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TalentSearch from './TalentSearch';
import JobSearch from './JobSearch';

export default function SearchInterface() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Logo */}
      <div className="text-center mb-12 animate-in fade-in-0 slide-in-from-top-4 duration-1000">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
            <Building2 className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Talent<span className="text-blue-600">Hub</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connect talented professionals with innovative companies. Your next opportunity awaits.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
        <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">10K+</h3>
          <p className="text-gray-600">Active Professionals</p>
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
            <Briefcase className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">5K+</h3>
          <p className="text-gray-600">Open Positions</p>
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
            <Star className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">95%</h3>
          <p className="text-gray-600">Success Rate</p>
        </div>
      </div>

      {/* Main Search Interface */}
      <div className="max-w-4xl mx-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-300">
        <Tabs defaultValue="talent" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-gradient-to-r from-gray-50 to-gray-100 p-2.5 rounded-2xl shadow-lg border border-gray-200/50 backdrop-blur-sm">
            <TabsTrigger 
              value="talent" 
              className="flex items-center justify-center space-x-3 py-4 px-8 rounded-xl font-semibold text-sm transition-all duration-300 ease-out
                data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/10 data-[state=active]:border data-[state=active]:border-blue-100
                data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-white/50
                transform data-[state=active]:scale-[1.02] hover:scale-[1.01]"
            >
              <Search className="h-4 w-4 transition-transform duration-300 data-[state=active]:scale-110" />
              <span className="tracking-wide">Find Talent</span>
            </TabsTrigger>
            <TabsTrigger 
              value="jobs" 
              className="flex items-center justify-center space-x-3 py-4 px-8 rounded-xl font-semibold text-sm transition-all duration-300 ease-out
                data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/10 data-[state=active]:border data-[state=active]:border-purple-100
                data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-white/50
                transform data-[state=active]:scale-[1.02] hover:scale-[1.01]"
            >
              <Briefcase className="h-4 w-4 transition-transform duration-300 data-[state=active]:scale-110" />
              <span className="tracking-wide">Find Jobs</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="talent" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Top Talent</h2>
              <p className="text-gray-600">Search through thousands of qualified professionals</p>
            </div>
            <TalentSearch />
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Discover Opportunities</h2>
              <p className="text-gray-600">Find your next career move with advanced filters</p>
            </div>
            <JobSearch />
          </TabsContent>
        </Tabs>
      </div>

      {/* Featured Companies */}
      <div className="mt-20 text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-500">
        <h3 className="text-lg font-semibold text-gray-900 mb-8">Powered & Sponsored by </h3>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          <div className="text-2xl font-bold text-gray-400">torre.ai</div>
        </div>
      </div>
    </div>
  );
}