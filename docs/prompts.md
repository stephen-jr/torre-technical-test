**Prompts used in the project**
1. **App Design Prompt**
Model: Bolt.new Default Model
Prompt:
```markdown
Create a job recruitment app using Astro with the following specifications:
    * Landing Page:
        Implement a centered company logo with smooth fade-in animation
        Create a prominent tabbed interface with two clearly labeled sections:
        Tab 1 - Talent Search:
            Large, responsive search input with autocomplete
            Real-time dropdown results showing:
            Candidate name
            Professional headline
            Experience level
            Profile photo thumbnail
        Tab 2 - Job Search:
            Advanced filter section including:
            Keyword/title search input
            Remote work toggle switch
            Job type multi-select (Full-time, Flexible, Internship)
            Salary range slider
            Skills tags input
    * Profile Page:
        Responsive grid layout with:
            Professional profile photo (circular crop)
            Full name with verification badge if applicable
            Professional headline
            Experience timeline
            Project portfolio grid with:
            Brief descriptions
            Two-column recommendation section:
            Relevant job matches based on skills
            Professional connections based on industry
            Social proof section (endorsements, recommendations)
    * Opportunities Page:
        -Card-based job listing layout including:
            Prominent job title with company logo
            Engaging tagline/short description
            Compensation range with benefits overview
            Required skills with proficiency levels
    * Technical Requirements:
        Implement responsive design for all viewports
        Use Astro's built-in optimizations for images and assets
        Ensure accessibility compliance (WCAG 2.1)
        Include smooth transitions between pages
        Implement proper SEO meta tags
        Add loading states for dynamic content
```

2. **Search Interface Prompt**
Tool: Github Copilot
Model: GPT-4.1
Prompt:
```markdown
Implement an async fetch function to load talents from an API that returns a newline-delimited JSON stream (profileStream format). Add a loading indicator while fetching. Replace mockTalents with fetched data. The API call handles the filtering. Lets update the component to function this way: On load, we call an endpoint that returns a default stream, we can filter by this stream on the client. When the results on the stream is less than a certain value, we call the endpoint with the new search value.
```

3. **Opprortunities Page Prompt**
Tool: Bolt.new
Model: Bolt.new Default Model
Prompt:
```markdown
Create a professional opportunity details page that effectively showcases the following elements:

Header Section:

Display a prominent job title in [font size 24px, bold]
Place the company logo [dimensions: 120x120px] to the right of the title
Include a compelling tagline [max 15 words] that captures the role's impact
Add a concise job description [2-3 sentences] highlighting key responsibilities
Compensation Package:

List salary range with currency [e.g., $XX,XXX - $XX,XXX]
Present benefits in a clean, scannable format using bullet points
Highlight unique perks or special offerings
Include remote/hybrid work arrangements if applicable
Skills & Requirements:

Create a structured skills matrix with 3 columns:
Skill Category
Specific Skills
Required Proficiency Level [Beginner/Intermediate/Advanced]
Distinguish between required and preferred skills
Include years of experience requirements if applicable
Visual Elements:

Add relevant platform logos [size: 32x32px] in the footer
Ensure all logos maintain consistent spacing [20px apart]
Use company brand colors for accents and highlights
Maintain responsive design for mobile viewing
The design should prioritize readability and user engagement while maintaining professional aesthetics.
```
4.**Astro Dynamic Routing Error**
Tool: Github Copilot
Model: GPT-4.1
Prompt:
```markdown
/fix Type '{ "client:load": true; slug: string; }' is not assignable to type 'IntrinsicAttributes'.
Property 'slug' does not exist on type 'IntrinsicAttributes'.
```

