/**
 * Set height of a group of elements to the largest size
 * @Version: 1.0
 * @Author: Patrick Springstubbe
 * @Contact: @JediNobleclem
 * @Website: springstubbe.us
 * @Source: https://github.com/nobleclem/jQuery-AutoHeight
 * 
 * Usage:
 *     $('.scrollable').autoHeight();
 * 
 **/
(function($){
    $.fn.autoHeight = function(){
        var elements = this;

        // re-execute on resize to support responsive patterns
        $(window).resize(function(){
            var maxHeight = 0;
            
            // reset height and recalculate on window resize
            // determine max height of elements,
            // then set all to maxHeight
            elements.each(function(){
                $(this).height('').each(function(){
                    if( $(this).height() > maxHeight ) {
                        maxHeight = $(this).height();
                    }
                });
            }).height( maxHeight );
        }).trigger('resize');
    };
}(jQuery));
