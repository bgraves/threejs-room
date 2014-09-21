var showController = function(controllerId) {
  $('#controllers .controller').addClass('hidden');
  $('#' + controllerId + '-controller').removeClass('hidden');
  $('#controllers').removeClass('hidden');
}

$(function() {
  // Menu buttons - JBG
  $('button').click(function() {
    $('button').removeClass('active');
    showController($(this).attr('id'));
    $(this).addClass('active');
  });

  // Controller buttons - JBG
  $('.button').each(function() {
    $(this).mousedown(function() {
      $(this).addClass('active');      
    }).mouseup(function() {
      $(this).removeClass('active');
    });
  });

  // Close button - JBG
  $('#x').click(function() {
    $('#controllers').addClass('hidden');
    $('button').removeClass('active');
  });
});
