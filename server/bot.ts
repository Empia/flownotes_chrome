var TelegramBot = require('node-telegram-bot-api');
import commands from './chat_bot_core/commands';

const bot = {
  initiate: () => {
    const token = '371326189:AAElUEd4uwvnejKWruqn4AXIMmboiak-OUE';
    const bot = new TelegramBot(token, {workers: 1, polling: true});
    bot.on('message', function (msg) {
        var chatId = msg.chat.id;
        //console.log(msg);
        var commandOpt = commands.resolveCmd(msg.text.toString());
        if (commandOpt.resolved) {
          var doneCmd = commands[commandOpt.cmd](msg)
          var response:string = doneCmd.response
          var responseCaption:string = doneCmd.caption ? doneCmd.caption : ''
          bot.sendMessage(chatId, response, {caption: responseCaption});
        } else {
          bot.sendMessage(chatId, msg.text.toString()+' fuck bitches', {caption: "I'm a bot!"});
        }


    });
    bot.on('polling_error', (error) => {
      console.log(error);  // => 'EFATAL'
    });    
  }
}

export default bot;
