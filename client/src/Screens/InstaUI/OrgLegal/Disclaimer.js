import React from 'react';
import styled from 'styled-components';

const Disclaimer = () => {
  return (
    <Container>
      <h1 className="title">Disclaimer</h1>
      <p className="desc"><strong>Last Updated:</strong> June 15, 2025</p>

      <h2 className="subtitle">1. Content Accuracy</h2>
      <p className="paragraph">
        While we strive for accuracy, IGxLinks does not guarantee that the information provided is always complete, current, or error-free.
      </p>

      <h2 className="subtitle">2. User-Generated Content</h2>
      <p className="paragraph">
        Content created by users is their sole responsibility. IGxLinks is not liable for any harm or loss resulting from such content.
      </p>

      <h2 className="subtitle">3. External Links</h2>
      <p className="paragraph">
        We may include links to external websites. IGxLinks does not endorse or take responsibility for the content or practices of these sites.
      </p>

      <h2 className="subtitle">4. No Professional Advice</h2>
      <p className="paragraph">
        The content on IGxLinks is for informational purposes only and is not intended as professional or legal advice.
      </p>

      <h2 className="subtitle">5. Limitation of Liability</h2>
      <p className="paragraph">
        IGxLinks is not responsible for any direct, indirect, or incidental damages arising from your use of the platform.
      </p>
    </Container>
  );
};

export default Disclaimer;

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