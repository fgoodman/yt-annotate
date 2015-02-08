var annotations = [];

function createAnnotation(percent) {
	var v = prompt("Annotation text");
	if (v === null) {
		alert("Please enter text.");
		return;
	}
	percent = percent * 100;
	annotations.push(percent);
	var annotation = $("<div id=\"a" + percent.toString().replace(/\./g, "").substring(0, 5) + "\" style=\"left: " + percent + "%;\" />");
	console.log(percent.toString().replace(/\./g, "").substring(0, 5));
	annotation.addClass("ytp-annotation-marker");
	var content = $("<div />");
	content.html(v);
	annotation.append(content);
	$("#player-api .html5-progress-bar .ytp-progress-list").append(annotation);
}

function removeAnnotation(percent) {
	var as = annotations.map(function (v) {
		return Math.abs(v - (100 * percent));
	});
	var m = Math.min.apply(Math, as);
	console.log(m);
	var i = as.indexOf(m);
	var n = (annotations[i] * 100).toString().replace(/\./g, "");
	console.log(n.substring(0, 5));
	$("#a" + n.substring(0, 5)).remove();
	annotations.splice(i, 1);
}

var add = $("<span id=\"add-annotation\" style=\"display: none;\" />");
add.addClass("yt-uix-button-menu-item");
add.addClass("html5-context-menu-copy-video-url");
add.text("Add Annotation");

var remove = $("<span id=\"remove-annotation\" style=\"display: none;\" />");
remove.addClass("yt-uix-button-menu-item");
remove.addClass("html5-context-menu-copy-video-url");
remove.text("Remove Annotation");

var li = $("<li />");
li.append(add);
li.append(remove);

$(".html5-context-menu").prepend(li);

function show(what) {
	$("#" + what + "-annotation").css("display", "block");
}

function hide(what) {
	$("#" + what + "-annotation").css("display", "none");
}

$(".html5-progress-bar, .html5-context-menu").hover(function (e) {
	var as = annotations.map(function (v) {
		return Math.abs(v - (100 * (e.pageX - $(".html5-video-player").offset().left) / $(".html5-video-player").width()));
	});
	var y = false;
	for (var i = 0; i < as.length; i++) {
		if (as[i] < 1.0) {
			y = true;
			break;
		}
	}

	if (y) {
		hide("add");
		show("remove");
	}
	else {
		hide("remove");
		show("add");
	}
}, function () {
	if (!$(".html5-context-menu").is(":visible")) {
		hide("add");
		hide("remove");
	}
});

$(".html5-context-menu").hide(0, function () {
	hide("add");
	hide("remove");
});

var x = 0;
$(document).bind("contextmenu", function (e) {
	x = e.pageX; // hack
});

$("#add-annotation").on("click", function () {
	$("#body-container").click(); // hack
	createAnnotation((x - $(".html5-video-player").offset().left) / $(".html5-video-player").width());
});

$("#remove-annotation").on("click", function () {
	$("#body-container").click();
	removeAnnotation((x - $(".html5-video-player").offset().left) / $(".html5-video-player").width());
});