# Career Growth Planner - Vibe Coding Tracker

## 1. Project Overview

Build a React + TypeScript web app for working professionals who want to improve their career direction.

The app helps users analyse their current role, work responsibilities, skills, career goals, and market expectations. It then generates a practical learning plan with daily, weekly, and monthly goals.

Target users example include but not limited:

- Junior Software Engineers who want to become Senior Software Engineers
- Non-native English speakers who want to improve workplace English
- Developers or data professionals who want to become AI Engineers
- Working professionals who want a clear and realistic career growth plan

The product should feel practical, modern, and career-focused. Avoid making it look like a generic course website or simple todo app.

---

## 2. Product Goal

The main goal is:

> Help working professionals turn their career goal into a realistic learning roadmap based on their current role, current skills, job market expectations, and available study time.

The app should guide users through this flow:

```text
Current Role
→ Current Skills
→ Target Goal
→ Market Skill Gap
→ Learning Plan
→ Progress Tracking
→ Career Evidence
```

---

## 3. Tech Stack

Use:

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- React Hook Form
- Zod
- localStorage for MVP data persistence

Optional later:

- Zustand
- OpenAI API
- Supabase
- Vercel deployment

Do not add extra libraries unless they are clearly useful.

---

## 4. MVP Scope

The first version should include:

### Required Features

1. Landing page
2. User profile setup form
3. Goal selection
4. Career gap analysis page
5. Market skills comparison
6. Learning plan generator
7. Resource recommendation page
8. Progress tracking dashboard
9. Save user data to localStorage

### Not Required in MVP

Do not build these yet:

- Login
- Payment
- Backend database
- Real-time job scraping
- Complex AI integration
- Multi-user team features

---

## 5. Main User Flow

### Step 1: Landing Page

User sees the purpose of the app.

Main message:

```text
Build a personalised career growth plan based on your current role and target goal.
```

CTA:

```text
Start My Career Plan
```

Sections:

- Who this is for
- How it works
- Example career goals
- Start button

---

### Step 2: Profile Setup

User enters current career information.

Fields:

```ts
currentTitle: string;
yearsOfExperience: number;
responsibilities: string[];
currentSkills: string[];
weakAreas: string[];
workLanguage: string;
targetGoal: CareerGoal;
studyMinutesPerDay: number;
```

Example:

```text
Current Title:
Junior Software Engineer

Responsibilities:
- Build React components
- Fix bugs
- Join sprint planning
- Integrate APIs

Current Skills:
- React
- JavaScript
- Git
- Basic TypeScript

Weak Areas:
- Testing
- System design
- Communication

Target Goal:
Become Senior Software Engineer

Study Time:
45 minutes per day
```

---

### Step 3: Goal Selection

Supported goals:

```ts
type CareerGoal =
  | "senior-software-engineer"
  | "ai-engineer"
  | "workplace-english"
  | "data-engineer"
  | "devops-engineer";
```

Each goal should have:

```ts
{
  id: string;
  title: string;
  description: string;
  commonUsers: string[];
}
```

Example:

```ts
{
  id: "senior-software-engineer",
  title: "Become a Senior Software Engineer",
  description: "Improve technical depth, ownership, system thinking, code quality, and communication.",
  commonUsers: ["Junior Developer", "Mid-level Developer", "Frontend Engineer"]
}
```

---

### Step 4: Career Gap Analysis

The app compares the user's current skills with the target role expectations.

Show:

- Strengths
- Main gaps
- Priority improvement areas
- Suggested focus for the next 3 months

Example output:

```text
Current level:
Junior to early mid-level

Strengths:
- Has practical React experience
- Can work with tickets
- Understands basic frontend development

Main gaps:
- Limited testing experience
- Not enough architecture decision-making
- Needs stronger technical communication
- Needs more feature ownership
```

Use cards or a table.

Example table:

