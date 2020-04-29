json.text @post.text
json.name @post.user.name
json.image @post.image_url
json.created_at @post.created_at.strftime("%Y年%m月%d日 %H時%M分")