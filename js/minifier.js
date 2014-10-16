$(function() {
	var selectType = function() {
		var content = $(this).val(),
			extension = content.split('.').pop(),
			// check if we have a valid extension (.css of .js), in which case the
			// content of the textarea is likely a link to a file, instead of code
			knownType = ['js', 'css'].indexOf(extension) > -1;

		$('#intro input[name=type]').prop('checked', false);
		if (knownType) {
			$('#intro #type_' + extension)
				.prop('checked', true)
				.trigger('change');
		}
	},
	checkType = function(e) {
		e.preventDefault();

		var extension = $('#intro input[name=type]:checked').val();

		if (extension) {
			minify(minifyDone);
		} else {
			// Show error message when type is not selected
			$('#intro #types')
				.addClass('error')
				.append('<span class="error"><br />Select script type!</span>');
		}
	},
	minify = function(callback) {
		var $form = $('#intro form');

		$.ajax({
			url: $form.attr('action'),
			type: $form.attr('method'),
			data: $form.serialize()
		} ).done(callback);
	},
	minifyDone = function(data, textStatus, jqXHR) {
		$('#intro #source' ).val(data);
	},
	discardError = function(e) {
		$('#intro #types').removeClass('error');
		$('#intro #types .error').remove();
	};

	$('#intro #source').on('change, keyup', selectType);
	$('#intro form').on('submit', checkType);
	$('#intro input[name=type]').on('change', discardError);
});
