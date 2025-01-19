/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Search, FileText, Video, Menu, X, BarChart2, TrendingUp, AlertCircle, Lightbulb, Target, CheckCircle, Eye, Clock, ThumbsUp, ExternalLink, Share2, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const fetchData = async (query) => {
  const response = await fetch('http://localhost:3000/api/v1/yt/demo/ads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  const data = await response.json();
  return data;
};

const fetchReport = async (query, token) => {
  const response = await fetch('http://localhost:3000/api/v1/report/demo', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  const data = await response.json();
  return data;
};

// Add responsive navigation component
const MobileNav = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => (
    <div className="lg:hidden">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-600 hover:text-gray-900"
        >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-16 left-0 right-0 bg-white shadow-lg rounded-b-lg z-50"
                >
                    <nav className="flex flex-col p-4 space-y-2">
                        <TabButton
                            active={activeTab === 'content'}
                            onClick={() => { setActiveTab('content'); setIsOpen(false); }}
                            icon={<Video size={18} />}
                            label="Content"
                        />
                        <TabButton
                            active={activeTab === 'report'}
                            onClick={() => { setActiveTab('report'); setIsOpen(false); }}
                            icon={<FileText size={18} />}
                            label="Report"
                        />
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

// Modern tab button component
const TabButton = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            active 
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
        }`}
    >
        {icon}
        <span>{label}</span>
    </button>
);

// Add this new component for the toggle bar
const ToggleBar = ({ activeType, setActiveType }) => (
    <div className="bg-white p-2 rounded-lg shadow-md mb-6">
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
                onClick={() => setActiveType('long')}
                className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${
                    activeType === 'long'
                        ? 'bg-white shadow-sm text-purple-600 font-semibold'
                        : 'text-gray-600 hover:text-gray-900'
                }`}
            >
                <Video size={18} />
                <span>Long Videos</span>
            </button>
            <button
                onClick={() => setActiveType('shorts')}
                className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 flex items-center justify-center gap-2 ${
                    activeType === 'shorts'
                        ? 'bg-white shadow-sm text-purple-600 font-semibold'
                        : 'text-gray-600 hover:text-gray-900'
                }`}
            >
                <Smartphone size={18} />
                <span>Shorts</span>
            </button>
        </div>
    </div>
);

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('content');
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [videoResults, setVideoResults] = useState([]);
    const [shortsResults, setShortsResults] = useState([]);
    const [reportData, setReportData] = useState(null);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [videoType, setVideoType] = useState('long');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchQuery) {
            setLoading(true);
            try {
                const searchData = await fetchData(searchQuery);
                
                // Filter regular videos (non-shorts)
                const longVideos = searchData.video_results.filter(video => 
                    !video.title.toLowerCase().includes('#shorts') && 
                    !video.link.includes('/shorts/')
                );

                // Extract shorts from shorts_results
                const shorts = searchData.shorts_results.flatMap(result => 
                    result.shorts.map(short => ({
                        title: short.title,
                        link: short.link,
                        views: short.views,
                        views_original: short.views_original,
                        videoId: short.video_id
                    }))
                );

                setVideoResults(longVideos);
                setShortsResults(shorts);
                setReportData(await fetchReport(searchQuery, 'YOUR_TOKEN_HERE'));
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="col-span-full flex justify-center items-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                </div>
            );
        }

        const videos = videoType === 'shorts' ? shortsResults : videoResults;

        return videos.length > 0 ? (
            videos.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                    <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                    {!videoType === 'shorts' && item.description && (
                        <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                    )}
                    <div className="space-y-2 text-sm text-gray-500">
                        {item.published_date && (
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{item.published_date}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            <span>
                                {videoType === 'shorts' 
                                    ? item.views_original 
                                    : `${item.views?.toLocaleString() || 'N/A'} views`}
                            </span>
                        </div>
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                        >
                            <ExternalLink className="w-4 h-4" />
                            <span>Watch {videoType === 'shorts' ? 'Short' : 'Video'}</span>
                        </a>
                    </div>
                </motion.div>
            ))
        ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
                No {videoType} found.
            </div>
        );
    };

    const renderReportInsights = () => {
        if (!reportData) return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                <p className="mt-4 text-gray-600">Loading insights...</p>
            </div>
        );

        return (
            <motion.div 
                className="grid grid-cols-1 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Market Trends Section */}
                <motion.div 
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="bg-gradient-to-r from-[#A941D2] to-[#2D0075] px-6 py-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <BarChart2 className="w-6 h-6" />
                            Market Trends
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-900 text-lg">Current Trends</h4>
                                <ul className="space-y-3">
                                    {reportData.comprehensiveResearch.trends.map((trend, index) => (
                                        <motion.li 
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg"
                                        >
                                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <TrendingUp className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <span className="text-gray-700">{trend}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-900 text-lg">Pain Points</h4>
                                <ul className="space-y-3">
                                    {reportData.comprehensiveResearch.painPoints.map((point, index) => (
                                        <motion.li 
                                            key={index}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center gap-3 bg-red-50 p-3 rounded-lg"
                                        >
                                            <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                                <AlertCircle className="w-4 h-4 text-red-600" />
                                            </div>
                                            <span className="text-gray-700">{point}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Actionable Insights Section */}
                <motion.div 
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="bg-gradient-to-r from-[#A941D2] to-[#2D0075] px-6 py-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Lightbulb className="w-6 h-6" />
                            Actionable Insights
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-900 text-lg">Key Triggers</h4>
                                <ul className="space-y-3">
                                    {reportData.actionableInsights.triggers.map((trigger, index) => (
                                        <motion.li 
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center gap-3 bg-green-50 p-3 rounded-lg"
                                        >
                                            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                <Target className="w-4 h-4 text-green-600" />
                                            </div>
                                            <span className="text-gray-700">{trigger}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-900 text-lg">Recommended Solutions</h4>
                                <ul className="space-y-3">
                                    {reportData.actionableInsights.solutions.map((solution, index) => (
                                        <motion.li 
                                            key={index}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center gap-3 bg-purple-50 p-3 rounded-lg"
                                        >
                                            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                <CheckCircle className="w-4 h-4 text-purple-600" />
                                            </div>
                                            <span className="text-gray-700">{solution}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Top Performing Videos Section */}
                <motion.div 
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="bg-gradient-to-r from-[#A941D2] to-[#2D0075] px-6 py-4">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Video className="w-7 h-7" />
                            Top Performing Videos
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="grid gap-6">
                            {reportData.youtubeVideos.map((video, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-all duration-300 hover:shadow-md border border-gray-200"
                                >
                                    <div className="space-y-4">
                                        {/* Title and Description */}
                                        <div>
                                            <h4 className="text-xl font-bold text-gray-900 mb-3">
                                                {video.title}
                                            </h4>
                                            <p className="text-lg text-gray-600">
                                                {video.description}
                                            </p>
                                        </div>
                                        
                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-base">
                                            <div className="flex items-center gap-2 bg-purple-50 p-3 rounded-lg">
                                                <Eye className="w-5 h-5 text-purple-600" />
                                                <span className="font-semibold text-purple-900">
                                                    {video.views.toLocaleString()} views
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                                                <Clock className="w-5 h-5 text-blue-600" />
                                                <span className="font-semibold text-blue-900">
                                                    {video.length}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
                                                <ThumbsUp className="w-5 h-5 text-green-600" />
                                                <span className="font-semibold text-green-900">
                                                    {video.likes?.toLocaleString() || '0'} likes
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-4 pt-2">
                                            <a 
                                                href={video.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                <span>Watch Video</span>
                                            </a>
                                            <button 
                                                className="flex items-center gap-2 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                                                onClick={() => {/* Add share functionality */}}
                                            >
                                                <Share2 className="w-4 h-4" />
                                                <span>Share</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 border-8 border-white">
            <header className="bg-gradient-to-r from-[#A941D2] to-[#2D0075] text-white shadow-xl sticky top-0 z-50">
                <div className="max-w-[1920px] px-6 sm:px-8 lg:px-12 mx-auto">
                    <div className="flex justify-between items-center py-8">
                        <h1 className="text-4xl font-extrabold flex items-center space-x-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100 drop-shadow-lg">
                            <Video className="w-12 h-12 filter drop-shadow-lg text-white" />
                            <span className="tracking-wide">ART FINDER</span>
                            <span className="text-lg font-semibold bg-white/20 px-3 py-1 rounded-full ml-4">
                                v1.0
                            </span>
                        </h1>
                        <MobileNav
                            activeTab={activeTab}
                            setActive Tab={setActiveTab}
                            isOpen={isNavOpen}
                            setIsOpen={setIsNavOpen}
                        />
                    </div>
                </div>
            </header>

            <main className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 py-8">
                {/* Search Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-2xl p-8 mb-10 border border-purple-100"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <Search className="w-8 h-8 text-purple-500" />
                        Search Keywords
                    </h2>
                    <form onSubmit={handleSearch} className="relative">
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg shadow-inner"
                                    placeholder="Enter your search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                            </div>
                            <button
                                type="submit"
                                className="px-8 py-4 bg-gradient-to-r from-[#A941D2] to-[#2D0075] text-white rounded-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-3 text-lg font-semibold hover:scale-105 transform"
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        <Search size={20} />
                                        <span>Search</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden lg:block mb-8">
                    <nav className="flex space-x-4 bg-white p-2 rounded-lg shadow-md">
                        <TabButton
                            active={activeTab === 'content'}
                            onClick={() => setActiveTab('content')}
                            icon={<Video size={18} />}
                            label="Content"
                        />
                        <TabButton
                            active={activeTab === 'report'}
                            onClick={() => setActiveTab('report')}
                            icon={<FileText size={18} />}
                            label="Report"
                        />
                    </nav>
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-1 gap-6"
                    >
                        {activeTab === 'content' && (
                            <>
                                <ToggleBar activeType={videoType} setActiveType={setVideoType} />
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {renderContent()}
                                </div>
                            </>
                        )}

                        {activeTab === 'report' && renderReportInsights()}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}