```text
Skill Area              Current Level     Target Level      Priority
React Architecture      Basic             Advanced          High
Testing                 Basic             Intermediate      High
Communication           Medium            Strong            High
System Design           Basic             Intermediate      Medium
Ownership               Basic             Strong            High
```

---

## 6. Market Skill Templates

Create a file:

```text
src/data/marketSkills.ts
```

Use hardcoded templates for MVP.

### Senior Software Engineer Skills

```ts
export const seniorSoftwareEngineerSkills = [
  {
    name: "Frontend Architecture",
    category: "technical",
    importance: "high",
    description:
      "Design reusable components, scalable folder structures, maintainable state management, and clear UI patterns."
  },
  {
    name: "Testing",
    category: "technical",
    importance: "high",
    description:
      "Write reliable unit and integration tests using tools such as Vitest and React Testing Library."
  },
  {
    name: "System Thinking",
    category: "technical",
    importance: "medium",
    description:
      "Understand how frontend, backend, APIs, data flow, and deployment work together."
  },
  {
    name: "Technical Communication",
    category: "communication",
    importance: "high",
    description:
      "Explain trade-offs, blockers, risks, and design decisions clearly."
  },
  {
    name: "Ownership",
    category: "leadership",
    importance: "high",
    description:
      "Own features end-to-end, raise risks early, and help the team deliver predictable outcomes."
  }
];
```

### AI Engineer Skills

```ts
export const aiEngineerSkills = [
  {
    name: "Python",
    category: "technical",
    importance: "high",
    description:
      "Use Python to build AI workflows, APIs, data processing scripts, and model integrations."
  },
  {
    name: "LLM Fundamentals",
    category: "ai",
    importance: "high",
    description:
      "Understand prompts, tokens, context windows, embeddings, retrieval, evaluation, and limitations."
  },
  {
    name: "RAG",
    category: "ai",
    importance: "high",
    description:
      "Build retrieval augmented generation systems using documents, embeddings, vector databases, and LLM APIs."
  },
  {
    name: "API Integration",
    category: "technical",
    importance: "high",
    description:
      "Connect AI models with frontend and backend applications through reliable APIs."
  },
  {
    name: "Evaluation",
    category: "ai",
    importance: "medium",
    description:
      "Test and evaluate AI output quality, hallucination risk, relevance, and usefulness."
  }
];
```

### Workplace English Skills

```ts
export const workplaceEnglishSkills = [
  {
    name: "Standup Updates",
    category: "communication",
    importance: "high",
    description:
      "Clearly explain what you did, what you are doing next, and what is blocking you."
  },
  {
    name: "Asking for Clarification",
    category: "communication",
    importance: "high",
    description:
      "Ask clear and polite questions when requirements, tasks, or expectations are unclear."
  },
  {
    name: "Code Review Communication",
    category: "communication",
    importance: "medium",
    description:
      "Write clear, respectful, and useful code review comments."
  },
  {
    name: "Meeting Summary",
    category: "communication",
    importance: "medium",
    description:
      "Summarise decisions, action items, risks, and next steps after meetings."
  }
];
```

---

## 7. Learning Resource Templates

Create a file:

```text
src/data/learningResources.ts
```

Use practical and market-relevant resources.

