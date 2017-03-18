var TelegramBot = require('node-telegram-bot-api');
import {commands} from './chat_bot_core/commands';



const bot = {
  initiate: () => {
    const token = '371326189:AAElUEd4uwvnejKWruqn4AXIMmboiak-OUE';
    const bot = new TelegramBot(token, {workers: 1, polling: true});
    bot.on('message', function (msg) {
        var chatId = msg.chat.id;
        console.log(msg.chat.username.toString()+' '+msg.text.toString());
        var commandOpt = commands.resolveCmd(msg.text.toString());
        if (commandOpt.resolved) {
          var doneCmd = commands[commandOpt.cmd](msg)
          var response:string = doneCmd.response
          var responseCaption:string = doneCmd.caption ? doneCmd.caption : ''
          const opts = {
              reply_to_message_id: msg.message_id,
              reply_markup: JSON.stringify({
                keyboard: []
              })
            };
          bot.sendMessage(chatId, response, opts);
        } else {
          const opts = {
              reply_to_message_id: msg.message_id,
              reply_markup: JSON.stringify({
                one_time_keyboard: true,
                keyboard: [
                  ['/help'],
                  ['/start']
                ]
              })
            };          
          bot.sendMessage(chatId, msg.text.toString()+' fuck bitches', opts);
        }


    });

bot.onText(/\/love/, function onLoveText(msg) {
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
        ['Yes, you are the bot of my life ❤'],
        ['No, sorry there is another one...']
      ]
    })
  };
  bot.sendMessage(msg.chat.id, 'Do you love me?', opts);
});
bot.onText(/\/editable/, function onEditableText(msg) {
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Edit Text',
             // we shall check for this value when we listen
             // for "callback_query"
            callback_data: 'edit'
          }
        ]
      ]
    }
  };
  bot.sendMessage(msg.from.id, 'Original Text', opts);
});

    bot.on('polling_error', (error) => {
      console.log(error);  // => 'EFATAL'
    });    
  }
}

export default bot;
