"use client";

import React, { useState, useMemo } from "react";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Search,
  CheckCircle2,
  Calendar,
  DollarSign,
  Layers,
  ExternalLink,
  ShieldAlert,
  Hash,
  ChevronDown,
  X,
  Mail,
  HelpCircle,
  Menu,
  Star,
  Zap,
} from "lucide-react";

// ==========================================
// 1. DATA TYPES & LOCAL STATIC CAMPAIGN DATA
// ==========================================

export type Platform = "Instagram" | "TikTok" | "YouTube" | "X";
export type CampaignStatus = "active" | "ending-soon";

export interface Requirement {
  title: string;
  description: string;
}

export interface Campaign {
  id: string;
  title: string;
  brandName: string;
  brandInitials: string;
  shortDescription: string;
  fullOverview: string;
  rewardAmount: string;
  rewardType: "Fixed Cash" | "Product + Cash" | "Performance Bounty";
  platforms: Platform[];
  category: "Tech & AI" | "Lifestyle" | "Gaming" | "FinTech";
  deadline: string;
  status: CampaignStatus;
  externalSubmissionUrl: string; // Typeform, Google Form, or direct link
  hashtags: string[];
  deliverables: string[];
  requirements: Requirement[];
  featured?: boolean;
}

const STATIC_CAMPAIGNS: Campaign[] = [
  {
    id: "hyperion-ai",
    title: "Hyperion AI: Workflow Productivity Launch",
    brandName: "Hyperion Workspace",
    brandInitials: "HW",
    shortDescription:
      "Produce a 60-second tutorial showing how Hyperion cuts daily workspace friction and tab clutter.",
    fullOverview:
      "Hyperion is launching its cross-platform productivity assistant. We are onboarding creators who specialize in desk setups, developer tooling, student workflows, and remote work systems. You will showcase our shortcut command palette and instant context switching.",
    rewardAmount: "$1,200",
    rewardType: "Fixed Cash",
    platforms: ["TikTok", "Instagram", "YouTube"],
    category: "Tech & AI",
    deadline: "Nov 30, 2026",
    status: "active",
    externalSubmissionUrl: "https://forms.gle/sampleHyperionForm",
    hashtags: ["#HyperionAI", "#DeskSetup", "#ProductivityHack"],
    deliverables: [
      "1x High-energy 9:16 vertical video (TikTok or Reel)",
      "Screen capture of command palette action (min. 10s)",
      "Pinned comment containing your custom landing link",
    ],
    requirements: [
      {
        title: "Product Placement",
        description:
          "The desktop interface must appear within the first 3 seconds to ensure viewer hook retention.",
      },
      {
        title: "Authentic Narration",
        description:
          "Voiceover must clearly describe how the tool solved a personal multitasking bottleneck.",
      },
    ],
    featured: true,
  },
  {
    id: "pulse-hydration",
    title: "Pulse Zero-Sugar Performance Hydration",
    brandName: "Pulse Fuel",
    brandInitials: "PF",
    shortDescription:
      "Document your morning workout and clean recharge routine using Pulse hydration electrolyte packs.",
    fullOverview:
      "Pulse Fuel is expanding into high-intensity calisthenics, running, and cycling circles. Creators will receive a custom supply kit plus fixed pay upon brief completion. The objective is to highlight our zero-sugar, natural electrolyte formula in your daily movement routine.",
    rewardAmount: "$850",
    rewardType: "Product + Cash",
    platforms: ["Instagram", "TikTok"],
    category: "Lifestyle",
    deadline: "Nov 15, 2026",
    status: "ending-soon",
    externalSubmissionUrl: "https://forms.gle/samplePulseForm",
    hashtags: ["#PulseHydration", "#DailyGrind", "#MorningFuel"],
    deliverables: [
      "1x Instagram Carousel OR 1x TikTok short showing product preparation",
      "Story sequence linking directly to retail locator page",
    ],
    requirements: [
      {
        title: "Organized Setting",
        description:
          "Show product being mixed in a shaker bottle or glass tumbler in well-lit natural light.",
      },
      {
        title: "FTC Compliance",
        description:
          "Use paid sponsorship disclosure badge (#ad or #sponsored in caption).",
      },
    ],
    featured: true,
  },
  {
    id: "nova-card",
    title: "Nova Virtual Credit & Automated Micro-Investing",
    brandName: "Nova Finance",
    brandInitials: "NF",
    shortDescription:
      "Review Nova's round-up feature for tech-savvy budgeters wanting effortless asset accumulation.",
    fullOverview:
      "Nova offers zero-foreign-exchange cards that round up everyday transactions directly into fractional index portfolios. We are looking for personal finance, creator-business, and tech reviewers to evaluate the card's companion app.",
    rewardAmount: "$2,200",
    rewardType: "Fixed Cash",
    platforms: ["YouTube", "X"],
    category: "FinTech",
    deadline: "Dec 10, 2026",
    status: "active",
    externalSubmissionUrl: "https://forms.gle/sampleNovaForm",
    hashtags: ["#NovaCard", "#SmartInvesting", "#PersonalFinance"],
    deliverables: [
      "1x Dedicated 2-3 min YouTube segment OR a detailed 8-post breakdown on X",
      "Direct inclusion of your verified invite code in video description",
    ],
    requirements: [
      {
        title: "Compliance Requirement",
        description:
          "Must display standard financial risk disclaimer on-screen for at least 4 seconds.",
      },
    ],
    featured: false,
  },
  {
    id: "apex-keyboards",
    title: "Apex Pro-Hall Effect Custom Magnetic Keyboard",
    brandName: "Apex Forge",
    brandInitials: "AF",
    shortDescription:
      "Aesthetic sound tests, switch breakdowns, and competitive gaming latency demonstrations.",
    fullOverview:
      "Apex Forge is debuting its magnetic rapid-trigger keyboard designed for competitive tactical shooters. We want gaming creators and desk aesthetic accounts to create high-resolution sound demos and rapid-trigger response tests.",
    rewardAmount: "$950",
    rewardType: "Product + Cash",
    platforms: ["YouTube", "TikTok"],
    category: "Gaming",
    deadline: "Dec 05, 2026",
    status: "active",
    externalSubmissionUrl: "https://forms.gle/sampleApexForm",
    hashtags: ["#ApexForge", "#CustomKeyboards", "#RapidTrigger"],
    deliverables: [
      "1x High-fidelity ASMR sound test (min. 30 seconds)",
      "1x B-roll compilation highlighting the machined aluminum chassis",
    ],
    requirements: [
      {
        title: "Audio Quality",
        description:
          "Clear, isolated mic recording without distracting background music during typing demonstration.",
      },
    ],
    featured: true,
  },
];

