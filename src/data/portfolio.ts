export const profile = {
  name: "Aayush Gaurav",
  title: "AI Automation Developer | Generative AI & RAG | n8n Workflows | LLM APIs",
  location: "Ranchi, Jharkhand, India",
  email: "aayushgaurav5@gmail.com",
  linkedin: "https://linkedin.com/in/aayush-gaurav",
  github: "https://github.com/aayushgaurav",
};

export const N8N_REPO = "https://github.com/aayushgaurav/n8n-Automation-Workflow";
export const EVENT_WORKFLOW_URL = `${N8N_REPO}/tree/main/Event%20extractor%20workflow`;

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "repos", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

export const focusAreas = [
  { title: "AI Engineering", text: "Building LLM-powered applications, retrieval systems, and API integrations." },
  { title: "Workflow Automation", text: "Connecting APIs, extracting information, transforming data, and automating repetitive processes." },
  { title: "Cloud Infrastructure", text: "Working with AWS compute, storage, networking, access control, and infrastructure troubleshooting." },
];

export const skillGroups = [
  { title: "AI and Generative AI", items: ["Generative AI", "LLM API Integration", "Retrieval-Augmented Generation (RAG)", "BM25-Style Lexical Retrieval", "Prompt Engineering", "Google Gemini API", "Groq API", "Amazon Bedrock — Architecture Level Knowledge"] },
  { title: "Workflow Automation", items: ["n8n", "Scheduled Workflows", "HTTP Request Nodes", "HTML Extraction", "JavaScript Code Nodes", "Data Normalization", "Deduplication", "Google Sheets Integration", "Web Data Extraction"] },
  { title: "Programming and Development", items: ["Python", "Java", "JavaScript", "React", "HTML", "CSS", "FastAPI", "REST APIs", "Swagger/OpenAPI", "Postman"] },
  { title: "Cloud and Infrastructure", items: ["AWS EC2", "Amazon S3", "AWS VPC", "AWS IAM", "AWS Lambda", "Amazon RDS", "Amazon DynamoDB", "Amazon CloudWatch", "AWS CloudTrail", "AWS CLI", "Linux Fundamentals", "Render", "Vercel"] },
  { title: "Databases and Tools", items: ["SQLite", "MongoDB", "Git", "GitHub", "Maven"] },
];

