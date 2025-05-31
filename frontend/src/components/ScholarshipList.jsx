import React, { useEffect, useState } from 'react';

function ScholarshipList(){
    const [scholarships, setScholarship] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState('deadline');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        fetch('/scholarships.json')
        .then((res) => res.json())
        .then((data) => setScholarship(data));
    }, [] );

    const filtered = scholarships.filter((sch) =>
        filter === '' || sch.eligibility.includes(filter)
    );

    const sorted = [...filtered].sort((a, b) => {
        let aValue, bValue;
        
        switch (sortBy) {
            case 'name':
                aValue = a.name.toLowerCase();
                bValue = b.name.toLowerCase();
                break;
            case 'deadline':
                aValue = new Date(a.deadline || '9999-12-31');
                bValue = new Date(b.deadline || '9999-12-31');
                break;
            case 'amount':
                aValue = parseFloat(a.amount.replace(/[^0-9]/g, '')) || 0;
                bValue = parseFloat(b.amount.replace(/[^0-9]/g, '')) || 0;
                break;
            default:
                return 0;
        }
        
        if (sortOrder === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
    });

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'TBD';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getEligibilityBadges = (eligibility) => {
        const badgeColors = {
            'low-income': 'bg-blue-600 text-blue-100 border-blue-400',
            'first-gen': 'bg-green-600 text-green-100 border-green-400',
            'Black/African American': 'bg-purple-600 text-purple-100 border-purple-400',
            'CS': 'bg-orange-600 text-orange-100 border-orange-400',
            'STEM': 'bg-red-600 text-red-100 border-red-400',
            'underrepresented': 'bg-indigo-600 text-indigo-100 border-indigo-400',
            'high school senior': 'bg-gray-600 text-gray-100 border-gray-400'
        };
        
        return eligibility.slice(0, 2).map((tag, index) => (
            <span key={index} className={`inline-block px-3 py-1 text-xs font-bold rounded-full mr-1 mb-1 border-2 shadow-md ${
                badgeColors[tag] || 'bg-gray-600 text-gray-100 border-gray-400'
            }`}>
                {tag}
            </span>
        ));
    };

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">🎯 Available Scholarships</h2>
        <p className="text-gray-600">Find scholarships that match your profile and goals</p>
      </div>

      <div className="mb-8 flex justify-center">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-3 text-center">
            🔍 Filter by eligibility:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block w-full min-w-[280px] px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
          >
            <option value="">All Scholarships ({scholarships.length})</option>
            <option value="low-income">💰 Low-Income</option>
            <option value="first-gen">🎓 First-Generation</option>
            <option value="Black/African American">✊ Black/African American</option>
            <option value="CS">💻 Computer Science</option>
            <option value="STEM">🔬 STEM</option>
            <option value="underrepresented">🌍 Underrepresented</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-900 rounded-2xl shadow-2xl border-4 border-yellow-400 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-1">
          <div className="bg-gray-900 rounded-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-800 via-blue-800 to-indigo-900 text-white">
                  <tr>
                    <th 
                      className="px-6 py-5 text-left text-sm font-bold cursor-pointer hover:bg-purple-700 transition-all duration-200 border-r border-purple-600"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-300">💎 Scholarship Name</span>
                        <span className="text-lg text-yellow-300">
                          {sortBy === 'name' ? (sortOrder === 'asc' ? '⬆️' : '⬇️') : '↕️'}
                        </span>
                      </div>
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-yellow-300 border-r border-purple-600">📝 Description</th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-yellow-300 border-r border-purple-600">✅ Eligibility</th>
                    <th 
                      className="px-6 py-5 text-left text-sm font-bold cursor-pointer hover:bg-purple-700 transition-all duration-200 border-r border-purple-600"
                      onClick={() => handleSort('amount')}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-300">💰 Amount</span>
                        <span className="text-lg text-yellow-300">
                          {sortBy === 'amount' ? (sortOrder === 'asc' ? '⬆️' : '⬇️') : '↕️'}
                        </span>
                      </div>
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-yellow-300 border-r border-purple-600">🚀 Opens</th>
                    <th 
                      className="px-6 py-5 text-left text-sm font-bold cursor-pointer hover:bg-purple-700 transition-all duration-200 border-r border-purple-600"
                      onClick={() => handleSort('deadline')}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-300">⏰ Deadline</span>
                        <span className="text-lg text-yellow-300">
                          {sortBy === 'deadline' ? (sortOrder === 'asc' ? '⬆️' : '⬇️') : '↕️'}
                        </span>
                      </div>
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-bold text-yellow-300">🎯 Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-gray-700">
                  {sorted.map((scholarship, index) => (
                    <tr key={scholarship.name} className={`hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.01] ${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-850'}`}>
                      <td className="px-6 py-6 border-r border-gray-700">
                        <div className="flex items-center space-x-4">
                          <span className="text-3xl animate-pulse">
                            {scholarship.amount?.includes('Full') ? '🏆' : '💎'}
                          </span>
                          <div>
                            <h3 className="text-lg font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                              {scholarship.name}
                            </h3>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 border-r border-gray-700">
                        <p className="text-sm text-gray-300 max-w-xs leading-relaxed">{scholarship.description}</p>
                      </td>
                      <td className="px-6 py-6 border-r border-gray-700">
                        <div className="flex flex-wrap gap-2">
                          {getEligibilityBadges(scholarship.eligibility)}
                        </div>
                      </td>
                      <td className="px-6 py-6 border-r border-gray-700">
                        <span className="text-sm font-bold text-green-400 bg-green-900 px-4 py-2 rounded-full border-2 border-green-500 shadow-lg">
                          {scholarship.amount}
                        </span>
                      </td>
                      <td className="px-6 py-6 border-r border-gray-700">
                        <span className="text-sm font-semibold text-blue-400 bg-blue-900 px-4 py-2 rounded-full border-2 border-blue-500">
                          {formatDate(scholarship.application_open)}
                        </span>
                      </td>
                      <td className="px-6 py-6 border-r border-gray-700">
                        <span className="text-sm font-bold text-red-400 bg-red-900 px-4 py-2 rounded-full border-2 border-red-500 animate-pulse">
                          {formatDate(scholarship.deadline)}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <a 
                          href={scholarship.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`inline-flex items-center px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-110 ${
                            scholarship.link.includes('will be added') 
                              ? 'bg-gray-600 text-gray-400 cursor-not-allowed border-2 border-gray-500' 
                              : 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white shadow-xl hover:shadow-2xl border-2 border-yellow-300'
                          }`}
                          {...(scholarship.link.includes('will be added') && { 'aria-disabled': true })}
                        >
                          {scholarship.link.includes('will be added') ? '⏳ Coming Soon' : '🚀 Apply Now'}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {sorted.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No scholarships found</h3>
          <p className="text-gray-600">Try adjusting your filter to see more scholarships.</p>
        </div>
      )}
    </div>
  );
}

export default ScholarshipList;