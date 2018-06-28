require.config({
    urlArgs: "v=15102014",
    paths: {
        jquery: "vendor/jquery/jquery",
        jqueryui: "vendor/jqueryui/jqueryui.min",
        pathfinding: "vendor/pathfinding/pathfinding",
        animatesprite: "vendor/animatesprite/animatesprite",
        underscore: "vendor/lodash/lodash",
        backbone: "vendor/backbone-amd/backbone",
        bootstrap: "vendor/bootstrap/bootstrap",
        text: "vendor/requirejs-text/text",
        json: "vendor/requirejs-json/json",
        util: "vendor/renderer/util",
        renderer: "vendor/renderer/renderer.min",
        augmentor: "vendor/renderer/augmentor",
        construct: "vendor/renderer/constructor",
        router: "vendor/renderer/router",
        cookies: "vendor/cookies/cookies",
        when: "vendor/when/when",
        "when-sequenceAjax": "vendor/when/sequenceAjax",
        "when-sequence": "vendor/when/sequence",
        "when-pipeline": "vendor/when/pipeline",
        "when-function": "vendor/when/function",
        map: "vendor/map/map",
        typewriter: "vendor/typewriter/typewriter"
    },
    shim: {
        rangeSlider: ["jquery", "jqueryui"],
        "hammer-jq": ["hammer", "jquery"],
        bootstrap: ["jquery"],
        typeahead: ["jquery"],
        datepicker: ["jquery"],
        caret: ["jquery"],
        classie: ["modernizr"],
        "datatables-editable": ["jquery", "jquery-validation", "datatables", "inplaceEdit"],
        "bootstrap-dialog": ["jquery", "bootstrap"],
        hcolumns: ["jquery"],
        jstree: ["jquery"],
        "bootstrap-datepicker": ["jquery"]
    }
}), define(["vendor/renderer/augmentor", "router", "jquery", "vendor/requirejs/tests/circular/complexPlugin/slowText", "bootstrap"], function (e, r, o) {
    navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
    e();
    var n = o("meta[name=layouts]").attr("value");
    if ("undefined" == typeof n)return void alert('Please set your  meta tag for the layouts folder location like  <meta name="layouts" folder="src"/>');
    var t = o("meta[name=homeLayout]").attr("value");
    void 0 === t && (t = "index");
    var a = {layoutsPath: n, homeLayout: t};
    Backbone.router = new r(a)
});