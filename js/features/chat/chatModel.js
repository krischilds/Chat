define([
    "backbone",
    "eventAggregator"
], function (Backbone, eventAggregator) {

    "use strict";
    var console = window.console || {};
    var ChatLayoutModel = Backbone.Model.extend({
        defaults: {
            title: ""
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

    return ChatLayoutModel;
});
