$(function () {
    //scrooll spy
    
    "use strict";
    
    var topoffset = 50; //var for menu-height.
    var slideqty = $('#featured .item').length;
    
    var wheight = $(window).height(); // get wimndows height
    var randSlide = Math.floor(Math.random() * slideqty);
    
    
    //Randomize the carousel item photos
    $('#featured .item').eq(randSlide).addClass('active');
     
    $('.fullheight').css('height', wheight);
    
    //replace img inside carousel with a bg-image
    $('#featured .item img').each(function () {
       var imgSrc = $(this).attr('src');
       $(this).parent().css({ 'background-image' : 'url(' +imgSrc+ ')' });
       
       //remove the real images
       $(this).remove();
    });
    
    //adjust height of .fullheight elems on window resize
    $(window).resize(function () {
        wheight = $(window).height();
        $('.fullheight').css('height', wheight);
    });
    
    //activate Scrollspy
    $('body').scrollspy({
       target: 'header .navbar',
       offset: topoffset
    });
    
    //Even when directly navigated to
    var hash = $(this).find('li.active a').attr('href');
    if(hash !== '#featured') {
        $('header nav').addClass('inbody');
    }else {
        $('header nav').removeClass('inbody');
        }
    
    //Add an inbody class to nav when scrollspy event fires
    $('.navbar-fixed-top').on('activate.bs.scrollspy', function () {
        var hash = $(this).find('li.active a').attr('href');
        if(hash !== '#featured') {
            $('header nav').addClass('inbody');
        }else {
            $('header nav').removeClass('inbody');
        }
    });
    
    //use smooth scrolling when clicking on navigation
    $('.navbar a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'')
      && location.hostname === this.hostname) {
        var $target = $(this.hash);
        $target = $target.length && $target
        || $('[name=' + this.hash.slice(1) +']');
        if ($target.length) {
          var targetOffset = $target.offset().top - topoffset;

          $('html,body')
          .animate({scrollTop: targetOffset}, 800);
         return false;
        }
      }
    });
    
    //Automatically generate carousel indicators
    var x = 0;
    for(; x < slideqty;) {
        var insertText = '<li data-target="#featured" data-slide-to="' + x + '"';
            if(x === randSlide) {
                insertText += 'class="active" ';
            }
        insertText += '></li>';
        $('#featured ol').append(insertText);
        x++;
    }
    
   //automate the carousel to roll 
   $('#featured').carousel({
        pause: false
    }); 
});