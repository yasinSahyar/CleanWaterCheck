import React, { useState } from 'react';

const WaterQualityReport: React.FC = () => {
    const [report, setReport] = useState({ turbidity: '', odor: '', location: '' });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Here you would handle the submission, e.g., send data to an API
        console.log(report);
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