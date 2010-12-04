$(document).ready(function() {
    // Load TypeKit.
    //try{Typekit.load();}catch(e){}

    // Allow the canvas to receive files.
    $("body").dndUploader({url : "/upload"}, { 
        before_drop : before_image_drop, success: create_image,
        failure: image_creation_error});

    // Allow zooming the canvas in and out.
    $("#slider").slider({
      min: 100,
      max: 1000,
      slide: function( event, ui ) {
        var width = ui.value;
        $('.image').each(function(i, el) {
          //if($(el).attr('data-max-width') > width) {
            $(this).attr('width', width);
          //  $(el).attr('height', ($(el).attr('data-max-height')/$(el).attr('data-max-width')) * width);
          //}
        });
      }
    });

    // The images can be selected.
    $("#canvas").selectable({selected: image_selected, unselected: image_selected, filter: ".image:not(.placeholder)" });

    $("#button-box button").click(function(event) {
        event.preventDefault();
        switch($(this).attr("data-action")) {
            case "select":
                $(".image:not(.placeholder)").addClass("ui-selected");
                image_selected();

                $(this).text("publish all");
                $(this).attr("data-action", "publish");
                break;
            case "publish":
                $(this).text("select all");
                $(this).attr("data-action", "select");
                break;
            default:
                break;
        }
    });

    $("[data-rotate]").live("click", function(event) {
          event.preventDefault();
          $.each($('.ui-selected img'), function(i, image){
            $.post("/rotate", { path : $(image).attr("data-path")}, function(image) {
              image = JSON.parse(image);
              if (image.path) {
                $("img[data-path='"+ image.path +"']").attr("src", image.path + "?" + Date.now());
              }

                $("img[data-path='"+ image.path +"']").fadeIn();
            });
            $(this).fadeOut();
          });
    });

    $("[data-crop]").live("click", function(event) {
        event.preventDefault();
        var image = $(this).parents(".image").children("img");
        image.imgAreaSelect({
            handles: true,
            onSelectEnd: crop,
            autoHide: true
        });
    });
});


/**
 * An image was dropped into the canvas, determine if we need to import it.
 *
 * @param image File
 */
function before_image_drop(image) {
    return true;
}

/**
 * An image was successfully uploaded to the server. Put it in the list.
 *
 * @param image JSON {path, width, height}
 */
function create_image(image) {
    var out = "<div class='image'><img src='"+ image.path +"' alt='" + image.path + 
        "' data-path='" + image.path + "' data-max-width='" + image.width + 
        "' data-max-height='" + image.height + "' />" + 
        "<div class='controls'><button data-crop>crop</button>" + 
        "<button data-rotate>rotate</button><button data-publish>publish</button>";
    $("#canvas").prepend(out);
}

/**
 * An image couldn't be processed by the server. Tell about the issue.
 *
 * @param image JSON {path, width, height}
 */
function image_creation_error(message) {
    // TODO
}

/**
 */
function image_selected(event, ui) {
    $(".controls").hide();
    var len = $(".image.ui-selected").length;
    switch(len) {
        case 1:
            $("[data-crop]").text("crop");
            $("[data-rotate]").text("rotate");
            $("[data-publish]").text("publish");
            $(".image.ui-selected .controls").show();
            break;
        case 2:
            $("[data-crop]").text("crop both");
            $("[data-rotate]").text("rotate both");
            $("[data-publish]").text("publish both");
            $(".image.ui-selected:last .controls").show();
            break;
        default:
            $("[data-crop]").text("crop all");
            $("[data-rotate]").text("rotate all");
            $("[data-publish]").text("publish all");
            $(".image.ui-selected:last .controls").show();
            break;
    }

    var button = $("#button-box button");

    if ($(".image:not(.placeholder)").length != len && button.attr("data-action") == "publish") {
        button.text("select all");
        button.attr("data-action", "select");
    }

    if ($(".image:not(.placeholder)").length == len && button.attr("data-action") == "select") {
        button.text("publish all");
        button.attr("data-action", "publish");
    }
}

function all_button() {
}

/**
 * Rotate an image
 *
 * @param path String
 */
function rotate(path) {
}

/**
 * Crop an image
 *
 * @param path String
 */
function crop(image_tag, selection) {
    $.each($('.ui-selected img'), function(i, image){
        $.post("/crop", { path : $(image).attr("data-path"), 
            x1 : selection.x1, x2 : selection.x2,
            y1 : selection.y1, y2 : selection.y2}, function(image) {
          image = JSON.parse(image);
          if (image.path) {
            $("img[data-path='"+ image.path +"']").attr("src", image.path + "?" + Date.now());
          }
            $("img[data-path='"+ image.path +"']").fadeIn();
        });
        $(this).fadeOut();
      });
}
