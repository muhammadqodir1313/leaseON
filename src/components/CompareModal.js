import React from "react";

const CompareModal = ({ onClose, rentalsToCompare, clearComparison }) => {
  // Defensive defaults
  const items = Array.isArray(rentalsToCompare) ? rentalsToCompare : [];

  const safeClose = () => {
    if (typeof onClose === 'function') onClose();
    if (typeof clearComparison === 'function') clearComparison();
  };

  return (
    <div className="modal-overlay" onClick={safeClose}>
      <div className="modal-content compare-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={safeClose}>&times;</button>
        <h2>Ijaralarni Solishtirish</h2>
        {items && items.length > 0 ? (
          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Xususiyat</th>
                  {items.map((rental, idx) => (
                    <th key={rental && rental.id ? rental.id : `r-${idx}`}>{rental && rental.title ? rental.title : '—'}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Narxi</td>
                  {items.map((rental, idx) => (
                    <td key={(rental && rental.id ? rental.id : `p-${idx}`)}>{rental && rental.price ? rental.price : '—'}</td>
                  ))}
                </tr>
                <tr>
                  <td>Manzil</td>
                  {items.map((rental, idx) => (
                    <td key={(rental && rental.id ? rental.id : `c-${idx}`)}>{rental && rental.city ? rental.city : '—'}</td>
                  ))}
                </tr>
                <tr>
                  <td>Xonalar soni</td>
                  {items.map((rental, idx) => (
                    <td key={(rental && rental.id ? rental.id : `b-${idx}`)}>{rental && (rental.beds || rental.beds === 0) ? rental.beds : '—'}</td>
                  ))}
                </tr>
                <tr>
                  <td>Tavsif</td>
                  {items.map((rental, idx) => (
                    <td key={(rental && rental.id ? rental.id : `d-${idx}`)}>{rental && rental.description ? rental.description : '—'}</td>
                  ))}
                </tr>
                {/* Qo'shimcha xususiyatlarni shu yerga qo'shish mumkin */}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Solishtirish uchun ijaralar tanlanmagan.</p>
        )}
      </div>
    </div>
  );
};

export default CompareModal;