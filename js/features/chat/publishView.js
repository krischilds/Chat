/**
 * Created by kris.childs on 6/29/15.
 */
define([
    "underscore",
    "jquery",
    "backbone",
    "handlebars",
    "eventAggregator",
    "appConfig",
    "features/chat/chatInterface",
    "features/dataModels/Message",
    "features/dataModels/Messages",
    "text!features/chat/publish_panel.html"
], function ($, _, Backbone, Handlebars, eventAggregator, appConfig, chatInterface, Message, messages, panelTmpl) {

    "use strict";

    var View = Backbone.View.extend({

        tag: "div",
        events: {
            "click button[data-action='send-message']": "sendMessage"
        },
        initialize: function(options) {
            window.console.log(options);

            this.model = new Backbone.Model();
            this.model.set("title", "Publish Panel");
            this.model.set("buttonText", "SEND");
            this.model.set("username", options.username);
        },
        sendMessage: function(e) {
            console.log(e);

            var $in = this.$el.find(".message-in");
            var msg = $in.val() || "-- BLANK --";
            var user = this.model.get("username");

            chatInterface.publish(msg, this.model.get("username"));

            var msg = new Message();
            msg.set("message", msg);
            msg.set("username", user);

            messages.add(msg);

            $in.val("");
            $in.focus();
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
