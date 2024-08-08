import React from 'react';

const HowItWorks = () => {
  return (
    <div className="container mx-auto p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">How It Works</h1>
        <a
          href="https://github.com/vsvishalsharma/smartprep"
          className="flex items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/githublogo.png"
            alt="GitHub Repository"
            className="w-8 h-8"
          />
        </a>
      </div>

      <p className="text-lg mb-6">Welcome to SmartPrep</p>
      <p className="text-lg mb-6 ">
        Our AI Interview Portal is designed to streamline and optimize your interview preparation process by generating the most relevant questions tailored to your specific needs. Here's how it works:
      </p>

      <div className="step mb-6">
        <h2 className="text-2xl font-semibold mb-2">Step 1: Provide Job Details</h2>
        <p className="text-lg mb-4">Start by filling out the necessary details about the job you are preparing for. This includes:</p>
        <ul className="list-disc list-inside text-lg mb-4">
          <li><strong>Job Title:</strong> The specific role you are applying for.</li>
          <li><strong>Job Description:</strong> A brief description of the job, highlighting key responsibilities and requirements.</li>
          <li><strong>Experience Level:</strong> Your experience level relevant to the job (e.g., Entry-level, Mid-level, Senior).</li>
        </ul>
      </div>

      <div className="step mb-6">
        <h2 className="text-2xl font-semibold mb-2">Step 2: Choose Interview Type</h2>
        <p className="text-lg mb-4">Select the type of interview you want to prepare for:</p>
        <ul className="list-disc list-inside text-lg">
          <li>Technical Interview</li>
          <li>HR Interview</li>
          
        </ul>
      </div>

      <div className="step mb-6">
        <h2 className="text-2xl font-semibold mb-2">Step 3: Generate Questions</h2>
        <p className="text-lg mb-4">Based on the provided details, our AI will generate a set of questions that are most relevant to the job and interview type you selected.</p>
      </div>

      <div className="step mb-6">
        <h2 className="text-2xl font-semibold mb-2">Step 4: Review and Prepare</h2>
        <p className="text-lg mb-4">Review the generated questions and prepare your answers. Use our portal to practice and refine your responses.</p>
      </div>
    </div>
  );
};

export default HowItWorks;
