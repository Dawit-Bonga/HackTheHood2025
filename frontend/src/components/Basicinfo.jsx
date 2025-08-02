import React from "react";

function Basics(){
return (
    <main className="basicinfo-main" style={{  margin: "2rem auto", padding: "2rem", background: "#fff", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
        <h1 className="text-3xl font-bold mb-4 text-blue-800">What is College?</h1>
        <p className="mb-4 text-lg">
            <strong>College</strong> is an educational institution that offers advanced learning after high school (secondary school). In the United States, "college" and "university" are often used interchangeably, but there are some differences. Many people go to college so that they can grow in their careers.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-blue-700">Types of Colleges</h2>
        <ul className="list-disc list-inside mb-4 space-y-1">
            <li>
                <strong>Community Colleges:</strong> 2-year institutions offering associate degrees and certificates. Many students transfer to 4-year colleges after.
            </li>
            <li>
                <strong>Liberal Arts Colleges:</strong> 4-year schools focused on broad undergraduate education in arts, sciences, and humanities.
            </li>
            <li>
                <strong>Universities:</strong> Larger institutions offering undergraduate and graduate degrees (bachelor’s, master’s, PhD).
            </li>
            <li>
                <strong>Technical & Vocational Schools:</strong> Focused on specific trades or careers (e.g., nursing, automotive, culinary).
            </li>
            <li>
                <strong>Public vs. Private:</strong> Public colleges are funded by the state and usually cost less for in-state students. Private colleges are funded by tuition, donations, and endowments.
            </li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-blue-700">Degrees You Can Earn</h2>
        <ul className="list-disc list-inside mb-4 space-y-1">
            <li>
                <strong>Associate Degree:</strong> Usually 2 years (community college).
            </li>
            <li>
                <strong>Bachelor’s Degree:</strong> Usually 4 years (college or university).
            </li>
            <li>
                <strong>Master’s/Graduate Degrees:</strong> Advanced study after a bachelor’s (1-3+ years).
            </li>
            <li>
                <strong>Certificates:</strong> Shorter programs focused on specific skills or careers.
            </li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-blue-700">Why Go to College?</h2>
        <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Gain specialized knowledge and skills for your career.</li>
            <li>Increase your earning potential and job opportunities.</li>
            <li>Meet new people, build networks, and grow personally.</li>
            <li>Explore interests and discover new passions.</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-blue-700">How Does College Work?</h2>
        <ul className="list-disc list-inside mb-4 space-y-1">
            <li>
                <strong>Application:</strong> You apply to colleges, often during your senior year of high school. Applications may require essays, transcripts, test scores, and recommendations.
            </li>
            <li>
                <strong>Majors & Minors:</strong> A <em>major</em> is your main area of study. A <em>minor</em> is a secondary focus.
            </li>
            <li>
                <strong>Classes:</strong> You take required courses for your major and electives in other subjects.
            </li>
            <li>
                <strong>Credits:</strong> Each class is worth a certain number of credits. You need a set number to graduate.
            </li>
            <li>
                <strong>Campus Life:</strong> Includes clubs, sports, events, and living in dorms or off-campus housing.
            </li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-blue-700">Paying for College</h2>
        <ul className="list-disc list-inside mb-4 space-y-1">
            <li>
                <strong>Tuition & Fees:</strong> The cost of classes and enrollment.
            </li>
            <li>
                <strong>Financial Aid:</strong> Includes grants, scholarships, work-study, and loans. <a href="/scholarship" className="text-blue-600 underline">See our Scholarship page for more info!</a>
            </li>
            <li>
                <strong>Living Expenses:</strong> Housing, food, books, transportation, and personal costs.
            </li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-blue-700">Key Terms to Know</h2>
        <ul className="list-disc list-inside mb-4 space-y-1">
            <li><strong>FAFSA:</strong> Free Application for Federal Student Aid (used to apply for financial aid).</li>
            <li><strong>GPA:</strong> Grade Point Average, a measure of your academic performance.</li>
            <li><strong>Transcript:</strong> Official record of your classes and grades.</li>
            <li><strong>Advisor:</strong> A staff member who helps you choose classes and stay on track to graduate.</li>
            <li><strong>Prerequisite:</strong> A class you must take before another class.</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-blue-700">Is College Right for You?</h2>
        <p className="mb-4 text-lg">
            College is a big step and a major investment in your future. It’s not the only path, but it opens many doors. Explore your options, ask questions, and find what fits your goals and interests!
        </p>
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <strong>Need more help?</strong> Check out our other pages for guidance on applications, scholarships, essays, and more!
        </div>

        
    </main>
);


}


export default Basics;