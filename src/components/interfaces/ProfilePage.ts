interface Organization {
    id?: string;
    name: string;
  }

  interface Job {
    id?: string;
    name: string;
    fromMonth?: string;
    fromYear?: number;
    toMonth?: string;
    toYear?: number;
    organizations?: Organization[];
    additionalInfo?: string;
    rank?: number;
  }

  interface ProjectMediaItem {
    address?: string;
  }

  interface ProjectMedia {
    mediaItems?: ProjectMediaItem[];
  }

  interface Project {
    id?: string;
    name: string;
    additionalInfo?: string;
    organizations?: Organization[];
    media?: ProjectMedia[];
    rank?: number;
  }

  interface PublicationMediaItem {
    address?: string;
  }

  interface PublicationMedia {
    mediaItems?: PublicationMediaItem[];
  }

  interface Publication {
    id?: string;
    name: string;
    additionalInfo?: string;
    media?: PublicationMedia[];
  }

  interface Education {
    id?: string;
    name: string;
    organizations?: Organization[];
    fromMonth?: string;
    fromYear?: number;
    toMonth?: string;
    toYear?: number;
  }

  interface Link {
    id?: string;
    name: string;
    address: string;
  }

  interface Language {
    code?: string;
    language: string;
    fluency: string;
  }

  interface Strength {
    id?: string;
    name: string;
    proficiency: string;
  }

  interface Person {
    name?: string;
    professionalHeadline?: string;
    summaryOfBio?: string;
    verified?: boolean;
    email?: string;
    phone?: string;
    picture?: string;
    pictureThumbnail?: string;
    location?: {
      shortName?: string;
      name?: string;
    };
    links?: Link[];
  }

  interface Profile {
    person?: Person;
    strengths?: Strength[];
    jobs?: Job[];
    projects?: Project[];
    publications?: Publication[];
    education?: Education[];
    languages?: Language[];
  }

  export type { Organization, Job, Project, Publication, Education, Link, Language, Strength, Person, Profile };