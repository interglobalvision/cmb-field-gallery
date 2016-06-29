jQuery( document ).ready(function($) {
  $('.pw-gallery').each(function() {
    var instance = this;
    var $thumbnailsList = $(instance).parents().find('.cmb2-media-status');

    $('input.manage-gallery', instance).click(function() {
      var gallerysc = '[gallery ids="' + $('input[type=hidden]', instance).val() + '"]';

      wp.media.gallery.edit(gallerysc).on('update', function(update) {
        var id_array = [];
        var fileGroup = [];

        $thumbnailsList.find('li').remove();

        $.each(update.models, function(id, img) {
          id_array.push(img.id);

          var width = img.attributes.sizes.thumbnail.width ? img.attributes.sizes.thumbnail.width  : 50;
          var height = img.attributes.sizes.thumbnail.height ? img.attributes.sizes.thumbnail.height  : 50;

          uploadStatus = '<li class="img-status"><img width="'+width+'" height="'+height+'" src="' + img.attributes.sizes.thumbnail.url+ '" class="attachment-50x50" alt=""></li>';
          fileGroup.push( uploadStatus );
        });

        $('input[type=hidden]', instance).val(id_array.join(","));

        $( fileGroup ).each( function() {

          $thumbnailsList.slideDown().append(this);
        });

        if( id_array.length > 0 ) {
          $('input.clear-gallery', instance).removeClass('hidden');
        }
      });
    });

    $('input.clear-gallery', instance).click(function() {
      var gallerysc = '[gallery ids="' + $('input[type=hidden]', instance).val() + '"]';

      $('input[type=hidden]', instance).val('');
      $('input.clear-gallery', instance).addClass('hidden');

      $thumbnailsList.find('li').remove();
    });
  });
});