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
          <tr>
            <td>alpha-Endosulfan (P)</td>
            <td>959988</td>
            <td>20</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Anthracene (P)</td>
            <td>120127</td>
            <td>300</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Antimony (P)</td>
            <td>7440360</td>
            <td>5.6</td>
            <td>—</td>
            <td>1980</td>
          </tr>
          <tr>
            <td>Arsenic (P)</td>
            <td>7440382</td>
            <td>0.018</td>
            <td>—</td>
            <td>1992</td>
          </tr>
          <tr>
            <td>Asbestos (P)</td>
            <td>1332214</td>
            <td>7 million fibers/L</td>
            <td>—</td>
            <td>1991</td>
          </tr>
          <tr>
            <td>Barium</td>
            <td>7440393</td>
            <td>1,000</td>
            <td>—</td>
            <td>1986</td>
          </tr>
          <tr>
            <td>Benzene (P)</td>
            <td>71432</td>
            <td>0.58-2.1</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Benzidine (P)</td>
            <td>92875</td>
            <td>0.00014</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Benzo(a)anthracene (P)</td>
            <td>56553</td>
            <td>0.0012</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Benzo(a)pyrene (P)</td>
            <td>50328</td>
            <td>0.00012</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Benzo(b)fluoranthene (P)</td>
            <td>205992</td>
            <td>0.0012</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Benzo(k)fluoranthene (P)</td>
            <td>207089</td>
            <td>0.012</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Beryllium (P)</td>
            <td>7440417</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
          </tr>
          <tr>
            <td>beta-Hexachlorocyclohexane (HCH) (P)</td>
            <td>319857</td>
            <td>0.0080</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>beta-Endosulfan (P)</td>
            <td>33213659</td>
            <td>20</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Bis(2-Chloro-1-methylethyl) Ether (P)</td>
            <td>108601</td>
            <td>200</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Bis(2-Chloroethyl) Ether (P)</td>
            <td>111444</td>
            <td>0.030</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Bis(2-Ethylhexyl) Phthalate (P)</td>
            <td>117817</td>
            <td>0.32</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Bis(Chloromethyl) Ether</td>
            <td>542881</td>
            <td>0.00015</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Bromoform (P)</td>
            <td>75252</td>
            <td>7.0</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Butylbenzyl Phthalate (P)</td>
            <td>85687</td>
            <td>0.10</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Cadmium (P)</td>
            <td>7440439</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
          </tr>
          <tr>
            <td>Carbon Tetrachloride (P)</td>
            <td>56235</td>
            <td>0.4</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Chlordane (P)</td>
            <td>57749</td>
            <td>0.00031</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Chlorobenzene (P)</td>
            <td>108907</td>
            <td>100</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Chlorodibromomethane (P)</td>
            <td>124481</td>
            <td>0.80</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Chloroform (P)</td>
            <td>67663</td>
            <td>60</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Chlorophenoxy Herbicide (2,4-D)</td>
            <td>94757</td>
            <td>1,300</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Chlorophenoxy Herbicide (2,4,5-TP) [Silvex]</td>
            <td>93721</td>
            <td>100</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Chromium (III) (P)</td>
            <td>16065831</td>
            <td>Total</td>
            <td>—</td>
            <td>—</td>
          </tr>
          <tr>
            <td>Chromium (VI) (P)</td>
            <td>18540299</td>
            <td>Total</td>
            <td>—</td>
            <td>—</td>
          </tr>
          <tr>
            <td>Chrysene (P)</td>
            <td>218019</td>
            <td>0.12</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Copper (P)</td>
            <td>7440508</td>
            <td>1,300</td>
            <td>1,000</td>
            <td>1992</td>
          </tr>
          <tr>
            <td>Cyanide (P)</td>
            <td>57125</td>
            <td>4</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Dibenzo(a,h)anthracene (P)</td>
            <td>53703</td>
            <td>0.00012</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Dichlorobromomethane (P)</td>
            <td>75274</td>
            <td>0.95</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Dieldrin (P)</td>
            <td>60571</td>
            <td>0.0000012</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Diethyl Phthalate (P)</td>
            <td>84662</td>
            <td>600</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Dimethyl Phthalate (P)</td>
            <td>131113</td>
            <td>2,000</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Di-n-Butyl Phthalate (P)</td>
            <td>84742</td>
            <td>20</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Dinitrophenols</td>
            <td>25550587</td>
            <td>10</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Endosulfan Sulfate (P)</td>
            <td>1031078</td>
            <td>20</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Endrin (P)</td>
            <td>72208</td>
            <td>0.03</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Endrin Aldehyde (P)</td>
            <td>7421934</td>
            <td>1</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Ethylbenzene (P)</td>
            <td>100414</td>
            <td>68</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Fluoranthene (P)</td>
            <td>206440</td>
            <td>20</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Fluorene (P)</td>
            <td>86737</td>
            <td>50</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>gamma-Hexachlorocyclohexane (HCH) [Lindane] (P)</td>
            <td>58899</td>
            <td>4.2</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Heptachlor (P)</td>
            <td>76448</td>
            <td>0.0000059</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Heptachlor Epoxide (P)</td>
            <td>1024573</td>
            <td>0.000032</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Hexachlorobenzene (P)</td>
            <td>118741</td>
            <td>0.000079</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Hexachlorobutadiene (P)</td>
            <td>87683</td>
            <td>0.01</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Hexachlorocyclohexane (HCH) -Technical</td>
            <td>608731</td>
            <td>0.0066</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Hexachlorocyclopentadiene (P)</td>
            <td>77474</td>
            <td>4</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Hexachloroethane (P)</td>
            <td>67721</td>
            <td>0.1</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Indeno(1,2,3-cd)pyrene (P)</td>
            <td>193395</td>
            <td>0.0012</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Isophorone (P)</td>
            <td>78591</td>
            <td>34</td>
            <td>—</td>
            <td>2015</td>
          </tr>
          <tr>
            <td>Manganese</td>
            <td>7439965</td>
            <td>50</td>
            <td>—</td>
            <td>1993</td>
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
          <tr>
            <td>1,3-Butadiene</td>
            <td>106-99-0</td>
            <td>Used in the production of rubber and plastics.</td>
          </tr>
          <tr>
            <td>1,4-Dioxane</td>
            <td>123-91-1</td>
            <td>A solvent for cellulose formulations, resins, oils, waxes, and other organic substances. It is also used in wood pulping, textile processing, degreasing, in lacquers, paints, varnishes, and stains; and in paint and varnish removers.</td>
          </tr>
          <tr>
            <td>17alpha-estradiol</td>
            <td>57-91-0</td>
            <td>Estrogenic hormone found in some pharmaceuticals.</td>
          </tr>
          <tr>
            <td>1-Butanol</td>
            <td>71-36-3</td>
            <td>A solvent and used in the production of other chemicals. It is present in a number of commercial products such as perfumes.</td>
          </tr>
          <tr>
            <td>2-Methoxyethanol</td>
            <td>109-86-4</td>
            <td>Used in a number of consumer products, such as synthetic cosmetics, perfumes, fragrances, hair preparations, and skin lotions.</td>
          </tr>
          <tr>
            <td>2-Propen-1-ol</td>
            <td>107-18-6</td>
            <td>Used in the production of other chemicals.</td>
          </tr>
          <tr>
            <td>3-Hydroxycarbofuran</td>
            <td>16655-82-6</td>
            <td>A pesticide degradate; the parent, carbofuran, is used as an insecticide.</td>
          </tr>
          <tr>
            <td>4,4′-Methylenedianiline</td>
            <td>101-77-9</td>
            <td>It is used in the production of polyurethane foams, glues, rubber, and spandex fiber.</td>
          </tr>
          <tr>
            <td>Acephate</td>
            <td>30560-19-1</td>
            <td>It is an insecticide.</td>
          </tr>
          <tr>
            <td>Acetaldehyde</td>
            <td>75-07-0</td>
            <td>It is a disinfection byproduct from ozonation; it is used in the production of other chemicals.</td>
          </tr>
          <tr>
            <td>Acetamide</td>
            <td>60-35-5</td>
            <td>It is used as a solvent and plasticizer.</td>
          </tr>
          <tr>
            <td>Acetochlor</td>
            <td>34256-82-1</td>
            <td>It is an herbicide for weed control on agricultural crops.</td>
          </tr>
          <tr>
            <td>Acetochlor ethanesulfonic acid (ESA)</td>
            <td>187022-11-3</td>
            <td>Acetochlor ESA is an environmental degradate of acetochlor.</td>
          </tr>
          <tr>
            <td>Acetochlor oxanilic acid (OA)</td>
            <td>184992-44-4</td>
            <td>Acetochlor OA is an environmental degradate of acetochlor.</td>
          </tr>
          <tr>
            <td>Acrolein</td>
            <td>107-02-8</td>
            <td>It is used as an aquatic herbicide, rodenticide, and industrial chemical.</td>
          </tr>
          <tr>
            <td>Alachlor ethanesulfonic acid (ESA)</td>
            <td>142363-53-9</td>
            <td>Alachlor ESA is an environmental degradate of the pesticide alachlor (an herbicide for weed control on agricultural crops).</td>
          </tr>
          <tr>
            <td>Alachlor oxanilic acid (OA)</td>
            <td>171262-17-2</td>
            <td>Alachlor OA is an environmental degradate of alachlor.</td>
          </tr>
          <tr>
            <td>alpha-Hexachlorocyclohexane</td>
            <td>319-84-6</td>
            <td>It is a component of benzene hexachloride (BHC) and was formerly used as an insecticide.</td>
          </tr>
          <tr>
            <td>Aniline</td>
            <td>62-53-3</td>
            <td>It is used as an industrial chemical, as a solvent, in the synthesis of explosives, rubber products, and in isocyanates.</td>
          </tr>
          <tr>
            <td>Bensulide</td>
            <td>741-58-2</td>
            <td>It is an herbicide.</td>
          </tr>
          <tr>
            <td>Benzyl chloride</td>
            <td>100-44-7</td>
            <td>It is used in the production of other substances, such as plastics, dyes, lubricants, gasoline, and pharmaceuticals.</td>
          </tr>
          <tr>
            <td>Butylated hydroxyanisole</td>
            <td>25013-16-5</td>
            <td>It is used as a food additive (antioxidant).</td>
          </tr>
          <tr>
            <td>Captan</td>
            <td>133-06-2</td>
            <td>It is a fungicide.</td>
          </tr>
          <tr>
            <td>Chlorate</td>
            <td>14866-68-3</td>
            <td>Chlorate compounds are used in agriculture as defoliants or desiccants and may occur in drinking water because of the use of disinfectants such as chlorine dioxide and hypochlorites.</td>
          </tr>
          <tr>
            <td>Chloromethane (Methyl chloride)</td>
            <td>74-87-3</td>
            <td>It is used as a foaming agent and in the production of other substances.</td>
          </tr>
          <tr>
            <td>Clethodim</td>
            <td>110429-62-4</td>
            <td>It is an herbicide.</td>
          </tr>
          <tr>
            <td>Cobalt</td>
            <td>7440-48-4</td>
            <td>It is a naturally occurring element and was formerly used as cobaltous chloride in medicines and as a germicide. It is a part of the vitamin B12 molecule.</td>
          </tr>
          <tr>
            <td>Cumene hydroperoxide</td>
            <td>80-15-9</td>
            <td>It is used as a catalyst in the production of other substances.</td>
          </tr>
          <tr>
            <td>Cyanotoxins</td>
            <td>Not applicable</td>
            <td>Toxins naturally produced and released by cyanobacteria (“blue-green algae”). The group of cyanotoxins includes, but is not limited to: anatoxin-a, cylindrospermopsin, microcystins, and saxitoxin.</td>
          </tr>
          <tr>
            <td>Dicrotophos</td>
            <td>141-66-2</td>
            <td>It is an insecticide.</td>
          </tr>
          <tr>
            <td>Dimethipin</td>
            <td>55290-64-7</td>
            <td>It is an herbicide and plant growth regulator.</td>
          </tr>
          <tr>
            <td>Diuron</td>
            <td>330-54-1</td>
            <td>It is an herbicide.</td>
          </tr>
          <tr>
            <td>Equilenin</td>
            <td>517-09-9</td>
            <td>It is an estrogenic hormone used in hormone replacement therapy.</td>
          </tr>
          <tr>
            <td>Equilin</td>
            <td>474-86-2</td>
            <td>It is an estrogenic hormone and is used in hormone replacement therapy.</td>
          </tr>
          <tr>
            <td>Erythromycin</td>
            <td>114-07-8</td>
            <td>It is used as an antibiotic.</td>
          </tr>
          <tr>
            <td>Estradiol (17-beta estradiol)</td>
            <td>50-28-2</td>
            <td>It is an isomer of estradiol found in some pharmaceuticals.</td>
          </tr>
          <tr>
            <td>Estriol</td>
            <td>50-27-1</td>
            <td>It is a weak estrogenic hormone used in veterinary pharmaceuticals.</td>
          </tr>
          <tr>
            <td>Estrone</td>
            <td>53-16-7</td>
            <td>It is a precursor of estradiol used in veterinary and human pharmaceuticals.</td>
          </tr>
          <tr>
            <td>Ethinyl estradiol (17-alpha ethynyl estradiol)</td>
            <td>57-63-6</td>
            <td>It is an estrogenic hormone and is used in veterinary and human oral contraceptives.</td>
          </tr>
          <tr>
            <td>Ethoprop</td>
            <td>13194-48-4</td>
            <td>It is an insecticide.</td>
          </tr>
          <tr>
            <td>Ethylene glycol</td>
            <td>107-21-1</td>
            <td>It is used as antifreeze, in textile manufacturing, and is a canceled pesticide.</td>
          </tr>
          <tr>
            <td>Ethylene oxide</td>
            <td>75-21-8</td>
            <td>It is a fungicidal and insecticidal fumigant.</td>
          </tr>
          <tr>
            <td>Ethylene thiourea</td>
            <td>96-45-7</td>
            <td>It is used in the production of other substances, such as for vulcanizing polychloroprene (neoprene) and polyacrylate rubbers and is a metabolite of some fungicides.</td>
          </tr>
          <tr>
            <td>Formaldehyde</td>
            <td>50-00-0</td>
            <td>It is an ozonation disinfection byproduct, can occur naturally, and has been used as a fungicide.</td>
          </tr>
          <tr>
            <td>Germanium</td>
            <td>7440-56-4</td>
            <td>It is a naturally occurring element and is commonly found as germanium dioxide in phosphors, transistors, and diodes, and in electroplating. In some cases, it has been sold as a dietary supplement.</td>
          </tr>
          <tr>
            <td>HCFC-22</td>
            <td>75-45-6</td>
            <td>It is used as a refrigerant, as a low-temperature solvent, and in fluorocarbon resins, especially in tetrafluoroethylene polymers.</td>
          </tr>
          <tr>
            <td>Halon 1011 (bromochloromethane)</td>
            <td>74-97-5</td>
            <td>It is used as a fire-extinguishing fluid and to suppress explosions, as well as a solvent in the manufacturing of some pesticides. May also occur as a disinfection by-product in drinking water.</td>
          </tr>
          <tr>
            <td>Hexane</td>
            <td>110-54-3</td>
            <td>It is a component of gasoline and used as a solvent.</td>
          </tr>
          <tr>
            <td>Hydrazine</td>
            <td>302-01-2</td>
            <td>It is used as an ingredient in the production of other substances, such as rocket propellants. It is also used in the production of plastics.</td>
          </tr>
          <tr>
            <td>Manganese</td>
            <td>7439-96-5</td>
            <td>It is a naturally occurring element used in a variety of applications, including use in steel production to improve hardness, stiffness, and strength. It is an essential nutrient found in vitamin/mineral supplements and in fortified foods.</td>
          </tr>
          <tr>
            <td>Mestranol</td>
            <td>72-33-3</td>
            <td>It is a precursor to ethinylestradiol used in veterinary and human pharmaceuticals.</td>
          </tr>
          <tr>
            <td>Methamidophos</td>
            <td>10265-92-6</td>
            <td>It is an insecticide.</td>
          </tr>
          <tr>
            <td>Methanol</td>
            <td>67-56-1</td>
            <td>It is used as an industrial solvent, a gasoline additive, and as an anti-freeze ingredient.</td>
          </tr>
          <tr>
            <td>Methyl bromide (bromomethane)</td>
            <td>74-83-9</td>
            <td>It has been used as a fumigant and fungicide.</td>
          </tr>
          <tr>
            <td>Methyl tert-butyl ether (MTBE)</td>
            <td>1634-04-4</td>
            <td>It is used as an octane booster in gasoline, in the manufacturing of isobutene, and as an extraction solvent.</td>
          </tr>
          <tr>
            <td>Metolachlor</td>
            <td>51218-45-2</td>
            <td>It is an herbicide for weed control on agricultural crops.</td>
          </tr>
          <tr>
            <td>Metolachlor ethanesulfonic acid (ESA)</td>
            <td>171118-09-5</td>
            <td>Metolachlor ESA is an environmental degradate of metolachlor.</td>
          </tr>
          <tr>
            <td>Permethrin</td>
            <td>52645-53-1</td>
            <td>It is an insecticide.</td>
          </tr>
          <tr>
            <td>Triphenyltin hydroxide (TPTH)</td>
            <td>76-87-9</td>
            <td>It is a pesticide.</td>
          </tr>
          <tr>
            <td>Vinclozolin</td>
            <td>50471-44-8</td>
            <td>It is a fungicide.</td>
          </tr>
          <tr>
            <td>Ziram</td>
            <td>137-30-4</td>
            <td>It is a fungicide.</td>
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
          <tr>
            <td>Hepatitis A virus</td>
            <td>Virus</td>
            <td>Liver disease and jaundice.</td>
          </tr>
          <tr>
            <td>Mycobacterium avium</td>
            <td>Bacteria</td>
            <td>Lung infection in those with underlying lung disease, and disseminated infection in the severely immuno compromised.</td>
          </tr>
          <tr>
            <td>Shigella sonnei</td>
            <td>Bacteria</td>
            <td>Mild self-limiting gastrointestinal illness and bloody diarrhea.</td>
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
            <td>Alkalinity</td>
            <td>None / None</td>
            <td></td>
          </tr>
          <tr>
            <td>Fluoride</td>
            <td>4.0 / 2.0</td>
            <td></td>
          </tr>
          <tr>
            <td>Hardness</td>
            <td>	None / None</td>
            <td></td>
          </tr>
          <tr>
            <td>Lead</td>
            <td>0.015 / None</td>
            <td>0.015 mg/L reflects an EPA action level</td>
          </tr>
          <tr>
            <td>Magnesium</td>
            <td>	None / None</td>
            <td></td>
          </tr>
          <tr>
            <td>Mercury</td>
            <td>0.002 / None</td>
            <td></td>
          </tr>
          <tr>
            <td>Nitrite</td>
            <td>1.0 / None</td>
            <td></td>
          </tr>
          <tr>
            <td>pH</td>
            <td>None / 6.5-8.5</td>
            <td>Optimal pH range for drinking water.</td>
          </tr>
          <tr>
            <td>Silver</td>
            <td>1.0 / None</td>
            <td></td>
          </tr>
          <tr>
            <td>Sodium</td>
            <td>None / None</td>
            <td></td>
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