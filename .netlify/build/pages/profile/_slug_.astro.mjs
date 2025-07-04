import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CJGhlimu.mjs';
import 'kleur/colors';
import { B as Button, A as Avatar, a as AvatarImage, b as AvatarFallback, $ as $$Layout } from '../../chunks/avatar_DtijBomb.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, MapPin, Mail, Phone, Globe, ExternalLink, Award, BookOpen, GraduationCap, Languages } from 'lucide-react';
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle, B as Badge } from '../../chunks/badge_CwqePQLe.mjs';
import { P as Progress } from '../../chunks/progress_jYPx_msp.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

async function fetchProfileBySlug(slug) {
  const response = await fetch(`/api/torre/api/genome/bios/${slug}`);
  if (!response.ok) throw new Error("Profile not found");
  return await response.json();
}
function ProfilePage({ slug }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllSkills, setShowAllSkills] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchProfileBySlug(slug).then(setProfile).catch(() => setProfile(null)).finally(() => setLoading(false));
  }, [slug]);
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center py-16", children: [
      /* @__PURE__ */ jsx("span", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-2" }),
      /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Loading profile..." })
    ] });
  }
  if (!profile) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center py-16", children: [
      /* @__PURE__ */ jsx("span", { className: "text-2xl text-gray-400 mb-4", children: "Profile not found" }),
      /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => window.history.back(), children: "Back to Search" })
    ] });
  }
  const person = profile.person || {};
  const strengths = profile.strengths || [];
  const jobs = (profile.jobs || []).sort((a, b) => (b.rank ?? 0) - (a.rank ?? 0));
  const projects = (profile.projects || []).sort((a, b) => (b.rank ?? 0) - (a.rank ?? 0));
  const publications = profile.publications || [];
  const education = profile.education || [];
  const links = person.links || [];
  const languages = profile.languages || [];
  const location = person.location?.shortName || person.location?.name || "";
  const picture = person.picture || person.pictureThumbnail;
  const name = person.name || "";
  const headline = person.professionalHeadline || "";
  const summary = person.summaryOfBio || "";
  const verified = person.verified;
  const email = person.email || "";
  const phone = person.phone || "";
  const website = links.find((l) => l.name === "website")?.address || "";
  const socialLinks = links.filter((l) => l.name !== "website");
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "flex items-center space-x-2", onClick: () => window.history.back(), children: [
      /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx("span", { children: "Back to Search" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6", children: [
          /* @__PURE__ */ jsxs(Avatar, { className: "h-24 w-24", children: [
            /* @__PURE__ */ jsx(AvatarImage, { src: picture, alt: name }),
            /* @__PURE__ */ jsx(AvatarFallback, { children: name.split(" ").map((n) => n[0]).join("") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [
              /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: name }),
              verified && /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5 text-blue-500" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mb-2", children: headline }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 text-sm text-gray-500 mb-2", children: [
              location && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { children: location })
              ] }),
              email && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { children: email })
              ] }),
              phone && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { children: phone })
              ] }),
              website && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                /* @__PURE__ */ jsx(Globe, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("a", { href: website, target: "_blank", rel: "noopener noreferrer", className: "hover:underline", children: website })
              ] })
            ] }),
            socialLinks.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: socialLinks.map((link) => /* @__PURE__ */ jsxs(
              "a",
              {
                href: link.address,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center space-x-1 text-blue-600 hover:underline text-sm",
                children: [
                  /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsx("span", { children: link.name })
                ]
              },
              link.id
            )) })
          ] })
        ] }) }) }),
        summary && /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "About" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: summary }) })
        ] }),
        strengths.length > 0 && /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Skills" }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            strengths.slice(0, strengths.length > 10 && !showAllSkills ? 10 : strengths.length).map((skill) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", children: skill.name }),
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: skill.proficiency })
              ] }),
              (skill.proficiency === "expert" || skill.proficiency === "proficient") && /* @__PURE__ */ jsx(Progress, { value: skill.proficiency === "expert" ? 100 : 80, className: "h-2" })
            ] }, skill.id)),
            strengths.length > 10 && /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setShowAllSkills((prev) => !prev),
                children: showAllSkills ? "View Less" : "View More"
              }
            ) })
          ] })
        ] }),
        jobs.length > 0 && /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Award, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx("span", { children: "Experience" })
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { className: "space-y-6", children: jobs.map((job, index) => /* @__PURE__ */ jsxs("div", { className: "relative pl-6 border-l-2 border-gray-200 last:border-l-0", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -left-2 top-0 h-4 w-4 bg-blue-500 rounded-full" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900", children: job.name }),
                /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500", children: [
                  job.fromMonth,
                  " ",
                  job.fromYear,
                  job.toMonth && job.toYear ? ` - ${job.toMonth} ${job.toYear}` : ""
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-700", children: job.organizations?.map((org) => org.name).join(", ") }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 whitespace-pre-line", children: job.additionalInfo })
            ] })
          ] }, job.id || index)) })
        ] }),
        projects.length > 0 && /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Projects" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: projects.map((project, index) => /* @__PURE__ */ jsxs("div", { className: "p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-2", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900", children: project.name }),
              project.media && project.media.length > 0 && project.media[0].mediaItems && project.media[0].mediaItems[0]?.address && /* @__PURE__ */ jsx("a", { href: project.media[0].mediaItems[0].address, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4 text-gray-400 hover:text-blue-500 cursor-pointer" }) })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-3", children: project.additionalInfo }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: project.organizations?.map((org) => /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-xs", children: org.name }, org.id)) })
          ] }, project.id || index)) }) })
        ] }),
        publications.length > 0 && /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(BookOpen, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx("span", { children: "Publications" })
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: publications.map((pub, idx) => /* @__PURE__ */ jsxs("div", { className: "p-4 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900", children: pub.name }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-2", children: pub.additionalInfo }),
            pub.media && pub.media.length > 0 && pub.media[0].mediaItems && pub.media[0].mediaItems[0]?.address && /* @__PURE__ */ jsxs("a", { href: pub.media[0].mediaItems[0].address, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 hover:underline flex items-center space-x-1", children: [
              /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { children: "View Publication" })
            ] })
          ] }, pub.id || idx)) }) })
        ] }),
        education.length > 0 && /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(GraduationCap, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx("span", { children: "Education" })
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: education.map((edu, idx) => /* @__PURE__ */ jsxs("div", { className: "p-4 bg-gray-50 rounded-lg", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900", children: edu.name }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-2", children: edu.organizations?.map((org) => org.name).join(", ") }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500", children: [
              edu.fromMonth,
              " ",
              edu.fromYear,
              edu.toMonth && edu.toYear ? ` - ${edu.toMonth} ${edu.toYear}` : ""
            ] })
          ] }, edu.id || idx)) }) })
        ] }),
        languages.length > 0 && /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Languages, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx("span", { children: "Languages" })
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: languages.map((lang, idx) => /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
            lang.language,
            " (",
            lang.fluency,
            ")"
          ] }, lang.code || idx)) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Contact Information" }) }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3", children: [
          email && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4 text-gray-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700", children: email })
          ] }),
          phone && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 text-gray-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700", children: phone })
          ] }),
          website && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx(Globe, { className: "h-4 w-4 text-gray-500" }),
            /* @__PURE__ */ jsx("a", { href: website, target: "_blank", rel: "noopener noreferrer", className: "text-sm text-gray-700 hover:underline", children: website })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}

const $$Astro = createAstro();
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sarah Chen - Profile | TalentHub" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-gray-50"> ${renderComponent($$result2, "ProfilePage", ProfilePage, { "client:load": true, "slug": slug, "client:component-hydration": "load", "client:component-path": "/home/project/src/components/ProfilePage.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/home/project/src/pages/profile/[slug].astro", void 0);

const $$file = "/home/project/src/pages/profile/[slug].astro";
const $$url = "/profile/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
