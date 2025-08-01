interface Organization {
  id: number;
  hashedId: string;
  name: string;
  status: string;
  size: number;
  publicId: string;
  picture: string;
  theme: string;
}

interface Skill {
  name: string;
  experience: string;
  proficiency: string;
}

interface Member {
  subjectId: string;
  name: string;
  username: string;
  professionalHeadline: string;
  theme: string | null;
  picture: string | null;
  member: boolean;
  manager: boolean;
  poster: boolean;
  weight: number;
}

interface Place {
  remote: boolean;
  anywhere: boolean;
  timezone: boolean | null;
  location: string[];
}

interface CompensationData {
  code: string;
  currency: string;
  minAmount: number;
  minHourlyUSD: number;
  maxAmount: number;
  maxHourlyUSD: number;
  periodicity: string;
  negotiable: boolean;
}

interface Compensation {
  data: CompensationData;
  visible: boolean;
}

interface MetaScorer {
  score: number;
}

interface Meta {
  scorer?: MetaScorer;
}

export interface TorreJob {
  id: string;
  objective: string;
  slug: string;
  tagline: string;
  theme: string;
  type: string;
  opportunity: string;
  organizations: Organization[];
  locations: string[];
  timezones: string[] | null;
  remote: boolean;
  external: boolean;
  deadline: string;
  created: string;
  status: string;
  commitment: string;
  compensation: Compensation;
  skills: Skill[];
  members: Member[];
  place: Place;
  questions: any[];
  context: any;
  additionalCompensation: any[];
  additionalCompensationDetails: any;
  _meta?: Meta;
  videoUrl?: string | null;
  serviceTypes?: string[];
  quickApply?: boolean;
}

interface Job {
  slug: string;
}

export type { Organization, Skill, Member, Place, CompensationData, Compensation, MetaScorer, Meta, Job };