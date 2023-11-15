import React, { useState } from 'react';
import './Input.css';

const Inputbox = ({ onSubmit }) => {
  const [moneyInput, setMoneyInput] = useState('');
  const [error, setError] = useState('');

  const handleMoneyInputChange = (e) => {
    const input = e.target.value;
    if (!input.match(/^\d*\.?\d*$/)) {
      setError('Please enter a valid number');
    } else {
      setError('');
    }
    setMoneyInput(input);
  };

  const handleSubmit = () => {
    if (!error && moneyInput !== '') {
      onSubmit(parseFloat(moneyInput));
      setMoneyInput('');
    }
  };

  return (
    <>
    
     
      <div className='inputbox'>
      {error && <p className="error-message"  style={{ color: 'white' }}>{error}</p>}
        <div className="money-input-container">
          <input
            type="text"
            placeholder="Enter the money"
            className="money-input"
            value={moneyInput}
            onChange={handleMoneyInputChange}
          />
         
          <button className="submit-button" onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </>
  );
};

export default Inputbox;