```ts
export const learningResources = {
  react: [
    {
      title: "React Official Docs",
      provider: "React",
      type: "docs",
      reason: "Best source for modern React concepts and patterns."
    },
    {
      title: "TypeScript Handbook",
      provider: "Microsoft",
      type: "docs",
      reason: "Useful for building stronger typed React applications."
    },
    {
      title: "Frontend Mentor",
      provider: "Frontend Mentor",
      type: "project",
      reason: "Good for practising real frontend UI implementation."
    },
    {
      title: "Testing Library Docs",
      provider: "Testing Library",
      type: "docs",
      reason: "Useful for learning user-focused component testing."
    }
  ],

  aiEngineer: [
    {
      title: "DeepLearning.AI Short Courses",
      provider: "DeepLearning.AI",
      type: "course",
      reason: "Good practical AI and LLM learning resources."
    },
    {
      title: "Hugging Face Course",
      provider: "Hugging Face",
      type: "course",
      reason: "Good for learning transformers, models, datasets, and AI tooling."
    },
    {
      title: "OpenAI API Docs",
      provider: "OpenAI",
      type: "docs",
      reason: "Useful for learning how to build AI-powered applications."
    },
    {
      title: "Full Stack Deep Learning",
      provider: "Full Stack Deep Learning",
      type: "course",
      reason: "Good for understanding production AI systems."
    }
  ],

  workplaceEnglish: [
    {
      title: "BBC Learning English",
      provider: "BBC",
      type: "video",
      reason: "Good for improving listening, pronunciation, and practical English."
    },
    {
      title: "Grammarly Blog",
      provider: "Grammarly",
      type: "article",
      reason: "Useful for professional writing and workplace messages."
    },
    {
      title: "ChatGPT Role Play Practice",
      provider: "ChatGPT",
      type: "practice",
      reason: "Useful for practising standups, meetings, and workplace conversations."
    }
  ]
};
```

---

## 8. Learning Plan Logic

Create a file:

```text
src/utils/generateLearningPlan.ts
```

Use rule-based logic for MVP.

```ts
export function generateLearningPlan(profile: UserProfile): LearningPlan {
  if (profile.targetGoal === "senior-software-engineer") {
    return {
      daily: [
        "Spend 30 minutes learning advanced React or TypeScript.",
        "Spend 15 minutes writing one workplace communication example.",
        "Review one piece of code and write improvement notes."
      ],
      weekly: [
        "Refactor one existing component.",
        "Write at least three tests.",
        "Read one article about system design or engineering ownership.",
        "Prepare one short weekly progress summary."
      ],
      monthly: [
        "Build one production-style React feature.",
        "Document architecture decisions.",
        "Ask for feedback from a senior engineer.",
        "Update your promotion evidence document."
      ]
    };
  }

  if (profile.targetGoal === "ai-engineer") {
    return {
      daily: [
        "Study Python or AI fundamentals for 30 minutes.",
        "Practise one LLM prompt, API call, or small AI workflow.",
        "Read one AI engineering example or documentation page."
      ],
      weekly: [
        "Build one small AI feature.",
        "Learn one concept such as embeddings, RAG, vector search, or evaluation.",
        "Push code to GitHub with a clear README."
      ],
      monthly: [
        "Complete one portfolio AI project.",
        "Deploy the project.",
        "Write a case study explaining the problem, solution, tools, and limitations."
      ]
    };
  }

  if (profile.targetGoal === "workplace-english") {
    return {
      daily: [
        "Practise one standup update sentence.",
        "Rewrite one workplace message in clearer English.",
        "Listen to five minutes of workplace English."
      ],
      weekly: [
        "Prepare one meeting update.",
        "Practise asking for clarification.",
        "Write one technical explanation in English."
      ],
      monthly: [
        "Record one three-minute project update.",
        "Review common grammar and pronunciation issues.",
        "Prepare ten reusable workplace sentence templates."
      ]
    };
  }

  return {
    daily: ["Spend 30 minutes working on your highest priority skill gap."],
    weekly: ["Complete one small practical task related to your target role."],
    monthly: ["Build one portfolio-quality project or evidence item."]
  };
}
```

---

## 9. Pages to Build

Create these pages:

```text
src/pages/HomePage.tsx
src/pages/ProfileSetupPage.tsx
src/pages/GapAnalysisPage.tsx
src/pages/LearningPlanPage.tsx
src/pages/ResourcesPage.tsx
src/pages/DashboardPage.tsx
```

---

## 10. Components to Build

Create reusable components:

