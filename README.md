# torre-technical-test

This project is a web application built with Astro and React, designed to provide a platform for searching for talent and job opportunities. It leverages React UI components from the `src/components` directory, to deliver its core functionalities. The application also utilizes a list of Torre's People and Opportunity Search Endpoints to propagate as a backend


## Features

The application offers the following key features:

### Talent Search

The Talent Search feature, powered by the `TalentSearch.tsx` component, allows users to find potential candidates. It includes input fields for search queries and potentially filters to refine search results based on various criteria (though specific filter implementations are not detailed in the provided file list). Search results are displayed to the user, likely through a list or grid format, showing relevant talent profiles.

### Job Search

The Job Search feature, implemented in `JobSearch.tsx`, enables users to discover job opportunities. Similar to Talent Search, it provides input fields for search terms and likely includes filters to narrow down job listings based on categories, location, salary, etc. The search results present available jobs to the user.

### Profile Page

The Profile Page, rendered using the `ProfilePage.tsx` component and accessible via routes like `/profile/[slug].astro`, displays detailed information about a specific talent or user. This page would typically showcase skills, experience, education, and other relevant details. The dynamic routing indicates that each profile has a unique URL based on a 'slug'.

### Opportunities Page

The Opportunities Page, likely driven by `OpportunitiesPage.tsx` and accessed via `/opportunities.astro`, serves as a central hub for browsing available job opportunities. It may display a list of jobs, potentially with filtering and sorting options.

### Opportunity Detail Page

The Opportunity Detail Page, likely rendered using a component (not explicitly named in the provided list but potentially a dedicated component or part of `OpportunitiesPage.tsx`) and accessed via a dynamic route like `/job/[slug].astro`, is designed to display detailed information about a specific job opportunity. This page will showcase the full job description, required skills and qualifications, company information, and instructions on how to apply for the position. The dynamic routing allows each job opportunity to have a unique URL based on its 'slug'.
