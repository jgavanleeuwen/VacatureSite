require([
	"backbone",
	"app",
	"router"
],
function(Backbone, App, Router) {

	App.router = new Router();
	Backbone.history.start({ pushState: true, root: '' });

	$(document).on("click", "a[href]:not([data-bypass])", function(evt) {

		var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
		var root = location.protocol + "//" + location.host;

		if (href.prop.slice(0, root.length) === root) {
			evt.preventDefault();
			Backbone.history.navigate(href.attr, false);
		}

	});

	$('.nav-pills a').bind('click', function (e) {
		e.preventDefault();
		$(this).tab('show');
	});

	$('.right').affix({
		offset: {
			top: function() {
				return $('.right').offset().top - 20;
			}
		}

	});

	$('.progress').tooltip();

});