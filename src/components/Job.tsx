import { useState } from 'react';
import { ArrowLeft, MapPin, Clock, DollarSign, Building, CheckCircle, Heart, Share2, Users, Calendar, Globe, Award, Star, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface Job {
  slug: string;
}

const opportunityData = {
  id: 1,
  title: "Senior Frontend Developer",
  company: "InnovateAI",
  logo: "https://images.pexels.com/photos/7092611/pexels-photo-7092611.jpeg?auto=compress&cs=tinysrgb&w=120",
  tagline: "Build the future of AI-powered applications that transform businesses",
  description: "We're looking for a talented Senior Frontend Developer to join our growing team and help build cutting-edge AI applications. You'll work on revolutionary products that will transform how businesses operate and make decisions in the digital age.",
  location: "San Francisco, CA",
  type: "Full-time",
  remote: "Hybrid (3 days in office)",
  salary: "$120,000 - $150,000",
  posted: "2 days ago",
  applicants: 47,
  benefits: [
    "Comprehensive Health Insurance (Medical, Dental, Vision)",
    "401(k) with 6% company match",
    "Unlimited PTO policy",
    "Remote work flexibility",
    "$3,000 annual learning budget",
    "Stock options with high growth potential",
    "Free gym membership and wellness programs",
    "Catered lunch 3x per week",
    "Top-tier equipment (MacBook Pro, monitors)",
    "Quarterly team retreats"
  ],
  uniquePerks: [
    "AI research collaboration opportunities",
    "Conference speaking opportunities",
    "Open source contribution time (20%)",
    "Innovation lab access"
  ],
  requiredSkills: [
    { category: "Frontend Frameworks", skills: ["React", "Next.js", "Vue.js"], level: "Advanced", required: true },
    { category: "Programming Languages", skills: ["TypeScript", "JavaScript ES6+"], level: "Expert", required: true },
    { category: "Styling & Design", skills: ["Tailwind CSS", "Styled Components", "CSS3"], level: "Advanced", required: true },
    { category: "State Management", skills: ["Redux", "Zustand", "Context API"], level: "Intermediate", required: true },
    { category: "Testing", skills: ["Jest", "React Testing Library", "Cypress"], level: "Intermediate", required: true }
  ],
  preferredSkills: [
    { category: "Backend Technologies", skills: ["Node.js", "GraphQL", "REST APIs"], level: "Intermediate", required: false },
    { category: "Cloud & DevOps", skills: ["AWS", "Docker", "CI/CD"], level: "Beginner", required: false },
    { category: "AI/ML Integration", skills: ["TensorFlow.js", "OpenAI API"], level: "Beginner", required: false },
    { category: "Mobile Development", skills: ["React Native", "Progressive Web Apps"], level: "Intermediate", required: false }
  ],
  experience: {
    years: "5+ years",
    details: "Minimum 5 years of professional frontend development experience with modern frameworks"
  },
  responsibilities: [
    "Lead frontend architecture decisions for AI-powered applications",
    "Collaborate with AI/ML engineers to integrate complex algorithms into user interfaces",
    "Mentor junior developers and conduct code reviews",
    "Optimize application performance and user experience",
    "Work closely with design team to implement pixel-perfect interfaces"
  ],
  companyInfo: {
    size: "50-100 employees",
    founded: "2019",
    funding: "Series B",
    industry: "Artificial Intelligence"
  }
};

const platformLogos = [
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "🔷" },
  { name: "Next.js", icon: "▲" },
  { name: "Tailwind", icon: "🎨" },
  { name: "AWS", icon: "☁️" },
  { name: "Docker", icon: "🐳" }
];

