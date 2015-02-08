function createAnnotation(percent) {
	percent = percent * 100;
	var annotation = $("<div style=\"left: " + percent + "%;\" />");
	annotation.addClass("ytp-annotation-marker");
	$("#player-api .html5-progress-bar .ytp-progress-list").append(annotation);
}


var span = $("<span id=\"add-annotation\" />");
span.addClass("yt-uix-button-menu-item");
span.addClass("html5-context-menu-copy-video-url");
span.text("Add Annotation");

var li = $("<li />");
li.append(span);

$(".html5-context-menu").prepend(li);

var x = 0;
$(document).bind("contextmenu", function (e) {
	x = e.pageX; // hack
});

$("#add-annotation").on("click", function () {
	$("#body-container").click(); // hack
	createAnnotation((x - $(".html5-video-player").offset().left) / $(".html5-video-player").width());
});