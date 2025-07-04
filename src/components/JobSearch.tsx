import { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider';

const ITEMS_PER_PAGE = 10;

const jobTypes = [
  { id: 'none', label: '(None)' },
  { id: 'full-time-employment', label: 'Full-time' },
  { id: 'flexible-jobs', label: 'Flexible' },
  { id: 'internships', label: 'Internship' },
];

const periodicityOptions = [
  { value: 'hourly', label: 'Hourly' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
  { value: 'project', label: 'Per Project' }
];

export default function JobSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isRemote, setIsRemote] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState<string>('');
  const [selectedPeriodicity, setSelectedPeriodicity] = useState('hourly');
  const [isClosed, setIsClosed] = useState(false);
  
  const [salaryRange, setSalaryRange] = useState([0, 150000]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedQuery = localStorage.getItem('query');
    if (savedQuery) {
      const query = JSON.parse(savedQuery);
      setSearchTerm(query.searchTerm || '');
      setIsRemote(query.isRemote || false);
      setSelectedJobType(query.selectedJobType || '');
      setSelectedPeriodicity(query.selectedPeriodicity || 'hourly');
      setIsClosed(query.isClosed || false);
      setSalaryRange(query.salaryRange || [0, 150000]);
    }
  }, []);


  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const postData = { and:[] };
    if (searchTerm) postData.and.push({ keywords: { term: searchTerm, locale: "en" } });
    if (isRemote) postData.and.push({ remote: {term : isRemote } });
    postData.and.push({ status: { code: !isClosed ? "open" : "closed" } });
    postData.and.push({ boosted: "popularity"});
    postData.and.push({ compensationRange: { minAmount: salaryRange[0], maxAmount: salaryRange[1], currency: "USD", periodicity: selectedPeriodicity } });
    if (selectedJobType && selectedJobType !== 'none') {
      postData.and.push({ type: { code: selectedJobType } });
    }
    try {
      const response = await fetch('https://search.torre.co/opportunities/_search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Periodicity': selectedPeriodicity, 'size': ITEMS_PER_PAGE.toString(),  },
        body: JSON.stringify(postData),
      });
      const jobsData = await response.json();
      if (!response.ok) {
        throw new Error(jobsData.message || 'Failed to fetch jobs');
      }
      localStorage.setItem('query', JSON.stringify({
        searchTerm, isRemote, selectedJobType, selectedPeriodicity, isClosed, salaryRange
      }));
      localStorage.setItem('jobs', jobsData.results ? JSON.stringify(jobsData.results) : '[]');
      localStorage.setItem('totalJobs', jobsData.total ? jobsData.total.toString() : '0');
      localStorage.setItem('pagination', jobsData.pagination ? JSON.stringify(jobsData.pagination) : '{}');
      window.location.href = '/opportunities';
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-xl shadow-md">
      {/* <h2 className="text-2xl font-bold mb-4">Job Search</h2>
      <p className="text-gray-600 mb-6">Find your next opportunity with Torre.</p> */}
      <form className="space-y-6" onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search jobs by title, company, or keywords..."
            className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 border-gray-200 transition-colors"
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
          
            {/* Closed Work Toggle */}
            <div className="space-y-2">
              <Label htmlFor="closed-toggle" className="text-sm font-medium text-gray-700">
                Closed Work
              </Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="closed-toggle"
                  checked={isClosed}
                  onCheckedChange={setIsClosed}
                />
                <Label htmlFor="closed-toggle" className="text-sm text-gray-600">
                  Include closed opportunities
                </Label>
              </div>
            </div>

              {/* Job Type Select */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Job Type</Label>
                <Select
                  value={selectedJobType ?? ''}
                  onValueChange={val => setSelectedJobType(val)}
                >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.label}
                  </SelectItem>
                  ))}
                </SelectContent>
                </Select>
              </div>

              {/* Periodicity Type Multi-select */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Periodicity</Label>
                <div>
                  <RadioGroup
                    value={selectedPeriodicity}
                    onValueChange={setSelectedPeriodicity}
                    className="grid grid-cols-2 gap-2"
                  >
                  {periodicityOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option.value}
                      id={`periodicity-${option.value}`}
                    />
                    <Label htmlFor={`periodicity-${option.value}`} className="text-sm text-gray-600">
                      {option.label}
                    </Label>
                    </div>
                  ))}
                  </RadioGroup>
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
                  min={0}
                  step={30}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-4">
            <Button
              className="full md:w-auto bg-primary hover:bg-blue-950 text-white px-8 py-2 rounded-lg transition-colors"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search Jobs'}
            </Button>
          </div>
        </div>
      </form>  
    </div>);
}