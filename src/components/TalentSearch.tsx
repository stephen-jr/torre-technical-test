import { useState } from 'react';
import { Search, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const mockTalents = [
  {
    id: 1,
    name: "Sarah Chen",
    headline: "Senior Frontend Developer",
    location: "San Francisco, CA",
    experience: "5+ years",
    profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    verified: true,
    skills: ["React", "TypeScript", "Next.js"]
  },
  {
    id: 2,
    name: "Marcus Johnson",
    headline: "Full Stack Engineer",
    location: "New York, NY",
    experience: "7+ years",
    profileImage: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    verified: true,
    skills: ["Node.js", "Python", "AWS"]
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    headline: "UX/UI Designer",
    location: "Austin, TX",
    experience: "4+ years",
    profileImage: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    verified: false,
    skills: ["Figma", "Adobe XD", "Prototyping"]
  },
  {
    id: 4,
    name: "David Kim",
    headline: "DevOps Engineer",
    location: "Seattle, WA",
    experience: "6+ years",
    profileImage: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
    verified: true,
    skills: ["Kubernetes", "Docker", "Terraform"]
  }
];

export default function TalentSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredTalents = mockTalents.filter(talent =>
    talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    talent.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
    talent.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          placeholder="Search for talent by name, role, or location..."
          className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowResults(e.target.value.length > 0);
          }}
          onFocus={() => setShowResults(searchTerm.length > 0)}
        />
      </div>

      {showResults && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden animate-in fade-in-0 slide-in-from-top-2">
          <div className="max-h-96 overflow-y-auto">
            {filteredTalents.length > 0 ? (
              filteredTalents.map((talent) => (
                <div
                  key={talent.id}
                  className="p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b last:border-b-0"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={talent.profileImage} alt={talent.name} />
                      <AvatarFallback>{talent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900 truncate">{talent.name}</h3>
                        {talent.verified && (
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">{talent.headline}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <MapPin className="h-3 w-3" />
                          <span>{talent.location}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{talent.experience}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {talent.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No talent found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}