5. **Profile Page Fetch**
Tool: Github Copilot
Model: GPT-4.1
Prompt:
```markdown
Implement a fetch function in the ProfilePage component that initializes the page using the dynamic slug value passed as a prop. Use this slug to retrieve data from an API endpoint whose response format is defined in profile.json. Once the data is fetched, update the component to render all relevant information based on the response structure.
Additionally, identify and suggest any missing or necessary HTML elements (e.g. headings, images, social links, sections) that should be included in the component to properly display all important data fields returned in profile.json. Ensure the layout remains clean, accessible, and responsive.
```
6. ** Opportunities Matching**
Tool: Github Copilot
Model: GPT-4.1
```markdown
* Replace the hardcoded job card fields with dynamic values from the job object, matching the keys from opportunity.json.
* Map all relevant fields: title/objective, company, logo, tagline, type, compensation, skills, requirements, match %, posted date, remote, etc.
* Add missing HTML elements for:
  * Members (showing at least the main poster's name and headline)
  * Opportunity type (employee/contractor)
  * Compensation periodicity and negotiable status
  * Deadline (application deadline)
  * Service types (if relevant)
  * Video URL (if present)
* Use fallback values or placeholders where data may be missing.
```
7. ** Update Matched Search **
Tool: Github Copilot
Model: GPT-4.1
File: src/components/OpportunitiesPage.tsx
Prompt:
```markdown

8. ** Null Value Error on OpportunitiesPage**
Tool: Github Copilot
Model: GPT-4.1
File: src/components/OpportunitiesPage.tsx
Prompt:
```markdown
Search for the possibility of accessing a null value and indicate
```
9. ** Opportunities Detail Component**
Tool: Github Copilot
Model: GPT-4.1
File: src/components/Job.tsx
Prompt:
```markdown
Update the component to used the data format to create the details element. Maintain design language and asthetics
```
10. ** Job Members**
Tool: Github Copilot
Model: GPT-4.1
File: src/components/Job.tsx
Prompt:
```markdown
List to top five members of the job, with their name and headline. Use the data format to create the details element.
```
11. View Charts Button
Tool: Github Copilot
Model: GPT-4.1
File: src/components/Opportunity.tsx
Prompt:
```markdown
Add a link to this component styled as a button. The link should be at the end of the container
```
12. ** Build Errors **
Tool: Gemini
Model: Gemini Flash
Prompt:
```markdown
Explain how to fix this build error:
12:53:44 [ERROR] [vite] x Build failed in 316ms
[vite]: Rollup failed to resolve import "sharp" from "D:/Code/torre-technical-test/node_modules/astro/dist/assets/services/sharp.js".
This is most likely unintended because it can break your application at runtime.
If you do want to externalize this module explicitly add it to
`build.rollupOptions.external`
  Stack trace:
    at viteWarn (file:///D:/Code/torre-technical-test/node_modules/vite/dist/node/chunks/dep-CDnG8rE7.js:65532:17)
    at onRollupWarning (file:///D:/Code/torre-technical-test/node_modules/vite/dist/node/chunks/dep-CDnG8rE7.js:65562:5)
    at file:///D:/Code/torre-technical-test/node_modules/rollup/dist/es/shared/node-entry.js:19393:13
    at ModuleLoader.handleInvalidResolvedId (file:///D:/Code/torre-technical-test/node_modules/rollup/dist/es/shared/node-entry.js:20008:26)
    at async file:///D:/Code/torre-technical-test/node_modules/rollup/dist/es/shared/node-entry.js:19954:32

```
13. ** Build Error 2**
Tool: Gemini, ChatGPT
Model: Gemini Flash, Default Model
Prompt:
```markdown
How do I resolve this build error?
13:00:14 [ERROR] [vite] x Build failed in 329ms
[vite]: Rollup failed to resolve import "sharp" from "D:/Code/torre-technical-test/node_modules/astro/dist/assets/services/sharp.js".
This is most likely unintended because it can break your application at runtime.
If you do want to externalize this module explicitly add it to
`build.rollupOptions.external`
  Stack trace:
    at viteWarn (file:///D:/Code/torre-technical-test/node_modules/vite/dist/node/chunks/dep-CDnG8rE7.js:65532:17)
    at onRollupWarning (file:///D:/Code/torre-technical-test/node_modules/vite/dist/node/chunks/dep-CDnG8rE7.js:65562:5)
    at file:///D:/Code/torre-technical-test/node_modules/rollup/dist/es/shared/node-entry.js:19393:13
    at ModuleLoader.handleInvalidResolvedId (file:///D:/Code/torre-technical-test/node_modules/rollup/dist/es/shared/node-entry.js:20008:26)
    at async file:///D:/Code/torre-technical-test/node_modules/rollup/dist/es/shared/node-entry.js:19954:32

```
14. ** Vercel Deployment Error**
Tool: Gemini, ChatGPT
Model: Gemini Flash, Default Model
Prompt:
```markdown
I keep getting this deployment error on Vercel:
2025-07-04T12:02:56.551Z  Running build in Washington, D.C., USA (East) – iad1
2025-07-04T12:02:56.552Z  Build machine configuration: 2 cores, 8 GB
2025-07-04T12:02:56.600Z  Retrieving list of deployment files...
2025-07-04T12:02:56.793Z  Previous build caches not available
2025-07-04T12:02:57.112Z  Downloading 434 deployment files...
Error: The following Serverless Functions contain an invalid "runtime":
  - _render (nodejs18.x)

