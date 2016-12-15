define([
    "backbone",
    "eventAggregator",
    "features/dataModels/Message"
], function (Backbone, eventAggregator, Message) {

    "use strict";

    var Messages = Backbone.Collection.extend({
        model: Message
    });

    var m = new Messages();
    return m;
});
