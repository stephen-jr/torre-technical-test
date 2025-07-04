import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CJGhlimu.mjs';
import 'kleur/colors';
import { c as cn, B as Button, A as Avatar, a as AvatarImage, b as AvatarFallback, $ as $$Layout } from '../chunks/avatar_DtijBomb.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, MoreHorizontal, ChevronRight, ArrowLeft, Building2, Search, Building, MapPin, Clock, DollarSign, Heart, Share2, CheckCircle } from 'lucide-react';
import { C as Card, b as CardHeader, B as Badge, a as CardContent } from '../chunks/badge_CwqePQLe.mjs';
import { I as Input, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from '../chunks/select_CeyxKUV6.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

function Skeleton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("animate-pulse rounded-md bg-muted", className),
      ...props
    }
  );
}

function Pagination({ currentPage, totalPages, onPageChange, isLoading = false }) {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }
    rangeWithDots.push(...range);
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }
    return rangeWithDots;
  };
  const visiblePages = getVisiblePages();
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => onPageChange(currentPage - 1),
          disabled: currentPage === 1 || isLoading,
          className: "flex items-center space-x-1",
          "aria-label": "Go to previous page",
          children: [
            /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Previous" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-1", children: visiblePages.map((page, index) => /* @__PURE__ */ jsx("div", { children: page === "..." ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-8 h-8", children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4 text-gray-400" }) }) : /* @__PURE__ */ jsx(
        Button,
        {
          variant: currentPage === page ? "default" : "outline",
          size: "sm",
          onClick: () => onPageChange(page),
          disabled: isLoading,
          className: `w-8 h-8 p-0 ${currentPage === page ? "bg-blue-600 text-white hover:bg-blue-700" : "hover:bg-gray-50"}`,
          "aria-label": `Go to page ${page}`,
          "aria-current": currentPage === page ? "page" : void 0,
          children: page
        }
      ) }, index)) }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => onPageChange(currentPage + 1),
          disabled: currentPage === totalPages || isLoading,
          className: "flex items-center space-x-1",
          "aria-label": "Go to next page",
          children: [
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Next" }),
            /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600", children: [
      "Page ",
      currentPage,
      " of ",
      totalPages
    ] })
  ] });
}

