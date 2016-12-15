require.config({
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: [
                "underscore",
                "jquery"
            ],
            exports: "Backbone"
        }
    },
    paths: {
        text: "libs/text",
        jquery: "libs/jquery/jquery",
        underscore: "libs/underscore/underscore2-min",
        backbone: "libs/backbone/backbone",
        handlebars: "libs/handlebars/handlebars-v4.0.5",
        pubnub: "https://cdn.pubnub.com/sdk/javascript/pubnub.4.3.0.min"
    }
});


