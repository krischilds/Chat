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
    var console = window.console || {};

    var View = Backbone.View.extend({

        options: {},
        template: Handlebars.compile(panelTmpl),
        initialize: function (options) {
            console.log(options);
            this.options = options;

            this.model = new Backbone.Model();
            this.model.set("date", new Date());
        },
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
