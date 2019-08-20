# json.text @message.text
# json.user_name @message.user.name
# json.image @message.image.url
# json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")

json.text @message.text
json.image @message.image.url
# message.image.urlをどうやってこの書き方で実装するのか
json.created_at @message.created_at
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id