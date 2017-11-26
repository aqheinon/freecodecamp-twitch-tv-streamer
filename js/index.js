var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

var defaultLogo = "https://cdn3.iconfinder.com/data/icons/happily-colored-snlogo/128/twitch.png";

users.forEach(function(user) {
  $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + user + '?callback=?', function(data) {
    var statusClass, status;
    switch (data.stream) {
      case null:
        statusClass = 'offline';
        status = 'Offline';
        break;
      case undefined:
        statusClass = 'closed';
        status = 'Account closed';
        break;
      default:
        statusClass = 'online';
        status = data.stream.game;
    }

    $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + user + '?callback=?', function(data) {
      var icon = data.logo == null ? defaultLogo : data.logo;
      var name = data.display_name == undefined ? user : data.display_name;
      var descr = statusClass === "online" ? ': ' + data.status : "";
      var html = '<a href="' +
        data.url + '" target="_blank"><div class="row ' +
        statusClass + '"><div class="two columns"><img src="' +
        icon + '" class="logo"></div><div class="three columns user">' +
        name + '</div><div class="five columns descr">' +
        status + descr + '</div></div></a>';
      statusClass === "online" ? $("#list").prepend(html) : $("#list").append(html);
    })
  });
});

$("li").hover(function() {
  $('> i', this).toggleClass("fa-spin");
});

$("li").click(function() {
  $("li").removeClass("active");
  $(this).addClass("active");

  var status = $(this).attr('id');
  switch (status) {
    case "online":
      $(".offline, .closed").hide();
      $(".online").show();
      break;
    case "offline":
      $(".online").hide();
      $(".offline").show();
      break;
    default:
      $(".online, .offline, .closed").show();
  }
})