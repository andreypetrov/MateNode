Backbone.widget({

    template: false,
    model: {

    },
    events: {

    },

    listen: {

    },

    loaded: function () {

        this.ajaxRequest({
            url: 'api/v1/exams',
            type: "GET",
            success: function (response) {

                this.model.exams = response;
                console.log(response)
                _.each(this.model.exams, function(section){
                    _.each(section.questions, function(question){

                        if(question.imageUrl){
                            question.image = true;
                        }
                        _.each(question.answers, function(answer){
                            if(question.correctAnswer == answer._id){
                                answer.answerClass = 'correct-answer'
                            }else{
                                answer.answerClass = 'answer'
                            }
                        })
                    })
                })

                this.render();
            }
        });
    },

    render: function(){

        this.renderTemplate({

            template: 'questions',
            data: this.model,
            renderCallback: function () {

            }
        })

    }



}, []);