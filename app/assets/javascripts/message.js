$(function(){
  
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="message__card" data-message-id=${message.id}>
          <div class="message__details">
            <div class="message__details__user">
              ${message.name}
            </div>
            <div class="message__details__time">
              ${message.created_at}
            </div>
          </div>
          <div class="message__content">
            ${message.text}
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
        `<div class="message__card" data-message-id=${message.id}>
        <div class="message__details">
          <div class="message__details__user">
            ${message.name}
          </div>
          <div class="message__details__time">
            ${message.created_at}
          </div>
        </div>
        <div class="message__content">
          ${message.text}
        </div>
      </div>`
      return html;
    };
  }

  $(".form__contents").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action")
    $.ajax({
      url: url,
      data: formData,
      type: "POST",
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html);
      $('form')[0].reset();
      $('.message').animate({scrollTop: $('.message')[0].scrollHeight});
      $('.send_btn').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })

  var reloadMessages = function() {
    var last_message_id = $('.message__card:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.message').append(insertHTML);
        $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  };
});