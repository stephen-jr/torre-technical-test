import { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Clock, DollarSign, Building, CheckCircle, Heart, Share2, Users, Globe, Award, Star, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';


import type { Job, TorreJob, Organization, Skill, Member, Place, CompensationData, Compensation, MetaScorer, Meta } from '@/components/interfaces/Job';

export default function Job({ slug }: Job) {
  const [isSaved, setIsSaved] = useState(false);
  const [job, setJob] = useState<TorreJob | any>({});
  const { toast } = useToast();


  useEffect(() => {
    const savedJob = localStorage.getItem(`jobs`);
    if (savedJob) {
      const parsedJob = JSON.parse(savedJob);
      setJob(parsedJob.find((j: any) => j.id === slug));
    }
  }, []);

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Job Removed" : "Job Saved!",
      description: isSaved ? "Job removed from your saved list." : "Job added to your saved list.",
      variant: "default",
      duration: 3000,
    });
  };

  const handleShare = () => {
    toast({
      title: "Link Copied!",
      description: "Job link has been copied to your clipboard.",
      variant: "default",
      duration: 3000,
    });
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'no-experience-interested': return 'bg-green-100 text-green-800 border-green-200';
      case 'novice': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'proficient': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'expert': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatProficiency = (proficiency: string) => {
    switch (proficiency.toLowerCase()) {
      case 'no-experience-interested': return 'No Experience (Interested)';
      case 'novice': return 'Novice';
      case 'proficient': return 'Proficient';
      case 'expert': return 'Expert';
      default: return 'Unknown';
    }
  }

  const formatType = (type: string) => { 
    switch (type) {
      case 'full-time-employment': return 'Full-Time';
      case 'flexible-jobs': return 'Flexible';
      case 'internships': return 'Internship';
      default: return 'Unknown';
    }
  }

  // Helper to format salary range
  const formatSalary = (comp?: any) => {
    if (!comp?.visible || !comp.data) return 'Not Disclosed';
    const { code, currency, minAmount, maxAmount, periodicity, negotiable } = comp.data;
    switch (code) {
      case 'to-be-agreed':
          return 'To Be Agreed';
      break;
      default:
        let range = `${currency} $${minAmount?.toString()} - $${maxAmount?.toString()} / ${periodicity}`;
        if (negotiable) range += ' (Negotiable)';
        return range;
      break;
    }
  };

  // Helper to get company info
  const getCompany = (job: any) => job.organizations?.[0] || {};

  // Helper to get match score
  const getMatchScore = (job: any) =>
    Math.round((job._meta?.scorer?.score ?? 0) * 100);

  // Render message if job is not loaded or not found
  if (!job || !job.id) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Job details not available</h2>
            <p className="text-gray-500">The job you are looking for could not be found.</p>
        </div>
      </div>
    );
  }

  const company = getCompany(job);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header with Logo and Back Button */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="outline" className="flex items-center space-x-2" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Opportunities</span>
        </Button>
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div className="text-xl font-bold text-gray-900">
            Talent<span className="text-blue-600">Hub</span>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-start gap-6 mb-6">
                <Avatar className="h-[120px] w-[120px] rounded-xl">
                  <AvatarImage src={company.picture} alt={company.name} className="object-cover" />
                  <AvatarFallback className="text-2xl font-bold">{company.name?.[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontSize: '24px' }}>
                    {job.objective}
                  </h1>
                  <div className="flex items-center space-x-2 mb-3">
                    <Building className="h-5 w-5 text-gray-500" />
                    <span className="text-lg font-semibold text-gray-700">{company.name}</span>
                    {company.theme && (
                      <Badge variant="outline" className="ml-2 capitalize">
                        {formatType(job.type)}
                      </Badge>
                    )}
                  </div>
                  <p className="text-blue-600 font-medium italic mb-4 text-lg">
                    {job.tagline}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {/* No explicit description, so show tagline or fallback */}
                    {job.tagline}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{job.place?.remote || job.remote ? 'Remote' : (job.place?.location?.[0] || 'On-site')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>{job.place?.anywhere ? 'Anywhere' : ''}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Posted {job.created ? new Date(job.created).toLocaleDateString() : 'N/A'}</span>
                </div>
                {job.deadline && (
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Apply by {new Date(job.deadline).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{company.size ? `${company.size} employees` : ''}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSave}
                  className={isSaved ? 'bg-red-50 border-red-200 text-red-600' : ''}
                >
                  <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Compensation Package */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span>Compensation & Benefits</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Salary Range</h3>
                <p className="text-2xl font-bold text-green-900">{formatSalary(job.compensation)}</p>
                {job.compensation?.data?.negotiable && (
                  <p className="text-sm text-green-700">Salary negotiable</p>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Core Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {job.remote && (
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Remote</span>
                    </div>
                  )}
                  {job.type && (
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{formatType(job.type)}</span>
                    </div>
                  )}
                  {job.opportunity && (
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{job.opportunity.charAt(0).toUpperCase() + job.opportunity.slice(1)}</span>
                    </div>
                  )}
                  {/* Add more if job.additionalCompensation */}
                </div>
              </div>
              {job.additionalCompensation && job.additionalCompensation.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Additional Compensation</h3>
                  <ul>
                    {job.additionalCompensation.map((item: any, idx: number) => (
                      <li key={idx} className="text-sm text-gray-700 capitalize">{item.toString()}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Skills & Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-purple-600" />
                <span>Skills & Requirements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Required Skills</h3>
                <div className="space-y-4">
                  {job.skills && job.skills.length > 0 ? (
                    job.skills.map((skill: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                        <span className="font-medium text-gray-900">{skill.name}</span>
                        <Badge className={`text-xs capitalize hover:text-white ${getLevelColor(skill.proficiency)}`}>{formatProficiency(skill.proficiency)}</Badge>
                      </div>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No skills listed</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Info */}
          <Card>
            <CardHeader>
              <CardTitle>About {company.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Company Size</span>
                  <span className="text-sm font-medium">{company.size || 'N/A'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Your Match Score</span>
                    <span className="text-sm font-medium">{getMatchScore(job)}%</span>
                  </div>
                  <Progress value={getMatchScore(job)} className="h-2" />
                </div>
                <div className="text-xs text-gray-500">
                  Based on current user skills and experience
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="text-sm font-medium capitalize">{job.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Posted</span>
                  <span className="text-sm font-medium">{job.created ? new Date(job.created).toLocaleDateString() : 'N/A'}</span>
                </div>
                {job.deadline && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Deadline</span>
                    <span className="text-sm font-medium">{new Date(job.deadline).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          {/* Members/Contacts */}
          {job.members && job.members.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {job.members.map((member: any) => (
                  <div key={member.subjectId} className="flex items-center gap-2 my-3">
                    {member.picture && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.picture} alt={member.name} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    <span className="font-medium">{member.name}</span>
                    <span className="text-xs text-gray-500">{member.professionalHeadline}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
        </div>
      </div>
  );
}