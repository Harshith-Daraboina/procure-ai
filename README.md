# ProcureAI 🚀

**ProcureAI** is an enterprise-grade, Agentic AI platform designed to automate and optimize the B2B Request for Proposal (RFP) process. It leverages a multi-agent architecture to discover opportunities, analyze technical requirements, calculate pricing, and generate complete proposal drafts, streamlining the procurement workflow from end-to-end.

![ProcureAI Dashboard](https://github.com/user-attachments/assets/placeholder-image) 
*(Note: Add actua screenshots if available)*

## 🌟 Key Features

*   **Role-Based Access Control (RBAC)**: Secure login for Requestors, Procurement Managers, Finance, and Executives with tailored views.
*   **Command Center Dashboard**: Real-time analytics on RFP volume, pipeline status, win rates, and financial metrics using interactive charts.
*   **Agentic AI Core**:
    *   **Sales Agent**: Scans for new RFP opportunities.
    *   **Technical Agent**: Analyzes product specifications and compliance (e.g., matching SKUs against RFP scope).
    *   **Pricing Agent**: Calculates costs, margins, and competitive pricing strategies.
    *   **Orchestrator**: Coordinates the agents to produce a unified output.
*   **Smart Workflows**:
    *   **RFP Upload & Parsing**: Drag-and-drop PDF/Excel parsing to extract metadata automatically.
    *   **AI Classification**: Automated categorization of spend type (CAPEX/OPEX), urgency, and complexity.
    *   **Deep Insights**: Visual breakdown of Technical Feasibility, Pricing Competitiveness, and Risk Assessment (Go/No-Go).
    *   **Proposal Generation**: Auto-generated professional proposals ready for review.
    *   **Approval System**: Multi-level approval workflow allowing executives to Approve/Reject based on AI summaries.
*   **Memory & Learning**: Tracks past outcomes (Won/Lost) to improve future AI recommendations.
*   **Dark Mode UI**: Sleek, modern enterprise interface built with Tailwind CSS and Radix UI.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Animations
*   **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/), [Sonner](https://sonner.emilkowal.ski/) (Toasts)
*   **Charts**: [Recharts](https://recharts.org/)
*   **Database**: MongoDB (via [Prisma ORM](https://www.prisma.io/))
*   **Authentication**: [NextAuth.js](https://next-auth.js.org/) (Credentials & OAuth ready)

## 🏗️ Architecture & Workflow

The system operates on a linear but interactive agentic workflow:

1.  **Ingestion**:
    *   Users can **Upload** an existing RFP document.
    *   Users can **Create** a new RFT (Request for Tender) manually.
    *   Users can **Generate** an RFT using AI prompts.
2.  **Orchestration**: The **Orchestrator Agent** takes the input and delegates tasks:
    *   Calls **Technical Agent** to validate feasibility against product inventory (`src/data/products.json`).
    *   Calls **Pricing Agent** to compute costs based on internal pricing tables (`src/data/pricing.json`).
3.  **Review & Refinement**:
    *   **Classification**: User reviews the AI's categorization and urgency tagging.
    *   **Insights Panel**: Deep dive into the "Why" – visual graphs for Technical Score, Margin Analysis, and Risk Factors.
4.  **Output**:
    *   **Proposal**: A draft document is generated.
    *   **Approval**: Low-risk items may be auto-approved; high-risk items are flagged for human executive review.

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18+)
*   MongoDB instance (Local or Atlas)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Harshith-Daraboina/procure-ai.git
    cd procure-ai
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/procure-ai"
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="your-super-secret-key"
    ```

4.  **Database Setup**:
    Generate the Prisma client:
    ```bash
    npx prisma generate
    ```

5.  **Run the application**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Usage Guide

### 1. Login
*   Navigate to `/login`.
*   You can create a new account via the **Sign Up** link.
*   Or use the demo credentials:
    *   **Email**: `admin@procure.ai`
    *   **Password**: `admin`
*   Select your **Role** (e.g., Procurement, Executive) to see role-specific features.

### 2. Dashboard
*   View high-level metrics: Total RFPs, Pending Actions, Win Rate.
*   Check the **Activity Feed** for recent updates.
*   Use the sidebar to navigate.

### 3. Processing an RFP
*   Go to **Upload RFP** to ingest a document.
*   Once processed, you will be redirected to **Classification** to verify the metadata.
*   Click **Accept** to move to the **Insights** phase.
*   Review the **Technical** and **Pricing** tabs to understand the AI's evaluation.
*   If satisfied, the system generates a proposal in the **Proposals** tab.

### 4. Approvals
*   If you are logged in as an **Executive** or **Finance** officer, check the **Approvals** page.
*   Review pending high-risk proposals.
*   Click **Approve** or **Reject** (inputs are fed back into the system memory).

## 📂 Project Structure

```
src/
├── app/                # Next.js App Router pages
│   ├── api/            # Backend API Routes (Agents, Auth)
│   ├── dashboard/      # Dashboard page
│   ├── login/          # Auth pages
│   ├── rfp/            # RFP workflow pages (Upload, Insights, etc.)
│   └── ...
├── components/         # React components
│   ├── ui/             # Reusable UI primitives (Buttons, Cards, etc.)
│   └── Sidebar.js      # Main navigation
├── data/               # Mock data for agents and prototypes
├── lib/                # Utilities (Prisma, Tailwind merge)
└── types/              # TypeScript definitions (if applicable)
prisma/                 # Database schema
```

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes.
4.  Push to the branch.
5.  Open a Pull Request.

---

Built with ❤️ by Team Antigravity
