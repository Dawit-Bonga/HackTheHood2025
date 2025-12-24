import React, { useState, useEffect } from 'react';
import Button from './ui/Button';
import Card from './ui/Card';
import { Input, Select } from './ui/Input';

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

function ScholarshipCard({ scholarship }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDeadlineUpcoming = isUpcoming(scholarship.deadline);
  const isApplicationOpen = isUpcoming(scholarship.application_open);
  
  return (
    <>
      {/* Overlay for expanded view */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 animate-[fadeIn_0.2s_ease-out]" 
          onClick={() => setIsExpanded(false)}
        ></div>
      )}

      {/* Card */}
      <Card
        variant="default"
        padding={isExpanded ? "none" : "default"}
        className={`scholarship-card transition-all ${
          isExpanded 
            ? 'fixed inset-4 md:inset-8 z-50 overflow-y-auto' 
            : 'cursor-pointer hover:shadow-[var(--shadow-lg)]'
        }`}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        {isExpanded ? (
          // Expanded view - full details
          <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-3xl font-bold text-[var(--color-text-primary)] leading-tight pr-4">
                {scholarship.name}
              </h3>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] rounded-lg transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Amount Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 text-lg font-bold rounded-lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {scholarship.amount}
              </span>
            </div>

            {/* Eligibility Tags */}
            <div className="mb-6 flex flex-wrap gap-2">
              {scholarship.eligibility.map((item, index) => (
                <span 
                  key={index} 
                  className="inline-block px-4 py-2 bg-[var(--color-primary-light)] text-[var(--color-primary)] text-sm rounded-lg font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
                Description
              </h4>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg">
                {scholarship.description}
              </p>
            </div>
            
            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className={`flex items-center p-4 rounded-lg border ${
                isApplicationOpen 
                  ? 'bg-green-50 text-green-700 border-green-200' 
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] border-[var(--color-border)]'
              }`}>
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="font-semibold block text-sm">Application Opens:</span>
                  <span className="text-base">{formatDate(scholarship.application_open)}</span>
                </div>
              </div>

              <div className={`flex items-center p-4 rounded-lg border ${
                isDeadlineUpcoming 
                  ? 'bg-red-50 text-red-700 border-red-200' 
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] border-[var(--color-border)]'
              }`}>
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <div>
                  <span className="font-semibold block text-sm">Deadline:</span>
                  <span className="text-base">{formatDate(scholarship.deadline)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <a
                href={scholarship.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1"
              >
                <Button variant="primary" size="lg" fullWidth>
                  Apply Now
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Button>
              </a>
              <Button
                variant="outline"
                size="lg"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          // Compact view - card preview
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] leading-tight pr-2">
                {scholarship.name}
              </h3>
              <span className="flex-shrink-0 text-base font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg whitespace-nowrap">
                {scholarship.amount}
              </span>
            </div>

            {/* Eligibility Tags (preview) */}
            <div className="mb-4 flex flex-wrap gap-2">
              {scholarship.eligibility.slice(0, 3).map((item, index) => (
                <span 
                  key={index} 
                  className="inline-block px-3 py-1 bg-[var(--color-primary-light)] text-[var(--color-primary)] text-sm rounded-lg font-medium"
                >
                  {item}
                </span>
              ))}
              {scholarship.eligibility.length > 3 && (
                <span className="inline-block px-3 py-1 bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] text-sm rounded-lg font-medium">
                  +{scholarship.eligibility.length - 3} more
                </span>
              )}
            </div>
            
            {/* Dates (compact) */}
            <div className="space-y-2 mb-4 mt-auto">
              <div className={`flex items-center px-3 py-2 rounded-lg border text-sm ${
                isApplicationOpen 
                  ? 'bg-green-50 text-green-700 border-green-200' 
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] border-[var(--color-border)]'
              }`}>
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Opens:</span>
                <span className="ml-1">{formatDate(scholarship.application_open)}</span>
              </div>

              <div className={`flex items-center px-3 py-2 rounded-lg border text-sm ${
                isDeadlineUpcoming 
                  ? 'bg-red-50 text-red-700 border-red-200' 
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] border-[var(--color-border)]'
              }`}>
                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Deadline:</span>
                <span className="ml-1">{formatDate(scholarship.deadline)}</span>
              </div>
            </div>

            {/* Click to view hint */}
            <div className="text-center pt-2 border-t border-[var(--color-border)]">
              <span className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium text-sm flex items-center justify-center">
                Click for details
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </div>
          </div>
        )}
      </Card>
    </>
  );
}

function ScholarshipList() {
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');

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
      setRetryCount(0);
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

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <Card variant="elevated" padding="lg">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[var(--color-border)] border-t-[var(--color-primary)] mb-6"></div>
            <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
              Loading Scholarships
            </h3>
            <p className="text-[var(--color-text-secondary)]">
              Please wait while we fetch scholarship opportunities for you...
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card variant="default" padding="lg" className="bg-red-50 border-red-200">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Unable to Load Scholarships
              </h3>
              <p className="text-sm text-red-700 mb-4">{error}</p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRetry}
                  disabled={retryCount >= 3}
                  className="border-red-300 text-red-700 hover:bg-red-100"
                >
                  {retryCount >= 3 ? 'Max retries reached' : `Retry (${retryCount}/3)`}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.reload()}
                  className="text-red-700 hover:bg-red-100"
                >
                  Refresh Page
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-3">
          Available Scholarships
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)]">
          Browse {filteredScholarships.length} of {scholarships.length} scholarship opportunities
        </p>
      </div>

      {/* Filters and Search */}
      <Card variant="elevated" padding="lg" className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Search Scholarships"
            type="text"
            placeholder="Search by name, description, or eligibility..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Select
            label="Filter by Date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="all">All Scholarships</option>
            <option value="upcoming">Upcoming Deadlines</option>
            <option value="open">Currently Open</option>
            <option value="closing-soon">Closing Soon (30 days)</option>
          </Select>

          <Select
            label="Sort by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="deadline">Deadline</option>
            <option value="name">Name</option>
            <option value="amount">Amount</option>
          </Select>
        </div>
      </Card>

      {/* Results */}
      {filteredScholarships.length === 0 ? (
        <Card variant="default" padding="lg">
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-[var(--color-text-muted)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
              No scholarships found
            </h3>
            <p className="text-[var(--color-text-secondary)]">
              Try adjusting your search or filter criteria
            </p>
          </div>
        </Card>
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
    </div>
  );
}

export default ScholarshipList;
