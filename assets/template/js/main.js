
/*------------------------------------------------------------------*/
/*             Swipe Manager                                        */
/*------------------------------------------------------------------*/


(function () {
// initializes touch and scroll events
    var supportTouch = $.support.touch,
        scrollEvent = "touchmove scroll",
        touchStartEvent = supportTouch ? "touchstart" : "mousedown",
        touchStopEvent = supportTouch ? "touchend" : "mouseup",
        touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
 
    // handles swipe up and swipe down
    $.event.special.swipeupdown = {
        setup: function () {
            var thisObject = this;
            var $this = $(thisObject);
 
            $this.bind(touchStartEvent, function (event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event,
                    start = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ],
                        origin: $(event.target)
                    },
                    stop;
 
                function moveHandler(event) {
                    if (!start) {
                        return;
                    }
 
                    var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ]
                    };
 
                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }
 
                $this
                    .bind(touchMoveEvent, moveHandler)
                    .one(touchStopEvent, function (event) {

                        $this.unbind(touchMoveEvent, moveHandler);

                        if (start && stop) {

                            if ( (stop.time - start.time < 1000) && ( (Math.abs(start.coords[1] - stop.coords[1]) ) >  ( Math.abs(start.coords[0] - stop.coords[0]) ) ) ) {
                              start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                                    //console.log('Start Y: ' + start.coords[1]);
                                    //console.log('Stop Y: ' + stop.coords[1]);

                            }

                            else if ( (stop.time - start.time < 1000) && ( (Math.abs(start.coords[0] - stop.coords[0]) ) >  ( Math.abs(start.coords[1] - stop.coords[1]) ) ) ) {
                                start.origin
                                    .trigger("swipeleftright")
                                    .trigger(start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight");
                                   //console.log('Start X: ' + start.coords[0]);
                                   //console.log('Stop X: ' + stop.coords[0]);
                            };                          
                        }

                        start = stop = undefined;
                    });
            });
        }
    };
 
//Adds the events to the jQuery events special collection
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function (event, sourceEvent) {
        $.event.special[event] = {
            setup: function () {
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });
 //Adds the events to the jQuery events special collection
    
})();






/* ----------------------------------------------------------------------- */
/* Scroll Disable */
/* ----------------------------------------------------------------------- */


function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
};

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    };
};

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
};

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
};



$(document).ready(function() {

  /* ----------------------------------------------------------------------- */
  /* Send Form */
  /* ----------------------------------------------------------------------- */

  $('.popup-btn').magnificPopup({
    type: 'inline',
    preloader: false,
    removalDelay: 350,

      callbacks: {
        beforeOpen: function() {
          $('.mfp-bg.mfp-ready').addClass('closed');
  
        },
        open: function() {
          $('html').css('overflow', 'auto');
        },
        close: function() {
          
        }
      }
  });





/* ----------------------------------------------------------------------- */
/* ScrollTop */
/* ----------------------------------------------------------------------- */


$("a.scrolling, .catalog-scroll-link a").click(function(e) {
  e.preventDefault();
  var scroll = $(this).attr('href');
  $('body, html').animate({
        scrollTop: $(scroll).offset().top
    }, 1000);
});




});


  