// src/components/Data.tsx
import React from 'react';
import './HomePage.css'; // Optional: Add CSS for styling

const Data: React.FC = () => {
  return (
    <div className="data-page">
      <h1>Data Sources</h1>
      <p>
        <strong>CleanWaterCheck Finland</strong> was created with the goal of making Finland water data as easy to access and understand as possible. We are not the source of any raw water data; we simply collect, sort, filter, manipulate, interpret, and explain data.
      </p>
      <p>
        <strong>CleanWaterCheck Finland</strong> does not guarantee the accuracy or timeliness of any information on this site. Use this data at your own risk.
      </p>
      <h2>Where does CleanWaterCheck Finland’s data come from?</h2>
      <p>
        The short answer is that the Finland government mandates that vast amounts of water data are made publicly available. <strong>CleanWaterCheck Finland</strong> downloads that data, warehouses it, and finally makes it available on this website. This is a non-trivial process, one that we are constantly working on improving.
      </p>
      <p>
        So, where does our data actually come from? The short answer is{' '}
        <a href="https://www.vesi.fi" target="_blank" rel="noopener noreferrer">
          www.vesi.fi
        </a>{' '}
        and{' '}
        <a href="https://www.vesiyhdistys.fi" target="_blank" rel="noopener noreferrer">
          www.vesiyhdistys.fi
        </a>
        . These are the repositories of all Finland government data that is freely available. Some of the data is retrievable here, while other data is listed here but has to be retrieved from the agency responsible for it.
      </p>
      <p>
        Among the data sources we use—including federal, state, and local sources—the most important is data from the <strong>Safe Drinking Water Information System Government Reporting Services</strong>. We work with many other tools and datasets as well, such as Lead/Copper data, UCMR, EPA Enforcement and Compliance History, and more.
      </p>
      <p>
        If you see any data on the site that is wrong or inaccurately presented, please don’t hesitate to email us at:{' '}
        <a href="mailto:admin@CleanWaterCheck.fi">admin@CleanWaterCheck.fi</a>.
      </p>
    </div>
  );
};

export default Data;