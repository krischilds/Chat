/**
* render all views
*/
define([
    "jquery",
    "backbone",
    "features/appLayout/layoutView",
    "handlebars",
    "appConfig"
    ], function ($, Backbone, LayoutView, Handlebars, appConfig) {

    "use strict";

    var console = window.console || {};

    Handlebars.registerHelper("debug", function(optionalValue) {
        console.log("Current Context");
        console.log("====================");
        console.log(this);

        if (optionalValue) {
            console.log("Value");
            console.log("====================");
            console.log(optionalValue);
        }
    });

    var MainView = Backbone.View.extend({
        el: "#"+appConfig.appId,
        className: "app-container",
        initialize: function (options) {
            if (options) {
                console.log(options);
            }
            this.render();
        },
        render: function () {
            var layoutView = new LayoutView();
            this.$el.html(layoutView.render().el);
            return this;
        }
    });

    return MainView;
});
