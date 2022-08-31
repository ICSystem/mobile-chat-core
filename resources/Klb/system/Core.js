/**
 * KlbChat-Modern 2.3.8
 * @package     Modern-Chat
 * @subpackage  System Core
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2019 ICS GmbH (www.icstime.com)
 *
 */

Date.patterns = {
    ISO8601Long:"Y-m-d H:i:s",
    ISO8601Short:"Y-m-d",
    ISO8601Time:"H:i:s",
    ShortDate: "n/j/Y",
    LongDate: "l, F d, Y",
    FullDateTime: "l, F d, Y g:i:s A",
    MonthDay: "F d",
    ShortTime: "g:i A",
    LongTime: "g:i:s A",
    SortableDateTime: "Y-m-d\\TH:i:s",
    UniversalSortableDateTime: "Y-m-d H:i:sO",
    YearMonth: "F, Y"
};

var Klb = Klb || {};
var threadParams = threadParams || {};
var _klbThInp= _klbThInp || [];
Ext.apply(Klb, { App: { Api: {} }, Controller: {}, Setting: {}, Functions: {}, util: {}, clientVersion: {} } );
Ext.apply(Klb.system, { debug: false, statics: {}, Setting: {}, uploadManager: false });

/**
 * quiet logging in release mode
 */
Klb.system.loadCss = function (url, id) {

    var filecss=document.createElement("link");
        filecss.setAttribute("rel", "stylesheet");
        filecss.setAttribute("type", "text/css");
        filecss.setAttribute("href", url);

    if ( id  && !document.getElementById(id) ) {
        filecss.setAttribute("id", id);
        document.getElementsByTagName("head")[0].appendChild(filecss);
    } else {
        document.getElementsByTagName("head")[0].appendChild(filecss);
    }
    return this;
};

// Core view
Klb.system.i18n = i18n;

Klb.system.statics.Filters = Ext.create('Ext.util.MixedCollection', {});

Ext.define("Klb.abstract.LocalStorage",{
    extend : "Ext.data.proxy.LocalStorage",
});

Ext.define("Klb.abstract.Proxy",{
    extend : "Ext.data.proxy.Ajax",
});

Ext.require([
    // klb System
    'Klb.system.Im',
    'Klb.system.Libs',
    'Klb.system.AppManager'
    // 'KlbCore.view.ticket.TicketView',
], function() {

    Ext.define('Klb.system.Core', {
        extend: 'Ext.Base',
        singleton: true,

        appEvents: null,
        lang: [ 'Ru', 'En', 'De' ],
        requestUrl: Klb.requestUrl || '/servers/',
        /**
         * list of initialised items
         */
        initList: {
            initLog:      false,
            initLibs:     false,
            initWindow:   false,
            initModules:  false,
            initViewport: false,
            initRegistry: false
        },

        constructor: function(config){
            var me = this,
            config = config || {};
            me.callParent([config]);
        },
        /**
         * config locales
         */
        initLocale: function () {

            Klb.system.translation = new Klb.system.Locale.Gettext();
            Klb.system.translation.textdomain('Api');

            window._ = function (msgid) {
                var _i = msgid.indexOf('#'),
                    _appName = 'Api';
                if ( Ext.isString(msgid) && _i == 0 )
                {
                    _i = msgid.indexOf('/'),
                        _appName = msgid.substring(1, _i);
                    msgid = msgid.substring(_i+1);
                }
                return Klb.system.translation.dgettext(_appName, msgid);
            };
            // Klb.system.Locale.prototypeTranslation();
            return this;
        },
        initEvents: function () {

        },
        /**
         * initialise application manager
         */
        initLibs: function () {
            Klb.system.Core.initList.initRegistry = true;
            Klb.system.Im.loaderChat();
        },
        /**
         * initialise upload manager
         */
        initUploadMgr: function () {

            if (!Klb.system.uploadManager)
                Klb.system.uploadManager = Ext.create('Ext.ux.file.UploadManager', {});
            return this;
        },

        initAppMgr: function () {
                Klb.system.appMgr = Ext.create('Klb.system.AppManager', {});
        },

        renderWindow: function () {
            // this.initAppMgr();
        },

        startMessenger: function () {
console.log('Klb.system.Core -- startMessenger');
                Klb.system.Im.startIm();
            return this;
        },

        stopMessenger: function () {
console.log('Klb.system.Core -- stopMessenger');
                Klb.system.Im.stopIm();
            return this;
        },

        restartMessenger: function () {
console.log('Klb.system.Core -- restartMessenger');
            Klb.system.Im.resetStatus();
            this.stopMessenger();
            this.startMessenger();
        }

    });

    Ext.onReady(function () {

        Klb.system.Core.initLibs();
        var waitForInits = function () {
            if (! Klb.system.Core.initList.initRegistry) {
                Ext.Function.defer(waitForInits,500);
            } else {
                Klb.system.Core.initEvents();
                Klb.system.Core.initUploadMgr();
                Klb.system.Core.renderWindow();
            }
        };

        waitForInits();
    });
});


