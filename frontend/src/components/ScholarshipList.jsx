import React, {useState, useEffect } from 'react';



function ScholarshipCard({scholarship}){
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border">
      <div className="flex justify-between ">
        <h3 className="text-xl font-bold text-gray-800">{scholarship.name}</h3>
        <span className='text-lg font-bold text-green-600'>{scholarship.amount}</span>
      </div>

<div className="mb-3 flex flex-wrap gap-2">
  {scholarship.eligibility.map((item, index) => (
    <span 
      key={index} 
      className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
    >
      {item}
    </span>
  ))}
</div>
      <p className="text-gray-700 mb-3">{scholarship.description}</p>
        <div className="mb-6 flex items-center text-sm">
        <div className="flex items-center px-3 py-2 bg-red-50 text-green-700 rounded-lg border border-green-100">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold">Opens:</span>
          <span className="ml-1">{scholarship.application_open}</span>
        </div>
      </div>



      <div className="mb-6 flex items-center text-sm">
        <div className="flex items-center px-3 py-2 bg-red-50 text-red-700 rounded-lg border border-red-100">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold">Deadline:</span>
          <span className="ml-1">{scholarship.deadline}</span>
        </div>
      </div>


      <a
      href={scholarship.link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block w-full text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Learn More 
      </a>
    </div>

  )
}

function ScholarshipList(){
  const [scholarships, setScholarships] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/scholarships.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not load scholarships');
        }
        return response.json();
      })
      .then(data => {
        setScholarships(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading){
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-600">
          Loading scholarships...
        </p>
      </div>
    )
  }

  return (
    <section className="max-w-5xl mx-auto mt-12">

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Available Scholarships</h2>
        <p className="text-lg text-gray-600">
          Browse {scholarships.length} scholarship opportunities
        </p>
      </div>

     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
        {scholarships.map((scholarship, index) => (
          <ScholarshipCard 
            key={index} 
            scholarship={scholarship} 
          />
        ))}
      </div>

    </section>
  )
}



export default ScholarshipList