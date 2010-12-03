(function( $ ){

 var methods = {
init : function( options ) {

return this.each( function () {

    var $this = $(this);

    $.each(options, function( label, setting ) {
        $this.data(label, setting);
        });

    $this.bind('dragenter.dndUploader', methods.dragEnter);
    $this.bind('dragover.dndUploader', methods.dragOver);
    $this.bind('drop.dndUploader', methods.drop);

    });
},

dragEnter : function ( event ) {    
                event.stopPropagation();
                event.preventDefault();

                return false;
            },

dragOver : function ( event ) {      
               event.stopPropagation();
               event.preventDefault();

               return false;
           },

drop : function( event ) {    
           event.stopPropagation();
           event.preventDefault();

           var $this = $(this);
           var dataTransfer = event.originalEvent.dataTransfer;

           console.log( event.originalEvent.dataTransfer.files );

           if (dataTransfer.files.length > 0) {
               $.each(dataTransfer.files, function ( i, file ) {
                       var xhr = new XMLHttpRequest();
                       /*xhr.upload.addEventListener('loadstart', onloadstartHandler, false);
                         xhr.upload.addEventListener('progress', onprogressHandler, false);
                         xhr.upload.addEventListener('load', onloadHandler, false);*/
                       xhr.addEventListener('readystatechange', callback, false);
                       xhr.open('POST', '/upload', true);
                       xhr.setRequestHeader("Content-Type", "application/octet-stream");
                       xhr.setRequestHeader("X-File-Name", file.name);
                       xhr.send(file); // Simple!
                       });
           };

           return false;
       }
};

$.fn.dndUploader = function( method ) {
    if ( methods[method] ) {
        return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
    } else {
        $.error( 'Method ' +  method + ' does not exist on jQuery.dndUploader' );
    }
};
})( jQuery );

function callback(evt) {
    var status = null;

    try {
        status = evt.target.status;
    }
    catch(e) {
        return;
    }

    if (status == '200' && evt.target.responseText && evt.target.readyState == 4) {
        updateImage(JSON.parse(evt.target.responseText));
    }
}
