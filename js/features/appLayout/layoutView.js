/**
 * Created by kris.childs on 6/29/15.
 */
define([
    "jquery",
    "backbone",
    "handlebars",
    "eventAggregator",
    "features/appLayout/layoutModel",
    "text!features/appLayout/app_layout.html",
    "../chat/chatView",
    "features/history/historyView",
    "appConfig"
], function ($, Backbone, Handlebars, eventAggregator, LayoutModel, layoutTmpl, ChatView, HistoryView, appConfig) {

    "use strict";
    var usernameSet = false;

    var appModel = new LayoutModel();
    appModel.set("title", "Chat Demo");
    appModel.set("welcome", "...");
    appModel.set("footerText", "Footer");

    var View = Backbone.View.extend({
        className: "box-container",
        tag: "section",
        template: Handlebars.compile(layoutTmpl),
        events: {
            "change input.username": "updateModel"
        },
        initialize: function (options) {
            var ProfileModel = Backbone.Model.extend({
                defaults: {
                    username: "Anonymous"
                }
            });

            this.model = new ProfileModel();
            this.model.on('change', this.render, this);
        },
        updateModel: function (e) {
            usernameSet = true;
            this.model.set("username",  e.target.value);
        },
        render: function () {

            if (usernameSet) {

                var $content = this.$el.find(".box-content");
                var chatOptions = {};
                chatOptions.username = this.model.get("username");

                var chatView = new ChatView(chatOptions);
                $content.append(chatView.render().el);


                var historyView = new HistoryView();
                $content.append(historyView.render().el);


            } else {

                var html = this.template({model: appModel.toJSON()});
                this.$el.html(html);

            }

            return this;
        }
    });

    return View;
});