/**
 * @singleton eventAggregator
 * A simple event aggregator to be shared across the app
 */
define(function (require) {
    var _ = require('underscore');
    var Backbone = require('backbone');
    var eventAggregator = _.extend({}, Backbone.Events);

    return eventAggregator;
});