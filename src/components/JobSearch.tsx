import { useState } from 'react';
import { Search, MapPin, DollarSign, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

const jobTypes = [
  { id: 'full-time', label: 'Full-time' },
  { id: 'flexible', label: 'Flexible' },
  { id: 'internship', label: 'Internship' },
];

export default function JobSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isRemote, setIsRemote] = useState(false);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [salaryRange, setSalaryRange] = useState([50000, 150000]);
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');

  const handleJobTypeToggle = (jobTypeId: string) => {
    setSelectedJobTypes(prev => 
      prev.includes(jobTypeId) 
        ? prev.filter(id => id !== jobTypeId)
        : [...prev, jobTypeId]
    );
  };

  const handleSkillAdd = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills(prev => [...prev, skill]);
      setCurrentSkill('');
    }
  };

  const handleSkillRemove = (skill: string) => {
    setSkills(prev => prev.filter(s => s !== skill));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSkillAdd(currentSkill);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          placeholder="Search jobs by title, company, or keywords..."
          className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Remote Work Toggle */}
          <div className="space-y-2">
            <Label htmlFor="remote-toggle" className="text-sm font-medium text-gray-700">
              Remote Work
            </Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="remote-toggle"
                checked={isRemote}
                onCheckedChange={setIsRemote}
              />
              <Label htmlFor="remote-toggle" className="text-sm text-gray-600">
                Include remote opportunities
              </Label>
            </div>
          </div>

          {/* Job Type Multi-select */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Job Type</Label>
            <div className="space-y-2">
              {jobTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={type.id}
                    checked={selectedJobTypes.includes(type.id)}
                    onCheckedChange={() => handleJobTypeToggle(type.id)}
                  />
                  <Label htmlFor={type.id} className="text-sm text-gray-600">
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Enter city or region..."
                className="pl-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Salary Range */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Salary Range: ${salaryRange[0].toLocaleString()} - ${salaryRange[1].toLocaleString()}
            </Label>
            <div className="px-2">
              <Slider
                value={salaryRange}
                onValueChange={setSalaryRange}
                max={200000}
                min={30000}
                step={5000}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Skills Tags */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Skills</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="cursor-pointer hover:bg-red-100 hover:text-red-800 transition-colors"
                onClick={() => handleSkillRemove(skill)}
              >
                {skill} ×
              </Badge>
            ))}
          </div>
          <Input
            placeholder="Add skills (press Enter to add)..."
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>

        <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg transition-colors">
          Search Jobs
        </Button>
      </div>
    </div>
  );
}