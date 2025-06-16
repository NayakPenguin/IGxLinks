import React from 'react';
import styled from 'styled-components';

const CookiePolicy = () => {
  return (
    <Container>
      <h1 className="title">Cookie Policy</h1>
      <p className="desc"><strong>Last Updated:</strong> June 15, 2025</p>

      <h2 className="subtitle">1. What Are Cookies?</h2>
      <p className="paragraph">
        Cookies are small text files stored on your device when you visit a website. They help us recognize your browser and remember preferences.
      </p>

      <h2 className="subtitle">2. How We Use Cookies</h2>
      <p className="paragraph">
        We use cookies to enhance your experience, remember your settings, understand user activity, and personalize content.
      </p>

      <h2 className="subtitle">3. Types of Cookies We Use</h2>
      <ul className="list">
        <li className="list-item">Essential Cookies – required for basic functionality</li>
        <li className="list-item">Analytics Cookies – help us understand usage</li>
        <li className="list-item">Functional Cookies – remember preferences</li>
        <li className="list-item">Marketing Cookies – personalize ads and track performance</li>
      </ul>

      <h2 className="subtitle">4. Managing Cookies</h2>
      <p className="paragraph">
        Most browsers allow you to manage cookie preferences. Disabling cookies may affect your experience on IGxLinks.
      </p>

      <h2 className="subtitle">5. Changes to This Policy</h2>
      <p className="paragraph">
        We may update our cookie policy from time to time. Continued use of IGxLinks indicates acceptance of the updated policy.
      </p>
    </Container>
  );
};

export default CookiePolicy;

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