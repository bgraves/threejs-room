var controllers = {};
var init = function() {
  $('.controller').each(function() {
    controllers[$(this).attr('id')] = this;
    $(this).remove();
  });
};

var showController = function(name) {
  $('#controllers .controller').remove();
  $('#x').before(controllers[name + '-controller']);
  $('#controllers').removeClass('hidden');

  // Controller buttons - JBG
  $('.button').each(function() {
    if($(this).hasClass('sticky')) {
      $(this).mousedown(function() {
        $(this).toggleClass('active');
      });
    } else {
      $(this).mousedown(function() {
        $(this).addClass('active');      
      }).mouseup(function() {
        $(this).removeClass('active');
      });
    }
  });
};

$(function() {
  // Init - JBG
  init();

  // Menu buttons - JBG
  $('button').click(function() {
    $('button').removeClass('active');
    showController($(this).attr('id'));
    $(this).addClass('active');
  });

  // Close button - JBG
  $('#x').click(function() {
    $('#controllers').addClass('hidden');
    $('button').removeClass('active');
  });
});
