/**
 * Set height of a group of elements to the largest size
 * @Version: 1.1.1
 * @Author: Patrick Springstubbe
 * @Contact: @JediNobleclem
 * @Website: springstubbe.us
 * @Source: https://github.com/nobleclem/jQuery-AutoHeight
 * 
 * Usage:
 *     $('.scrollable').autoHeight();
 *     $('.scrollable').autoHeight({
 *         minWidth  : 400,
 *         maxWidth  : 800,
 *         perRow    : false,
 *         skipHidden: true
 *     });
 * 
 **/
(function($){
    $.fn.autoHeight = function( options ){
        defaults = {
            // only resize if between these heights, set to false to disable (min|max)Height check
            minWidth  : false,
            maxWidth  : false,
            perRow    : false, // treat each invisible row independently
            skipHidden: true   // don't use hidden elements in autoheight calculations
        }
        options = $.extend( defaults, options );

        var elements = this;

        // re-execute on resize to support responsive patterns
        $(window).resize(function(){
            var maxHeight    = 0;
            var row          = 1;
            var lastPosition = null;
            var borderBox    = (elements.css('box-sizing') == 'border-box' ? true : false);

            // reset height and recalculate on window resize
            elements.height('').removeAttr( 'data-row' );

            // determine max height of elements,
            // then set all to maxHeight
            elements.each(function(){
                // skip hidden elements
                if( options.skipHidden && $(this).not(':visible').length ) {
                    return true;
                }

                // set previously unset elements height
                // reset maxHeight for new row
                if( options.perRow ) {
                    // check if a new row has started
                    if( lastPosition && ($(this).offset().top != lastPosition) ) {
                        // set last full row elements height
                        if( maxHeight && (elements.filter('[data-row='+ row +']').length > 1) ) {
                            elements.filter('[data-row='+ row +']').height( maxHeight );
                        }

                        // reset maxHeight for next row of elements
                        maxHeight = 0;

                        // clear element to make sure its in a new row position
                        $(this).css('clear','both');

                        // increment row counter
                        row = row + 1;
                    }

                    // set attribute for elements row & elements top position
                    $(this).attr('data-row', row );
                    lastPosition = $(this).offset().top;
                }
                
                // check for window minWidth
                if( options.minWidth && $(window).width() < options.minWidth ) {
                    return true; // skip
                }
                // check for window maxWidth 
                else if( options.maxWidth && $(window).width() > options.maxWidth ) {
                    return true; // skip
                }

                // get element height and check if larger than maxHeight val
                var elementHeight = borderBox ? $(this).outerHeight() : $(this).height();
                if( elementHeight > maxHeight ) {
                    maxHeight = elementHeight;
                }
            });

            // set remaining elements height if maxHeight set
            if( maxHeight ) {
                if( options.perRow ) {                                                    
                    // only if there are more than 1 in the final row
                    if( elements.filter('[data-row='+ row +']').length > 1 ) {
                        elements.filter('[data-row='+ row +']').height( maxHeight );
                    }

                    elements.css('clear','');
                }
                else {
                    elements.height( maxHeight );
                }
            }
        }).trigger('resize');
    };
}(jQuery));
