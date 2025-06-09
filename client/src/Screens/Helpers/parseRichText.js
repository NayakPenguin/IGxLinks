import React from "react";

/**
 * Parses **bold** and newlines in plain text and returns React elements.
 * @param {string} text
 * @returns {React.ReactNode}
 */
export function parseRichText(text) {
  if (typeof text !== 'string') return '';

  const lines = text.split('\n');

  return lines.map((line, lineIdx) => {
    const parts = [];
    let remaining = line;
    let match;
    const boldRegex = /\*\*(.*?)\*\*/;

    while ((match = boldRegex.exec(remaining)) !== null) {
      const [fullMatch, boldText] = match;
      const before = remaining.slice(0, match.index);

      if (before) parts.push(before);
      parts.push(<strong key={`bold-${lineIdx}-${parts.length}`}>{boldText}</strong>);

      remaining = remaining.slice(match.index + fullMatch.length);
    }

    if (remaining) parts.push(remaining);

    return (
      <React.Fragment key={`line-${lineIdx}`}>
        {parts}
        {lineIdx < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}
