/**
 * An ordered collection of tabs.
 *
 * @singleton
 * @module Message
 * @extends Object
 */

define([
    "backbone",
    "eventAggregator"
], function (Backbone, eventAggregator) {

    "use strict";
    var console = window.console || {};
    var Message = Backbone.Model.extend({
        defaults: {
            text: '',
            createdBy: '',
            dateCreated: '',
            index: 0
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

    return Message;
});
