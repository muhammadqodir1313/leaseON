import React from 'react';

function RegisterModal({ onClose, t }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content signup-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>{t.signup}</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">{t.usernameLabel}</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">{t.emailLabel}</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">{t.passwordLabel}</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">{t.confirmPasswordLabel}</label>
            <input type="password" id="confirm-password" name="confirm-password" required />
          </div>
          <button type="submit">{t.signupButton}</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal; 