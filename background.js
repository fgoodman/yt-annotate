function createAnnotation(time, totalTime) {
	var percent = (time / totalTime) * 100;
	var annotation = $("<div style=\"left: " + percent + "%;\" />");
	annotation.addClass("ytp-annotation-marker");
	$("#player-api .html5-progress-bar .ytp-progress-list").append(annotation);
}

for (var i = 0; i < 5 * 60 + 9; i += 60) {
	createAnnotation(i, 5 * 60 + 9);
}