```text
src/components/common/Button.tsx
src/components/common/Card.tsx
src/components/common/Input.tsx
src/components/common/Textarea.tsx
src/components/common/Select.tsx
src/components/common/ProgressBar.tsx
src/components/common/Tag.tsx

src/components/career/GoalCard.tsx
src/components/career/SkillGapTable.tsx
src/components/career/MarketSkillCard.tsx
src/components/career/LearningPlanCard.tsx
src/components/career/ResourceCard.tsx
src/components/career/ProgressTracker.tsx
```

---

## 11. Suggested UI Style

The app should look:

- Clean
- Modern
- Professional
- Calm
- Not too colourful
- Similar to a productivity SaaS tool

Use:

```text
Large page headings
Card-based layout
Soft borders
Good spacing
Clear CTA buttons
Progress indicators
Simple charts or bars
```

Avoid:

```text
Too many colours
Cartoon style
Overly academic style
Complicated dashboard
Generic todo list design
```

---

## 12. Development Tasks

### Phase 1: Project Setup

Status: Not Started

Tasks:

- [ ] Create Vite React TypeScript project
- [ ] Install Tailwind CSS
- [ ] Install React Router
- [ ] Install React Hook Form
- [ ] Install Zod
- [ ] Set up folder structure
- [ ] Create basic layout
- [ ] Create navigation

Done when:

- App runs locally
- Basic routes work
- Tailwind works
- Folder structure is clean

---

### Phase 2: Landing Page

Status: Not Started

Tasks:

- [ ] Build HomePage
- [ ] Add headline and subheading
- [ ] Add CTA button
- [ ] Add “Who this is for” section
- [ ] Add “How it works” section
- [ ] Add example goals
- [ ] Link CTA to profile setup page

Done when:

- User understands the app within 10 seconds
- CTA clearly leads to setup flow

---

### Phase 3: Profile Setup Form

Status: Not Started

Tasks:

- [ ] Build ProfileSetupPage
- [ ] Create input fields
- [ ] Create responsibilities input
- [ ] Create skills input
- [ ] Create weak areas input
- [ ] Create target goal selector
- [ ] Add validation with Zod
- [ ] Save profile to localStorage
- [ ] Navigate to gap analysis page after submit

Done when:

- User can enter profile
- Form validates required fields
- Data persists after refresh

---

### Phase 4: Goal Templates

Status: Not Started

Tasks:

- [ ] Create goalTemplates.ts
- [ ] Add Senior Software Engineer goal
- [ ] Add AI Engineer goal
- [ ] Add Workplace English goal
- [ ] Add Data Engineer goal
- [ ] Add DevOps Engineer goal
- [ ] Render goals as cards

Done when:

- User can select a goal
- Selected goal affects analysis and learning plan

---

### Phase 5: Market Skill Data

Status: Not Started

Tasks:

- [ ] Create marketSkills.ts
- [ ] Add senior software engineer skills
- [ ] Add AI engineer skills
- [ ] Add workplace English skills
- [ ] Add data engineer skills
- [ ] Add devops engineer skills
- [ ] Add helper function to get skills by goal

Done when:

- App can show relevant market skills based on selected goal

---

### Phase 6: Career Gap Analysis

Status: Not Started

Tasks:

- [ ] Create analyseSkillGap.ts
- [ ] Compare current skills with target market skills
- [ ] Generate strengths
- [ ] Generate gaps
- [ ] Generate priority areas
- [ ] Build GapAnalysisPage
- [ ] Build SkillGapTable component

Done when:

- User sees clear strengths and gaps
- Output changes based on selected goal

---

### Phase 7: Learning Plan Generator

Status: Not Started

Tasks:

- [ ] Create generateLearningPlan.ts
- [ ] Generate daily goals
- [ ] Generate weekly goals
- [ ] Generate monthly goals
- [ ] Adjust plan based on study time
- [ ] Build LearningPlanPage
- [ ] Build LearningPlanCard component

Done when:

- User gets a practical daily, weekly, and monthly learning plan

---

### Phase 8: Resource Recommendation

Status: Not Started

Tasks:

