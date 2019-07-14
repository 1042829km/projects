// $(function(){
//   $('#new_message').on('submit', function(e){
//     e.preventDefault();
//     var formData = new FormData(this);
//   })
// })

$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message">
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
                        <img src="${message.image}", calss="lower-message__image">
                      </div>
                    </div>
                  </div>`
    } else {
      var html = `<div class="message">
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
                      </div>
                    </div>
                  </div>`
    }
    return html;
  }
  
  $('.input_box__new-message__aubmit-btn').click(function() {
    $(this).click(function () {
    alert('只今処理中です。\nそのままお待ちください。');
    return false;
    });
  });

    $('#new_message').on('submit', function(e){
    e.preventDefault();
    // var message = $('.input_box__text').val();
   

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
    .done(function(data){
      var html = buildHTML(data);
      
      $('.messages').append(html).animate({
        scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.input_box__text').val('');
      $('.input_box__input').val('');
      $('.input_box__new-message__submit-btn').prop( 'disabled', false );
    })
    .fail(function(){
      alert('error');
    })
  })
})

//1 2 3 5 7 8 11
//4 6 9 10