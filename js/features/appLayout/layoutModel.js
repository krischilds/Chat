define([
    "backbone",
    "eventAggregator"
], function (Backbone, eventAggregator) {

    "use strict";
    var console = window.console || {};
    var LayoutModel = Backbone.Model.extend({
        defaults: {
            title: "",
            footerText: "",
            username: "",
            showFooter: true,
            showHeader: true
        },
        initialize: function (options) {

            console.log(options);
            this.on("invalid", function (model, error) {

                console.error("VALIDATION ERROR : " + error);
                console.log(model);
            });
        },
        url: "",
        urlRoot: ""
    });

    return LayoutModel;
});
