import React, { useState, useEffect } from 'react';
import './App.css';

// ─── Icons ────────────────────────────────────────────────────────────────────
const FlowenLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 bg-[#FF5C00] rounded-lg flex items-center justify-center">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" opacity="0.6" />
        <path d="M7.5 9L12 4.5L16.5 9L12 13.5L7.5 9Z" fill="white" />
      </svg>
    </div>
    <span className="text-xl font-bold text-gray-900">Flowen</span>
  </div>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-[#FF5C00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const ArrowRight = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const ChevronRight = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// ─── Custom Event for Auth Modal ──────────────────────────────────────────────
export const openAuth = (type: 'signin' | 'signup') => {
  window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: type }));
};

// ─── Auth Modal ─────────────────────────────────────────────────────────────
const AuthModal = ({ type, onClose }: { type: 'signin' | 'signup'; onClose: () => void }) => {
  const isSignIn = type === 'signin';
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-6 top-6 text-gray-400 hover:text-gray-900">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div className="mb-8">
          <div className="flex justify-center mb-6"><FlowenLogo /></div>
          <h2 className="text-2xl font-black text-gray-900 text-center">{isSignIn ? 'Welcome back' : 'Create your account'}</h2>
          <p className="text-sm text-gray-500 text-center mt-2">{isSignIn ? 'Enter your details to sign in.' : 'Start your 14-day free trial.'}</p>
        </div>
        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          {!isSignIn && (
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Full Name</label>
              <input type="text" placeholder="Alex Kim" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#FF5C00] focus:ring-2 focus:ring-orange-100 transition-all" />
            </div>
          )}
          <div>
            <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Work Email</label>
            <input type="email" placeholder="alex@company.com" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#FF5C00] focus:ring-2 focus:ring-orange-100 transition-all" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-700 block">Password</label>
              {isSignIn && <button type="button" className="text-xs text-[#FF5C00] font-semibold hover:underline">Forgot password?</button>}
            </div>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#FF5C00] focus:ring-2 focus:ring-orange-100 transition-all" />
          </div>
          <button className="w-full btn-orange text-white font-bold py-3 rounded-xl text-sm transition-all duration-200 mt-2">
            {isSignIn ? 'Sign In' : 'Get Started'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          {isSignIn ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => openAuth(isSignIn ? 'signup' : 'signin')} className="text-[#FF5C00] font-semibold hover:underline">
            {isSignIn ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <FlowenLogo />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Features', id: 'revenue' },
              { label: 'Pricing', id: 'pricing' },
              { label: 'Resources', id: 'resources' },
              { label: 'Contact', id: 'contact' },
            ].map(({ label, id }) => (
              <button
                key={label}
                onClick={() => scrollTo(id)}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => openAuth('signin')} className="text-sm font-medium text-gray-700 hover:text-gray-900 px-4 py-2 transition-colors">
              Sign in
            </button>
            <button
              onClick={() => openAuth('signup')}
              className="btn-orange text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200"
            >
              Start For Free
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            <div className={`w-5 h-0.5 bg-gray-700 mb-1 transition-all ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 bg-gray-700 mb-1 transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-gray-700 transition-all ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-3">
            {[
              { label: 'Features', id: 'revenue' },
              { label: 'Pricing', id: 'pricing' },
              { label: 'Resources', id: 'resources' },
              { label: 'Contact', id: 'contact' },
            ].map(({ label, id }) => (
              <button key={label} onClick={() => scrollTo(id)} className="block w-full text-left text-sm font-medium text-gray-700 py-2">
                {label}
              </button>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button onClick={() => { setMobileOpen(false); openAuth('signin'); }} className="text-sm font-medium text-gray-700 py-2">Sign in</button>
              <button onClick={() => { setMobileOpen(false); openAuth('signup'); }} className="btn-orange text-white text-sm font-semibold px-5 py-2.5 rounded-xl w-full">Start For Free</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// ─── Dashboard Preview ────────────────────────────────────────────────────────
const DashboardPreview = () => {
  const bars = [
    { completed: 55, progress: 35 },
    { completed: 80, progress: 50 },
    { completed: 45, progress: 70 },
    { completed: 95, progress: 55 },
    { completed: 60, progress: 40 },
    { completed: 70, progress: 45 },
  ];

  return (
    <div className="bg-white rounded-2xl dashboard-shadow overflow-hidden border border-gray-100 w-full max-w-3xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-[#FF5C00] rounded-md flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
              <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" opacity="0.6" />
              <path d="M7.5 9L12 4.5L16.5 9L12 13.5L7.5 9Z" fill="white" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-800">Flowen</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-gray-400">Home / <span className="text-gray-600">Dashboard</span></div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center">
              <span className="text-xs font-bold text-white">A</span>
            </div>
            <span className="text-xs font-medium text-gray-700 hidden sm:block">Alex Kim</span>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden sm:block w-44 border-r border-gray-100 p-3 shrink-0">
          <div className="relative mb-3">
            <input className="w-full text-xs bg-gray-50 rounded-lg px-3 py-2 pr-8 text-gray-500 border border-gray-200 outline-none" placeholder="Search" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">⌘K</span>
          </div>
          <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1 px-2">Daily Operation</div>
          {[
            { label: 'Dashboard', icon: '⊡', active: true },
            { label: 'My Deals', icon: '◈' },
            { label: 'Contacts', icon: '◎' },
            { label: 'Opportunities', icon: '◉' },
            { label: 'Activities', icon: '◆' },
            { label: 'Automations', icon: '⚙' },
          ].map(({ label, icon, active }) => (
            <div key={label} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg mb-0.5 cursor-pointer text-xs ${active ? 'bg-orange-50 text-[#FF5C00] font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
              <span className="text-sm">{icon}</span>
              <span>{label}</span>
            </div>
          ))}
          <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1 px-2 mt-3">Accounting</div>
          {[{ label: 'Report', icon: '▦' }, { label: 'Maintenance', icon: '⚒' }].map(({ label, icon }) => (
            <div key={label} className="flex items-center gap-2 px-2 py-1.5 rounded-lg mb-0.5 cursor-pointer text-xs text-gray-600 hover:bg-gray-50">
              <span className="text-sm">{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-900">Dashboard</h3>
            <div className="flex gap-2">
              <button className="text-xs text-gray-600 border border-gray-200 rounded-lg px-2.5 py-1">Assigned Task</button>
              <button className="text-xs text-white btn-orange rounded-lg px-2.5 py-1 font-medium">New Workflow</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Pipeline Activity */}
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-700">Pipeline Activity</span>
                <span className="text-xs text-gray-400 bg-white border border-gray-200 rounded-md px-2 py-0.5">Weekly ▾</span>
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-xl font-bold text-gray-900">274</span>
                <span className="text-xs text-emerald-500 font-medium">+3% vs last week</span>
              </div>
              <div className="flex items-end gap-1 h-16">
                {bars.map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end gap-0.5">
                    <div className="rounded-t-sm" style={{ height: `${bar.progress * 0.6}%`, background: 'rgba(255,92,0,0.5)', minHeight: 4 }} />
                    <div className="rounded-t-sm" style={{ height: `${bar.completed * 0.6}%`, background: '#FF5C00', minHeight: 6 }} />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-2">
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#FF5C00] inline-block" /><span className="text-[10px] text-gray-500">Completed</span></div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-orange-300 inline-block" /><span className="text-[10px] text-gray-500">In Progress</span></div>
              </div>
            </div>

            {/* Deal Stage Status */}
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-700">Deal Stage Status</span>
              </div>
              <div className="flex items-center justify-center mb-2">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#FF5C00" strokeWidth="3" strokeDasharray="75 25" strokeLinecap="round" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#FFA366" strokeWidth="3" strokeDasharray="15 85" strokeDashoffset="-75" strokeLinecap="round" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#FFD9C2" strokeWidth="3" strokeDasharray="10 90" strokeDashoffset="-90" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[9px] text-gray-500">Total</span>
                    <span className="text-sm font-bold text-gray-900">150</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                {[
                  { label: 'Closed Won', color: '#FF5C00', pct: '75%' },
                  { label: 'Negotiation', color: '#FFA366', pct: '15%' },
                  { label: 'Prospecting', color: '#FFD9C2', pct: '10%' },
                ].map(({ label, color, pct }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ background: color }} />
                    <span className="text-[10px] text-gray-500 flex-1">{label}</span>
                    <span className="text-[10px] font-medium text-gray-700">{pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Hero Section ─────────────────────────────────────────────────────────────
const HeroSection = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-start pt-28 pb-0 overflow-hidden bg-[#f8f6f3] bg-grid-pattern hero-gradient">
    {/* Floating avatars */}
    <div className="float-1 absolute left-[8%] top-[32%] hidden lg:flex items-center gap-1.5 bg-white rounded-full pl-1 pr-3 py-1 shadow-md border border-gray-100">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white">J</div>
      <span className="text-xs font-semibold text-gray-700">Jenny</span>
      <svg className="w-3.5 h-3.5 text-purple-400 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L8 12H2l8 6-3 10 7-5 7 5-3-10 8-6h-6z" /></svg>
    </div>
    <div className="float-2 absolute left-[6%] top-[52%] hidden lg:flex items-center gap-1.5 bg-white rounded-full pl-1 pr-3 py-1 shadow-md border border-gray-100">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-xs font-bold text-white">E</div>
      <span className="text-xs font-semibold text-gray-700">Emma</span>
      <svg className="w-3.5 h-3.5 text-indigo-400 ml-0.5 rotate-45" viewBox="0 0 24 24" fill="currentColor"><path d="M2 12L22 2 12 22 10 14z" /></svg>
    </div>
    <div className="float-3 absolute right-[8%] top-[30%] hidden lg:flex items-center gap-1.5 bg-white rounded-full pl-1 pr-3 py-1 shadow-md border border-gray-100">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-xs font-bold text-white">C</div>
      <span className="text-xs font-semibold text-gray-700">Conner</span>
      <svg className="w-3.5 h-3.5 text-emerald-400 ml-0.5 -rotate-45" viewBox="0 0 24 24" fill="currentColor"><path d="M2 12L22 2 12 22 10 14z" /></svg>
    </div>
    <div className="float-4 absolute right-[7%] top-[52%] hidden lg:flex items-center gap-1.5 bg-white rounded-full pl-1 pr-3 py-1 shadow-md border border-gray-100">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center text-xs font-bold text-white">M</div>
      <span className="text-xs font-semibold text-gray-700">Maria</span>
      <svg className="w-3.5 h-3.5 text-orange-400 ml-0.5 rotate-12" viewBox="0 0 24 24" fill="currentColor"><path d="M2 12L22 2 12 22 10 14z" /></svg>
    </div>

    {/* Badge */}
    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 mb-8 shadow-sm">
      <span className="bg-[#FF5C00] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">New</span>
      <span className="text-sm text-gray-600">Trusted by 999+ growing B2B teams</span>
      <ChevronRight />
    </div>

    {/* Heading */}
    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 text-center leading-[1.05] tracking-tight max-w-3xl px-4 mb-6">
      The CRM Built to Turn<br />
      Pipeline Into{' '}
      <span className="text-[#FF5C00]">Revenue</span>
    </h1>

    {/* Subheading */}
    <p className="text-base sm:text-lg text-gray-500 text-center max-w-xl px-4 mb-10 leading-relaxed">
      Bring every deal, contact, and rep into one aligned workspace,<br className="hidden sm:block" />
      so nothing slips and every quarter closes strong
    </p>

    {/* CTAs */}
    <div className="flex flex-col sm:flex-row items-center gap-3 mb-16 px-4">
      <button onClick={() => openAuth('signup')} className="btn-orange text-white font-bold px-8 py-3.5 rounded-2xl text-base transition-all duration-200 w-full sm:w-auto">
        Start For Free
      </button>
      <button className="bg-white text-gray-800 font-bold px-8 py-3.5 rounded-2xl text-base border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 w-full sm:w-auto">
        Book a Demo
      </button>
    </div>

    {/* Dashboard preview */}
    <div className="w-full max-w-5xl mx-auto px-4">
      <DashboardPreview />
    </div>
  </section>
);

// ─── Revenue / Stats Section ──────────────────────────────────────────────────
const RevenueSection = () => {
  const stats = [
    { value: '3.2x', label: 'Average Revenue Growth', sub: 'Teams see 3x pipeline-to-revenue conversion within 6 months' },
    { value: '68%', label: 'Faster Deal Cycles', sub: 'Cut time-to-close dramatically with automated follow-ups and insights' },
    { value: '999+', label: 'B2B Teams Trust Flowen', sub: 'From seed-stage startups to enterprise sales floors worldwide' },
    { value: '99.9%', label: 'Platform Uptime', sub: 'Enterprise-grade reliability so your team never misses a moment' },
  ];

  const features = [
    {
      icon: '🎯',
      title: 'Intelligent Pipeline Management',
      desc: 'Visualize every deal stage in real-time. Drag-and-drop boards with probability scoring and automated stage transitions.',
    },
    {
      icon: '⚡',
      title: 'Revenue Automation',
      desc: 'Set triggers, sequences, and workflows once. Let Flowen handle follow-ups, reminders, and task assignments automatically.',
    },
    {
      icon: '📊',
      title: 'Revenue Analytics & Forecasting',
      desc: 'AI-powered forecasting with historical trends, rep performance dashboards, and live quota tracking.',
    },
    {
      icon: '🤝',
      title: 'Contact Intelligence',
      desc: 'Enrich every contact automatically. See interaction history, email opens, and relationship strength scores in one view.',
    },
    {
      icon: '🔔',
      title: 'Smart Alerts & Nudges',
      desc: 'Get notified when deals go cold, contacts haven\'t been touched, or a competitor is spotted in your pipeline.',
    },
    {
      icon: '🔗',
      title: 'Deep Integrations',
      desc: 'Connects natively with Slack, Gmail, HubSpot, Salesforce, Zapier, and 100+ more tools your team already uses.',
    },
  ];

  return (
    <section id="revenue" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-orange-50 text-[#FF5C00] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-[#FF5C00] rounded-full" />
            Revenue Engine
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Numbers That Speak for Themselves
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Flowen customers consistently outperform industry benchmarks — faster closes, higher conversion, and stronger forecasting accuracy.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map(({ value, label, sub }) => (
            <div key={label} className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 card-hover">
              <div className="text-4xl font-black text-[#FF5C00] mb-2">{value}</div>
              <div className="text-sm font-bold text-gray-900 mb-1">{label}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{sub}</div>
            </div>
          ))}
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl border border-gray-100 bg-white card-hover cursor-default">
              <div className="text-3xl mb-4">{icon}</div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Resources Section ────────────────────────────────────────────────────────
const ResourcesSection = () => {
  const resources = [
    {
      tag: 'Guide',
      title: 'The Complete B2B Sales Pipeline Playbook',
      desc: 'Everything you need to build, manage, and accelerate a pipeline that consistently closes — from first touch to signed contract.',
      time: '12 min read',
      color: 'bg-orange-50',
      tagColor: 'text-[#FF5C00] bg-orange-100',
    },
    {
      tag: 'Case Study',
      title: 'How Nexara Grew ARR by 2.8x in One Quarter',
      desc: "A deep dive into how Nexara's sales team rebuilt their pipeline workflow with Flowen and unlocked explosive growth.",
      time: '8 min read',
      color: 'bg-blue-50',
      tagColor: 'text-blue-600 bg-blue-100',
    },
    {
      tag: 'Webinar',
      title: 'Live: Forecasting Revenue Without the Guesswork',
      desc: 'Join our revenue experts for a live session on using predictive analytics to nail your Q3 forecast with confidence.',
      time: '45 min watch',
      color: 'bg-purple-50',
      tagColor: 'text-purple-600 bg-purple-100',
    },
    {
      tag: 'Template',
      title: 'Sales Pipeline Template for SaaS Teams',
      desc: 'A ready-to-import Flowen pipeline template designed for SaaS sales cycles — free for all users.',
      time: 'Free download',
      color: 'bg-emerald-50',
      tagColor: 'text-emerald-600 bg-emerald-100',
    },
    {
      tag: 'Blog',
      title: '7 Signs Your CRM Is Killing Your Pipeline',
      desc: 'Legacy CRMs create friction, not flow. Learn the warning signs and what modern teams do differently.',
      time: '6 min read',
      color: 'bg-amber-50',
      tagColor: 'text-amber-600 bg-amber-100',
    },
    {
      tag: 'Docs',
      title: 'Getting Started: Flowen Onboarding Guide',
      desc: 'Step-by-step setup for teams migrating from Salesforce, HubSpot, or a spreadsheet. Go live in under an hour.',
      time: 'Interactive guide',
      color: 'bg-rose-50',
      tagColor: 'text-rose-600 bg-rose-100',
    },
  ];

  return (
    <section id="resources" className="py-24 bg-[#f8f6f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-white text-[#FF5C00] text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-orange-100">
            <span className="w-1.5 h-1.5 bg-[#FF5C00] rounded-full" />
            Resources
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Learn, Grow, and Close More
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Guides, case studies, templates, and expert content — everything your team needs to master modern B2B sales.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map(({ tag, title, desc, time, color, tagColor }) => (
            <div key={title} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className={`${color} p-6 rounded-2xl border border-white/80 card-hover cursor-pointer group`}>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tagColor}`}>{tag}</span>
                <span className="text-xs text-gray-400">{time}</span>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#FF5C00] transition-colors">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{desc}</p>
              <div className="flex items-center text-[#FF5C00] text-sm font-semibold gap-1">
                Read more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Pricing Section ──────────────────────────────────────────────────────────
const PricingSection = () => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      price: annual ? 29 : 39,
      desc: 'Perfect for individual reps and early-stage teams just getting started.',
      features: [
        'Up to 3 users',
        '500 contacts',
        'Basic pipeline view',
        'Email integration',
        'Mobile app access',
        'Standard support',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Growth',
      price: annual ? 79 : 99,
      desc: 'For growing teams that need automation, analytics, and deeper integrations.',
      features: [
        'Up to 20 users',
        'Unlimited contacts',
        'Advanced pipelines',
        'Workflow automation',
        'Revenue analytics',
        'CRM integrations',
        'Priority support',
        'Custom fields & tags',
      ],
      cta: 'Start For Free',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: annual ? 199 : 249,
      desc: 'Full-featured for large sales orgs with custom needs and dedicated support.',
      features: [
        'Unlimited users',
        'Unlimited contacts',
        'Custom pipelines',
        'AI forecasting',
        'Advanced automations',
        'SSO & SAML',
        'Dedicated CSM',
        'SLA & custom contract',
        'On-prem option',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-orange-50 text-[#FF5C00] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-[#FF5C00] rounded-full" />
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
            No hidden fees. No surprise overages. Pick the plan that fits your team and start closing more today.
          </p>
          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setAnnual(false)}
              className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all ${!annual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${annual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
            >
              Annual
              <span className="bg-emerald-100 text-emerald-600 text-xs font-bold px-1.5 py-0.5 rounded-full">Save 25%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map(({ name, price, desc, features, cta, popular }) => (
            <div
              key={name}
              className={`relative rounded-2xl p-8 flex flex-col ${popular ? 'pricing-popular text-white shadow-2xl scale-105' : 'bg-gray-50 border border-gray-100'}`}
            >
              {popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[#FF5C00] text-xs font-bold px-4 py-1.5 rounded-full shadow-md border border-orange-100">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className={`text-xl font-black mb-1 ${popular ? 'text-white' : 'text-gray-900'}`}>{name}</h3>
                <p className={`text-sm ${popular ? 'text-orange-100' : 'text-gray-500'}`}>{desc}</p>
              </div>
              <div className="mb-8">
                <span className={`text-5xl font-black ${popular ? 'text-white' : 'text-gray-900'}`}>${price}</span>
                <span className={`text-sm ml-1 ${popular ? 'text-orange-100' : 'text-gray-500'}`}>/mo per user</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    {popular ? (
                      <svg className="w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <CheckIcon />
                    )}
                    <span className={`text-sm ${popular ? 'text-orange-50' : 'text-gray-600'}`}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  if (cta === 'Start For Free' || cta === 'Get Started') openAuth('signup');
                }}
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${popular
                    ? 'bg-white text-[#FF5C00] hover:bg-orange-50'
                    : 'btn-orange text-white'
                  }`}
              >
                {cta}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">All plans include a 14-day free trial. No credit card required.</p>
      </div>
    </section>
  );
};

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'VP of Sales, Nexara',
      avatar: 'S',
      color: 'from-pink-400 to-rose-500',
      quote: 'We switched from Salesforce and cut our admin time in half. The pipeline view alone is worth every dollar — our team actually uses the CRM now.',
    },
    {
      name: 'Marcus Reid',
      role: 'Founder, PitchLab',
      avatar: 'M',
      color: 'from-blue-400 to-indigo-500',
      quote: 'Flowen\'s automation workflows replaced 3 different tools for us. Deals move faster and nothing falls through the cracks anymore.',
    },
    {
      name: 'Priya Mehta',
      role: 'Head of Revenue, Stackify',
      avatar: 'P',
      color: 'from-emerald-400 to-teal-500',
      quote: 'The forecasting accuracy is incredible. I finally have confidence going into board meetings because the data is actually trustworthy.',
    },
  ];

  return (
    <div className="bg-[#f8f6f3] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex justify-center gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
          </div>
          <p className="text-sm text-gray-500">Loved by 999+ B2B sales teams</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, avatar, color, quote }) => (
            <div key={name} className="bg-white rounded-2xl p-6 border border-gray-100 card-hover">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">"{quote}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{name}</div>
                  <div className="text-xs text-gray-500">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Contact Section ──────────────────────────────────────────────────────────
const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-2 bg-orange-50 text-[#FF5C00] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-[#FF5C00] rounded-full" />
              Contact Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
              Let's Talk Revenue
            </h2>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              Whether you're ready to start, want to see a live demo, or just have questions — our team is here. Expect a reply within 1 business day.
            </p>
            <div className="space-y-5">
              {[
                { icon: '📧', title: 'Email Us', sub: 'shunebauzoechina@gmail.com' },
                { icon: '📞', title: 'Call Sales', sub: '+234 7025825718' },
                { icon: '💬', title: 'Live Chat', sub: 'Available Mon–Fri, 9am–6pm EST' },
                { icon: '📍', title: 'Headquarters', sub: '340 Pine St, San Francisco, CA 94104' },
              ].map(({ icon, title, sub }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-lg shrink-0">{icon}</div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{title}</div>
                    <div className="text-sm text-gray-500">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-black text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm">We'll be in touch within 1 business day.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-sm text-[#FF5C00] font-semibold hover:underline">Send another message</button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-black text-gray-900 mb-6">Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Kim"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#FF5C00] focus:ring-2 focus:ring-orange-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Work Email</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#FF5C00] focus:ring-2 focus:ring-orange-100 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Company</label>
                    <input
                      type="text"
                      placeholder="Flowen Inc."
                      value={form.company}
                      onChange={e => setForm({ ...form, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#FF5C00] focus:ring-2 focus:ring-orange-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your team size and what you're looking to achieve..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#FF5C00] focus:ring-2 focus:ring-orange-100 transition-all resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full btn-orange text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-200">
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#FF5C00] rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9L7.5 4.5L12 9L7.5 13.5L3 9Z" fill="white" opacity="0.6" />
                <path d="M7.5 9L12 4.5L16.5 9L12 13.5L7.5 9Z" fill="white" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">Flowen</span>
          </div>
          <p className="text-sm leading-relaxed mb-4">
            The CRM built to turn pipeline into revenue. Trusted by 999+ growing B2B teams worldwide.
          </p>
          <div className="flex gap-3">
            {['𝕏', 'in', 'f', '▶'].map((s, i) => (
              <div key={i} className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-xs">
                {s}
              </div>
            ))}
          </div>
        </div>
        {[
          { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap', 'API'] },
          { title: 'Resources', links: ['Blog', 'Guides', 'Case Studies', 'Templates', 'Webinars'] },
          { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact', 'Legal'] },
        ].map(({ title, links }) => (
          <div key={title}>
            <h4 className="text-sm font-bold text-white mb-4">{title}</h4>
            <ul className="space-y-2">
              {links.map(link => (
                <li key={link}><span className="text-sm text-gray-400">{link}</span></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs">© 2026 Flowen. All rights reserved.</p>
        <div className="flex gap-6 text-xs">
          {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map(l => (
            <span key={l} className="text-gray-400">{l}</span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);

  useEffect(() => {
    const handleOpen = (e: any) => setAuthModal(e.detail);
    window.addEventListener('open-auth-modal', handleOpen);
    return () => window.removeEventListener('open-auth-modal', handleOpen);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <RevenueSection />
      <TestimonialsSection />
      <ResourcesSection />
      <PricingSection />
      <ContactSection />
      <Footer />
      {authModal && <AuthModal type={authModal} onClose={() => setAuthModal(null)} />}
    </div>
  );
}

export default App;
