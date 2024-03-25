import telebot as telebot


# 6348255346:AAEdc8Gmhj1jmA9knCcGcoEhLnBkNF26xGk
BOT_TOKEN = '6348255346:AAEdc8Gmhj1jmA9knCcGcoEhLnBkNF26xGk'
TG_ID_or_GROUP_ID = ''  # сюда вставляется телеграм ID либо ID группы


bot = telebot.TeleBot(BOT_TOKEN)


# t.me/numberRFBot
def send_app_tg(msg):
    bot.send_message(TG_ID_or_GROUP_ID, msg, parse_mode="html")
