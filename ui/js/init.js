(function($){
    $(function(){

	$('.button-collapse').sideNav();

    }); // end of document ready
})(jQuery); // end of jQuery name space

$("#menu li").on("click", function(e){
    e.preventDefault();
    $("#menu li.active").removeClass('active')

    var page = $("a", this).attr("href");
    $("#content").load(page);
    
    $(this).addClass("active")
});
