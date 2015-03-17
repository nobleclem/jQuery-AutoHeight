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
 *     $('.scrollable').autoHeight({
 *         minWidth: 400,
 *         maxWidth: 800
 *     });
 * 
 **/
(function($){
    $.fn.autoHeight = function( options ){
        defaults = {
            // only resize if between these heights, set to false to disable (min|max)Height check
            minWidth: false,
            maxWidth: false
        }
        options = $.extend( defaults, options );

        var elements = this;

        // re-execute on resize to support responsive patterns
        $(window).resize(function(){
            var maxHeight = 0;

            // reset height and recalculate on window resize
            // determine max height of elements,
            // then set all to maxHeight
            elements.each(function(){
                $(this).height('').each(function(){
                    // check for window minWidth
                    if( options.minWidth && $(window).width() < options.minWidth ) {
                        return true; // skip
                    }
                    // check for window maxWidth
                    else if( options.maxWidth && $(window).width() > options.maxWidth ) {
                        return true; // skip
                    }

                    if( $(this).outerHeight() > maxHeight ) {
                        maxHeight = $(this).outerHeight();
                    }
                });
            });

            // only reset if we have a maxHeight
            if( maxHeight ) {
                elements.height( maxHeight );
            }                                                                     
        }).trigger('resize');
    };
}(jQuery));
