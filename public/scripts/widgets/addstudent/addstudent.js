Backbone.widget({

    model: {},

    events: {
        'click #add-student' : 'addStudent',
        'input input': 'validateButton'
    },

    loaded: function () {

    },

    validateButton: function () {
        if(this.$el.find('#student-name').val() == '' || this.$el.find('#student-group').val() == ''){
            this.$el.find('#add-student').addClass('disabled')
        }else{
            this.$el.find('#add-student').removeClass('disabled')
        }
    },

    addStudent: function(){
        this.ajaxRequest({
            url: 'api/v1/students',
            data: {
                name: this.$el.find('#student-name').val(),
                group: this.$el.find('#student-group').val(),
                avatar: this.$el.find('#student-avatar').val()
            },
            type: "POST",
            success: function () {
                this.fire('RELOAD_USERS');
                this.clearFields();
            }
        });
    },

    clearFields: function () {
        this.$el.find('#student-name').val('');
        this.$el.find('#student-group').val('');
        this.$el.find('#student-avatar').val('');
    }



}, []);