var controllers = {};
var init = function() {
  $('.controller').each(function() {
    controllers[$(this).attr('id')] = this;
    $(this).remove();
  });
};

var initHermitController = function() {
  $('#hermit-button-1').click(function() {
    if(cube.scale.x == 1) {
      cube.scale.set(.05, .05, .05);
      cube.position.set(-5, -25, cube.position.z);
    } else {
      cube.scale.set(1, 1, 1);
    }
  });
  $('#hermit-button-2').click(function() {
    materialStates = [
      !materialStates[0],
      !materialStates[1],
      !materialStates[2],
      materialStates[3],
      !materialStates[4],
      !materialStates[5]
    ];
    updateMaterials();
  });
  $('#hermit-button-3').click(function() {
    if($(this).hasClass('active'))
      addObject('dog', 'objs/BASSET.OBJ', [20, 10, 10], [10, 10, 10]);
    else
      removeObject('dog');
  });
};

var initHoboController = function() {
  $('#hobo-button-1').click(function() {
    if(shake && shakeAmount != 10) {
      shakeAmount = 10;
    } else {
      shakeAmount = 10;
      shake = !shake;
      rotate = !shake; 
      narrow = !narrow;
    }
  });
  $('#hobo-button-2').click(function() {
    if(shake && shakeAmount != 1) {
      shakeAmount = 1;
    } else {
      shakeAmount = 1;
      shake = !shake;
      rotate = !shake; 
      narrow = !narrow;
      shorter = !shorter;
    }
  });
};

var initConvenienceController = function() {
  $('#convenience-controller .button').click(function() {
    var actives = $('#convenience-controller .button.active').length;
    if(actives > 0) {
      max = 1000 * $('#convenience-controller .button.active').length;    
      shorter = false, tall = true;
      if(actives == 3) {
        addObject('stairs', 'objs/stairs.obj', [-20, -20, 0], [.01, .01, .01]);
      } else {
        removeObject('stairs');
      }
    } else {
      tall = false;
    }
  });
};

var initCommunalController = function() {
  $('#communal-button-2').click(function() {
    materialStates = [
      !materialStates[0],
      materialStates[1],
      materialStates[2],
      materialStates[3],
      materialStates[4],
      materialStates[5]
    ];
    updateMaterials();
  });
  $('#communal-button-8').click(function() {
    materialStates = [
      materialStates[0],
      materialStates[1],
      materialStates[2],
      materialStates[3],
      materialStates[4],
      !materialStates[5]
    ];
    updateMaterials();

  });
   $('#communal-button-4').click(function() {
    materialStates = [
      materialStates[0],
      materialStates[1],
      materialStates[2],
      materialStates[3],
      !materialStates[4],
      materialStates[5]
    ];
    updateMaterials();
  });
  $('#communal-button-3').click(function() {
    materialStates = [
      materialStates[0],
      !materialStates[1],
      materialStates[2],
      materialStates[3],
      materialStates[4],
      materialStates[5]
    ];
    updateMaterials();
  });
  $('#communal-button-5').click(function() {
    if(yRotationSpeed < 0.008) yRotationSpeed = 0.008;
    else yRotationSpeed = 0.001;
    shorter = !shorter;
  });
  $('#communal-button-1').click(function() {
    if(yRotationSpeed < 0.005) yRotationSpeed = 0.005;
    else yRotationSpeed = 0.001;
    narrow = !narrow;
  });
  $('#communal-button-6').click(function() {
    if(yRotationSpeed < 0.01) yRotationSpeed = 0.01;
    else yRotationSpeed = 0.001;
    narrow = !narrow;
  });
  $('#communal-button-7').click(function() {
    wide = !wide;
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
        console.log($(this).attr('id'));
        $(this).toggleClass('active');
      });
    } else {
      $(this).mousedown(function() {
        console.log($(this).attr('id'));
        $(this).addClass('active');      
      }).mouseup(function() {
        $(this).removeClass('active');
      });
    }
  });

  if(name == 'communal') {
    initCommunalController();
  } else if(name == 'convenience') {
    initConvenienceController();
  } else if(name == 'hobo') {
    initHoboController();
  } else if(name == 'hermit') {
    initHermitController();
  }
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
