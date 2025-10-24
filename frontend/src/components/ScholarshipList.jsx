import React, {useState, useEffect } from 'react';

// Helper function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// Helper function to check if date is upcoming
const isUpcoming = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  return date >= today;
};

function ScholarshipCard({scholarship}){
  const [isExpanded, setIsExpanded] = useState(false);
  const isDeadlineUpcoming = isUpcoming(scholarship.deadline);
  const isApplicationOpen = isUpcoming(scholarship.application_open);
  
  return (
    <div 
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 cursor-pointer ${
        isExpanded ? 'fixed inset-4 z-50 overflow-y-auto' : 'p-6'
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {isExpanded ? (
        // Expanded view - full screen overlay
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsExpanded(false)}></div>
          <div className="bg-white rounded-xl p-8 max-w-4xl mx-auto relative z-50">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-3xl font-bold text-gray-800 leading-tight">{scholarship.name}</h3>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {scholarship.eligibility.map((item, index) => (
              <span 
                key={index} 
                className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
              >
                {item}
              </span>
            ))}
          </div>
          
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-gray-800 mb-3">Description</h4>
            <p className="text-gray-700 leading-relaxed text-lg">{scholarship.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className={`flex items-center px-4 py-3 rounded-lg border ${
              isApplicationOpen 
                ? 'bg-green-50 text-green-700 border-green-200' 
                : 'bg-gray-50 text-gray-600 border-gray-200'
            }`}>
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <div>
                <span className="font-semibold block">Application Opens:</span>
                <span className="text-lg">{formatDate(scholarship.application_open)}</span>
              </div>
            </div>

            <div className={`flex items-center px-4 py-3 rounded-lg border ${
              isDeadlineUpcoming 
                ? 'bg-red-50 text-red-700 border-red-200' 
                : 'bg-gray-50 text-gray-600 border-gray-200'
            }`}>
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <div>
                <span className="font-semibold block">Deadline:</span>
                <span className="text-lg">{formatDate(scholarship.deadline)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <a
              href={scholarship.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 text-center px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              Apply Now
            </a>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="px-6 py-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-lg"
            >
              Close
            </button>
          </div>
          </div>
        </>
      ) : (
        // Compact view - just essential info
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-800 leading-tight">{scholarship.name}</h3>
            <span className='text-lg font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg'>
              {scholarship.amount}
            </span>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {scholarship.eligibility.slice(0, 3).map((item, index) => (
              <span 
                key={index} 
                className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
              >
                {item}
              </span>
            ))}
            {scholarship.eligibility.length > 3 && (
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-medium">
                +{scholarship.eligibility.length - 3} more
              </span>
            )}
          </div>
          
          <div className="space-y-3 mb-6 mt-auto">
            <div className={`flex items-center px-3 py-2 rounded-lg border ${
              isApplicationOpen 
                ? 'bg-green-50 text-green-700 border-green-200' 
                : 'bg-gray-50 text-gray-600 border-gray-200'
            }`}>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Opens:</span>
              <span className="ml-1">{formatDate(scholarship.application_open)}</span>
            </div>

            <div className={`flex items-center px-3 py-2 rounded-lg border ${
              isDeadlineUpcoming 
                ? 'bg-red-50 text-red-700 border-red-200' 
                : 'bg-gray-50 text-gray-600 border-gray-200'
            }`}>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Deadline:</span>
              <span className="ml-1">{formatDate(scholarship.deadline)}</span>
            </div>
          </div>

          <div className="text-center">
            <span className="text-blue-600 hover:text-blue-800 font-medium text-sm">
              Click to view details →
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

function ScholarshipList(){
  const [scholarships, setScholarships] = useState([])
  const [filteredScholarships, setFilteredScholarships] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('all')
  const [sortBy, setSortBy] = useState('deadline')

  const loadScholarships = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/scholarships.json');
      
      if (!response.ok) {
        throw new Error(`Failed to load scholarships: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid scholarship data format');
      }
      
      setScholarships(data);
      setFilteredScholarships(data);
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      console.error('Scholarship loading error:', err);
      
      let errorMessage = 'Failed to load scholarships. ';
      
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        errorMessage += 'Unable to connect to the server. Please check your internet connection.';
      } else if (err.message.includes('404')) {
        errorMessage += 'Scholarship data not found. Please try again later.';
      } else if (err.message.includes('500')) {
        errorMessage += 'Server error. Please try again later.';
      } else {
        errorMessage += err.message || 'An unexpected error occurred.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScholarships();
  }, []);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    loadScholarships();
  };

  // Filter and sort scholarships
  useEffect(() => {
    let filtered = [...scholarships];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(scholarship => 
        scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.eligibility.some(elig => 
          elig.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Date filter
    const today = new Date();
    if (dateFilter === 'upcoming') {
      filtered = filtered.filter(scholarship => 
        new Date(scholarship.deadline) >= today
      );
    } else if (dateFilter === 'open') {
      filtered = filtered.filter(scholarship => 
        new Date(scholarship.application_open) <= today && 
        new Date(scholarship.deadline) >= today
      );
    } else if (dateFilter === 'closing-soon') {
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(today.getDate() + 30);
      filtered = filtered.filter(scholarship => {
        const deadline = new Date(scholarship.deadline);
        return deadline >= today && deadline <= thirtyDaysFromNow;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return new Date(a.deadline) - new Date(b.deadline);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'amount': {
          // Extract numeric value from amount string for sorting
          const aAmount = parseInt(a.amount.replace(/[^0-9]/g, '')) || 0;
          const bAmount = parseInt(b.amount.replace(/[^0-9]/g, '')) || 0;
          return bAmount - aAmount;
        }
        default:
          return 0;
      }
    });

    setFilteredScholarships(filtered);
  }, [scholarships, searchTerm, dateFilter, sortBy]);

  if (loading){
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-lg text-gray-600 mt-4">
          Loading scholarships...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <section className="max-w-6xl mx-auto mt-12 px-4">
        <div className="text-center py-12">
          <div className="mb-6">
            <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to Load Scholarships</h3>
          <p className="text-lg text-red-600 mb-6 max-w-md mx-auto">
            {error}
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleRetry}
              disabled={retryCount >= 3}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {retryCount >= 3 ? 'Max retries reached' : `Try Again (${retryCount}/3)`}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-6xl mx-auto mt-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Available Scholarships</h2>
        <p className="text-lg text-gray-600">
          Browse {filteredScholarships.length} of {scholarships.length} scholarship opportunities
        </p>
      </div>

      {/* Filters and Search */}
      <div className="p-6 rounded-xl mb-8 border border-blue-100 bg-white shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Search Scholarships
            </label>
            <input
              type="text"
              placeholder="Search by name, description, or eligibility..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Filter by Date
            </label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            >
              <option value="all">All Scholarships</option>
              <option value="upcoming">Upcoming Deadlines</option>
              <option value="open">Currently Open</option>
              <option value="closing-soon">Closing Soon (30 days)</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            >
              <option value="deadline">Deadline</option>
              <option value="name">Name</option>
              <option value="amount">Amount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {filteredScholarships.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No scholarships found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
          {filteredScholarships.map((scholarship, index) => (
            <ScholarshipCard 
              key={index} 
              scholarship={scholarship} 
            />
          ))}
        </div>
      )}
    </section>
  )
}



export default ScholarshipList