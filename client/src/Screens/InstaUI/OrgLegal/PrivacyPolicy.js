import React from 'react';
import styled from 'styled-components';

const PrivacyPolicy = () => {
  return (
    <Container>
      <h1 className="title">Privacy Policy</h1>
      <p className="desc"><strong>Last Updated:</strong> June 15, 2025</p>

      <h2 className="subtitle">1. Information We Collect</h2>
      <p className="paragraph">
        We collect personal data like email, name, and content you choose to share on <strong>IGxLinks</strong>. This helps us provide personalized services.
      </p>

      <h2 className="subtitle">2. How We Use It</h2>
      <p className="paragraph">
        Your data helps us improve our platform, send notifications, and ensure a smooth experience. <strong>We do not sell your personal data.</strong>
      </p>

      <h2 className="subtitle">3. Data Security</h2>
      <p className="paragraph">
        We use encryption and other measures to protect your information. However, no system is 100% secure.
      </p>

      <h2 className="subtitle">4. Third-Party Services</h2>
      <p className="paragraph">
        We may use third-party tools (like analytics or payments) that may access your data according to their policies.
      </p>

      <h2 className="subtitle">5. Your Rights</h2>
      <p className="paragraph">
        You can access, modify, or delete your data anytime by contacting us or using in-app tools.
      </p>

      <h2 className="subtitle">6. Contact</h2>
      <p className="paragraph">
        Email <strong>support@igxlinks.com</strong> with privacy questions.
      </p>
    </Container>
  );
};

export default PrivacyPolicy;

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