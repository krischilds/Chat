require(["requireConfig"], function () {
    "use strict";

    require(["mainView", "appConfig"], function (MainView, appConfig) {

        $(function () {

            // TODO: Search for appId
        	//       if it does not exist, create new element
        	//       else use element found
            $("body").html("<div id='" + appConfig.appId + "' class='app-container'></div>");

            var mainView = new MainView();
        });
    });
});

