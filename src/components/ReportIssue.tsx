// src/components/ReportIssue.tsx
import React, { useState } from 'react';
import { Report } from '../types'; // Import the Report type

interface ReportIssueProps {
  onSubmit: (report: Report) => void;
}

const ReportIssue: React.FC<ReportIssueProps> = ({ onSubmit }) => {
  const [report, setReport] = useState<Report>({ turbidity: '', odor: '', location: '' });

  const handleSubmit = () => {
    onSubmit(report);
  };

  return (
    <div>
      <h2>Report an Issue</h2>
      <input
        type="text"
        placeholder="Turbidity"
        value={report.turbidity}
        onChange={(e) => setReport({ ...report, turbidity: e.target.value })}
      />
      <input
        type="text"
        placeholder="Odor"
        value={report.odor}
        onChange={(e) => setReport({ ...report, odor: e.target.value })}
      />
      <input
        type="text"
        placeholder="Location"
        value={report.location}
        onChange={(e) => setReport({ ...report, location: e.target.value })}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ReportIssue;