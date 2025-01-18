import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Chart from 'chart.js/auto';

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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('content');
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoResults, setVideoResults] = useState([]);
  const [shortsResults, setShortsResults] = useState([]);
  const [showGraph, setShowGraph] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      setLoading(true);
      fetchData(searchQuery)
        .then((fetchedData) => {
          setVideoResults(fetchedData.video_results || []);
          setShortsResults(fetchedData.shorts_results || []);
          setData(fetchedData[activeTab] || []);
        })
        .finally(() => setLoading(false));
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderVideoResults = () => (
    videoResults.length > 0 ? (
      videoResults.map((video, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold">{video.title}</h3>
          <img src={video.thumbnail.static} alt={video.title} className="w-full rounded-md mb-3" />
          <p className="text-gray-600">{video.description}</p>
          <div className="text-sm text-gray-500">
            <strong>Published:</strong> {video.published_date}
          </div>
          <div className="text-sm text-gray-500">
            <strong>Views:</strong> {video.views ? video.views.toLocaleString() : 'N/A'}
          </div>
        </div>
      ))
    ) : (
      <div className="col-span-3 text-center text-gray-500">
        No video results found.
      </div>
    )
  );

  const renderShortsResults = () => (
    shortsResults.length > 0 ? (
      shortsResults.map((shortItem, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6 mb-4">
          <h3 className="text-lg font-bold">{shortItem.shorts.title}</h3>
          <a href={shortItem.shorts.link} target="_blank" rel="noopener noreferrer">
            <img src={shortItem.shorts.thumbnail} alt={shortItem.shorts.title} className="w-full rounded-md mb-3" />
          </a>
          <div className="text-sm text-gray-500">
            <strong>Views:</strong> {shortItem.shorts.views_original || 'N/A'}
          </div>
          <div className="text-sm text-gray-500">
            <strong>Video Link:</strong> <a href={shortItem.shorts.link} className="text-indigo-600">{shortItem.shorts.link}</a>
          </div>
        </div>
      ))
    ) : (
      <div className="col-span-3 text-center text-gray-500">
        No shorts results found.
      </div>
    )
  );

  useEffect(() => {
    if (activeTab === 'insights' && videoResults.length > 0 && shortsResults.length > 0 && showGraph) {
      const ctx = document.getElementById('pieChart');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Video Results', 'Shorts Results'],
          datasets: [{
            label: 'Views Comparison',
            data: [
              videoResults.reduce((acc, video) => acc + (video.views || 0), 0),
              shortsResults.reduce((acc, shortItem) => acc + (shortItem.shorts.views || 0), 0),
            ],
            backgroundColor: ['rgba(169, 65, 210, 0.6)', 'rgba(45, 0, 117, 0.6)'],
          }],
        },
        options: {
          responsive: true,
        },
      });
    }
  }, [videoResults, shortsResults, activeTab, showGraph]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-[#A941D2] to-[#2D0075] text-white shadow">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-8">
          <h2 className="text-lg font-medium text-gray-900">Search Keywords</h2>
          <form onSubmit={handleSearch} className="mt-4">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="flex rounded-md shadow-sm">
              <div className="relative flex items-stretch flex-grow focus-within:z-10">
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                  placeholder="Enter your search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="relative -ml-px inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100"
              >
                <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg mb-4 sm:mb-8">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">Select a tab</label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              value={activeTab}
              onChange={(e) => handleTabChange(e.target.value)}
            >
              <option value="content">Content</option>
              <option value="insights">Insights</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="flex space-x-4" aria-label="Tabs">
              <button
                className={`px-3 py-2 font-medium text-sm rounded-md ${activeTab === 'content' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => handleTabChange('content')}
              >
                Content
              </button>
              <button
                className={`px-3 py-2 font-medium text-sm rounded-md ${activeTab === 'insights' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => handleTabChange('insights')}
              >
                Insights
              </button>
            </nav>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {activeTab === 'content' && (
              <>
                <h3 className="text-lg font-semibold mb-4">Video Results</h3>
                {renderVideoResults()}
                <h3 className="text-lg font-semibold mt-8 mb-4">Shorts Results</h3>
                {renderShortsResults()}
              </>
            )}

            {activeTab === 'insights' && showGraph && (
              <div className="mt-4">
                <canvas id="pieChart" width="400" height="400"></canvas>
              </div>
            )}
          </div>
        )}

        <div className="mt-8">
          <button
            className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            onClick={() => setShowGraph(!showGraph)}
          >
            {showGraph ? 'Hide Insights' : 'Show Insights'}
          </button>
        </div>
      </main>
    </div>
  );
}