export type ProjectLink = { label: string; href: string; primary?: boolean };
export type Project = {
  title: string;
  category: string;
  status?: string;
  description: string;
  stack: string[];
  features: string[];
  flow: string[];
  note?: string;
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    title: "AI Cyber Threat Intelligence Agent",
    category: "Generative AI | Cybersecurity | RAG",
    status: "Deployed",
    description:
      "A full-stack AI assistant that answers natural-language cybersecurity questions using records from the CISA Known Exploited Vulnerabilities (KEV) catalog.",
    stack: ["Python", "FastAPI", "React", "Vite", "SQLite", "Groq API", "RAG"],
    features: [
      "SQLite database with 1,760 unique vulnerability records in the deployed application.",
      "Custom BM25-style lexical retrieval.",
      "Tokenization, stop-word removal, TF-IDF scoring, and document-length normalization to rank records.",
      "Retrieved context passed to a Groq-hosted language model.",
      "React/Vite frontend and FastAPI REST backend.",
      "Deployed as separate frontend and backend services on Render.",
      "Testing for retrieval and answer generation.",
      "Addresses CORS and environment-variable configuration issues.",
    ],
    flow: ["User Question", "React Frontend", "FastAPI Backend", "Retrieval and Ranking", "SQLite KEV Records", "Groq LLM", "Generated Answer"],
    note: "The current retrieval approach relies on lexical matching and can rank recent vulnerabilities less effectively. Date-aware retrieval is a potential improvement.",
    links: [
      { label: "Try Live Demo", href: "https://ai-cyber-threat-agent-frontend.onrender.com", primary: true },
      { label: "View Source Code", href: "https://github.com/aayushgaurav/AI-Cyber-Threat-Agent" },
    ],
  },
  {
    title: "Arena India: Sports Events Platform with AI Data Pipeline",
    category: "AI Automation | Data Engineering | Web Applications",
    status: "In Development",
    description:
      "A sports events platform supported by an automated data pipeline that collects sports event information, extracts structured records using an LLM, and prepares data for browsing by sport and city.",
    stack: ["n8n", "Google Gemini", "Google Sheets", "JavaScript"],
    features: [
      "Scheduled collection of sports event data from two web sources.",
      "Google Gemini extraction of structured information from webpage HTML.",
      "JavaScript-based data normalization.",
      "Date filtering and city-to-state mapping.",
      "Merging parallel workflow branches.",
      "Duplicate event removal.",
      "Synchronization of normalized records to Google Sheets.",
    ],
    flow: ["Scheduled Trigger", "Fetch Event Sources", "Extract Webpage Content", "Gemini Extraction", "Normalize and Filter", "Deduplicate", "Google Sheets"],
    note: "The data pipeline is the Event Extractor Workflow listed under Automation Projects below.",
    links: [
      { label: "View Platform", href: "https://arena-india.vercel.app", primary: true },
      { label: "Explore Workflow", href: EVENT_WORKFLOW_URL },
    ],
  },
  {
    title: "Serverless Document Classification with Amazon Bedrock",
    category: "Cloud Architecture | Generative AI | AWS",
    status: "Architecture Design",
    description:
      "An event-driven AWS architecture designed to classify uploaded documents using AWS Lambda and Amazon Bedrock.",
    stack: ["Amazon S3", "AWS Lambda", "Amazon Bedrock", "AWS IAM"],
    features: [
      "S3 uploads trigger Lambda functions.",
      "Amazon Bedrock supports the proposed document classification workflow.",
      "Separate storage is planned for raw and processed documents.",
      "Least-privilege IAM permissions.",
      "Error handling designed to isolate failed processing tasks.",
    ],
    flow: ["Document Upload", "Amazon S3", "AWS Lambda", "Amazon Bedrock", "Classification Metadata", "Processed Document Storage"],
    note: "This is an architecture design, not a deployed production application.",
    links: [],
  },
];

export type Automation = {
  title: string;
  href: string;
  description?: string;
  tags?: string[];
  featured?: boolean;
  related?: string;
};

const folder = (name: string) => `${N8N_REPO}/tree/main/${name}`;

// Descriptions are taken from each folder's README; folders without one show only the title.
export const automations: Automation[] = [
  {
    title: "B2B Outbound Outreach & CRM Automation System",
    href: folder("B2B%20Outbound%20Outreach%20%26%20CRM%20Automation%20System"),
    featured: true,
    description:
      "A Make.com blueprint with two routines. Outbound: watches a CRM spreadsheet for new rows, uses a Groq LLM to research each company and draft email copy, and writes the results back to the sheet. Inbound: searches the inbox, classifies replies with a Groq LLM, and logs them to a replies tab.",
    tags: ["Make.com", "Groq API", "Google Sheets", "Email"],
  },
  { title: "Basic Automation", href: folder("Basic%20Automation"), tags: ["Google Forms", "Google Sheets"] },
  {
    title: "Customer Enquiry Automation",
    href: folder("Customer%20Enquiry%20Automation"),
    description:
      "A Make.com blueprint that watches Google Form responses, saves each enquiry to a tracking sheet, sends the customer an acknowledgement email through Gmail, and posts a Telegram notification.",
    tags: ["Make.com", "Google Forms", "Google Sheets", "Gmail", "Telegram"],
  },
  {
    title: "Event Extractor Workflow",
    href: EVENT_WORKFLOW_URL,
    description:
      "A weekly n8n pipeline that pulls upcoming sports events from two portals (ISSO and BFI) in parallel, extracts them with a JavaScript regex step and Gemini, merges and deduplicates the results, and saves them to Google Sheets.",
    tags: ["n8n", "Google Gemini", "JavaScript", "Google Sheets"],
    related: "Powers the Arena India data pipeline.",
  },
  {
    title: "Frontend Integration",
    href: folder("Frontend%20Integration"),
    description:
      "An n8n webhook that serves the collected sports events from Google Sheets as a JSON array through a GET /events endpoint for frontend use.",
    tags: ["n8n", "Webhook", "Google Sheets", "REST API"],
  },
  {
    title: "Routine Integration",
    href: folder("Routine%20Integration"),
    description:
      "An n8n workflow with two webhooks that receive routine tasks and completion updates, then insert or update matching rows in Google Sheets and return JSON responses.",
    tags: ["n8n", "Webhooks", "Google Sheets", "JSON"],
  },
];