export default function OpportunityDetailsPage({ slug }: Job) {
  const [isApplying, setIsApplying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  const handleApply = () => {
    setIsApplying(true);
    
    setTimeout(() => {
      setIsApplying(false);
      toast({
        title: "Application Submitted!",
        description: `Your application for ${opportunityData.title} at ${opportunityData.company} has been sent successfully.`,
        variant: "default",
        duration: 6000,
      });
    }, 2000);
  };

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
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'expert': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header with Logo and Back Button */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="outline" className="flex items-center space-x-2" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Opportunities</span>
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

      {/* Header Section */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-start gap-6 mb-6">
                <Avatar className="h-[120px] w-[120px] rounded-xl">
                  <AvatarImage src={opportunityData.logo} alt={opportunityData.company} className="object-cover" />
                  <AvatarFallback className="text-2xl font-bold">{opportunityData.company[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontSize: '24px' }}>
                    {opportunityData.title}
                  </h1>
                  <div className="flex items-center space-x-2 mb-3">
                    <Building className="h-5 w-5 text-gray-500" />
                    <span className="text-lg font-semibold text-gray-700">{opportunityData.company}</span>
                    <Badge variant="outline" className="ml-2">
                      {opportunityData.companyInfo.industry}
                    </Badge>
                  </div>
                  <p className="text-blue-600 font-medium italic mb-4 text-lg">
                    {opportunityData.tagline}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {opportunityData.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{opportunityData.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>{opportunityData.remote}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Posted {opportunityData.posted}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{opportunityData.applicants} applicants</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3 lg:min-w-[200px]">
              <Button 
                onClick={handleApply}
                disabled={isApplying}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
              >
                {isApplying ? 'Applying...' : 'Apply Now'}
              </Button>
              <div className="flex space-x-2">
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
                <p className="text-2xl font-bold text-green-900">{opportunityData.salary}</p>
                <p className="text-sm text-green-700">Plus equity and performance bonuses</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Core Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {opportunityData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Unique Perks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {opportunityData.uniquePerks.map((perk, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
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
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Experience Required</h3>
                <p className="text-blue-900 font-medium">{opportunityData.experience.years}</p>
                <p className="text-sm text-blue-700">{opportunityData.experience.details}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Required Skills</h3>
                <div className="space-y-4">
                  {opportunityData.requiredSkills.map((skillGroup, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="font-medium text-gray-900">
                          {skillGroup.category}
                        </div>
                        <div className="md:col-span-1">
                          <div className="flex flex-wrap gap-1">
                            {skillGroup.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Badge className={`text-xs ${getLevelColor(skillGroup.level)}`}>
                            {skillGroup.level}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Preferred Skills (Nice to Have)</h3>
                <div className="space-y-4">
                  {opportunityData.preferredSkills.map((skillGroup, index) => (
                    <div key={index} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="font-medium text-gray-700">
                          {skillGroup.category}
                        </div>
                        <div className="md:col-span-1">
                          <div className="flex flex-wrap gap-1">
                            {skillGroup.skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Badge variant="outline" className={`text-xs ${getLevelColor(skillGroup.level)}`}>
                            {skillGroup.level}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle>Key Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {opportunityData.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Info */}
          <Card>
            <CardHeader>
              <CardTitle>About {opportunityData.company}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Company Size</span>
                  <span className="text-sm font-medium">{opportunityData.companyInfo.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Founded</span>
                  <span className="text-sm font-medium">{opportunityData.companyInfo.founded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Funding Stage</span>
                  <span className="text-sm font-medium">{opportunityData.companyInfo.funding}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Industry</span>
                  <span className="text-sm font-medium">{opportunityData.companyInfo.industry}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Application Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Your Match Score</span>
                    <span className="text-sm font-medium">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div className="text-xs text-gray-500">
                  Based on your skills and experience
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Applications</span>
                  <span className="text-sm font-medium">{opportunityData.applicants}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Posted</span>
                  <span className="text-sm font-medium">{opportunityData.posted}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tech Stack */}
          <Card>
            <CardHeader>
              <CardTitle>Tech Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {platformLogos.map((platform, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2 p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="text-2xl">{platform.icon}</div>
                    <span className="text-xs font-medium text-gray-700">{platform.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}