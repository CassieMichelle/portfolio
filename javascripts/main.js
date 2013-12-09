jQuery.fn.teletype = function(opts){
    var $this = this,
        defaults = {
            animDelay: 50
        },
        settings = $.extend(defaults, opts);

    $.each(settings.text.split(''), function(i, letter){
        setTimeout(function(){
            $this.html($this.html() + letter);
        }, settings.animDelay * i);
    });
};

jQuery.fn.swapWith = function(to) {
        return this.each(function() {
            var copy_to = $(to).clone(true);
            var copy_from = $(this).clone(true);
            $(to).replaceWith(copy_from);
            $(this).replaceWith(copy_to);
        });
};




///move tiles
function Move(clicked_square) {

        // We need to locate movable tiles based on where the empty spot is,
        // We can only move the four surrounding squares
        var movable = false;
        var zi = 1; //may not need to do this but it is pretty groovy

        var tile_width = $(clicked_square).outerWidth();
        var tile_height = $(clicked_square).outerHeight();
 
        // Goal is to Swap x/y between the clicked square and the currently empty square
        var empty_x = Math.floor($('#empty').position().left);
        var empty_y = Math.floor($('#empty').position().top);

        var tile_x = Math.floor($(clicked_square).position().left);
        var tile_y = Math.floor($(clicked_square).position().top);

        var check_x = empty_x === tile_x;
        var check_y = empty_y === tile_y;
        
        var add_y = tile_height + tile_y;
        var sub_y = tile_y- tile_height;
        
        var add_x = tile_width + tile_x;
        var sub_x = tile_x - tile_width;
        
        // var check_north = ((add_y === empty_y) || ((add_y + 2) === empty_y) || ((add_y - 2) === empty_y) || ((add_y + 1) === empty_y) || ((add_y - 1) === empty_y));
        // var check_south = ((sub_y === empty_y) || ((sub_y + 2) === empty_y) || ((sub_y - 2) === empty_y) || ((sub_y + 1) === empty_y) || ((sub_y - 1) === empty_y));
        // var check_left =  ((add_x === empty_x) || ((add_x + 2) === empty_x) || ((add_x - 2) === empty_x) || ((add_x + 1) === empty_x) || ((add_x - 1) === empty_x));
        // var check_right = ((sub_x === empty_x) || ((sub_x + 2) === empty_x) || ((sub_x - 2) === empty_x) || ((sub_x + 1) === empty_x) || ((sub_x - 1) === empty_x));

        var check_north = ((add_y - 2) <= empty_y) && ((add_y + 2) >= empty_y);
        var check_south = ((sub_y - 2) <= empty_y) && ((sub_y + 2) >= empty_y);
        var check_left =  ((add_x - 2) <= empty_x) && ((add_x + 2) >= empty_x);
        var check_right = ((sub_x - 2) <= empty_x) && ((sub_x + 2) >= empty_x);
        
        // The clicked square is north of the empty square
        if (check_north && check_x){
            movable = true;
                console.log('jada');
        }

        // The clicked square is south of the empty square
        if (check_south && check_x){
            movable = true;
            console.log('george');
        }
 
        // The clicked square is left of the empty square //may need to add + 'px'
        if (check_left && check_y) {
            movable = true;
            console.log('bogart');

        }
 
        // The clicked square is east of the empty square
        if (check_right && check_y) {
            movable = true;
            console.log('zelda');
        }
 
        if (movable) {
            $(clicked_square).swapWith('#empty');
        }
}

// function images() {
//     $( ".active" ).map( function(index, element) {
//         return this.id;
//         console.log(this.id);
//     }).get();

// }

//position the popup at the center of the page
function positionPopup() {
        if(!$("#overlay").is(':visible')){
            return;
        }
       
        $("#overlay").css({
            left: ($(window).width() - $('#overlay').width()) / 2,
            top: ($(window).width() - $('#overlay').width()) / 7,
            position:'absolute'
        });

        $('.tile').css("opacity", "0.5");
        $('#navbar_container').css("opacity", "0.5");
}

$(document).ready(function() {
    

    $('.header h2').teletype({
        animDelay: 100,
        text: 'Cassie\'s Portfolio: Where Develpoment, Design, and Math Meet'
    });

    $('.icon-angle-down').on('click', function() {
       
        $('.main_container').stop().animate({
            top: '-100%'
        }, 800);
          
    });

    
    
      //generation random number to put in div
    var id_arr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];  
    var arr = [];
    while(arr.length < 15){
        var randomnumber = Math.ceil(Math.random()*15);
        var found=false;
        for(var i=0;i<arr.length;i++){
          if(arr[i]==randomnumber)
            {found=true;
                break;}
        }
        if(!found) {
            arr[arr.length]=randomnumber;
        }
    }
    // console.log(arr);

    /// put random number in tile

    jQuery.each( arr, function( i, val ) {
        $( "#tile" + (i + 1) ).append( "<h2>" + val + "</h2>");
    });

   
   
   
    $('.tile').on('click', function(e) {
                    Move(e.target);
                    console.log(e.target);
                

    });

   
    $(".active").dblclick(function(){
        console.log(this.id);
        image = this.id;
        $('.image_div').append("<img src = '../profile/images/"+ image +".png'/>");
        $('#overlay').fadeIn(1000);
        $("." +image).css('display', 'block');
        positionPopup();
    });
     
    //close popup
    $("#close").click(function(){
        $("#overlay").fadeOut(500);
        $('.tile').css("opacity", "1");
        $('.image_div img').remove();
        $('#navbar_container').css("opacity", "1");
        $('.tile1').css('display', 'none');
        $('.tile2').css('display', 'none');
        $('.tile7').css('display', 'none');
        $('.tile10').css('display', 'none');
        $('.tile12').css('display', 'none');
    });
     
    
     
    



 

});

//maintain the popup at center of the page when browser resized
    $(window).bind('resize',positionPopup);



