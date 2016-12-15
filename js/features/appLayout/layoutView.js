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
    var console = window.console || {};

    var usernameSet = false;

    var appModel = new LayoutModel();
    appModel.set("title", "Signing App");
    appModel.set("welcome", "Documents Panel...");
    appModel.set("footerText", "&copy; Copyright 2016");

    var View = Backbone.View.extend({
        className: "box-container",
        tag: "section",
        template: Handlebars.compile(layoutTmpl),
        events: {
            "change input.username": "updateModel"
        },
        initialize: function (options) {
            console.log(options);

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

                /*
                var historyView = new HistoryView();
                $content.append(historyView.render().el);
                */

            } else {

                var html = this.template({model: appModel.toJSON()});
                this.$el.html(html);

            }

            return this;
        }
    });

    return View;
});

/*
1. listen for changes in DOM
 events: {
 'change input.form-control': 'updateModel'
}

 2. On DOM change, update the model
 updateModel: function(e) {
    this.model.set("fieldVal", e.target.value);
 }

 template: $("#fieldTemplate").html(),
 initialize: function(options) {
 // todo: on model change render
 this.model = options.model;

 3. Listen to the model.  On model change update the DOM
 this.listenTo(this.model, 'change', this.render);
 */