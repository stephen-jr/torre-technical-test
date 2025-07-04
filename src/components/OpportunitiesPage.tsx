import { useState } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, ArrowLeft, Building, CheckCircle, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const jobListings = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "InnovateAI",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $150k",
    posted: "2 days ago",
    logo: "https://images.pexels.com/photos/7092611/pexels-photo-7092611.jpeg?auto=compress&cs=tinysrgb&w=100",
    tagline: "Build the future of AI-powered applications",
    description: "We're looking for a talented Senior Frontend Developer to join our growing team and help build cutting-edge AI applications that will transform how businesses operate.",
    benefits: ["Health Insurance", "401k Match", "Flexible PTO", "Remote Work"],
    skills: [
      { name: "React", level: "Expert" },
      { name: "TypeScript", level: "Advanced" },
      { name: "Next.js", level: "Intermediate" },
      { name: "GraphQL", level: "Intermediate" }
    ],
    requirements: [
      "5+ years of React development experience",
      "Strong TypeScript skills",
      "Experience with modern frontend tooling",
      "Excellent communication skills"
    ],
    match: 95
  },
  {
    id: 2,
    title: "Frontend Tech Lead",
    company: "CloudFirst",
    location: "Remote",
    type: "Full-time",
    salary: "$130k - $160k",
    posted: "1 week ago",
    logo: "https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=100",
    tagline: "Lead our frontend architecture and mentor the next generation",
    description: "Join our remote-first team as a Frontend Tech Lead. You'll be responsible for technical direction, mentoring junior developers, and building scalable frontend solutions.",
    benefits: ["Remote Work", "Health Insurance", "Learning Budget", "Equity"],
    skills: [
      { name: "React", level: "Expert" },
      { name: "Vue.js", level: "Advanced" },
      { name: "Leadership", level: "Advanced" },
      { name: "Architecture", level: "Expert" }
    ],
    requirements: [
      "7+ years of frontend development",
      "3+ years of leadership experience",
      "Strong system design skills",
      "Experience with multiple frameworks"
    ],
    match: 90
  },
  {
    id: 3,
    title: "Full Stack Engineer",
    company: "DataFlow",
    location: "New York, NY",
    type: "Full-time",
    salary: "$115k - $140k",
    posted: "3 days ago",
    logo: "https://images.pexels.com/photos/3861976/pexels-photo-3861976.jpeg?auto=compress&cs=tinysrgb&w=100",
    tagline: "Build data-driven applications that scale globally",
    description: "We're seeking a Full Stack Engineer to work on our data analytics platform. You'll build features that help companies make sense of their data and drive business decisions.",
    benefits: ["Health Insurance", "Stock Options", "Gym Membership", "Catered Lunch"],
    skills: [
      { name: "React", level: "Advanced" },
      { name: "Node.js", level: "Expert" },
      { name: "PostgreSQL", level: "Advanced" },
      { name: "AWS", level: "Intermediate" }
    ],
    requirements: [
      "4+ years of full-stack development",
      "Experience with data visualization",
      "Strong backend development skills",
      "Database design experience"
    ],
    match: 85
  },
  {
    id: 4,
    title: "React Developer",
    company: "StartupX",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$90k - $115k",
    posted: "5 days ago",
    logo: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100",
    tagline: "Join our fast-growing startup and shape the product",
    description: "Be part of our early-stage team and help build a product that will revolutionize the industry. You'll have significant impact on both technical and product decisions.",
    benefits: ["Equity", "Health Insurance", "Flexible Hours", "Learning Budget"],
    skills: [
      { name: "React", level: "Advanced" },
      { name: "JavaScript", level: "Expert" },
      { name: "CSS", level: "Advanced" },
      { name: "REST APIs", level: "Intermediate" }
    ],
    requirements: [
      "3+ years of React development",
      "Startup experience preferred",
      "Strong problem-solving skills",
      "Ability to work in fast-paced environment"
    ],
    match: 80
  },
  {
    id: 5,
    title: "Senior UI/UX Developer",
    company: "DesignCorp",
    location: "Los Angeles, CA",
    type: "Full-time",
    salary: "$110k - $135k",
    posted: "1 day ago",
    logo: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100",
    tagline: "Bridge the gap between design and development",
    description: "We're looking for a developer who understands both design principles and modern frontend technologies. You'll work closely with our design team to create pixel-perfect experiences.",
    benefits: ["Design Tools Budget", "Health Insurance", "Creative Freedom", "Conferences"],
    skills: [
      { name: "React", level: "Advanced" },
      { name: "Figma", level: "Expert" },
      { name: "CSS", level: "Expert" },
      { name: "Animation", level: "Advanced" }
    ],
    requirements: [
      "5+ years of frontend development",
      "Strong design sensibility",
      "Experience with design tools",
      "Animation and interaction expertise"
    ],
    match: 75
  },
  {
    id: 6,
    title: "Frontend Developer Intern",
    company: "TechCorp",
    location: "Remote",
    type: "Internship",
    salary: "$25/hour",
    posted: "1 week ago",
    logo: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=100",
    tagline: "Learn from industry experts and build real products",
    description: "Join our 12-week internship program and gain hands-on experience building production applications. You'll be mentored by senior developers and work on meaningful projects.",
    benefits: ["Mentorship", "Learning Resources", "Networking", "Full-time Potential"],
    skills: [
      { name: "JavaScript", level: "Beginner" },
      { name: "React", level: "Beginner" },
      { name: "HTML/CSS", level: "Intermediate" },
      { name: "Git", level: "Beginner" }
    ],
    requirements: [
      "Computer Science student or bootcamp graduate",
      "Basic JavaScript and React knowledge",
      "Eagerness to learn and grow",
      "Strong communication skills"
    ],
    match: 70
  }
];

export default function OpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [filterType, setFilterType] = useState('all');

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || job.type.toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'salary':
        return parseInt(b.salary.split('$')[1]) - parseInt(a.salary.split('$')[1]);
      case 'date':
        return new Date(b.posted).getTime() - new Date(a.posted).getTime();
      case 'match':
        return b.match - a.match;
      default:
        return b.match - a.match;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="outline" className="flex items-center space-x-2" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Search</span>
        </Button>
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
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
        <Select value={filterType} onValueChange={setFilterType}>
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

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">{sortedJobs.length} opportunities found</p>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {sortedJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={job.logo} alt={job.company} />
                    <AvatarFallback>{job.company[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {job.match}% match
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <Building className="h-4 w-4" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                    <p className="text-blue-600 font-medium italic mb-2">{job.tagline}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{job.posted}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
                        <span>{job.salary}</span>
                      </div>
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
                    <p className="text-gray-700">{job.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Benefits</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.benefits.map((benefit) => (
                        <Badge key={benefit} variant="secondary">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Required Skills</h3>
                    <div className="space-y-2">
                      {job.skills.map((skill) => (
                        <div key={skill.name} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{skill.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {skill.level}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-200">
                <Button className="flex-1">Apply Now</Button>
                <Button variant="outline" className="flex-1">Learn More</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}