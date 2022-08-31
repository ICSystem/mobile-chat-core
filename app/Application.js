/**
 * KlbChat-Mcp 2.3.7
 * @package     TouchMcp-Chat
 * @subpackage  Application
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

function strtolower (str) { return (str + '').toLowerCase(); };
function undef(v)         { return typeof v === "undefined"; };
function isnull(name)     { return (typeof (name) == 'undefined' || name == null || name == ''); };
function inlang(name)     { return name; };
function is_number(val)   { return (typeof(val) === 'number' || typeof(val) === 'string') && val !== '' && !isNaN(val); };
function ucfirst(str)     { str += ''; var f = str.charAt(0).toUpperCase(); return f + str.substr(1); };
function i18n(string)     { return string; };
function _(msgid) {
    var _i = msgid.indexOf('#'), _appName = 'Api';
    if ( Ext.isString(msgid) && _i == 0 )  { _i = msgid.indexOf('/'), _appName = msgid.substring(1, _i); msgid = msgid.substring(_i+1);  }
    return msgid;
};

var Klb = Klb || {};
Ext.apply(Klb, {
    getCmp: function(id) { return Ext.get( Ext.getDom(id) ); },
    system: { debug: true, statics: {}, Setting: {} },
    App: { Api: {} },
    clientVersion: {}
});

Klb.baseUrl = '';
Klb.requestUrl = '//' + Klb.domainChat + '/thrd/';
Klb.enabledconfig =  Klb.enabledconfig  || true;
Klb.loadingEl     = Klb.loadingEl   || 'appLoadingIndicator';
Klb.pathCoreExt   = Klb.pathCoreExt ||  Klb.baseUrl + 'touch/build';
Klb.pathCoreSrc   = Klb.pathCoreSrc ||  Klb.baseUrl + 'touch/src';
Klb.pathCoreApp   = Klb.pathCoreApp ||  Klb.baseUrl + 'app';
Klb.pathCoreKlb   = Klb.pathCoreKlb ||  Klb.baseUrl + 'resources/Klb';

Klb.paths = Klb.paths || {
    /* Ext framework */
      'Ext':        Klb.pathCoreSrc
    , 'ExtSrc':     Klb.pathCoreSrc
    , 'Ext.ux':     Klb.pathCoreApp + '/ux'
    , 'Ext.draw':   Klb.pathCoreKlb + '/draw'
    , 'Ext.chart':  Klb.pathCoreKlb + '/chart'
    , 'CryptoJS':   Klb.pathCoreKlb + '/lib/CryptoJS'
    /* Klb system */
    , 'KlbIm':      Klb.pathCoreApp
    , 'KlbIm.UX':   Klb.pathCoreApp + '/ux'
    , 'KlbCore':    Klb.pathCoreKlb + '/core'
    , 'Klb.system': Klb.pathCoreKlb + '/system'
};

/* Ext loader */
Ext.Loader.setConfig({
    enabled: Klb.enabledconfig,
    disableCaching: Klb.debug,
    paths: Klb.paths
});

Ext.ns('Klb.plugin', 'Ext.plugin', 'Ext.ux');
if (!Ext.plugin.Plugin) Ext.define('Ext.plugin.Plugin', {
    init: function() {}
});

Klb.system.statics.Filters = Ext.create('Ext.util.MixedCollection', {});
/**
 * @class Klb.system.Core
 * @namespace Klb.system
 * @sigleton
 */
Ext.define('Klb.system.Ajax', {
    extend : 'Ext.data.Connection',
    alias: 'proxy.klbajax',
    xtype: 'klbajax',
    requires: [
        'Ext.util.Collection',
        'Ext.util.Observable'
    ],
    disableCaching: true,
    url: '/',
    singleton: true,
    autoAbort : false,

    constructor : function(config) {
        Ext.apply(config, {
            method:  'POST',
        });
        this.callParent([config]);
    }
});

Ext.define('Klb.system.Event', {
    mixins: ['Ext.mixin.Observable'],
    singleton: true,
    constructor: function(config) {
        this.initConfig(config);  // We need to initialize the config options when the class is instantiated
    }
});

Ext.define('Klb.system.Msg', {
    extend: 'Ext.Base',

    Confirm: function (title, text, callback, scope, options) {
        callback = callback || Ext.emptyFn;
        title = title || _('Warning');
        Ext.Msg.confirm(title
            , text, callback, scope || this);
    },

    Alert: function (title, text, callback) {
        callback = callback || Ext.emptyFn;
        title = title || _('Warning');
        Ext.MessageBox.alert(title, text, callback, this);
    },

    Wait: function(status, title, text) {
        status = status || false;
        title = title || _('Please wait!');
        text  = text ||  _('Updating ...');
        if (status) {
            Ext.Msg.wait( text, title, {
                interval: 500,
                duration: 5000,
                increment: 5,
                closable: true
            });
        } else {
            Ext.Msg.hide();
        }
    },

    WaitUpdate: function(text) {

        Ext.Msg.updateText(text);
    }

});

Ext.define('KlbIm.Application', {
    extend: 'Ext.app.Application',

    requires: [
        'Ext.util.Collection',
        'Ext.util.MixedCollection',
        'Ext.data.identifier.Uuid',

        'KlbIm.controller.Main',
        'KlbIm.view.main.Main'
    ],

    isIconPrecomposed: true,

    listeners : {

        global: {
            'klb.system.btn.full': 'fireUpdateCore',
            'klb.system.btn.exit': 'fireUpdateCore'
        }
    },

    /**
     * @private
     * called by this.fireUpdateCore
     */
    fireUpdateCore: function() {

        console.log('fireUpdateCore');
    }
});