import React, { useState } from 'react';
import { Search, ChevronDown, TrendingUp, Info } from 'lucide-react';

const sampleData = {
  insights: [
    {
      id: 1,
      title: "Customer Pain Points",
      description: "Users struggle with complex onboarding processes",
      frequency: "85%",
      sentiment: "High Impact",
      source: "Survey Data",
    },
    {
      id: 2,
      title: "Feature Requests",
      description: "Mobile app integration is most requested feature",
      frequency: "72%",
      sentiment: "Urgent",
      source: "User Feedback",
    },
    {
      id: 3,
      title: "Purchase Barriers",
      description: "Price point is primary obstacle for SMB segment",
      frequency: "64%",
      sentiment: "Negative",
      source: "Sales Data",
    },
  ],
  competitors: [
    {
      id: 1,
      title: "Market Leader Analysis",
      companyName: "TechGiant Pro",
      marketShare: "35%",
      strengths: ["Brand Recognition", "Feature Set", "Customer Support"],
      adSpend: "$2.5M/month",
      engagement: "4.2M monthly visits",
    },
    {
      id: 2,
      title: "Rising Competitor",
      companyName: "StartupX",
      marketShare: "15%",
      strengths: ["Innovation", "Pricing", "User Experience"],
      adSpend: "$800K/month",
      engagement: "1.8M monthly visits",
    },
    {
      id: 3,
      title: "Niche Player",
      companyName: "SpecialSoft",
      marketShare: "8%",
      strengths: ["Specialization", "Customer Service", "Integration"],
      adSpend: "$400K/month",
      engagement: "900K monthly visits",
    },
  ],
  content: [
    {
      id: 1,
      title: "Top Performing Content",
      type: "Video Tutorial",
      engagement: "250K views",
      conversionRate: "4.2%",
      platform: "YouTube",
      topic: "Product Walkthrough",
    },
    {
      id: 2,
      title: "Viral Social Post",
      type: "Carousel Post",
      engagement: "180K impressions",
      conversionRate: "3.8%",
      platform: "LinkedIn",
      topic: "Success Story",
    },
    {
      id: 3,
      title: "Blog Performance",
      type: "How-to Guide",
      engagement: "95K reads",
      conversionRate: "2.9%",
      platform: "Company Blog",
      topic: "Industry Tips",
    },
  ],
  trends: [
    {
      id: 1,
      title: "Mobile Usage",
      description: "Increasing mobile-first user base",
      trendPercentage: 78,
      growth: "+24% YoY",
    },
    {
      id: 2,
      title: "AI Integration",
      description: "Growing demand for AI features",
      trendPercentage: 65,
      growth: "+45% YoY",
    },
    {
      id: 3,
      title: "Remote Work Tools",
      description: "Sustained demand for collaboration",
      trendPercentage: 82,
      growth: "+32% YoY",
    },
  ],
};

const renderCard = (item) => (
  <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-3">
    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
    <p className="text-gray-600">{item.description}</p>
    {item.frequency && (
      <div className="text-sm text-gray-500">
        <strong>Frequency:</strong> {item.frequency}
      </div>
    )}
    {item.sentiment && (
      <div className="text-sm text-gray-500">
        <strong>Sentiment:</strong> {item.sentiment}
      </div>
    )}
    {item.source && (
      <div className="text-sm text-gray-500">
        <strong>Source:</strong> {item.source}
      </div>
    )}
    <div className="mt-auto flex justify-end">
      <button className="text-sm text-[#2D0075] hover:underline flex items-center gap-1">
        More Info <Info className="h-4 w-4" />
      </button>
    </div>
  </div>
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('insights');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  const filteredData = sampleData[activeTab].filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const MobileNav = () => (
    <div className="relative md:hidden">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="w-full flex items-center justify-between px-4 py-2 bg-white rounded-md shadow"
      >
        <span className="capitalize">{activeTab}</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${isMenuOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isMenuOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg">
          {Object.keys(sampleData).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`w-full text-left px-4 py-3 text-sm capitalize hover:bg-gray-50 ${
                activeTab === tab ? 'text-[#A941D2] font-medium' : 'text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const DesktopNav = () => (
    <div className="hidden md:block border-b">
      <nav className="flex space-x-8 px-6" aria-label="Tabs">
        {Object.keys(sampleData).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
              activeTab === tab
                ? 'border-[#A941D2] text-[#2D0075]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-[#A941D2] to-[#2D0075] text-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold">ART Finder</h1>
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="flex-1 sm:flex-none px-4 py-2 bg-white/10 rounded-md hover:bg-white/20 transition-colors text-sm sm:text-base">
                Help
              </button>
              <button className="flex-1 sm:flex-none px-4 py-2 bg-white rounded-md text-[#2D0075] hover:bg-gray-100 transition-colors text-sm sm:text-base">
                New Research
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Research Topic
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md"
                  placeholder="Enter your topic or niche..."
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <button className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-[#A941D2] to-[#2D0075] text-white rounded-md hover:opacity-90 transition-opacity">
              Search
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg mb-4 sm:mb-8">
          <MobileNav />
          <DesktopNav />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {filteredData.map((item) => (
            <div key={item.id} className="relative">
              {renderCard(item)}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
