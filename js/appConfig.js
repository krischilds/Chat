define(function (require) {
    var appConfig = {

    	pubnub: {
                publishKey : "pub-c-c2f748e6-317a-4285-9cdb-ad6d61b0664e",
                subscribeKey : "sub-c-b36aff70-b074-11e6-9ab5-0619f8945a4f",
                ssl: false },
        channel: "ds-chat-1",
		appId: "chat-app-id"
    };

    return appConfig;
});