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