export const experience = [
  {
    role: "Cloud Engineer Intern",
    company: "CloudThat Technologies",
    location: "Bengaluru, India",
    duration: "July 2025 – January 2026",
    description: "Worked on AWS infrastructure configuration, environment separation, networking, and access control.",
    points: [
      "Set up separate development, test, and production environments using multiple EC2 instances and S3.",
      "Configured IAM roles and permissions to restrict developers' access to appropriate environments.",
      "Worked with VPC networking, subnet segmentation, and Security Groups.",
      "Troubleshot infrastructure, networking, and access-related issues.",
    ],
    tech: ["AWS EC2", "Amazon S3", "IAM", "VPC", "Security Groups"],
  },
  {
    role: "Frontend Developer Intern",
    company: "National Informatics Centre (NIC)",
    location: "Ranchi, India",
    duration: "January 2024 – May 2024",
    description: "Contributed to the frontend development of a PHP and MySQL-based service desk application.",
    points: [
      "Developed dashboard pages using HTML, CSS, and JavaScript.",
      "Built complaint management workflow pages.",
      "Contributed frontend components to an existing PHP and MySQL-backed application.",
    ],
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
  },
];

export const education = {
  degree: "B.Tech in Computer Science Engineering (Cyber Security)",
  institution: "LNCTS",
  duration: "2020–2024",
  cgpa: "8.6/10",
};

export const certifications = [
  { title: "Java Full Stack Training", issuer: "JSpiders, Bengaluru" },
  { title: "Cisco Cybersecurity Essentials", issuer: "Cisco", year: "2024" },
  { title: "Cisco Virtual Internship", issuer: "Cloud Security Alliance", year: "2024" },
];

export const services = [
  { title: "Workflow Automation", items: ["Form to spreadsheet workflows.", "API integrations.", "Automated notifications.", "Routine task automation."] },
  { title: "AI Powered Applications", items: ["RAG based assistants.", "Document question answering prototypes.", "LLM API integrations.", "AI powered data extraction."] },
  { title: "Data Extraction Pipelines", items: ["Event data extraction.", "Data normalization.", "Duplicate detection.", "Google Sheets integrations."] },
];

export type GithubRepo = {
  name: string;
  href: string;
  lang?: string;
  tags?: string[];
  updated: string;
};

const gh = (repo: string) => `https://github.com/aayushgaurav/${repo}`;

export const githubRepos: GithubRepo[] = [
  { name: "Real-Time-Chat-Application", href: gh("Real-Time-Chat-Application"), lang: "Java", tags: ["Java", "Sockets", "Multithreading"], updated: "Apr 27, 2025" },
  { name: "Job-Listing-Application", href: gh("Job-Listing-Application"), lang: "CSS", tags: ["Java", "Spring Boot", "MongoDB", "React"], updated: "Apr 20, 2025" },
  { name: "Programming_Patterns", href: gh("Programming_Patterns"), lang: "Java", tags: ["Java", "Design Patterns"], updated: "Feb 28, 2025" },
  { name: "Programming_Number_System", href: gh("Programming_Number_System"), lang: "Java", tags: ["Java", "Algorithms"], updated: "Feb 28, 2025" },
  { name: "Servlet", href: gh("Servlet"), lang: "Java", tags: ["Java", "Servlets", "JSP", "HTTP"], updated: "Feb 28, 2025" },
  { name: "Oops_Concepts", href: gh("Oops_Concepts"), lang: "Java", tags: ["Java", "OOP"], updated: "Jan 4, 2025" },
  { name: "File_Handling", href: gh("File_Handling"), lang: "Java", tags: ["Java", "File I/O"], updated: "Jan 4, 2025" },
  { name: "Exception-Handling", href: gh("Exception-Handling"), lang: "Java", tags: ["Java", "Exception Handling"], updated: "Jan 4, 2025" },
];