const FAQS = [
  {
    q: "Do I need to register an account or connect a wallet?",
    a: "No. LERM is a static directory. You inspect the public brief, check all guidelines, and apply directly via the brand's verified external submission form.",
  },
  {
    q: "Does LERM deduct agency or platform fees from payouts?",
    a: "No. 100% of the agreed compensation goes directly from the brand partner to the creator through their specified payout methods (ACH, PayPal, or invoice).",
  },
  {
    q: "How are campaigns vetted on LERM?",
    a: "Every campaign listed in our repository undergoes editorial verification to guarantee active brand representation, legitimate deliverables, and secured budgets.",
  },
  {
    q: "How does our company add a brief to LERM?",
    a: "Submit your campaign requirements to our team via the Support section. Upon approval, our maintainers add the brief directly to our static codebase.",
  },
];

// ==========================================
// 2. MAIN SINGLE-PAGE COMPONENT
// ==========================================

export default function LermSinglePage() {
  // Client state
  const [selectedPlatform, setSelectedPlatform] = useState<"All" | Platform>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalCampaign, setActiveModalCampaign] = useState<Campaign | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Platform & Category lists
  const platforms: ("All" | Platform)[] = ["All", "TikTok", "Instagram", "YouTube", "X"];
  const categories = ["All", "Tech & AI", "Lifestyle", "Gaming", "FinTech"];

  // Filtered campaigns
  const filteredCampaigns = useMemo(() => {
    return STATIC_CAMPAIGNS.filter((campaign) => {
      const matchesSearch =
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPlatform =
        selectedPlatform === "All" || campaign.platforms.includes(selectedPlatform);

      const matchesCategory =
        selectedCategory === "All" || campaign.category === selectedCategory;

      return matchesSearch && matchesPlatform && matchesCategory;
    });
  }, [searchQuery, selectedPlatform, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#090A0F] text-zinc-100 font-sans selection:bg-[#8B5CF6] selection:text-white relative">
      {/* Background Accent Gradients */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#8B5CF6]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[300px] bg-purple-900/10 blur-[160px] pointer-events-none rounded-full" />

      {/* ==================== HEADER ==================== */}
      <header className="sticky top-0 z-40 w-full border-b border-[#1E2230]/80 bg-[#090A0F]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6D28D9] to-[#8B5CF6] flex items-center justify-center font-black text-white text-base shadow-[0_0_15px_rgba(139,92,246,0.5)]">
              L
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-zinc-200 transition">
              LERM<span className="text-[#8B5CF6]">.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#campaigns" className="hover:text-white transition">
              Campaigns
            </a>
            <a href="#how-it-works" className="hover:text-white transition">
              How It Works
            </a>
            <a href="#about" className="hover:text-white transition">
              About
            </a>
            <a href="#faq" className="hover:text-white transition">
              FAQ
            </a>
            <a href="#support" className="hover:text-white transition">
              Support
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#campaigns"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#11131A] hover:bg-[#1E2230] border border-[#1E2230] rounded-full transition"
            >
              Explore Briefs
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#11131A] border border-[#1E2230] text-zinc-300"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#1E2230] bg-[#090A0F] px-6 py-4 space-y-3">
            <a
              href="#campaigns"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-zinc-300 hover:text-white"
            >
              Campaigns
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-zinc-300 hover:text-white"
            >
              How It Works
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-zinc-300 hover:text-white"
            >
              About
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-zinc-300 hover:text-white"
            >
              FAQ
            </a>
            <a
              href="#support"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-zinc-300 hover:text-white"
            >
              Support
            </a>
          </div>
        )}
      </header>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative pt-20 pb-16 px-6 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11131A] border border-[#1E2230] text-xs text-zinc-300">
            <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>High-Yield Brand Partnerships • Zero Commission Cut</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            Direct Brand Campaigns. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-[#8B5CF6] to-indigo-400">
              No Logins. No Intermediaries.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 leading-relaxed">
            LERM connects creators with verified, direct sponsorship briefs. Browse
            transparent compensation, inspect content requirements, and apply directly to brand leads.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#campaigns"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] transition shadow-[0_0_25px_rgba(139,92,246,0.35)]"
            >
              Explore Active Campaigns
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-semibold text-zinc-300 bg-[#11131A] hover:bg-[#1E2230] border border-[#1E2230] transition"
            >
              3-Step Workflow
            </a>
          </div>
        </div>
      </section>

      {/* ==================== METRICS BAR ==================== */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-[#11131A] border border-[#1E2230]">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">$450K+</div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold mt-0.5">
              Creator Payouts
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold mt-0.5">
              Direct Payouts (0% Cut)
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">4.2K+</div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold mt-0.5">
              Active Creators
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">Instant</div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold mt-0.5">
              Brief Access
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CAMPAIGN HUB SECTION ==================== */}
      <section id="campaigns" className="max-w-7xl mx-auto px-6 mb-28 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#8B5CF6] uppercase tracking-widest">
              Live Opportunities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              Active Campaign Briefs
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-lg">
              Click any card to review full guidelines, asset requirements, and direct application links.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#11131A] border border-[#1E2230] mb-8 flex flex-col lg:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by brand or brief topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#090A0F] border border-[#1E2230] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#8B5CF6] transition"
            />
          </div>

          {/* Platform Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
            {platforms.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPlatform(p)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition ${
                  selectedPlatform === p
                    ? "bg-[#8B5CF6] text-white shadow-sm"
                    : "bg-[#090A0F] text-zinc-400 hover:text-white border border-[#1E2230]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
            <span className="text-xs text-zinc-500">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#090A0F] border border-[#1E2230] text-zinc-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Campaign Cards Grid */}
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((camp) => (
              <article
                key={camp.id}
                className="group relative rounded-2xl bg-[#11131A] border border-[#1E2230] hover:border-[#8B5CF6]/50 transition-all duration-300 p-6 flex flex-col justify-between hover:shadow-[0_10px_30px_-10px_rgba(139,92,246,0.15)]"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#1E2230] border border-white/5 flex items-center justify-center font-bold text-xs text-[#8B5CF6]">
                        {camp.brandInitials}
                      </div>
                      <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                        {camp.brandName}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        camp.status === "ending-soon"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      }`}
                    >
                      {camp.status === "ending-soon" ? "Ending Soon" : "Active"}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition line-clamp-1 mb-2">
                    {camp.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-5">
                    {camp.shortDescription}
                  </p>

                  {/* Platforms */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {camp.platforms.map((plat) => (
                      <span
                        key={plat}
                        className="text-[11px] bg-[#090A0F] text-zinc-300 px-2 py-0.5 rounded-md border border-[#1E2230]"
                      >
                        {plat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-[#1E2230]/60 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">
                      Reward
                    </span>
                    <div className="flex items-center text-sm font-extrabold text-white">
                      <DollarSign className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      {camp.rewardAmount}
                      <span className="text-zinc-500 text-[11px] font-normal ml-1">
                        • {camp.rewardType}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveModalCampaign(camp)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#1E2230] hover:bg-[#8B5CF6] px-3.5 py-2 rounded-lg transition"
                  >
                    View Brief
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#11131A] rounded-2xl border border-[#1E2230]">
            <p className="text-sm font-bold text-zinc-300">No campaigns found</p>
            <p className="text-xs text-zinc-500 mt-1">
              Try adjusting your search criteria or platform filters.
            </p>
          </div>
        )}
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 mb-28 scroll-mt-24">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#8B5CF6] uppercase tracking-widest">
            Streamlined Protocol
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
            How LERM Works
          </h2>
          <p className="text-xs text-zinc-400 mt-2">
            No registration gating, no credit system, and no payout delay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#11131A] border border-[#1E2230]">
            <div className="w-8 h-8 rounded-lg bg-[#1E2230] text-[#8B5CF6] font-black text-sm flex items-center justify-center mb-6">
              01
            </div>
            <h3 className="text-base font-bold text-white mb-2">Review Briefs Publicly</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Scan active campaigns filtered by niche and platform. Review the compensation, deliverables, and hashtags upfront.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#11131A] border border-[#1E2230]">
            <div className="w-8 h-8 rounded-lg bg-[#1E2230] text-[#8B5CF6] font-black text-sm flex items-center justify-center mb-6">
              02
            </div>
            <h3 className="text-base font-bold text-white mb-2">Produce & Submit Direct</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Use the external submission link on the brief to send your video link or creative pitch straight to the brand manager.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#11131A] border border-[#1E2230]">
            <div className="w-8 h-8 rounded-lg bg-[#1E2230] text-[#8B5CF6] font-black text-sm flex items-center justify-center mb-6">
              03
            </div>
            <h3 className="text-base font-bold text-white mb-2">Direct Settlement</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Get compensated directly by the sponsoring company with zero platform commissions or escrow holds.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== SOCIAL PROOF ==================== */}
      <section className="max-w-7xl mx-auto px-6 mb-28">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#11131A] border border-[#1E2230] grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-zinc-300 italic leading-relaxed mb-4">
              "The lack of account sign-ups is refreshing. I applied to the Hyperion sprint via their form and got my invoice paid directly in 5 days."
            </p>
            <p className="text-xs font-bold text-white">Alex Rivera</p>
            <p className="text-[10px] text-zinc-500">Tech & Workflow Creator (140K)</p>
          </div>

          <div>
            <div className="flex gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-zinc-300 italic leading-relaxed mb-4">
              "As a lifestyle creator, I avoid marketplaces taking 20%. LERM has zero middleman fees and verified brand briefs."
            </p>
            <p className="text-xs font-bold text-white">Maya Jenkins</p>
            <p className="text-[10px] text-zinc-500">Fitness & Lifestyle (85K)</p>
          </div>

          <div>
            <div className="flex gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-zinc-300 italic leading-relaxed mb-4">
              "Our brand filled all 10 sponsorship slots within 72 hours of listing on LERM. Clean static distribution at its best."
            </p>
            <p className="text-xs font-bold text-white">Julian Vance</p>
            <p className="text-[10px] text-zinc-500">Head of Growth, Hyperion</p>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="max-w-4xl mx-auto px-6 mb-28 scroll-mt-24 space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-[#8B5CF6] uppercase tracking-widest">
            Architecture
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
            Why LERM Is 100% Static
          </h2>
        </div>

        <div className="p-8 rounded-2xl bg-[#11131A] border border-[#1E2230] space-y-4 text-xs text-zinc-300 leading-relaxed">
          <p>
            Traditional creator platforms force creators through mandatory OAuth logins,
            extract 15-30% platform margins, and lock payouts inside internal wallet interfaces.
          </p>
          <p>
            <strong>LERM (Lightweight Electronic Reward Medium)</strong> was engineered with a radical
            simplicity constraint: <em>No backend server, no database, no authentication tokens, and no stored cookies</em>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230]">
              <span className="font-bold text-white block mb-1">Sub-Second Load Time</span>
              Compiled into pure static assets, accessible anywhere on global CDNs.
            </div>
            <div className="p-4 rounded-xl bg-[#090A0F] border border-[#1E2230]">
              <span className="font-bold text-white block mb-1">Privacy Sovereign</span>
              Zero analytics tracking, zero password storage, zero data harvesting.
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section id="faq" className="max-w-3xl mx-auto px-6 mb-28 scroll-mt-24 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#8B5CF6] uppercase tracking-widest">
            Common Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-[#1E2230] rounded-xl bg-[#11131A] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between text-sm font-semibold text-white hover:text-zinc-200"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#8B5CF6]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-zinc-400 leading-relaxed border-t border-[#1E2230]/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================== SUPPORT & BRAND SUBMISSIONS ==================== */}
      <section id="support" className="max-w-4xl mx-auto px-6 mb-28 scroll-mt-24 space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-[#8B5CF6] uppercase tracking-widest">
            Connect
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Submit a Brief or Contact Support
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#11131A] border border-[#1E2230] space-y-3">
            <Mail className="w-5 h-5 text-[#8B5CF6]" />
            <h3 className="text-sm font-bold text-white">For Sponsoring Brands</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Have an active product or software campaign? Send brief parameters, compensation rate, and submission forms directly.
            </p>
            <a
              href="mailto:campaigns@lerm.io"
              className="text-xs font-semibold text-[#8B5CF6] hover:underline inline-block pt-1"
            >
              campaigns@lerm.io →
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-[#11131A] border border-[#1E2230] space-y-3">
            <HelpCircle className="w-5 h-5 text-[#8B5CF6]" />
            <h3 className="text-sm font-bold text-white">General Inquiries</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Report an inactive campaign link, suggest a static feature, or inquire about editorial curation.
            </p>
            <a
              href="mailto:contact@lerm.io"
              className="text-xs font-semibold text-[#8B5CF6] hover:underline inline-block pt-1"
            >
              contact@lerm.io →
            </a>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-[#1E2230] bg-[#090A0F] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-white">
              LERM<span className="text-[#8B5CF6]">.</span>
            </span>
            <span>— The Static Campaign Platform</span>
          </div>

          <div className="flex gap-6">
            <a href="#campaigns" className="hover:text-zinc-300">
              Briefs
            </a>
            <a href="#about" className="hover:text-zinc-300">
              About
            </a>
            <a href="#faq" className="hover:text-zinc-300">
              FAQ
            </a>
            <a href="#support" className="hover:text-zinc-300">
              Contact
            </a>
          </div>

          <p>© {new Date().getFullYear()} LERM Static. All rights reserved.</p>
        </div>
      </footer>

      {/* ====================================================
          MODAL: CAMPAIGN DETAIL (SLIDE-OVER / DETAIL VIEW)
          ==================================================== */}
      {activeModalCampaign && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in"
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] bg-[#11131A] border border-[#1E2230] rounded-3xl overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalCampaign(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#090A0F] border border-[#1E2230] text-zinc-400 hover:text-white transition"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase font-bold text-[#8B5CF6] tracking-wider px-2 py-0.5 rounded bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
                  {activeModalCampaign.category}
                </span>
                <span className="text-xs text-zinc-400">• Sponsored by {activeModalCampaign.brandName}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white pr-10">
                {activeModalCampaign.title}
              </h2>
            </div>

            {/* Payout & Deadline Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#090A0F] border border-[#1E2230]">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block font-bold">Reward</span>
                <span className="text-base font-black text-emerald-400">
                  {activeModalCampaign.rewardAmount}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block font-bold">Type</span>
                <span className="text-xs font-semibold text-zinc-200">
                  {activeModalCampaign.rewardType}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block font-bold">Deadline</span>
                <span className="text-xs font-semibold text-zinc-200">
                  {activeModalCampaign.deadline}
                </span>
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Campaign Brief Overview
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {activeModalCampaign.fullOverview}
              </p>
            </div>

            {/* Deliverables Checklist */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#8B5CF6]" /> Required Deliverables
              </h3>
              <ul className="space-y-1.5">
                {activeModalCampaign.deliverables.map((item, i) => (
                  <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Guidelines & Rules
              </h3>
              <div className="space-y-2">
                {activeModalCampaign.requirements.map((req, i) => (
                  <div key={i} className="p-3 rounded-lg bg-[#090A0F] border border-[#1E2230]">
                    <div className="text-xs font-semibold text-white">{req.title}</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">{req.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mandatory Hashtags */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-[#8B5CF6]" /> Mandatory Hashtags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {activeModalCampaign.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono bg-[#090A0F] px-2.5 py-1 rounded border border-[#1E2230] text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* External Submission Action */}
            <div className="pt-4 border-t border-[#1E2230] space-y-3">
              <div className="flex items-center gap-2 text-[11px] text-amber-300/90 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>
                  No platform cut. Direct communication and payout handled directly by{" "}
                  <strong>{activeModalCampaign.brandName}</strong>.
                </span>
              </div>

              <a
                href={activeModalCampaign.externalSubmissionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-xs font-bold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] transition shadow-lg shadow-[#8B5CF6]/20"
              >
                Apply via Official Brief Form
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
