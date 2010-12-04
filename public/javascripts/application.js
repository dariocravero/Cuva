$(document).ready(function() {
    // Load TypeKit.
    //try{Typekit.load();}catch(e){}

    // Allow the canvas to receive files.
    $("#canvas").dndUploader({url : "/upload"}, { 
        before_drop : before_image_drop, success: create_image,
        failure: image_creation_error});

    // Allow zooming the canvas in and out.
    $("#slider").slider();

    // The images can be selected.
    $(".image").selectable({selected: update_control_button_names, 
        unselected: update_control_button_names});
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
    $("#canvas .image.instructions").insertBefore(out);
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
function update_control_button_names(event, ui) {
    // TODO Update the names
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
function crop(path) {
}
