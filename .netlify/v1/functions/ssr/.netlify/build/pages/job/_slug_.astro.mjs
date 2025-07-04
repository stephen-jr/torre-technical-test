import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CJGhlimu.mjs';
import 'kleur/colors';
import { B as Button, A as Avatar, a as AvatarImage, b as AvatarFallback, c as cn, $ as $$Layout } from '../../chunks/avatar_DtijBomb.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { ArrowLeft, Building2, Building, MapPin, Globe, Clock, Users, Heart, Share2, DollarSign, CheckCircle, Award, X } from 'lucide-react';
import { C as Card, a as CardContent, B as Badge, b as CardHeader, c as CardTitle } from '../../chunks/badge_CwqePQLe.mjs';
import { P as Progress } from '../../chunks/progress_jYPx_msp.mjs';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva } from 'class-variance-authority';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}

function Job({ slug }) {
  const [isSaved, setIsSaved] = useState(false);
  const [job, setJob] = useState({});
  const { toast } = useToast();
  useEffect(() => {
    const savedJob = localStorage.getItem(`jobs`);
    if (savedJob) {
      const parsedJob = JSON.parse(savedJob);
      setJob(parsedJob.find((j) => j.id === slug));
    }
  }, []);
  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Job Removed" : "Job Saved!",
      description: isSaved ? "Job removed from your saved list." : "Job added to your saved list.",
      variant: "default",
      duration: 3e3
    });
  };
  const handleShare = () => {
    toast({
      title: "Link Copied!",
      description: "Job link has been copied to your clipboard.",
      variant: "default",
      duration: 3e3
    });
  };
  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "no-experience-interested":
        return "bg-green-100 text-green-800 border-green-200";
      case "novice":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "proficient":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "expert":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  const formatProficiency = (proficiency) => {
    switch (proficiency.toLowerCase()) {
      case "no-experience-interested":
        return "No Experience (Interested)";
      case "novice":
        return "Novice";
      case "proficient":
        return "Proficient";
      case "expert":
        return "Expert";
      default:
        return "Unknown";
    }
  };
  const formatType = (type) => {
    switch (type) {
      case "full-time-employment":
        return "Full-Time";
      case "flexible-jobs":
        return "Flexible";
      case "internships":
        return "Internship";
      default:
        return "Unknown";
    }
  };
  const formatSalary = (comp) => {
    if (!comp?.visible || !comp.data) return "Not Disclosed";
    const { code, currency, minAmount, maxAmount, periodicity, negotiable } = comp.data;
    switch (code) {
      case "to-be-agreed":
        return "To Be Agreed";
      default:
        let range = `${currency} $${minAmount?.toString()} - $${maxAmount?.toString()} / ${periodicity}`;
        if (negotiable) range += " (Negotiable)";
        return range;
    }
  };
  const getCompany = (job2) => job2.organizations?.[0] || {};
  const getMatchScore = (job2) => Math.round((job2._meta?.scorer?.score ?? 0) * 100);
  if (!job || !job.id) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-[40vh]", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-700 mb-2", children: "Job details not available" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "The job you are looking for could not be found." })
    ] }) });
  }
  const company = getCompany(job);
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-8 max-w-6xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "flex items-center space-x-2", onClick: () => window.history.back(), children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Back to Opportunities" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg", children: /* @__PURE__ */ jsx(Building2, { className: "h-6 w-6 text-white" }) }),
        /* @__PURE__ */ jsxs("div", { className: "text-xl font-bold text-gray-900", children: [
          "Talent",
          /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: "Hub" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "mb-8", children: /* @__PURE__ */ jsx(CardContent, { className: "p-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-6 mb-6", children: [
          /* @__PURE__ */ jsxs(Avatar, { className: "h-[120px] w-[120px] rounded-xl", children: [
            /* @__PURE__ */ jsx(AvatarImage, { src: company.picture, alt: company.name, className: "object-cover" }),
            /* @__PURE__ */ jsx(AvatarFallback, { className: "text-2xl font-bold", children: company.name?.[0] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-2", style: { fontSize: "24px" }, children: job.objective }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mb-3", children: [
              /* @__PURE__ */ jsx(Building, { className: "h-5 w-5 text-gray-500" }),
              /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold text-gray-700", children: company.name }),
              company.theme && /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "ml-2 capitalize", children: formatType(job.type) })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-blue-600 font-medium italic mb-4 text-lg", children: job.tagline }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: job.tagline })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 text-sm text-gray-600 mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { children: job.place?.remote || job.remote ? "Remote" : job.place?.location?.[0] || "On-site" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Globe, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { children: job.place?.anywhere ? "Anywhere" : "" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Posted ",
              job.created ? new Date(job.created).toLocaleDateString() : "N/A"
            ] })
          ] }),
          job.deadline && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Apply by ",
              new Date(job.deadline).toLocaleDateString()
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Users, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { children: company.size ? `${company.size} employees` : "" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col space-y-3", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: handleSave,
            className: isSaved ? "bg-red-50 border-red-200 text-red-600" : "",
            children: /* @__PURE__ */ jsx(Heart, { className: `h-4 w-4 ${isSaved ? "fill-current" : ""}` })
          }
        ),
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: handleShare, children: /* @__PURE__ */ jsx(Share2, { className: "h-4 w-4" }) })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-8", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(DollarSign, { className: "h-5 w-5 text-green-600" }),
            /* @__PURE__ */ jsx("span", { children: "Compensation & Benefits" })
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-green-50 border border-green-200 rounded-lg p-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-green-800 mb-2", children: "Salary Range" }),
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-green-900", children: formatSalary(job.compensation) }),
              job.compensation?.data?.negotiable && /* @__PURE__ */ jsx("p", { className: "text-sm text-green-700", children: "Salary negotiable" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-3", children: "Core Benefits" }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2", children: [
                job.remote && /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-2", children: [
                  /* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700", children: "Remote" })
                ] }),
                job.type && /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-2", children: [
                  /* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700", children: formatType(job.type) })
                ] }),
                job.opportunity && /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-2", children: [
                  /* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700", children: job.opportunity.charAt(0).toUpperCase() + job.opportunity.slice(1) })
                ] })
              ] })
            ] }),
            job.additionalCompensation && job.additionalCompensation.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-3", children: "Additional Compensation" }),
              /* @__PURE__ */ jsx("ul", { children: job.additionalCompensation.map((item, idx) => /* @__PURE__ */ jsx("li", { className: "text-sm text-gray-700 capitalize", children: item.toString() }, idx)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Award, { className: "h-5 w-5 text-purple-600" }),
            /* @__PURE__ */ jsx("span", { children: "Skills & Requirements" })
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-4", children: "Required Skills" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4", children: job.skills && job.skills.length > 0 ? job.skills.map((skill, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border border-gray-200 rounded-lg p-3", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: skill.name }),
              /* @__PURE__ */ jsx(Badge, { className: `text-xs capitalize ${getLevelColor(skill.proficiency)}`, children: formatProficiency(skill.proficiency) })
            ] }, idx)) : /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: "No skills listed" }) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { children: [
            "About ",
            company.name
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Company Size" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: company.size || "N/A" })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Insights" }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Your Match Score" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium", children: [
                    getMatchScore(job),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsx(Progress, { value: getMatchScore(job), className: "h-2" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Based on current user skills and experience" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "border-t pt-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Status" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium capitalize", children: job.status })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Posted" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: job.created ? new Date(job.created).toLocaleDateString() : "N/A" })
              ] }),
              job.deadline && /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Deadline" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: new Date(job.deadline).toLocaleDateString() })
              ] })
            ] })
          ] })
        ] }),
        job.members && job.members.length > 0 && /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Contacts" }) }),
          /* @__PURE__ */ jsx(CardContent, { className: "space-y-2", children: job.members.map((member) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            member.picture && /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8", children: [
              /* @__PURE__ */ jsx(AvatarImage, { src: member.picture, alt: member.name }),
              /* @__PURE__ */ jsx(AvatarFallback, { children: member.name[0] })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: member.name }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: member.professionalHeadline })
          ] }, member.subjectId)) })
        ] })
      ] })
    ] })
  ] });
}

const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}

const $$Astro = createAstro();
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sarah Chen - Profile | TalentHub" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-gray-50"> ${renderComponent($$result2, "Job", Job, { "client:load": true, "slug": slug, "client:component-hydration": "load", "client:component-path": "/home/project/src/components/Job", "client:component-export": "default" })} ${renderComponent($$result2, "Toaster", Toaster, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/ui/toaster", "client:component-export": "Toaster" })} </main> ` })}`;
}, "/home/project/src/pages/job/[slug].astro", void 0);

const $$file = "/home/project/src/pages/job/[slug].astro";
const $$url = "/job/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
