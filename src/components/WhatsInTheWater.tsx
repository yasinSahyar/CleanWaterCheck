// src/components/WhatsInTheWater.tsx
import React from 'react';
import './WhatsInTheWater.css';

const WhatsInTheWater: React.FC = () => {
  return (
    <div className="water-info-page">
      <h1>What's In My Water? Drinking Water Contaminant List</h1>
      
      <p>
        This is a list of the regulated and unregulated contaminants in <strong>Finland's</strong> drinking water, 
        as per the <strong>Finnish Environment Institute (SYKE)</strong> and other relevant authorities. The top table 
        is a list of high-priority pollutants, while the bottom is unregulated contaminants, as defined by Finnish 
        water quality standards.
      </p>

      <p>
        If you are concerned about contaminants in your drinking water, then installing a home water filter is the 
        best action you can take.
      </p>

      <h2>Priority Drinking Water Contaminants</h2>
      
      <p>Any pollutant with a (P) next to it is considered of the foremost priority.</p>

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
            <td>Acrolein (P)</td>
            <td>107028</td>
            <td>3</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Acrylonitrile (P)</td>
            <td>107131</td>
            <td>0.061</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Aldrin (P)</td>
            <td>309002</td>
            <td>0.00000077</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>alpha-Hexachlorocyclohexane (HCH) (P)</td>
            <td>319846</td>
            <td>0.00036</td>
            <td>—</td>
            <td>2015</td>
          </tr>
        </tbody>
      </table>

      <h2>Unregulated Chemical Contaminants</h2>
      
      <p>
        This is a list of Finland government-recognized water contaminants. These are known as unregulated 
        contaminants because they are not currently subject to regulations but are recognized as being present 
        in the water supply and harmful to humans. Future updates to Finnish water quality standards may include 
        these contaminants as regulated chemicals if they are deemed to pose a significant risk to public health.
      </p>

      <p>The source of this data is the Finnish Environment Institute (SYKE) and other relevant Finnish authorities.</p>

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
            <td>1,1-Dichloroethane</td>
            <td>75-34-3</td>
            <td>Industrial solvent and an intermediate in the synthesis of other compounds.</td>
          </tr>
          <tr>
            <td>1,1,1,2-Tetrachloroethane</td>
            <td>630-20-6</td>
            <td>Industrial solvent and used in the synthesis of other chlorinated compounds.</td>
          </tr>
          <tr>
            <td>1,2,3-Trichloropropane</td>
            <td>96-18-4</td>
            <td>Industrial solvent, cleaning and degreasing agent as well as an intermediate in the synthesis of other compounds.</td>
          </tr>
        </tbody>
      </table>

      <h2>Microbial Contaminants</h2>
      
      <p>
        Microbial contaminants in Finland's water supply can pose significant health risks. Below is a list of 
        common microbial contaminants found in Finnish water sources.
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
            <td>Adenovirus</td>
            <td>Virus</td>
            <td>Respiratory illness and occasionally gastrointestinal illness.</td>
          </tr>
          <tr>
            <td>Caliciviruses</td>
            <td>Virus (includes Norovirus)</td>
            <td>Mild self-limiting gastrointestinal illness.</td>
          </tr>
          <tr>
            <td>Enterovirus</td>
            <td>Virus</td>
            <td>Mild respiratory illness.</td>
          </tr>
        </tbody>
      </table>

      <h2>Other Contaminants / Conditions</h2>
      
      <p>
        Contaminants not covered in the aforementioned tables. Most of these are considered under 
        <strong>Secondary Water Standards</strong> in Finland.
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
            <td>Alkalinity</td>
            <td>None / None</td>
            <td></td>
          </tr>
          <tr>
            <td>Fluoride</td>
            <td>4.0 / 2.0</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WhatsInTheWater;