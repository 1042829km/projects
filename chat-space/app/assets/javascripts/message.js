$(function(){

  function buildHTML(message){
    var image =(
      (message.image)
      ? `<img src="${message.image}", calss="lower-message__image">`
      : ""
    );
    var html = `<div class="message" data-user-id=${message.id} >
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                    <div class="lower-message">
                        <p class="loewr-message__content">
                          ${message.text}
                        </p>
                      ${image}
                    </div>
                  </div>
                </div>`
   return html
  }
  $('.input_box__new-message__aubmit-btn').click(function() {
    $(this).click(function () {
    alert('只今処理中です。\nそのままお待ちください。');
    return false;
    });
  });

    $('#new_message').on('submit', function(e){
    e.preventDefault();
   
    var formData = new FormData(this);
    var url = $(this).attr('action')
      $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html).animate({
        scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.input_box__new-message__submit-btn').prop( 'disabled', false );
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
  })

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.message').last().data('user-id');
    var group_id = $('.main_header').data('group-id');
    var auto_updated_url = `/groups/${group_id}/api/messages`;
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: auto_updated_url,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'GET',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })

    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.forEach(function(message) {
        var html = buildHTML(message);
        $('.messages').append(html).animate({
          scrollTop: $('.messages')[0].scrollHeight}, 'fast');;
        
        // message_controllerで取得してきたmessageを一つ一つ$('messages')に追加するだけじゃあかんのか
      })
      //メッセージが入ったHTMLを取得
      // 直接打ち込むのでもおっけい。でも箱を用意してあげてその塊をappendする方がappendの処理が一回で済む
      //メッセージを追加

    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 5000);
})

//1 2 3 5 7 8 11
//4 6 9 10