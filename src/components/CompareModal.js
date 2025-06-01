import React from 'react';
import { FaTimes } from 'react-icons/fa';

function CompareModal({ onClose, rentalsToCompare, clearComparison, t }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content compare-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><FaTimes /></button>
        <h2>{t.compare}</h2>
        {rentalsToCompare.length > 0 ? (
          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th></th>
                  {rentalsToCompare.map(rental => (
                    <th key={rental.id}>{rental.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>{t.locationLabel}</b></td>
                  {rentalsToCompare.map(rental => (
                    <td key={rental.id}>{rental.city}</td>
                  ))}
                </tr>
                <tr>
                  <td><b>{t.priceLabel}</b></td>
                  {rentalsToCompare.map(rental => (
                    <td key={rental.id}>{rental.price}{rental.currency}</td>
                  ))}
                </tr>
                {/* Add more comparison rows as needed */}
              </tbody>
            </table>
          </div>
        ) : (
          <p>{t.noRentalsToCompare}</p>
        )}
        {rentalsToCompare.length > 0 && (
           <button onClick={clearComparison} style={{ marginTop: '20px' }}>
            {t.clearComparisonButton}
          </button>
        )}
      </div>
    </div>
  );
}

export default CompareModal; 