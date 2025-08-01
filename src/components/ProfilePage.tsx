import { useState, useEffect } from 'react';
import { MapPin, Mail, Phone, Globe, CheckCircle, ArrowLeft, ExternalLink, Award, Users, BookOpen, GraduationCap, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

import type { Job, Project, Publication, Education, Link, Language, Strength, Person } from '@/components/interfaces/ProfilePage';
import { ucwords } from '@/lib/fn';

interface ProfilePageProps {
  slug: string;
}

async function fetchProfileBySlug(slug: string) {
  const response = await fetch(`/api/torre/api/genome/bios/${slug}`);
  if (!response.ok) throw new Error('Profile not found');
  return await response.json();
}

export default function ProfilePage({ slug }: ProfilePageProps) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAllSkills, setShowAllSkills] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchProfileBySlug(slug)
      .then(setProfile)
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-80 z-50">
        <div className="flex flex-col items-center">
          <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></span>
          <span className="text-gray-500">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center py-16">
        <span className="text-2xl text-gray-400 mb-4">Profile not found</span>
        <Button variant="outline" onClick={() => window.history.back()}>Back to Search</Button>
      </div>
    );
  }

  // Helper functions for mapping API data
  const person: Person = profile.person || {};
  const strengths: Strength[] = profile.strengths || [];
  const jobs: Job[] = (profile.jobs || []).sort((a: { rank: any; }, b: { rank: any; }) => (b.rank ?? 0) - (a.rank ?? 0));
  const projects: Project[] = (profile.projects || []).sort((a: { rank: any; }, b: { rank: any; }) => (b.rank ?? 0) - (a.rank ?? 0));
  const publications: Publication[] = profile.publications || [];
  const education: Education[] = profile.education || [];
  const links: Link[] = person.links || [];
  const languages: Language[] = profile.languages || [];
  const location = person.location?.shortName || person.location?.name || '';
  const picture = person.picture || person.pictureThumbnail;
  const name = person.name || '';
  const headline = person.professionalHeadline || '';
  const summary = person.summaryOfBio || '';
  const verified = person.verified;
  const email = person.email || '';
  const phone = person.phone || '';
  const website = links.find((l: any) => l.name === 'website')?.address || '';
  const socialLinks = links.filter((l: any) => l.name !== 'website');

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
                  <AvatarImage src={picture} alt={name} />
                  <AvatarFallback>{name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
                    {verified && (
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <p className="text-lg text-gray-600 mb-2">{headline}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-2">
                    {location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{location}</span>
                      </div>
                    )}
                    {email && (
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{email}</span>
                      </div>
                    )}
                    {phone && (
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{phone}</span>
                      </div>
                    )}
                    {website && (
                      <div className="flex items-center space-x-1">
                        <Globe className="h-4 w-4" />
                        <a href={website} target="_blank" rel="noopener noreferrer" className="hover:underline">{website}</a>
                      </div>
                    )}
                  </div>
                  {/* Social Links */}
                  {socialLinks.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {socialLinks.map((link: any) => (
                        <a
                          key={link.id}
                          href={link.address}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-blue-600 hover:underline text-sm"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>{link.name}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About / Summary */}
          {summary && (
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{summary}</p>
              </CardContent>
            </Card>
          )}

          {/* Skills */}
            {strengths.length > 0 && (
            <Card>
              <CardHeader>
              <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
              {strengths.slice(0, strengths.length > 10 && !showAllSkills ? 10 : strengths.length).map((skill: any) => (
                <div key={skill.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{ ucwords(skill.name) }</span>
                  <span className="text-sm text-gray-500">{ ucwords(skill.proficiency) }</span>
                </div>
                {(skill.proficiency === 'expert' || skill.proficiency === 'proficient') && (
                  <Progress value={skill.proficiency === 'expert' ? 100 : 80} className="h-2" />
                )}
                </div>
              ))}
              {strengths.length > 10 && (
                <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAllSkills((prev: boolean) => !prev)}
                >
                  {showAllSkills ? 'View Less' : 'View More'}
                </Button>
                </div>
              )}
              </CardContent>
            </Card>
            )}

          {/* Experience / Jobs */}
          {jobs.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Experience</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {jobs.map((job: any, index: number) => (
                  <div key={job.id || index} className="relative pl-6 border-l-2 border-gray-200 last:border-l-0">
                    <div className="absolute -left-2 top-0 h-4 w-4 bg-blue-500 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <h3 className="font-semibold text-gray-900">{job.name}</h3>
                        <span className="text-sm text-gray-500">
                          {job.fromMonth} {job.fromYear}
                          {job.toMonth && job.toYear ? ` - ${job.toMonth} ${job.toYear}` : ''}
                        </span>
                      </div>
                      <p className="font-medium text-gray-700">{job.organizations?.map((org: any) => org.name).join(', ')}</p>
                      <p className="text-gray-600 whitespace-pre-line">{job.additionalInfo}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {projects.map((project: any, index: number) => (
                    <div key={project.id || index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{project.name}</h3>
                        {project.media && project.media.length > 0 && project.media[0].mediaItems && project.media[0].mediaItems[0]?.address && (
                          <a href={project.media[0].mediaItems[0].address} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 text-gray-400 hover:text-blue-500 cursor-pointer" />
                          </a>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{project.additionalInfo}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.organizations?.map((org: any) => (
                          <Badge key={org.id} variant="secondary" className="text-xs">
                            {org.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Publications */}
          {publications.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Publications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {publications.map((pub: any, idx: number) => (
                    <div key={pub.id || idx} className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900">{pub.name}</h3>
                      <p className="text-gray-600 mb-2">{pub.additionalInfo}</p>
                      {pub.media && pub.media.length > 0 && pub.media[0].mediaItems && pub.media[0].mediaItems[0]?.address && (
                        <a href={pub.media[0].mediaItems[0].address} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center space-x-1">
                          <ExternalLink className="h-4 w-4" />
                          <span>View Publication</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Education */}
          {education.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>Education</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {education.map((edu: any, idx: number) => (
                    <div key={edu.id || idx} className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900">{edu.name}</h3>
                      <p className="text-gray-600 mb-2">{edu.organizations?.map((org: any) => org.name).join(', ')}</p>
                      <span className="text-sm text-gray-500">
                        {edu.fromMonth} {edu.fromYear}
                        {edu.toMonth && edu.toYear ? ` - ${edu.toMonth} ${edu.toYear}` : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Languages className="h-5 w-5" />
                  <span>Languages</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang: any, idx: number) => (
                    <Badge key={lang.code || idx} variant="secondary" className="text-xs">
                      {lang.language} ({lang.fluency})
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {email && (
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{email}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{phone}</span>
                </div>
              )}
              {website && (
                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <a href={website} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:underline">{website}</a>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}