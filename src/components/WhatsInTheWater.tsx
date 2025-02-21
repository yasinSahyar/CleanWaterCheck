// src/components/WhatsInTheWater.tsx
import React from 'react';
import './HomePage.css';  // Optional: Add CSS for styling

const WhatsInTheWater: React.FC = () => {
  return (
    <div className="whats-in-the-water-page">
      <h1>What’s In My Water? Drinking Water Contaminant List</h1>
      <p>
        This is a list of the regulated and unregulated contaminants in <strong>Finland's</strong> drinking water, as per the <strong>Finnish Environment Institute (SYKE)</strong> and other relevant authorities. The top table is a list of high-priority pollutants, while the bottom is unregulated contaminants, as defined by Finnish water quality standards.
      </p>
      <p>
        If you are concerned about contaminants in your drinking water, then installing a home water filter is the best action you can take.
      </p>

      <h2>Priority Drinking Water Contaminants</h2>
      <p>
        Any pollutant with a <strong>(P)</strong> next to it is considered of the foremost priority.
      </p>
      <table>
        <thead>
          <tr>
            <th>Pollutant</th>
            <th>CAS Number</th>
            <th>Human Health For Consumption (µg/L)</th>
            <th>Organoleptic Effect Criteria (µg/L)</th>
            <th>Publication Year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Acenaphthene (P)</td>
            <td>83329</td>
            <td>70</td>
            <td>20</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Arsenic (P)</td>
            <td>7440382</td>
            <td>0.018</td>
            <td>—</td>
            <td>1992</td>
          </tr>
          <tr>
            <td>Cadmium (P)</td>
            <td>7440439</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
          </tr>
          <tr>
            <td>Lead (P)</td>
            <td>7439921</td>
            <td>0.015</td>
            <td>—</td>
            <td>1991</td>
          </tr>
          <tr>
            <td>Nitrates</td>
            <td>14797558</td>
            <td>10,000</td>
            <td>—</td>
            <td>1986</td>
          </tr>
          <tr>
            <td>Zinc (P)</td>
            <td>7440666</td>
            <td>7,400</td>
            <td>5,000</td>
            <td>2002</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>

      <h2>Unregulated Chemical Contaminants</h2>
      <p>
        This is a list of <strong>Finland</strong> government-recognized water contaminants. These are known as unregulated contaminants because they are not currently subject to regulations but are recognized as being present in the water supply and harmful to humans. Future updates to Finnish water quality standards may include these contaminants as regulated chemicals if they are deemed to pose a significant risk to public health.
      </p>
      <p>
        The source of this data is the <strong>Finnish Environment Institute (SYKE)</strong> and other relevant Finnish authorities.
      </p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>CAS#</th>
            <th>Use</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1,4-Dioxane</td>
            <td>123-91-1</td>
            <td>A solvent for cellulose formulations, resins, oils, waxes, and other organic substances.</td>
          </tr>
          <tr>
            <td>Perfluorooctanesulfonic acid (PFOS)</td>
            <td>1763-23-1</td>
            <td>Used in firefighting foams and industrial applications.</td>
          </tr>
          <tr>
            <td>Perfluorooctanoic acid (PFOA)</td>
            <td>335-67-1</td>
            <td>Used in the production of non-stick coatings and water-resistant materials.</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>

      <h2>Microbial Contaminants</h2>
      <p>
        Microbial contaminants in Finland's water supply can pose significant health risks. Below is a list of common microbial contaminants found in Finnish water sources.
      </p>
      <table>
        <thead>
          <tr>
            <th>Microbial Contaminant Name</th>
            <th>Type</th>
            <th>Diseases and Infections</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Campylobacter jejuni</td>
            <td>Bacteria</td>
            <td>Mild self-limiting gastrointestinal illness.</td>
          </tr>
          <tr>
            <td>Escherichia coli (0157)</td>
            <td>Bacteria</td>
            <td>Gastrointestinal illness and kidney failure.</td>
          </tr>
          <tr>
            <td>Legionella pneumophila</td>
            <td>Bacteria</td>
            <td>Lung diseases when inhaled from contaminated water.</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>

      <h2>Other Contaminants / Conditions</h2>
      <p>
        Contaminants not covered in the aforementioned tables. Most of these are considered under <strong>Secondary Water Standards</strong> in Finland.
      </p>
      <table>
        <thead>
          <tr>
            <th>Contaminant Name</th>
            <th>Primary MCL / Secondary MCL (mg/L)</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Iron</td>
            <td>None / 0.30</td>
            <td>Organoleptic Effect: 300 µg/L</td>
          </tr>
          <tr>
            <td>Fluoride</td>
            <td>1.5 / 1.0</td>
            <td>Excessive fluoride can cause dental fluorosis.</td>
          </tr>
          <tr>
            <td>pH</td>
            <td>None / 6.5-8.5</td>
            <td>Optimal pH range for drinking water.</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>

      <p>
        The source of this list is the <strong>Finnish Environment Institute (SYKE)</strong> and other relevant Finnish authorities.
      </p>
    </div>
  );
};

export default WhatsInTheWater;