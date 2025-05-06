// src/components/About.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <h1>About</h1>
      <p>
        <strong>CleanWaterCheck Finland</strong> is an online database of drinking water data, focused on Finland. The goal 
        of the project is to provide the best possible water quality information to Finnish residents and visitors 
        in an easy-to-use manner.
      </p>
      <p>
        The vast majority of the data on the site was provided free-to-use by Finland government agencies 
        (local) and made available through tools like{' '}
        <a href="http://www.vesi.fi" target="_blank" rel="noopener noreferrer">
          www.vesi.fi
        </a>
        . Before creating the site, we investigated this information and found it to be plentiful, but hard to use. 
        Additionally, important information for any one area was spread out through any number of different sources, 
        making the data unnecessarily difficult to view for the casual or occasional user.
      </p>
      <p>
        <Link to="/data">Learn more about how we get our water data</Link>.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions or comments, please email us at:{' '}
        <a href="mailto:admin@CleanWaterCheck.fi">admin@CleanWaterCheck.fi</a>.
      </p>
    </div>
  );
};

export default About;