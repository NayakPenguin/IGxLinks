import React from 'react';
import styled from 'styled-components';

const TermsOfService = () => {
  return (
    <Container>
      <h1 className="title">Terms of Service</h1>
      <p className="desc"><strong>Last Updated:</strong> June 15, 2025</p>

      <h2 className="subtitle">1. Acceptance of Terms</h2>
      <p className="paragraph">
        By using <strong>IGxLinks</strong>, you agree to these Terms of Service. If you do not agree, please do not use the platform.
      </p>

      <h2 className="subtitle">2. User Responsibilities</h2>
      <p className="paragraph">
        You are responsible for the content you share. <strong>Do not upload anything illegal, abusive, harmful, or misleading.</strong> You agree not to impersonate anyone or use the platform for fraudulent activities.
      </p>

      <h2 className="subtitle">3. Account & Access</h2>
      <p className="paragraph">
        You must be at least <strong>13 years old</strong> to use IGxLinks. You are responsible for maintaining the confidentiality of your account information.
      </p>

      <h2 className="subtitle">4. Data & Privacy</h2>
      <p className="paragraph">
        We respect your privacy. Please refer to our <a href="/privacy-policy" className="link"><strong>Privacy Policy</strong></a> to understand how your data is collected and used.
      </p>

      <h2 className="subtitle">5. Prohibited Content</h2>
      <p className="paragraph">Users are strictly prohibited from posting:</p>
      <ul className="list">
        <li className="list-item">Hate speech, harassment, or threats</li>
        <li className="list-item">NSFW/adult content</li>
        <li className="list-item">Spam, scams, or malware</li>
        <li className="list-item">Violent or illegal material</li>
      </ul>

      <h2 className="subtitle">6. Paid Links & Transactions</h2>
      <p className="paragraph">
        If you use IGxLinks for selling products, collecting payments, or promoting offers, you must comply with all local laws and payment platform terms.
      </p>

      <h2 className="subtitle">7. Termination</h2>
      <p className="paragraph">
        We reserve the right to suspend or delete accounts that violate our terms, without prior notice.
      </p>

      <h2 className="subtitle">8. Changes to Terms</h2>
      <p className="paragraph">
        We may update these Terms at any time. Continued use of the platform after changes implies acceptance.
      </p>

      <h2 className="subtitle">9. Contact Us</h2>
      <p className="paragraph">
        For any questions regarding these Terms, contact us at <strong>support@igxlinks.com</strong>.
      </p>
    </Container>
  );
};

export default TermsOfService;

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Roboto', sans-serif;
  line-height: 1.8;

  .title {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .desc{
    font-size: 0.85rem;
    font-weight: 200;
    margin-bottom: 1rem;

    strong{
        font-weight: 400;
    }
  }

  .subtitle {
    margin-top: 2rem;
    font-size: 1rem;
    font-weight: 500;
  }

  .paragraph {
    margin-top: 0.85rem;
    font-size: 0.85rem;
    font-weight: 200;
  }

  .list {
    margin-top: 0.5rem;
    padding-left: 1.5rem;
  }

  .list-item {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
    font-weight: 200;
  }

  .link {
    color: #007bff;
    text-decoration: underline;
  }

  .link:hover {
    text-decoration: none;
  }
`;