/**
 * Created by kris.childs on 6/29/15.
 */
define([
    "underscore",
    "jquery",
    "backbone",
    "handlebars",
    "eventAggregator",
    "features/chat/chatInterface",
    "text!features/chat/subscriber_panel.html",
    "appConfig"
], function ($, _, Backbone, Handlebars, eventAggregator, chatInterface, panelTmpl, appConfig) {

    "use strict";

    var View = Backbone.View.extend({

        tag: "div",
        events: {
        },
        initialize: function(options) {
            var that = this;

            this.initChatSubscriberPanel();

            this.model = new Backbone.Model();
            this.model.set("title", "Chat");
        },
        initChatSubscriberPanel: function() {
            var that = this;

            chatInterface.subscribe();
            eventAggregator.on("add-message", function (e) {

                var msg = "<li class='msg'>" + e.message + "</li>";
                that.$el.find(".panel-subscriber-messages").append(msg);

                var username = "<li class='msg-info'>" + e.username + "</li>";
                that.$el.find(".panel-subscriber-messages").append(username);

            });

        },
        outputMessage: function(e) {
            console.log(e);
        },
        template: Handlebars.compile(panelTmpl),
        render: function () {
            var data = this.model.attributes;
            if (this.template) {
                this.$el.html(this.template(data));
            }

            return this;
        }
    });

    return View;
});
