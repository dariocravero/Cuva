(function( $ ){

var methods = {
    callbacks : {
        before_drop: function() {},
        success: function() {},
        failure: function() {}
    },
    init : function(options, callbacks) {
        return this.each( function () {
            var $this = $(this);

            $.each(options, function( label, setting ) {
                $this.data(label, setting);
            });

            $.each(callbacks, function(callback, fn) {
                methods.callbacks[callback] = fn;
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
               if (methods.callbacks.before_drop.apply(file)) {
                   var xhr = new XMLHttpRequest();
                   xhr.addEventListener('readystatechange', methods.onReadyStateChange, false);
                   xhr.open($this.data('method') || 'POST', $this.data('url'), true);
                   xhr.setRequestHeader("Content-Type", "application/octet-stream");
                   xhr.setRequestHeader("X-File-Name", file.name);
                   xhr.send(file);
               }
           });
       };

       return false;
    },
    onReadyStateChange: function(event) {
        var status = null;

        try {
            status = event.target.status;
            switch(status) {
                case 200:
                    if (event.target.responseText && event.target.readyState == 4) {
                        methods.callbacks.success.apply(
                                JSON.parse(event.target.responseText));
                    }
                    break;
                case 403:
                    if (event.target.responseText && event.target.readyState == 4) {
                        methods.callbacks.failure.apply(
                                JSON.parse(event.target.responseText));
                    }
            }
        }
        catch(e) {
            return;
        }
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
