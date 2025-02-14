//WaterQualityReport.tsx
import React, { useState } from 'react';

interface WaterQualityReportProps {
  onSubmit: (report: { turbidity: string; odor: string; location: string }) => void;
}

const WaterQualityReport: React.FC<WaterQualityReportProps> = ({ onSubmit }) => {
  const [report, setReport] = useState({ turbidity: '', odor: '', location: '' });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(report);
    setReport({ turbidity: '', odor: '', location: '' }); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Submit Report</button>
    </form>
  );
};

export default WaterQualityReport;