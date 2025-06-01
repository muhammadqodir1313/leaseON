import React from 'react';

function LoginModal({ onClose, t }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>{t.login}</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">{t.emailLabel}</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">{t.passwordLabel}</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">{t.loginButton}</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal; 