import React from "react";

const CompareModal = ({ onClose, rentalsToCompare, clearComparison }) => {
  return (
    <div className="modal-overlay" onClick={() => { onClose(); clearComparison(); }}>
      <div className="modal-content compare-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => { onClose(); clearComparison(); }}>&times;</button>
        <h2>Ijaralarni Solishtirish</h2>
        {rentalsToCompare.length > 0 ? (
          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Xususiyat</th>
                  {rentalsToCompare.map(rental => (
                    <th key={rental.id}>{rental.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Narxi</td>
                  {rentalsToCompare.map(rental => (
                    <td key={rental.id}>{rental.price}</td>
                  ))}
                </tr>
                <tr>
                  <td>Manzil</td>
                  {rentalsToCompare.map(rental => (
                    <td key={rental.id}>{rental.city}</td>
                  ))}
                </tr>
                <tr>
                  <td>Xonalar soni</td>
                  {rentalsToCompare.map(rental => (
                    <td key={rental.id}>{rental.beds}</td>
                  ))}
                </tr>
                <tr>
                  <td>Tavsif</td>
                  {rentalsToCompare.map(rental => (
                    <td key={rental.id}>{rental.description}</td>
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