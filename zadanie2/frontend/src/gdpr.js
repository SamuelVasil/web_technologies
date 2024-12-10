import React from 'react';

function GDPR() {
  return (
    <div className="gdpr-container">
      <h2>GDPR Notice</h2>
      <p>We value your privacy and are committed to protecting your personal data. Please review our privacy policy for detailed information on how we handle your data.</p>
      <p>Your personal information is used only for the purposes you have authorized and we adhere to strict data protection regulations.</p>
      
      <h3>What is GDPR?</h3>
      <p>The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy. It provides individuals with greater control over their personal data and aims to standardize data protection laws across all EU member states.</p>
      
      <h3>Right to be Informed</h3>
      <p>Under the GDPR, individuals have the right to be informed about the collection and use of their personal data. This is commonly known as the "Right to be Informed". You can read more about this right by clicking the link below:</p>
      
      <a href="https://gdpr-info.eu/issues/right-to-be-informed/" target="_blank" rel="noopener noreferrer"
        className="external-link"
      >
        Right to be Informed - GDPR Information
      </a>
    </div>
  );
}

export default GDPR;
