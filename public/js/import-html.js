$(function () {
	var includes = $("[data-include]");
	$.each(includes, function () {
		var file = "api/components/" + $(this).data("include");
		$(this).load(file);
	});
});