- [ ] Create learningResources.ts
- [ ] Add React resources
- [ ] Add AI Engineer resources
- [ ] Add Workplace English resources
- [ ] Add Senior Engineer resources
- [ ] Build ResourcesPage
- [ ] Build ResourceCard component

Done when:

- User receives practical resources related to their goal
- Each resource explains why it is useful

---

### Phase 9: Progress Tracking

Status: Not Started

Tasks:

- [ ] Build DashboardPage
- [ ] Show selected goal
- [ ] Show daily tasks
- [ ] Show weekly tasks
- [ ] Add checkbox completion
- [ ] Save progress to localStorage
- [ ] Add progress bar
- [ ] Add simple career evidence section

Done when:

- User can track progress
- Progress remains after refresh

---

### Phase 10: Career Evidence

Status: Not Started

Tasks:

- [ ] Add evidence input field
- [ ] Allow user to add evidence items
- [ ] Save evidence to localStorage
- [ ] Display evidence list
- [ ] Add examples for promotion evidence

Example evidence:

```text
I refactored the dashboard component and reduced duplicate code.
I added tests for the login flow.
I documented API integration trade-offs.
I led a technical discussion with backend engineers.
```

Done when:

- User can collect career evidence over time

---

### Phase 11: Polish and Deployment

Status: Not Started

Tasks:

- [ ] Improve mobile layout
- [ ] Add empty states
- [ ] Add error states
- [ ] Add loading states if needed
- [ ] Check accessibility
- [ ] Add README
- [ ] Add screenshots
- [ ] Deploy to Vercel
- [ ] Test deployed app

Done when:

- App is ready to show as a portfolio project

---

## 13. Acceptance Criteria

The MVP is complete when:

- [ ] User can open the landing page
- [ ] User can enter current career information
- [ ] User can choose a target goal
- [ ] User can see a market-based skill gap analysis
- [ ] User can get a daily, weekly, and monthly learning plan
- [ ] User can see recommended resources
- [ ] User can track progress
- [ ] Data is saved locally
- [ ] App works on desktop and mobile
- [ ] App is deployed online
- [ ] README explains the product clearly

---

## 14. README Positioning

Use this description in README:

```text
Career Growth Planner is a React + TypeScript web app that helps working professionals analyse their current role, compare their skills against market expectations, and generate a personalised learning roadmap with daily, weekly, and monthly goals.
```

Portfolio explanation:

```text
This project demonstrates product thinking, React component design, TypeScript modelling, form handling, rule-based recommendation logic, local data persistence, and user-focused UI design.
```

---

## 15. Important Coding Rules

Follow these rules:

- Use TypeScript properly
- Avoid `any`
- Keep components small
- Reuse components
- Keep business logic in `utils`
- Keep data templates in `data`
- Keep types in `types`
- Use semantic HTML
- Make forms accessible
- Use clear names
- Avoid unnecessary libraries
- Do not over-engineer the MVP

---

## 16. Future Improvements

After MVP, possible upgrades:

- Add OpenAI API for AI-generated analysis
- Allow user to paste job descriptions
- Extract required skills from job ads
- Compare user profile with job ad
- Add login
- Add database
- Add export to PDF
- Add calendar reminders
- Add weekly review prompts
- Add mock interview practice
- Add workplace English role-play mode

---

## 17. Current Priority

Start with this order:

```text
1. Project setup
2. Landing page
3. Profile setup form
4. Market skill templates
5. Gap analysis
6. Learning plan generator
7. Resources page
8. Dashboard and progress tracking
9. Polish and deployment
```

Do not start AI integration until the static MVP is working well.

---

## 18. Prompt for Codex / Cursor / Windsurf

Use this prompt:

```text
Read PROJECT_TRACKER.md first. Build this React + TypeScript app step by step. Start with Phase 1 only. Do not build future features yet.
```

Next prompt:

```text
Based on PROJECT_TRACKER.md, create the initial Vite React TypeScript project structure, install required dependencies, set up routing, Tailwind, and create placeholder pages for the MVP.
```
