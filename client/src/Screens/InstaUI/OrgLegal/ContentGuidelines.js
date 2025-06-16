import React from 'react';
import styled from 'styled-components';

const ContentGuidelines = () => {
  return (
    <Container>
      <h1 className="title">Content Guidelines</h1>
      <p className="desc"><strong>Last Updated:</strong> June 15, 2025</p>

      <h2 className="subtitle">1. Be Respectful</h2>
      <p className="paragraph">
        Users must respect others and avoid posting harmful, offensive, or hateful content.
      </p>

      <h2 className="subtitle">2. No Inappropriate Content</h2>
      <p className="paragraph">
        Do not post NSFW/adult material, violence, or any illegal content. This includes spam and malicious links.
      </p>

      <h2 className="subtitle">3. Be Authentic</h2>
      <p className="paragraph">
        Do not impersonate others or mislead your audience with false information or fake promotions.
      </p>

      <h2 className="subtitle">4. Promote Positivity</h2>
      <p className="paragraph">
        Use IGxLinks to share value, support communities, and express your authentic self in a constructive way.
      </p>

      <h2 className="subtitle">5. Violation & Reporting</h2>
      <p className="paragraph">
        Violation of these guidelines may result in content removal or account suspension. Users can report content they believe violates these terms.
      </p>
    </Container>
  );
};

export default ContentGuidelines;

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