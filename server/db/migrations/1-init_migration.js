'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "circuits", deps: []
 * createTable "constructors", deps: []
 * createTable "constructor_results", deps: []
 * createTable "constructor_standings", deps: []
 * createTable "drivers", deps: []
 * createTable "driver_standings", deps: []
 * createTable "lap_times", deps: []
 * createTable "pit_stops", deps: []
 * createTable "qualifying", deps: []
 * createTable "races", deps: []
 * createTable "results", deps: []
 * createTable "seasons", deps: []
 * createTable "status", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "init_migration",
    "created": "2021-01-22T01:02:24.837Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "soldier",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "constructors",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "constructor_results",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "constructor_standings",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "drivers",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "driver_standings",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "lap_times",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "pit_stops",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "qualifying",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "races",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "results",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "seasons",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "status",
            {

            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
