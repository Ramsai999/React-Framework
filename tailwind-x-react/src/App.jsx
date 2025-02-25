import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import "./App.css";

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className={`fixed top-0 left-0 w-full p-4 shadow-md z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-blue-600'}`}>
      <ul className="flex justify-center space-x-6 text-white font-medium">
        <li className={location.pathname === "/" ? "text-gray-300" : "hover:text-gray-200"}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === "/about" ? "text-gray-300" : "hover:text-gray-200"}>
          <Link to="/about">About</Link>
        </li>
        <li className={location.pathname === "/team" ? "text-gray-300" : "hover:text-gray-200"}>
          <Link to="/team">Team</Link>
        </li>
        <li className={location.pathname === "/contact" ? "text-gray-300" : "hover:text-gray-200"}>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <button
        className="absolute top-2 right-8 bg-gray-500 text-black py-2 px-4 rounded"
        onClick={toggleTheme}
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
};

const PageLayout = ({ title, children, isDarkMode }) => (
  <div className={`flex justify-center items-center min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} text-center px-4`}>
    <div className={`max-w-3xl p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg`}>
      <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>{title}</h1>
      <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{children}</p>
    </div>
  </div>
);

const Home = ({ isDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const handleButtonClick = (buttonName) => {
    navigate(`/?query=${buttonName}`);
  };

  return (
    <PageLayout title={query ? `Button clicked: ${query}` : "Welcome to Our Website"} isDarkMode={isDarkMode}>
      Explore our site to learn more.
      <div className="mt-6 flex justify-center space-x-4">
        {["Goals", "Mission", "Teams"].map((btn) => (
          <button
            key={btn}
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-500 transition"
            onClick={() => handleButtonClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </PageLayout>
  );
};

const About = ({ isDarkMode }) => (
  <PageLayout title="About Us" isDarkMode={isDarkMode}>
    Learn more about our mission, vision, and the team that makes it happen.
  </PageLayout>
);

const Team = ({ isDarkMode }) => (
  <PageLayout title="Meet Our Team" isDarkMode={isDarkMode}>
    <div className="mt-4 space-y-3 text-gray-700">
      {["John Doe - CEO", "Jane Smith - CTO", "Alice Johnson - CFO"].map((member, index) => (
        <div key={index} className="bg-gray-200 p-2 rounded">{member}</div>
      ))}
    </div>
  </PageLayout>
);

const Contact = ({ isDarkMode }) => (
  <PageLayout title="Contact Us" isDarkMode={isDarkMode}>
    <form className="mt-6 space-y-4">
      <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-lg" />
      <input type="email" placeholder="Your Email" className="w-full p-3 border border-gray-300 rounded-lg" />
      <textarea placeholder="Your Message" className="w-full p-3 border border-gray-300 rounded-lg h-32"></textarea>
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition">
        Send Message
      </button>
    </form>
  </PageLayout>
);

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
          <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
          <Route path="/team" element={<Team isDarkMode={isDarkMode} />} />
          <Route path="/contact" element={<Contact isDarkMode={isDarkMode} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
