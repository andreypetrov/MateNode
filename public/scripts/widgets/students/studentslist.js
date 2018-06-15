Backbone.widget({

    model: {},

    events: {
        'click .user' : 'selectUser',
        'input #search-user': 'searchUser',
        'click .remove-user': 'removeUser',
        'click #confirm-delete': 'confirmRemoveUser',
    },

    listen: {
        RELOAD_USERS: 'loadUsers'
    },

    loaded: function () {
        this.loadUsers()
    },

    removeUser: function(e){
        var userId = $(e.currentTarget).closest('.user').attr('id');
        this.currentUser = _.findWhere(this.model.users, {_id: userId});
        this.$el.find('.current-student').html(this.currentUser.name);
    },

    confirmRemoveUser: function(){
        this.ajaxRequest({
            url: 'api/v1/students/' + this.currentUser._id,
            type: "DELETE",
            success: function () {
                this.loadUsers();
            }
        });
    },

    loadUsers: function(){
        this.ajaxRequest({
            url: 'api/v1/students',
            type: "GET",
            success: function (response) {
                this.$el.find('.users').empty();
                this.model.users = response;
                _.each(this.model.users, function(user){
                    if(!user.name){
                        user.name = ''
                    }
                    if(!user.group){
                        user.group = '-'
                    }
                    user.searchString = user.name.toLowerCase();
                    if(!user.avatar){
                        user.avatar = '/assets/img/avatar.png'
                    }
                });

                this.render();
            }
        });
    },

    render: function(e){
        this.renderTemplate({
            el: this.$el.find('.users'),
            template: 'users',
            data: this.model,
            renderCallback: function () {
               this.$el.find('.user').first().trigger('click');
            }
        })
    },

    selectUser: function(e){
        this.$el.find('.active').removeClass('active');
        $(e.currentTarget).addClass('active');
        var playerId = parseInt($(e.currentTarget).attr('id'));
        var playerData = _.findWhere(this.model.users, {id:playerId})
        this.fire('SHOW_TEST_RESULT', { playerData: playerData})
    },

    searchUser: function(e){
        var searchVal = $(e.currentTarget).val().replace(/ /g,'').toLowerCase();
        if(searchVal == ''){
            this.$el.find('.user').show();
        }else{
            this.$el.find('.user').hide();
        }
        this.$el.find(".user[username*=" + searchVal + "]").show();
    }




}, []);