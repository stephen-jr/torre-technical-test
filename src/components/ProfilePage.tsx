import { useState } from 'react';
import { MapPin, Calendar, Mail, Phone, Globe, CheckCircle, ArrowLeft, ExternalLink, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const profileData = {
  name: "Sarah Chen",
  title: "Senior Frontend Developer",
  location: "San Francisco, CA",
  email: "sarah.chen@email.com",
  phone: "+1 (555) 123-4567",
  website: "sarahchen.dev",
  verified: true,
  profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
  bio: "Passionate frontend developer with 5+ years of experience building scalable web applications. Specialized in React, TypeScript, and modern web technologies.",
  skills: [
    { name: "React", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "Tailwind CSS", level: 88 },
    { name: "Node.js", level: 75 },
    { name: "GraphQL", level: 80 }
  ],
  experience: [
    {
      company: "TechCorp",
      position: "Senior Frontend Developer",
      period: "2022 - Present",
      description: "Led frontend development for enterprise SaaS platform, improving performance by 40% and user engagement by 25%."
    },
    {
      company: "StartupX",
      position: "Frontend Developer",
      period: "2020 - 2022",
      description: "Built responsive web applications using React and Redux, collaborated with design team on user experience improvements."
    },
    {
      company: "Digital Agency",
      position: "Junior Developer",
      period: "2019 - 2020",
      description: "Developed client websites using HTML, CSS, and JavaScript. Gained experience in modern web development practices."
    }
  ],
  projects: [
    {
      title: "E-commerce Platform",
      description: "Built a full-stack e-commerce solution with React and Node.js, handling 10k+ daily users.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "https://project1.com"
    },
    {
      title: "Task Management App",
      description: "Developed a collaborative task management application with real-time updates and team features.",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
      link: "https://project2.com"
    },
    {
      title: "Analytics Dashboard",
      description: "Created an interactive analytics dashboard with custom visualizations and data insights.",
      technologies: ["React", "D3.js", "Python", "FastAPI"],
      link: "https://project3.com"
    }
  ],
  recommendations: [
    {
      name: "John Smith",
      position: "Engineering Manager at TechCorp",
      text: "Sarah is an exceptional developer who consistently delivers high-quality work. Her attention to detail and collaborative approach make her a valuable team member."
    },
    {
      name: "Lisa Wang",
      position: "Product Designer at StartupX",
      text: "Working with Sarah was a pleasure. She brings technical expertise and creative problem-solving to every project. Highly recommend!"
    }
  ],
  jobMatches: [
    {
      title: "Senior React Developer",
      company: "InnovateAI",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      match: 95
    },
    {
      title: "Frontend Tech Lead",
      company: "CloudFirst",
      location: "Remote",
      salary: "$130k - $160k",
      match: 90
    },
    {
      title: "Full Stack Engineer",
      company: "DataFlow",
      location: "San Francisco, CA",
      salary: "$115k - $140k",
      match: 85
    }
  ]
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="outline" className="flex items-center space-x-2" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Search</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profileData.profileImage} alt={profileData.name} />
                  <AvatarFallback>{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                    {profileData.verified && (
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <p className="text-lg text-gray-600 mb-4">{profileData.title}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Globe className="h-4 w-4" />
                      <span>{profileData.website}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button>Connect</Button>
                  <Button variant="outline">Message</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bio */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileData.skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Experience</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {profileData.experience.map((exp, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-gray-200 last:border-l-0">
                  <div className="absolute -left-2 top-0 h-4 w-4 bg-blue-500 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <span className="text-sm text-gray-500">{exp.period}</span>
                    </div>
                    <p className="font-medium text-gray-700">{exp.company}</p>
                    <p className="text-gray-600">{exp.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {profileData.projects.map((project, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{project.title}</h3>
                      <ExternalLink className="h-4 w-4 text-gray-400 hover:text-blue-500 cursor-pointer" />
                    </div>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileData.recommendations.map((rec, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 mb-3 italic">"{rec.text}"</p>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{rec.name}</p>
                    <p className="text-gray-600">{rec.position}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Job Matches */}
          <Card>
            <CardHeader>
              <CardTitle>Job Matches</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileData.jobMatches.map((job, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{job.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {job.match}% match
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{job.company}</p>
                  <p className="text-xs text-gray-500 mb-2">{job.location}</p>
                  <p className="text-sm font-medium text-green-600">{job.salary}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{profileData.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{profileData.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{profileData.website}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}