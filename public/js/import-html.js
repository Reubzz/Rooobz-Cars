$(function () {
    var includes = $('[data-include]')
    $.each(includes, function () {
      var file = 'views/components/' + $(this).data('include')
      $(this).load(file)
    })
})