$(function() {

  var search_list = $(".user-search-result");

  function appendUser(user) {
    var html = `<li class="chat-group-user clearfix">
                  <div class="chat-group-user__name">${ user.name }</div>
                  <p class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">
                    追加
                  </p>
                </li>`
    search_list.append(html);
   }

   function appendErrMsgToHTML(msg) {
    var html = `<li>
                  <div>${ msg }</div>
                </li>`
    search_list.append(html);
  }


  $("#user-search-field").on("keyup", function(event) {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $(".user-search-result").empty();
      if (input == "" && event.key == 'Backspace') {
        return false
      }
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });

      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
      $(".user-search-result").on('click', '.chat-group-user', function() {
        $(this).children("p").html("削除").css('color', 'red');
        $(this).appendTo(".chat-group-users")
      });

      $(".chat-group-users").on('click', '.chat-group-user', function() {
        $(this).children("p").html("追加").css('color', '#38aef0')
        $(this).appendTo(".user-search-result");
      })
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
});



// 課題　一回検索したユーザーを表示できないようにする、
// クリア　検索結果にcurrent_userが表示されないようにしたい、ユーザーの移動、削除ボタンの実装
