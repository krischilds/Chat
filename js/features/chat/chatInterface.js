define(function (require) {

    "use strict";
    var _ = require("underscore");
    var eventAggregator = require("eventAggregator");
    var appConfig = require("appConfig");
    var PubNub = require("pubnub");

    var chatInterface = (function(){

        var myUUID = localStorage.getItem(appConfig.pubnub.subscribeKey + "uuid");
        if (!myUUID) {
            myUUID = PubNub.generateUUID();
            localStorage.setItem(appConfig.pubnub.subscribeKey + "uuid", myUUID);
        }

        var pubnub = new PubNub({
            subscribeKey: appConfig.pubnub.subscribeKey,
            publishKey:   appConfig.pubnub.publishKey,
            logVerbosity: false,
            uuid:         myUUID,
            ssl:          false,
            heartbeatInterval: 120
        });

        var myState = {};
        myState.username = "Kristopher";
        myState.location = "Seattle, WA";

        pubnub.setState(
            {
                channels: [appConfig.channel],
                uuid: myUUID,
                state: myState
            },
            function(response) {
                console.log("setState on sendStateUpdate: " + JSON.stringify(response));
            }
        );

        var publish = function(msg, username) {

            var message = {
                username: username || "Anonymous",
                    text: msg
            };

            var publishConfig = {
                channel : appConfig.channel,
                message : message
            };

            pubnub.publish(publishConfig, function(status, response) {
                console.log(status, response);
            });
        };


        var subscribe = function() {

            pubnub.addListener({
                status: function(statusEvent) {
                    console.log("status", statusEvent);
                    if (statusEvent.category === "PNConnectedCategory") {

                    }
                },
                message: function(m) {
                    console.log(m);

                    eventAggregator.trigger("add-message", { message: m.message.text, username: m.message.username });
                },
                presence: function(event) {
                    var action = event.action;
                    var channel = event.channel;
                    var uuid = event.uuid;
                    var data = event.state;
                    var occupancy = event.occupancy;

                    console.log("");
                    console.log("*** presence event ***");
                    console.log("action:    " + action);
                    console.log("channel:   " + channel);
                    console.log("uuid:      " + uuid);
                    console.log("occupancy: " + occupancy);
                    console.log("data:      " + JSON.stringify(data));
                    console.log("*** presence event ***");
                    console.log("");

                    if (action === "join") {
                        window.alert("JOIN");
                    }
                    else if ((action === "timeout") || (action === "leave")) {
                        window.alert("LEAVE");
                    }
                    else if (action === "state-change") {
                        console.log("!!!@@@ state-change event @@@!!!");
                    }

                }
            });

            // subscribe to channel
            pubnub.subscribe({
                channels: [appConfig.channel],
                withPresence: true
            });

        };


        // public chat api
        return {

            publish: publish,
            subscribe: subscribe
        };
    })();


    return chatInterface;
});



