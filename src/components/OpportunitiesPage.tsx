import { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Clock, DollarSign, ArrowLeft, Building, CheckCircle, Heart, Share2, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination } from '@/components/Pagination';

const ITEMS_PER_PAGE = 15;

function JobCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex space-x-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="flex space-x-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function OpportunitiesPage() {

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [jobListings, setJobListings] = useState([]);

  useEffect(() => {
    const savedJobs = localStorage.getItem('jobs');
    if (savedJobs) {
      setJobListings(JSON.parse(savedJobs));
    }
  }, []);

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    if (!searchTerm.trim()) {
      // If no search term, only apply filterType
      return jobListings.filter(job =>
        filterType === 'all' || job.type?.toLowerCase() === filterType.toLowerCase()
      );
    }
    // If searchTerm is present, apply both search and filter
    return jobListings.filter(job => {
      const matchesSearch =
        job.objective?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.organizations?.[0]?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job.place?.location?.[0]?.id?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        (job.tagline?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        (job.skills?.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase())) ?? false);

      const matchesFilter = filterType === 'all' || job.type?.toLowerCase() === filterType.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterType, jobListings]);

  const sortedJobs = useMemo(() => {
    const sorted = [...filteredJobs].sort((a, b) => {
      switch (sortBy) {
        case 'salary': {
          // Sort by max salary if available, otherwise min salary, descending
          const aSalary = a.compensation?.data?.maxAmount ?? a.compensation?.data?.minAmount ?? 0;
          const bSalary = b.compensation?.data?.maxAmount ?? b.compensation?.data?.minAmount ?? 0;
          return bSalary - aSalary;
        }
        case 'date': {
          // Sort by created date, descending
          const aDate = a.created ? new Date(a.created).getTime() : 0;
          const bDate = b.created ? new Date(b.created).getTime() : 0;
          return bDate - aDate;
        }
        case 'match': {
          // Sort by match score, descending
          const aMatch = a._meta?.scorer?.score ?? 0;
          const bMatch = b._meta?.scorer?.score ?? 0;
          return bMatch - aMatch;
        }
        default: {
          // Default to relevance (match score)
          const aMatch = a._meta?.scorer?.score ?? 0;
          const bMatch = b._meta?.scorer?.score ?? 0;
          return bMatch - aMatch;
        }
      }
    });
    return sorted;
  }, [filteredJobs, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentJobs = sortedJobs.slice(startIndex, endIndex);

  // Handle page change with loading state
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || isLoading) return;
    
    setIsLoading(true);
    setCurrentPage(page);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      setIsLoading(false);
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  // Reset to first page when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: string) => {
    setFilterType(value);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" className="flex items-center space-x-2" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Search</span>
        </Button>
        {/* TalentHub Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div className="text-xl font-bold text-gray-900">
            Talent<span className="text-blue-600">Hub</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Opportunities</h1>
        <p className="text-gray-600">Discover your next career opportunity</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search jobs, companies, or locations..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="date">Date Posted</SelectItem>
            <SelectItem value="salary">Salary</SelectItem>
            <SelectItem value="match">Match %</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterType} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count and Pagination Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <p className="text-gray-600">
            {sortedJobs.length} opportunities found
            {sortedJobs.length > ITEMS_PER_PAGE && (
              <span className="ml-2 text-sm">
                (Showing {startIndex + 1}-{Math.min(endIndex, sortedJobs.length)} of {sortedJobs.length})
              </span>
            )}
          </p>
        </div>
        
        {totalPages > 1 && (
          <div className="hidden sm:block">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>

      {/* Job Listings */}
      <div className="space-y-6 mb-8">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <JobCardSkeleton key={index} />
          ))
        ) : currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={job.organizations?.[0]?.picture || ''} alt={job.organizations?.[0]?.name || 'Company'} />
                      <AvatarFallback>
                        {(job.organizations?.[0]?.name || 'C')[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h2 className="text-xl font-bold text-gray-900">{job.objective}</h2>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {Math.round((job._meta?.scorer?.score ?? 0) * 100)}% match
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600 mb-2">
                        <Building className="h-4 w-4" />
                        <span className="font-medium">{job.organizations?.[0]?.name}</span>
                        <Badge variant="secondary" className="ml-2">{job.type?.replace(/-/g, ' ')}</Badge>
                        <Badge variant="secondary" className="ml-2">{job.opportunity}</Badge>
                      </div>
                      <p className="text-blue-600 font-medium italic mb-2">{job.tagline}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.place?.remote || job.remote ? 'Remote' : (job.place?.location?.[0]?.id || 'On-site')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            Posted {job.created ? new Date(job.created).toLocaleDateString() : 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>
                            {job.compensation?.visible && job.compensation?.data
                              ? `${job.compensation.data.currency} $${job.compensation.data.minAmount?.toLocaleString()} - $${job.compensation.data.maxAmount?.toLocaleString()} / ${job.compensation.data.periodicity}`
                              : 'Not disclosed'}
                          </span>
                        </div>
                        {job.deadline && (
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>Application closes on {new Date(job.deadline).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">About the Role</h3>
                      <p className="text-gray-700">{job.tagline}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Benefits</h3>
                      <div className="flex flex-wrap gap-2">
                        {job.remote && <Badge variant="secondary">Remote</Badge>}
                        {job.type && <Badge variant="secondary">{job.type.replace(/-/g, ' ')}</Badge>}
                        {job.opportunity && <Badge variant="secondary">{job.opportunity}</Badge>}
                      </div>
                    </div>
                    {job.members && job.members.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Top Members</h3>
                        <div className="flex flex-col gap-2">
                          {job.members.slice(0, 5).map(
                            (member: { subjectId: string; picture?: string; name: string; professionalHeadline?: string }) => (
                              <div key={member.subjectId} className="flex items-center gap-2">
                                {member.picture && (
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={member.picture} alt={member.name} />
                                    <AvatarFallback>{member.name?.[0] ?? ''}</AvatarFallback>
                                  </Avatar>
                                )}
                                <span className="font-medium">{member.name}</span>
                                <span className="text-xs text-gray-500">{member.professionalHeadline}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Required Skills</h3>
                      <div className="space-y-2">
                        {job.skills && job.skills.length > 0 ? (
                          job.skills.slice(0, 5).map(
                            (
                              skill: { name: string; proficiency: string },
                              idx: number
                            ) => (
                              <div className="flex items-center justify-between" key={idx}>
                                <span className="text-sm text-gray-700">{skill?.name ?? ''}</span>
                                <Badge variant="outline" className="text-xs">{skill?.proficiency?.toUpperCase() ?? ''}</Badge>
                              </div>
                            )
                          )
                        ) : (
                          <span className="text-sm text-gray-500">No skills listed</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {job.type && (
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{job.type.replace(/-/g, ' ')}</span>
                          </li>
                        )}
                        {job.remote && (
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Remote</span>
                          </li>
                        )}
                        {job.opportunity && (
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{job.opportunity.charAt(0).toUpperCase() + job.opportunity.slice(1)} opportunity</span>
                          </li>
                        )}
                        {/* Fallback if no requirements */}
                        {!job.type && !job.remote && !job.opportunity && (
                          <li className="flex items-start space-x-2">
                            <span>No requirements listed</span>
                          </li>
                        )}
                      </ul>
                    </div>
                    {job.compensation?.data?.negotiable && (
                      <div>
                        <Badge variant="outline" className="text-xs">Salary negotiable</Badge>
                      </div>
                    )}
                  </div>
                </div>              
                <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-200">
                  {/* <Button className="flex-1">Apply Now</Button> */}
                  <a href={`/job/${job.id}`} className="flex-1 rounded-md inline-flex bg-primary hover:bg-primary/95 text-primary-foreground justify-center font-medium py-2 px-4">Learn More</a>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      {/* Bottom Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
}