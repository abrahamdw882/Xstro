const { command } = require('../lib');
command(
    {
      pattern: 'button',
      desc: 'Send a button message',
      usage: '#button <text>',
      type: 'message',
    },
    async (message, match, m) => {
     
      const prefix = '.'; 
  
      
      const buttons = [
        {
          type: 'reply',
          params: {
            display_text: `${prefix}ping`, 
            id: 'option1', 
          },
        },
        {
          type: 'reply',
          params: {
            display_text: `${prefix}list`, // Button display text with prefix
            id: 'option2', // Button ID
          },
        },
        {
          type: 'reply',
          params: {
            display_text: `${prefix}help`, // New button display text with prefix
            id: 'option3', // New button ID
          },
        },
        {
          type: 'reply',
          params: {
            display_text: `${prefix}about`, // New button display text with prefix
            id: 'option4', // New button ID
          },
        },
        {
          type: 'reply',
          params: {
            display_text: `${prefix}contact`, // New button display text with prefix
            id: 'option5', // New button ID
          },
        },
        {
          type: 'reply',
          params: {
            display_text: `${prefix}settings`, // New button display text with prefix
            id: 'option6', // New button ID
          },
        },
        // Add more buttons as needed
      ];
  
      const content = {
        header: {
          title: 'Welcome to Our Service',
          subtitle: 'Please choose an option below:',
          hasMediaAttachment: false,
        },
        footer: {
          text: '--:)---',
        },
        body: {
          text: match[1] || 'What would you like to do?',
        },
        button: buttons,
      };
  
      // Send the interactive button message
      try {
        await message.sendInteractive(content);
        console.log('Button message sent successfully');
      } catch (error) {
        console.error('Error sending button message:', error);
      }
    }
  );