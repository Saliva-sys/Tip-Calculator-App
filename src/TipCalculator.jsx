import './TipCalculator.css';
import { useState, useEffect } from 'react'; // 1. Importujeme "pamäť"

export default function TipCalculator() {
  useEffect(() => {
    document.title = "Saliva-sys | Tip Calculator";
  }, []);
  // 2. Definujeme krabičky: [hodnota, funkcia_na_zmenu] = useState(pociatocna_hodnota)
  const [bill, setBill] = useState('');
  const [people, setPeople] = useState('');
  const [tip, setTip] = useState(0);
  const [custom, setCustom] = useState('');

  // premena textov na cisla
  const billValue = parseFloat(bill) || 0;
  const peopleValue = parseFloat(people) || 0;
  const tipPercent = tip / 100;


  // samotna matematika
  let tipPerPerson = 0;
  let totalPerPerson = 0;

  // aby sme nepocitali s nulou, vypocet zacne, az ked je zadany aspon jeden clovek
  if (peopleValue > 0) {
    const totalTip = billValue * tipPercent;
    tipPerPerson = totalTip / peopleValue;
    totalPerPerson = (billValue + totalTip) / peopleValue
  }

  const handleReset = () => {
    setBill('');
    setPeople('');
    setTip(0);
    setCustom('');
  };
  
  return (
  <main>
    <div className="main__space">
      <h1 className="space__title">SPLI<br/>TTER</h1>
      <div className="items__space">
        <section className="count__total">               
            <label htmlFor="bill" className="count__total-name">Bill</label>
            <input 
              className="input-bill" 
              type="number" 
              placeholder="0"
              value={bill} 
              onChange={(e) => setBill(e.target.value)}  
              />
            
            
            <p className="tip__select">Select Tip %</p>

            <div className="tip__selector"> 
              <button 
                type='button' 
                className={`tip__selector-btn ${tip === 5 ? 'selected' : ''}`}
                value={tip}
                onClick={() => {
                  setTip(5);
                  setCustom(''); // Vymaže Custom políčko
                  }
                }>
                5%
              </button>

              <button 
                type='button' 
                className={`tip__selector-btn ${tip === 10 ? 'selected' : ''}`}
                value={tip}
                onClick={() => {
                  setTip(10);
                  setCustom(''); // Vymaže Custom políčko
                  }
                }>
                10%
              </button>

              <button 
                type='button' 
                className={`tip__selector-btn ${tip === 15 ? 'selected' : ''}`}

                value={tip}
                onClick={() => {
                  setTip(15);
                  setCustom(''); // Vymaže Custom políčko
                  }
                }>
                15%
              </button>

              <button 
                type='button' 
                className={`tip__selector-btn ${tip === 25 ? 'selected' : ''}`}
                value={tip}
                onClick={() => {
                  setTip(25);
                  setCustom(''); // Vymaže Custom políčko
                  }
                }>
                25%
              </button>

              <button 
                type='button' 
                className={`tip__selector-btn ${tip === 50 ? 'selected' : ''}`}
                value={tip}
                onClick={() => {
                  setTip(50);
                  setCustom(''); // Vymaže Custom políčko
                  }
                }>
                50%
              </button>

              {/* zapisanie button pomocou jedneho zapisu
              <div className="tip__selector"> 
              {[5, 10, 15, 25, 50].map((percent) => (
                <button 
                  key={percent}
                  type='button' 
                  className={`tip__selector-btn ${tip === percent ? 'selected' : ''}`}
                  onClick={() => {
                    setTip(percent);
                    setCustom('');
                  }}>
                  {percent}%
                </button>
              ))} */}


              <input
                type='number' 
                className="tip__selector-btn-custom"
                placeholder="Custom"
                value={custom}
                onChange={(e) => {
                  const val = e.target.value;
                    setCustom(val);
                    setTip(parseFloat(val) || 0); // Nastavíme tip na hodnotu z custom poľa
                  }}
                  // Ak je tip niečo iné ako 5, 10, 15, 25, 50, tlačidlá budú "bez triedy"
                  onFocus={() => setTip(0)} // Voliteľné: pri kliknutí vynuluje ostatné
                />               
            </div>

            <div className="count__people">
              <div className="label-wrapper">
                <label className="count__total-name">Number of People</label>
                
                {/* Error sa zobrazí, ak je bill zadaný A ZÁROVEŇ people je '0' alebo prázdne */}
                {(bill !== '' && (people === '0' || people === '')) && (
                  <span className="error-message">Can&#39;t be zero</span>
                )}
              </div>

              <input 
                id="people"
                type="number" 
                // Rámček sčervenie za rovnakej podmienky
                className={`input-people ${(bill !== '' && (people === '0' || people === '')) ? 'input-error' : ''}`}
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                placeholder="0"
              />
            </div>
        </section>

        <section className="result__space">
          <div className="result__space-tip">            
            <p className="result__space-title">Tip Amount <br/>
            <span className="result__space-subtitle">/ person</span></p>            
            <h2 className="result__space-price-total">${tipPerPerson.toFixed(2)}</h2>
          </div>

          <div  className="result__space-result">
            <p className="result__space-title">Total <br/>
            <span className="result__space-subtitle">/ person</span></p>
            <h2 className="result__space-price-total">${totalPerPerson.toFixed(2)}</h2>
          </div>

          <button 
            type='button' 
            className="result__space-btn"
            onClick={handleReset}
              // Tlačidlo je vypnuté, ak nie je zadaná suma ani počet ľudí
              disabled={!bill && !people && tip === 0}
            >RESET</button>
        </section>
      </div>
    
    <footer className="attribution">
      Challenge by <a href="https://www.frontendmentor.io?ref=challenge" className="attribution-link" target="_blank" rel="noopener noreferrer">Frontend Mentor</a>. 
      Coded by <a href="https://github.com/Saliva-sys" className="attribution-link" target="_blank" rel="noopener noreferrer">Adriana Weidlichova</a>.
    </footer>
  </div>
</main>
);
}