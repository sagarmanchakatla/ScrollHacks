import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const InvestorsPage = () => {
  const navigate = useNavigate(); // Use the useNavigate hook for routing
  const investors = [
    {
      id: 1,
      name: 'John Doe',
      firm: 'Doe Ventures',
      specialization: 'Technology, SaaS',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'John is an experienced investor focusing on tech startups. He believes in innovation and the power of technology to change lives.',
      currentProjects: 'Investing in multiple SaaS platforms and AI technologies.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      firm: 'Smith Capital',
      specialization: 'Healthcare, Biotech',
      image: 'https://images.unsplash.com/photo-1694163939058-b31163b10f4e?q=80&w=1493&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'Jane specializes in healthcare investments and has a passion for biotech innovations.',
      currentProjects: 'Currently funding research in gene therapy and medical devices.',
    },{
      id: 3,
      name: 'Michael Johnson',
      firm: 'Johnson Ventures',
      specialization: 'Fintech, AI',
      image: 'https://images.unsplash.com/photo-1562788869-4ed32648eb72?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'Michael has a deep understanding of the fintech landscape and invests in disruptive financial technologies.',
      currentProjects: 'Developing a new app for digital banking solutions.',
    },
    {
      id: 4,
      name: 'Emily Davis',
      firm: 'Davis Partners',
      specialization: 'Green Energy, Sustainability',
      image: 'https://images.unsplash.com/photo-1694164250168-9519f87a1b7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW52ZXN0b3JzfGVufDB8fDB8fHww',
      description:
        'Emily is passionate about sustainability and focuses on green energy projects that make a difference.',
      currentProjects: 'Supporting solar energy startups and eco-friendly products.',
    },
    {
      id: 5,
      name: 'Chris Brown',
      firm: 'Brown Capital',
      specialization: 'E-commerce, Retail',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'Chris specializes in retail investments and is known for his keen eye for promising e-commerce ventures.',
      currentProjects: 'Launching a new platform for sustainable fashion.',
    },
    {
      id: 6,
      name: 'Alice Green',
      firm: 'Green Innovations',
      specialization: 'Startups, Tech',
      image: 'https://images.unsplash.com/photo-1694162789200-3b018f615efe?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'Alice invests in innovative tech startups and is committed to empowering entrepreneurs.',
      currentProjects: 'Working on a startup incubator for tech innovations.',
    },
    {
      id: 7,
      name: 'David White',
      firm: 'White Holdings',
      specialization: 'Venture Capital, Equity',
      image: 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'David has extensive experience in venture capital and focuses on equity investments across various sectors.',
      currentProjects: 'Leading investments in several growing startups.',
    },
    {
      id: 8,
      name: 'Sophia Taylor',
      firm: 'Taylor Ventures',
      specialization: 'Consumer Goods, Retail',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'Sophia specializes in consumer goods and retail investments, helping businesses scale effectively.',
      currentProjects: 'Investing in new consumer tech products and services.',
    },
  ];

    // Add other investors as needed
  

  const [selectedInvestor, setSelectedInvestor] = useState(null);
  
  const handleInvestorClick = (investor) => {
    setSelectedInvestor(investor);
  };

  const handleCloseModal = () => {
    setSelectedInvestor(null);
  };

  // Function to handle routing to the BusinessProposal page
  const handleGenerateProposal = () => {
    navigate('/businessProposal'); // Navigate to the BusinessProposal page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <motion.section
        className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ayiclCj2AeXf8e-J6BqlD_G6qyIgP5ffXA&s')`,
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center text-white p-6 bg-black bg-opacity-50 rounded-lg">
          <motion.h1
            className="text-5xl font-bold mb-4"
            style={{ fontFamily: 'Lucida, sans-serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Connect with Investors & Get More Opportunities
          </motion.h1>
          <motion.p
            className="text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Join our initiative to network with venture capitalists and angel investors. Unlock funding opportunities, mentorship, and collaborations that help your business grow.
          </motion.p>
        </div>
      </motion.section>

      {/* Investors Section */}
      <motion.section
        className="py-16 px-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <motion.h2
          className="text-3xl font-bold mb-8 text-center"
          style={{ fontFamily: 'Lucida, sans-serif' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Investors & Venture Capitalists
        </motion.h2>

        {/* Investor Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {investors.map((investor) => (
            <motion.div
              key={investor.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img
                src={investor.image}
                alt={investor.name}
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: 'Lucida, sans-serif' }}
                >
                  {investor.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {investor.firm} - {investor.specialization}
                </p>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleInvestorClick(investor)}
                >
                  Read More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Modal for Investor Details */}
      {selectedInvestor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <motion.div
            className="bg-white rounded-lg p-6 max-w-lg w-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: 'Lucida, sans-serif' }}
            >
              {selectedInvestor.name}
            </h2>
            <img
              src={selectedInvestor.image}
              alt={selectedInvestor.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700 mb-2">
              {selectedInvestor.description}
            </p>
            <h3 className="font-semibold mb-2">Current Projects:</h3>
            <p className="text-gray-700 mb-4">{selectedInvestor.currentProjects}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleGenerateProposal} // Add the click handler here
            >
              Generate Proposal
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default InvestorsPage;
