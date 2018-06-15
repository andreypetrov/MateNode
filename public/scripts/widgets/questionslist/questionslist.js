Backbone.widget({

    events: {
    },

    listen: {

    },

    loaded: function () {
        $('tr').each(function(){
            var imageContainer = $(this).find('td:nth-child(3)');
            var image = imageContainer.html()
            if(image){

                if(image.indexOf('png') != -1){
                    imageContainer.append('<br><img class="question-image" src="assets/img/signs/'+ image +'" />')
                }
            }
        })
    }



}, []);