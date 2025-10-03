export const getCreativeResponse = async (prompt: string): Promise<string> => {
  // This is a placeholder. In a real app, you would make an API call here.
  const lowerCasePrompt = prompt.toLowerCase();

  if (lowerCasePrompt.includes('hello') || lowerCasePrompt.includes('hi')) {
    return "Hello there! How can I help you today?";
  }
  if (lowerCasePrompt.includes('who are you') || lowerCasePrompt.includes('what is iris')) {
    return "I am IRIS, a creative AI assistant integrated into this portfolio. I can answer your questions about iMusa's skills, projects, and more.";
  }
  if (lowerCasePrompt.includes('skills') || lowerCasePrompt.includes('technologies')) {
    return "iMusa is proficient in a wide range of technologies including React, Node.js, TypeScript, Python, and various cloud services. You can see a more detailed breakdown in the 'About Me' app.";
  }
  if (lowerCasePrompt.includes('projects')) {
    return "You can explore iMusa's work in the 'Projects' app. It contains detailed information about various projects, including links to demos and source code.";
  }

  return "I'm not sure how to answer that. Try asking about skills, projects, or who I am.";
};