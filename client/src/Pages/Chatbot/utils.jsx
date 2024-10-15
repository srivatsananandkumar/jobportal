import moment from "moment"
export const analyze = (text) => {
    if(text.includes('hi') || text.includes('hai') || text.includes('hello'))
        return 'Hi, How Can I help you?'
    else if(text.includes('date'))
        return moment().format('MMMM Do YYYY')
    else if(text.includes('time'))
        return moment().format('h:mm:ss a')
    else if(text.includes('google link'))
        return 'https://www.google.com'
    else if(text.includes('thank you')|| text.includes('thanks'))
        return "You're welcome! Feel free to ask anything else.";
    else if (text.includes('name')) 
        return 'I am your friendly chatbot! What would you like to call me?';
    else if (text.includes('who are you')) {
        return 'I am your chatbot, here to assist you with any questions!';
    } else if (text.includes('what is your name')) {
        return 'You can call me ChatBot!';
    } else if (text.includes('how old are you')) {
        return "I'm as old as the code I'm written in!";
    }

    else {
        return "I'm sorry, I couldn't find an answer to that. Could you rephrase or ask something else?";
    }
    
}