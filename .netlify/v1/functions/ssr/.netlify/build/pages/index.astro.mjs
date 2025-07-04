import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CJGhlimu.mjs';
import 'kleur/colors';
import { c as cn, A as Avatar, a as AvatarImage, b as AvatarFallback, B as Button, $ as $$Layout } from '../chunks/avatar_DtijBomb.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Search, CheckCircle, Circle, Filter, Building2, Users, Briefcase, Star } from 'lucide-react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { I as Input, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from '../chunks/select_CeyxKUV6.mjs';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as SliderPrimitive from '@radix-ui/react-slider';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

async function fetchTalentsFromStream(searchTerm) {
  const apiUrl = "https://torre.ai/api/entities/_searchStream";
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: searchTerm,
      identityType: "person",
      limit: 20,
      meta: true
    })
  });
  if (!response.body) throw new Error("No response body");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let { value, done } = await reader.read();
  let buffer = "";
  const talents = [];
  let idCounter = 1;
  while (!done) {
    buffer += decoder.decode(value, { stream: true });
    let lines = buffer.split("\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const profile = JSON.parse(line);
        talents.push({
          ggId: profile.ggId || idCounter++,
          name: profile.name,
          professionalHeadline: profile.professionalHeadline || "",
          imageUrl: profile.imageUrl || "",
          // Assuming imageUrl is optional
          username: profile.username || "",
          // Assuming username is optional
          verified: profile.verified || false
        });
      } catch (e) {
      }
    }
    ({ value, done } = await reader.read());
  }
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
    } catch (e) {
    }
  }
  return talents;
}
const STREAM_THRESHOLD = 5;
function TalentSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [defaultTalents, setDefaultTalents] = useState([]);
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(false);
  const lastSearchTerm = useRef("");
  useEffect(() => {
    setLoading(true);
    fetchTalentsFromStream(searchTerm).then((data) => {
      setDefaultTalents(data);
      setTalents(data);
    }).finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    if (!searchTerm) {
      setTalents(defaultTalents);
      return;
    }
    const filtered = defaultTalents.filter(
      (talent) => talent.name.toLowerCase().includes(searchTerm.toLowerCase()) || talent.professionalHeadline.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTalents(filtered);
    if (filtered.length < STREAM_THRESHOLD && searchTerm !== lastSearchTerm.current) {
      setLoading(true);
      lastSearchTerm.current = searchTerm;
      fetchTalentsFromStream(searchTerm).then(setTalents).finally(() => setLoading(false));
    }
  }, [searchTerm, defaultTalents]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "Search for talent by name, role, or location...",
          className: "pl-12 pr-4 py-6 text-lg rounded-xl border-2 border-gray-200 transition-colors",
          value: searchTerm,
          onChange: (e) => {
            setSearchTerm(e.target.value);
            setShowResults(e.target.value.length > 0);
          },
          onFocus: () => setShowResults(true)
        }
      )
    ] }),
    loading && /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center py-8", children: [
      /* @__PURE__ */ jsx("span", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-2" }),
      /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Loading talents..." })
    ] }),
    !loading && showResults && /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden animate-in fade-in-0 slide-in-from-top-2", children: /* @__PURE__ */ jsx("div", { className: "max-h-96 overflow-y-auto", children: talents.length > 0 ? talents.map((talent) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b last:border-b-0",
        children: /* @__PURE__ */ jsx("a", { href: `/profile/${talent.username}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsxs(Avatar, { className: "h-12 w-12", children: [
            /* @__PURE__ */ jsx(AvatarImage, { src: talent.imageUrl, alt: talent.name }),
            /* @__PURE__ */ jsx(AvatarFallback, { children: talent.name.split(" ").map((n) => n[0]).join("") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 truncate", children: talent.name }),
              talent.verified && /* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-blue-500" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 truncate", children: talent.professionalHeadline })
          ] })
        ] }) })
      },
      talent.ggId
    )) : /* @__PURE__ */ jsxs("div", { className: "p-8 text-center text-gray-500", children: [
      /* @__PURE__ */ jsx(Search, { className: "h-12 w-12 mx-auto mb-4 text-gray-300" }),
      /* @__PURE__ */ jsx("p", { children: "No talent found matching your search criteria." })
    ] }) }) })
  ] });
}

const Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitives.Root,
  {
    className: cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitives.Thumb,
      {
        className: cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives.Root.displayName;

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Root,
    {
      className: cn("grid gap-2", className),
      ...props,
      ref
    }
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Item,
    {
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(Circle, { className: "h-2.5 w-2.5 fill-current text-current" }) })
    }
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

const Slider = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(
  SliderPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex w-full touch-none select-none items-center",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx(SliderPrimitive.Track, { className: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary", children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "absolute h-full bg-primary" }) }),
      /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" }),
      /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" })
    ]
  }
));
Slider.displayName = SliderPrimitive.Root.displayName;

const ITEMS_PER_PAGE = 10;
const jobTypes = [
  { id: "none", label: "(None)" },
  { id: "full-time-employment", label: "Full-time" },
  { id: "flexible-jobs", label: "Flexible" },
  { id: "internships", label: "Internship" }
];
const periodicityOptions = [
  { value: "hourly", label: "Hourly" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
  { value: "project", label: "Per Project" }
];
function JobSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isRemote, setIsRemote] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedPeriodicity, setSelectedPeriodicity] = useState("hourly");
  const [isClosed, setIsClosed] = useState(false);
  const [salaryRange, setSalaryRange] = useState([0, 15e4]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const savedQuery = localStorage.getItem("query");
    if (savedQuery) {
      const query = JSON.parse(savedQuery);
      setSearchTerm(query.searchTerm || "");
      setIsRemote(query.isRemote || false);
      setSelectedJobType(query.selectedJobType || "");
      setSelectedPeriodicity(query.selectedPeriodicity || "hourly");
      setIsClosed(query.isClosed || false);
      setSalaryRange(query.salaryRange || [0, 15e4]);
    }
  }, []);
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const postData = { and: [] };
    if (searchTerm) postData.and.push({ keywords: { term: searchTerm, locale: "en" } });
    if (isRemote) postData.and.push({ remote: { term: isRemote } });
    postData.and.push({ status: { code: !isClosed ? "open" : "closed" } });
    postData.and.push({ boosted: "popularity" });
    postData.and.push({ compensationRange: { minAmount: salaryRange[0], maxAmount: salaryRange[1], currency: "USD", periodicity: selectedPeriodicity } });
    if (selectedJobType && selectedJobType !== "none") {
      postData.and.push({ type: { code: selectedJobType } });
    }
    try {
      const response = await fetch("https://search.torre.co/opportunities/_search", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Periodicity": selectedPeriodicity, "size": ITEMS_PER_PAGE.toString() },
        body: JSON.stringify(postData)
      });
      const jobsData = await response.json();
      if (!response.ok) {
        throw new Error(jobsData.message || "Failed to fetch jobs");
      }
      localStorage.setItem("query", JSON.stringify({
        searchTerm,
        isRemote,
        selectedJobType,
        selectedPeriodicity,
        isClosed,
        salaryRange
      }));
      localStorage.setItem("jobs", jobsData.results ? JSON.stringify(jobsData.results) : "[]");
      localStorage.setItem("totalJobs", jobsData.total ? jobsData.total.toString() : "0");
      localStorage.setItem("pagination", jobsData.pagination ? JSON.stringify(jobsData.pagination) : "{}");
      window.location.href = "/opportunities";
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "mx-auto p-6 bg-white rounded-xl shadow-md", children: /* @__PURE__ */ jsxs("form", { className: "space-y-6", onSubmit: handleSearch, children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "Search jobs by title, company, or keywords...",
          className: "pl-12 pr-4 py-6 text-lg rounded-xl border-2 border-gray-200 transition-colors",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mb-4", children: [
        /* @__PURE__ */ jsx(Filter, { className: "h-5 w-5 text-gray-600" }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Advanced Filters" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "remote-toggle", className: "text-sm font-medium text-gray-700", children: "Remote Work" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(
              Switch,
              {
                id: "remote-toggle",
                checked: isRemote,
                onCheckedChange: setIsRemote
              }
            ),
            /* @__PURE__ */ jsx(Label, { htmlFor: "remote-toggle", className: "text-sm text-gray-600", children: "Include remote opportunities" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "closed-toggle", className: "text-sm font-medium text-gray-700", children: "Closed Work" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(
              Switch,
              {
                id: "closed-toggle",
                checked: isClosed,
                onCheckedChange: setIsClosed
              }
            ),
            /* @__PURE__ */ jsx(Label, { htmlFor: "closed-toggle", className: "text-sm text-gray-600", children: "Include closed opportunities" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium text-gray-700", children: "Job Type" }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              value: selectedJobType ?? "",
              onValueChange: (val) => setSelectedJobType(val),
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select job type" }) }),
                /* @__PURE__ */ jsx(SelectContent, { children: jobTypes.map((type) => /* @__PURE__ */ jsx(SelectItem, { value: type.id, children: type.label }, type.id)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium text-gray-700", children: "Periodicity" }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
            RadioGroup,
            {
              value: selectedPeriodicity,
              onValueChange: setSelectedPeriodicity,
              className: "grid grid-cols-2 gap-2",
              children: periodicityOptions.map((option) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx(
                  RadioGroupItem,
                  {
                    value: option.value,
                    id: `periodicity-${option.value}`
                  }
                ),
                /* @__PURE__ */ jsx(Label, { htmlFor: `periodicity-${option.value}`, className: "text-sm text-gray-600", children: option.label })
              ] }, option.value))
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs(Label, { className: "text-sm font-medium text-gray-700", children: [
            "Salary Range: $",
            salaryRange[0].toLocaleString(),
            " - $",
            salaryRange[1].toLocaleString()
          ] }),
          /* @__PURE__ */ jsx("div", { className: "px-2", children: /* @__PURE__ */ jsx(
            Slider,
            {
              value: salaryRange,
              onValueChange: setSalaryRange,
              max: 2e5,
              min: 0,
              step: 30,
              className: "w-full"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center space-x-4", children: /* @__PURE__ */ jsx(
        Button,
        {
          className: "full md:w-auto bg-primary hover:bg-blue-950 text-white px-8 py-2 rounded-lg transition-colors",
          disabled: loading,
          children: loading ? "Searching..." : "Search Jobs"
        }
      ) })
    ] })
  ] }) });
}

function SearchInterface() {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 animate-in fade-in-0 slide-in-from-top-4 duration-1000", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full", children: /* @__PURE__ */ jsx(Building2, { className: "h-8 w-8 text-white" }) }) }),
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-gray-900 mb-4", children: [
        "Talent",
        /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: "Hub" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 max-w-2xl mx-auto", children: "Connect talented professionals with innovative companies. Your next opportunity awaits." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4", children: /* @__PURE__ */ jsx(Users, { className: "h-6 w-6 text-blue-600" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-2", children: "10K+" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Active Professionals" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4", children: /* @__PURE__ */ jsx(Briefcase, { className: "h-6 w-6 text-purple-600" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-2", children: "5K+" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Open Positions" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-green-100 p-3 rounded-full w-fit mx-auto mb-4", children: /* @__PURE__ */ jsx(Star, { className: "h-6 w-6 text-green-600" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-2", children: "95%" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Success Rate" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-300", children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "talent", className: "w-full", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-2 mb-8 bg-gradient-to-r from-gray-50 to-gray-100 p-2.5 rounded-2xl shadow-lg border border-gray-200/50 backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxs(
          TabsTrigger,
          {
            value: "talent",
            className: "flex items-center justify-center space-x-3 py-4 px-8 rounded-xl font-semibold text-sm transition-all duration-300 ease-out\n                data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/10 data-[state=active]:border data-[state=active]:border-blue-100\n                data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-white/50\n                transform data-[state=active]:scale-[1.02] hover:scale-[1.01]",
            children: [
              /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 transition-transform duration-300 data-[state=active]:scale-110" }),
              /* @__PURE__ */ jsx("span", { className: "tracking-wide", children: "Find Talent" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          TabsTrigger,
          {
            value: "jobs",
            className: "flex items-center justify-center space-x-3 py-4 px-8 rounded-xl font-semibold text-sm transition-all duration-300 ease-out\n                data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/10 data-[state=active]:border data-[state=active]:border-purple-100\n                data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-white/50\n                transform data-[state=active]:scale-[1.02] hover:scale-[1.01]",
            children: [
              /* @__PURE__ */ jsx(Briefcase, { className: "h-4 w-4 transition-transform duration-300 data-[state=active]:scale-110" }),
              /* @__PURE__ */ jsx("span", { className: "tracking-wide", children: "Find Jobs" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "talent", className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Find Top Talent" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Search through thousands of qualified professionals" })
        ] }),
        /* @__PURE__ */ jsx(TalentSearch, {})
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "jobs", className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Discover Opportunities" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Find your next career move with advanced filters" })
        ] }),
        /* @__PURE__ */ jsx(JobSearch, {})
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-20 text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-500", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-8", children: "Powered & Sponsored by " }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center items-center gap-8 opacity-60", children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gray-400", children: "torre.ai" }) })
    ] })
  ] });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "TalentHub - Find Your Next Opportunity" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50"> ${renderComponent($$result2, "SearchInterface", SearchInterface, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/project/src/components/SearchInterface.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/project/src/pages/index.astro", void 0);

const $$file = "/home/project/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
