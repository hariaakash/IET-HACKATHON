(function ($) {
    $(function () {

        $('.button-collapse').sideNav();

    }); // end of document ready

})(jQuery); // end of jQuery name space

// Check Code
function checkCode() {
    var lang = 0;
    var code = document.getElementById("code");
//    var input = document.getElementById("input");
    code = code.value;
    console.log(code);
//    input = input.value;
    if (code.indexOf("namespace") >= 0 || code.indexOf("cout") >= 0 || code.indexOf("cin") >= 0)
        lang = "C++";
    else if (code.indexOf("scanf") >= 0 || code.indexOf("printf") >= 0 || code.indexOf("stdio.h") >= 0)
        lang = "C";
    else if (code.indexOf("System") >= 0 || code.indexOf("java.io") >= 0)
        lang = "Java";
    else if (code.indexOf("def") >= 0 || code.indexOf("end") >= 0)
        lang = "Ruby";
    else if (code.indexOf("html>") >= 0)
        lang = "HTML";
    else if (code.indexOf("{") != 0 && code.indexOf("print") >= 0)
        lang = "Python";
    else
        lang = 0;
    if (lang == 0)
        Materialize.toast('We have a problem detecting the language', 4000, "red lighten-2 rounded");
    else {
        Materialize.toast('Tada we feel like its: ' + lang, 4000, "green lighten-2 rounded");
        var request = '';
        var params = "async=0&client_secret=7ac09e464a1ef4f97f04427fd740741b764e5b8e&lang=" + lang + "&memory_limit=262144&source=" + code + "&time_limit=10";
        $.ajax({
            type: "POST",
            url: "https://ideas2it-hackerearth.p.mashape.com/compile/",
            data: params,
            headers: {
                "X-Mashape-Key": "kPg6ORl2kKmshrtI5CGg9dmKFYJQp1gtfe7jsnYA0juuiBQmoc",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            },
            success: function (data) {
                if (data.run_status.status == "AC") {
                    Materialize.toast("Successfully Compiled", 5000, "green lighten-2 rounded");
                } else
                document.getElementById("link").innerHTML = data.web_link;
                document.getElementById("link").href = data.web_link;
            },
            error: function (data) {
                Materialize.toast("Some error occurred, try again after reloading !!", 5000, "red lighten-2 rounded");
            }
        });
    }

    //    function runCode() {
    //        var request = '';
    //        var params = "async=0&client_secret=7ac09e464a1ef4f97f04427fd740741b764e5b8e&lang=" + lang + "&memory_limit=262144&source=" + code + "&time_limit=10&input=" + input;
    //        $.ajax({
    //            type: "POST",
    //            url: "https://ideas2it-hackerearth.p.mashape.com/run/",
    //            data: params,
    //            headers: {
    //                "X-Mashape-Key": "kPg6ORl2kKmshrtI5CGg9dmKFYJQp1gtfe7jsnYA0juuiBQmoc",
    //                "Content-Type": "application/x-www-form-urlencoded",
    //                "Accept": "application/json"
    //            },
    //            success: function (data) {
    //                if (data.run_status.status == "AC") {
    //                    Materialize.toast("The code is run successfully" + data.run_status.output, 5000, "green lighten-2 rounded");
    //                } else {
    //                    Materialize.toast("Error Occurred when running !! :/", 5000, "red lighten-2 rounded");
    //                    console.log(data.errors)
    //                }
    //            },
    //            error: function (data) {
    //                Materialize.toast("Some error occurred, try again after reloading !!", 5000, "red lighten-2 rounded");
    //            }
    //        });
    //    }
}
