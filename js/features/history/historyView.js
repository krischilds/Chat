/**
 * Created by kris.childs on 6/29/15.
 */
define([
    "jquery",
    "backbone",
    "handlebars",
    "eventAggregator",
    "text!features/history/history_panel.html",
    "appConfig"
], function ($, Backbone, Handlebars, eventAggregator, panelTmpl, appConfig) {

    "use strict";
    var View = Backbone.View.extend({
        options: {},
        template: Handlebars.compile(panelTmpl),
        initialize: function (options) {
            this.options = options;
            this.model = new Backbone.Model();
            var that = this;
            var chatLog = [];

            eventAggregator.on("add-message", function (data) {
                if (data && data.message) {
                    let chatData = $.extend({}, data, { date: new Date().toString()});
                    chatLog.push(chatData);
                    that.model.set("chatLog", chatLog);
                    that.render();
                }
            });
        },
        render: function () {
            var html = "<div class='panel-history-container'>";
            var chatLog = this.model.get("chatLog");
            if (chatLog && chatLog.length) {
                html += "<ul>";
                chatLog.forEach(function (item) {
                    html += "<li><div>" + item.username + " : " + item.date + "</div><div>" + item.message + "</div></li>";
                });
                html += "</ul>";
            } else {
                html+="<div style='padding:20px'>No events</div>";
            }
            html+="</div>";
            this.$el.html(html);
            return this;
        }
    });

    return View;
});
