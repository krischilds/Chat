/**
 * Created by kris.childs on 6/29/15.
 */
define([
    "jquery",
    "backbone",
    "features/chat/publishView",
    "features/chat/subscriberView",
    "appConfig"
], function ($, Backbone, PublishView, SubscriberView, appConfig) {

    "use strict";
    var console = window.console || {};

    var View = Backbone.View.extend({
        
        className: "chat-container",
        tag: "section",
        options: {},
        initialize: function (options) {
            console.log(options);
            this.options = options;
        },
        render: function () {

            var p = new PublishView(this.options);
            var s = new SubscriberView();
            this.$el.append(p.render().el).append(s.render().el);

            return this;
        }
    });

    return View;
});