const ITEMS_PER_PAGE = 15;
function JobCardSkeleton() {
  return /* @__PURE__ */ jsxs(Card, { className: "animate-pulse", children: [
    /* @__PURE__ */ jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4 flex-1", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-12 w-12 rounded-full" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-3/4" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-2/3" }),
          /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
            /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-8" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-8" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-5/6" }),
      /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-16" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-16" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-16" })
      ] })
    ] }) })
  ] });
}
function OpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [jobListings, setJobListings] = useState([]);
  useEffect(() => {
    const savedJobs = localStorage.getItem("jobs");
    if (savedJobs) {
      setJobListings(JSON.parse(savedJobs));
    }
  }, []);
  const filteredJobs = useMemo(() => {
    if (!searchTerm.trim()) {
      return jobListings.filter(
        (job) => filterType === "all" || job.type?.toLowerCase() === filterType.toLowerCase()
      );
    }
    return jobListings.filter((job) => {
      const matchesSearch = job.objective?.toLowerCase().includes(searchTerm.toLowerCase()) || job.organizations?.[0]?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || (job.place?.location?.[0]?.id?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) || (job.tagline?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) || (job.skills?.some((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase())) ?? false);
      const matchesFilter = filterType === "all" || job.type?.toLowerCase() === filterType.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterType, jobListings]);
  const sortedJobs = useMemo(() => {
    const sorted = [...filteredJobs].sort((a, b) => {
      switch (sortBy) {
        case "salary": {
          const aSalary = a.compensation?.data?.maxAmount ?? a.compensation?.data?.minAmount ?? 0;
          const bSalary = b.compensation?.data?.maxAmount ?? b.compensation?.data?.minAmount ?? 0;
          return bSalary - aSalary;
        }
        case "date": {
          const aDate = a.created ? new Date(a.created).getTime() : 0;
          const bDate = b.created ? new Date(b.created).getTime() : 0;
          return bDate - aDate;
        }
        case "match": {
          const aMatch = a._meta?.scorer?.score ?? 0;
          const bMatch = b._meta?.scorer?.score ?? 0;
          return bMatch - aMatch;
        }
        default: {
          const aMatch = a._meta?.scorer?.score ?? 0;
          const bMatch = b._meta?.scorer?.score ?? 0;
          return bMatch - aMatch;
        }
      }
    });
    return sorted;
  }, [filteredJobs, sortBy]);
  const totalPages = Math.ceil(sortedJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentJobs = sortedJobs.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || isLoading) return;
    setIsLoading(true);
    setCurrentPage(page);
    setTimeout(() => {
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };
  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };
  const handleFilterChange = (value) => {
    setFilterType(value);
    setCurrentPage(1);
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "flex items-center space-x-2", onClick: () => window.history.back(), children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Back to Search" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg", children: /* @__PURE__ */ jsx(Building2, { className: "h-6 w-6 text-white" }) }),
        /* @__PURE__ */ jsxs("div", { className: "text-xl font-bold text-gray-900", children: [
          "Talent",
          /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: "Hub" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Job Opportunities" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Discover your next career opportunity" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: "Search jobs, companies, or locations...",
            className: "pl-10",
            value: searchTerm,
            onChange: (e) => handleSearchChange(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Select, { value: sortBy, onValueChange: handleSortChange, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[180px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Sort by" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "relevance", children: "Relevance" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "date", children: "Date Posted" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "salary", children: "Salary" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "match", children: "Match %" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Select, { value: filterType, onValueChange: handleFilterChange, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[180px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Job Type" }) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Types" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "full-time", children: "Full-time" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "internship", children: "Internship" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "contract", children: "Contract" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
        sortedJobs.length,
        " opportunities found",
        sortedJobs.length > ITEMS_PER_PAGE && /* @__PURE__ */ jsxs("span", { className: "ml-2 text-sm", children: [
          "(Showing ",
          startIndex + 1,
          "-",
          Math.min(endIndex, sortedJobs.length),
          " of ",
          sortedJobs.length,
          ")"
        ] })
      ] }) }),
      totalPages > 1 && /* @__PURE__ */ jsx("div", { className: "hidden sm:block", children: /* @__PURE__ */ jsx(
        Pagination,
        {
          currentPage,
          totalPages,
          onPageChange: handlePageChange,
          isLoading
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-6 mb-8", children: isLoading ? (
      // Loading skeletons
      Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => /* @__PURE__ */ jsx(JobCardSkeleton, {}, index))
    ) : currentJobs.length > 0 ? currentJobs.map((job) => /* @__PURE__ */ jsxs(Card, { className: "hover:shadow-lg transition-shadow cursor-pointer", children: [
      /* @__PURE__ */ jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4", children: [
          /* @__PURE__ */ jsxs(Avatar, { className: "h-12 w-12", children: [
            /* @__PURE__ */ jsx(AvatarImage, { src: job.organizations?.[0]?.picture || "", alt: job.organizations?.[0]?.name || "Company" }),
            /* @__PURE__ */ jsx(AvatarFallback, { children: (job.organizations?.[0]?.name || "C")[0] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900", children: job.objective }),
              /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "text-green-600 border-green-600", children: [
                Math.round((job._meta?.scorer?.score ?? 0) * 100),
                "% match"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-gray-600 mb-2", children: [
              /* @__PURE__ */ jsx(Building, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: job.organizations?.[0]?.name }),
              /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "ml-2", children: job.type?.replace(/-/g, " ") }),
              /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "ml-2", children: job.opportunity })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-blue-600 font-medium italic mb-2", children: job.tagline }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 text-sm text-gray-500", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { children: job.place?.remote || job.remote ? "Remote" : job.place?.location?.[0]?.id || "On-site" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Posted ",
                  job.created ? new Date(job.created).toLocaleDateString() : "N/A"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                /* @__PURE__ */ jsx(DollarSign, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { children: job.compensation?.visible && job.compensation?.data ? `${job.compensation.data.currency} $${job.compensation.data.minAmount?.toLocaleString()} - $${job.compensation.data.maxAmount?.toLocaleString()} / ${job.compensation.data.periodicity}` : "Not disclosed" })
              ] }),
              job.deadline && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "Application closes on ",
                  new Date(job.deadline).toLocaleDateString()
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", children: /* @__PURE__ */ jsx(Heart, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", children: /* @__PURE__ */ jsx(Share2, { className: "h-4 w-4" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "About the Role" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: job.tagline })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Benefits" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
                job.remote && /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "Remote" }),
                job.type && /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: job.type.replace(/-/g, " ") }),
                job.opportunity && /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: job.opportunity })
              ] })
            ] }),
            job.members && job.members.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Top Members" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: job.members.slice(0, 5).map(
                (member) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  member.picture && /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8", children: [
                    /* @__PURE__ */ jsx(AvatarImage, { src: member.picture, alt: member.name }),
                    /* @__PURE__ */ jsx(AvatarFallback, { children: member.name?.[0] ?? "" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: member.name }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: member.professionalHeadline })
                ] }, member.subjectId)
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Required Skills" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-2", children: job.skills && job.skills.length > 0 ? job.skills.slice(0, 5).map(
                (skill, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700", children: skill?.name ?? "" }),
                  /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-xs", children: skill?.proficiency?.toUpperCase() ?? "" })
                ] }, idx)
              ) : /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: "No skills listed" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Requirements" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-sm text-gray-700 space-y-1", children: [
                job.type && /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-2", children: [
                  /* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsx("span", { children: job.type.replace(/-/g, " ") })
                ] }),
                job.remote && /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-2", children: [
                  /* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsx("span", { children: "Remote" })
                ] }),
                job.opportunity && /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-2", children: [
                  /* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    job.opportunity.charAt(0).toUpperCase() + job.opportunity.slice(1),
                    " opportunity"
                  ] })
                ] }),
                !job.type && !job.remote && !job.opportunity && /* @__PURE__ */ jsx("li", { className: "flex items-start space-x-2", children: /* @__PURE__ */ jsx("span", { children: "No requirements listed" }) })
              ] })
            ] }),
            job.compensation?.data?.negotiable && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-xs", children: "Salary negotiable" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex space-x-3 mt-6 pt-4 border-t border-gray-200", children: /* @__PURE__ */ jsx("a", { href: `/job/${job.id}`, className: "flex-1 rounded-md inline-flex bg-primary hover:bg-primary/95 text-primary-foreground justify-center font-medium py-2 px-4", children: "Learn More" }) })
      ] })
    ] }, job.id)) : /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsx(Search, { className: "h-12 w-12 mx-auto mb-4 text-gray-300" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No opportunities found" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Try adjusting your search criteria or filters." })
    ] }) }),
    totalPages > 1 && /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg border border-gray-200 p-4 shadow-sm", children: /* @__PURE__ */ jsx(
      Pagination,
      {
        currentPage,
        totalPages,
        onPageChange: handlePageChange,
        isLoading
      }
    ) }) })
  ] });
}

const $$Opportunities = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Job Opportunities | TalentHub" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-gray-50"> ${renderComponent($$result2, "OpportunitiesPage", OpportunitiesPage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/project/src/components/OpportunitiesPage.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/project/src/pages/opportunities.astro", void 0);

const $$file = "/home/project/src/pages/opportunities.astro";
const $$url = "/opportunities";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Opportunities,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
