$(function() {
  // Menu buttons - JBG
  $('button').click(function() {
    $('button').removeClass('active');
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
