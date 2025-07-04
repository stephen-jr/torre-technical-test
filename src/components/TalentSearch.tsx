import { useState, useEffect, useRef } from 'react';
import { Search, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Talent = {
  ggId: number | string;
  name: string;
  username: string;
  professionalHeadline: string;
  imageUrl: string;
  verified: boolean;
};

async function fetchTalentsFromStream(searchTerm: string): Promise<Talent[]> {
  const apiUrl = 'https://torre.ai/api/entities/_searchStream';
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query: searchTerm,
        identityType: "person",
        limit: 20,
        meta: true
    }),
  });
  if (!response.body) throw new Error("No response body");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let { value, done } = await reader.read();
  let buffer = '';
  const talents: Talent[] = [];
  let idCounter = 1;

  while (!done) {
    buffer += decoder.decode(value, { stream: true });
    let lines = buffer.split('\n');
    buffer = lines.pop() || '';
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const profile = JSON.parse(line);
        talents.push({
          ggId: profile.ggId || idCounter++,
          name: profile.name,
          professionalHeadline: profile.professionalHeadline || '',
          imageUrl: profile.imageUrl || '', // Assuming imageUrl is optional
          username: profile.username || '', // Assuming username is optional
          verified: profile.verified || false
        });
      } catch (e) {
        // Ignore malformed lines
      }
    }
    ({ value, done } = await reader.read());
  }
  // Handle any remaining buffer
  if (buffer.trim()) {
    try {
      const profile = JSON.parse(buffer);
      talents.push({
        ggId: profile.ggId || idCounter++,
        name: profile.name,
        username: profile.username,
        professionalHeadline: profile.professionalHeadline,
        imageUrl: profile.imageUrl,
        verified: profile.verified
      });
    } catch (e) {}
  }
  return talents;
}

const STREAM_THRESHOLD = 5;

export default function TalentSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [defaultTalents, setDefaultTalents] = useState<Talent[]>([]);
  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(false);
  const lastSearchTerm = useRef<string>('');

  // Fetch default stream on mount
  useEffect(() => {
    setLoading(true);
    fetchTalentsFromStream(searchTerm)
      .then((data) => {
        setDefaultTalents(data);
        setTalents(data);
      })
      .finally(() => setLoading(false));
  }, []);

  // Handle search/filter logic
  useEffect(() => {
    if (!searchTerm) {
      setTalents(defaultTalents);
      return;
    }
    // Filter client-side first
    const filtered = defaultTalents.filter(talent =>
      talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talent.professionalHeadline.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTalents(filtered);

    // If results are less than threshold, fetch from API
    if (filtered.length < STREAM_THRESHOLD && searchTerm !== lastSearchTerm.current) {
      setLoading(true);
      lastSearchTerm.current = searchTerm;
      fetchTalentsFromStream(searchTerm)
        .then(setTalents)
        .finally(() => setLoading(false));
    }
  }, [searchTerm, defaultTalents]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          placeholder="Search for talent by name, role, or location..."
          className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 border-gray-200 transition-colors"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowResults(e.target.value.length > 0);
          }}
          onFocus={() => setShowResults(true)}
        />
      </div>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-2"></span>
          <span className="text-gray-500">Loading talents...</span>
        </div>
      )}
      {!loading && showResults && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden animate-in fade-in-0 slide-in-from-top-2">
          <div className="max-h-96 overflow-y-auto">
            {talents.length > 0 ? (
              talents.map((talent) => (
                <div
                  key={talent.ggId}
                  className="p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b last:border-b-0"
                >
                  <a href={`/profile/${talent.username}`}>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={talent.imageUrl } alt={talent.name} />
                        <AvatarFallback>{talent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900 truncate">{talent.name}</h3>
                          {talent.verified && (
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{talent.professionalHeadline}</p>
                
                      </div>
                    </div>
                  </a>
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