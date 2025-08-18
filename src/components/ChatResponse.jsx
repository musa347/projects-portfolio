
import './App.css';

const ChatResponse = ({ response }) => {
  if (!response) {
    return null;
  }

  const { candidates, usageMetadata } = response;

  return (
    <div className="chat-messages">
      {candidates.map((candidate, index) => (
        <div className="ai-message" key={index}>
          <div className="message-content">
            <div className="message-header">
              <span className="sender-label">AI Assistant</span>
            </div>
            <p>{candidate.content.parts[0].text}</p>
            {candidate?.citationMetadata?.citationSources.length > 0 && (
              <>
                <h6>Citations:</h6>
                <ul className="message-content">
                  {candidate.citationMetadata.citationSources.map((source, idx) => (
                    <li key={idx}>
                      <a href={source.uri} target="_blank" rel="noopener noreferrer">
                        {source.uri}
                      </a>{' '}
                      (Indexes: {source.startIndex} - {source.endIndex})
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      ))}
      <div className="message-metadata">
        <p>Prompt Tokens: {usageMetadata.promptTokenCount}</p>
        <p>Response Tokens: {usageMetadata.candidatesTokenCount}</p>
        <p>Total Tokens: {usageMetadata.totalTokenCount}</p>
      </div>
    </div>
  );
};

export default ChatResponse;
