/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  controller.Main
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.controller.Main', {
    extend: 'Ext.app.Controller',
    alias: 'controller.smmcpmain',
    requires: [
        'Ext.MessageBox'
    ],
    config: {
        refs: {
            loginButton: 'button[action=login]'
        },
        routes: {
            ':node': 'onRouteChange'
        },
        listen : {
            global: {
                'klb.system.btn.full': 'fireUpdateCore',
                'klb.system.btn.exit': 'fireUpdateCore'
            },
            controller : {
                '*': {
                    'klb.system.btn.full': 'fireUpdateCore',
                    'klb.system.btn.exit': 'fireUpdateCore'
                },
                '#' : {
                    unmatchedroute : 'onRouteChange'
                }
            }
        }
    },
    view: [
        'content.Header',
        'content.Center',
        'content.Bottom'
    ],
    /**
     * Constructs a new Controller instance
     */
    constructor: function(config) {

        config  = config  || {};
        this.inicompled = false;
        this.on('initMain', 'initMessenger', this, {single: true});
        this.callParent([config]);

        this.updateBuffer =  100;
        this.timercoreTask = Ext.create('Ext.util.DelayedTask', this.fireUpdateCore, this);
    },

    init: function () {
        var me = this;

        me.control({
            loginButton: {
                tap: 'doLogin'
            },
            'button[action=logout]': {
                tap: 'doLogout'
            }
        });

        Klb.system.Event.on('im.system.loaded',         me.startImMessenger, me);
        Klb.system.Event.on('im.system.start',          me.startImMessenger, me);
        Klb.system.Event.on('im.system.restart',        me.onRestoreOpen,    me);
        Klb.system.Event.on('im.system.stop',           me.stopImMessenger,  me);

        Klb.system.Event.on('klb.system.restore.close', me.onCloseIm,    me);
        Klb.system.Event.on('klb.system.btn.full',      me.fireUpdateCore,   me);
        Klb.system.Event.on('klb.system.btn.exit',      me.fireUpdateCore,   me);

        this.fireEvent('initMain', true);
    },

    initMessenger: function() {
        var me = this;

        Klb.system.Event.on('klb.system.leave.open',     me.onLeaveOpen,    me);
        Klb.system.Event.on('klb.system.restore.open',   me.onRestoreOpen,  me);
        Klb.system.Event.on('klb.system.restore.close',  me.onRestoreClose, me);

        Klb.system.Event.on('klb.system.rating.submit',  me.onRatingSubmit, me);
        Klb.system.Event.on('klb.system.rating.close',   me.onRatingClose,  me);

        Klb.system.Event.on('im.system.connecting',    me.onImConnecting,         me);
        Klb.system.Event.on('im.system.connected',     me.onImAfterConnected,     me);
        Klb.system.Event.on('im.system.authenticated', me.onImAfterAuthenticated, me);
        Klb.system.Event.on('im.system.disconnected',  me.onImAfterDisconnected,  me);

        me.loadingKlbApp();
    },

    startImMessenger: function (status, statusText) {
        var me = this,
            config = Ext.getStore('Config');

        me.appendSlots();
        Klb.system.Core.startMessenger();
    },

    restartImMessenger: function (status, statusText) {
        Klb.system.Core.restartMessenger();
    },
    stopImMessenger: function (status, statusText) {

        Klb.system.Core.stopMessenger();
    },

    launch: function() {

    },

    loadingKlbApp: function() {
        try {

            Ext.Loader.loadScriptFile( Klb.pathCoreKlb + '/system/Core.js', this.onReadyKlbApp.bind(this), this);
        } catch (e) {
            this.onError(e);
        }
    },

    setCurrentView: function (hashTag) {
        var me = this;
        hashTag = (hashTag || '').toLowerCase();
    },

    /**
     * @private
     * called by this.fireUpdateCore
     */
    fireUpdateCore: function() {

    },

    toolbarButtonClick: function(btn){
        if ( btn  && btn.config ) {
            var href = btn.config.href;
            this.redirectTo(href);
        }
    },

// --------------- appendSlots -------------------------------
    appendSlots: function() {
        var me = this;

        if ( Klb.system.Core ) {
            Klb.system.Im.addImSlot('thread.system.status.connecting', function () {

                Klb.system.Event.fireEvent('im.system.connecting', me);
            });

            Klb.system.Im.addImSlot('thread.system.status.connected', function () {

                Klb.system.Event.fireEvent('im.system.connected', me);
            });

            Klb.system.Im.addImSlot('thread.system.status.authenticated', function () {

                Klb.system.Event.fireEvent('im.system.authenticated', me);
            });

            Klb.system.Im.addImSlot('thread.system.status.disconnect', function () {
                Klb.system.Core.restartMessenger();
                Klb.system.Event.fireEvent('im.system.disconnected', me);
            });

            Klb.system.Im.addImSlot('thread.system.scrolldown', function () {

                me.getViewMain().getViewMessages().scrollToDown(false);
            });
            Klb.system.Im.addImSlot('thread.system.message.cleaned', function () {
                me.getViewMain().getItemBottom().cleanMessage();
                me.getViewMain().getViewMessages().scrollToDown(false);
            });
            Klb.system.Im.addImSlot('thread.ui.viewpost', function () {

                me.getViewMain().setCurrentView('postview');
            });

            Klb.system.Im.addImSlot('thread.message.agent', function () {

                me.getViewMain().getViewMessages().onMessagerInsert();
            });
            Klb.system.Im.addImSlot('thread.message.user', function () {

                me.getViewMain().getViewMessages().onMessagerInsert();
            });
        }
        return me;
    },

// --------------- View Core -------------------------------
    getViewMain: function() {
        var itemId = '#chatid-body-main',
            _items = Ext.ComponentQuery.query(itemId);
        return _items[0];
    },
    getViewUsermenu: function() {
        var itemId = '#chatid-body-usermenu',
            _items = Ext.ComponentQuery.query(itemId);
        return _items[0];
    },
    getViewHeader: function() {
        var itemId = '#chatid-body-header',
            _items = Ext.ComponentQuery.query(itemId);
        return _items[0];
    },
    getViewCenter: function() {
        var itemId = '#chatid-body-center',
            _items = Ext.ComponentQuery.query(itemId);
        return _items[0];
    },
    getViewBottom: function() {
        var itemId = '#chatid-body-bottom',
            _items = Ext.ComponentQuery.query(itemId);
        return _items[0];
    },

// --------------- do ... ---------------------------------
    doLogin: function() {
        // called whenever the Login button is tapped

    },

    doLogout: function() {
        // called whenever any Button with action=logout is tapped

    },

// --------------- On  -----------------------------------
    onImConnecting: function() {

        Klb.system.Im.setStatus('connected',    true);
        Klb.system.Im.setStatus('authenticated', false);
        Klb.system.Im.setStatus('disconnected', false);
        this.getViewMain().setCurrentView('messages');
    },

    onImAfterConnected: function() {

        Klb.system.Im.setStatus('conncount', Klb.system.Im.getStatus('conncount') + 1);
        Klb.system.Ajax.url = Klb.system.Im.getUrl();
    },

    onImAfterAuthenticated: function() {

        Klb.system.Im.setStatus('authenticated', true);
    },

    onImAfterDisconnected: function() {

        Klb.system.Im.setStatus('connected',     false);
        Klb.system.Im.setStatus('authenticated', false);
        Klb.system.Im.setStatus('disconnected',  true);
        Klb.system.Ajax.url = Klb.requestUrl;
    },

    onError: function (err) {

        console.log(err);
    },

    onItemSelected: function (sender, record) {

        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },

    onReadyKlbApp: function() {
        console.log('KlbIm.controller.Main -- onReadyKlbApp');
        if ( !this.inicompled ) {
            var el = Ext.get(Klb.loadingEl); if (el) { el.destroy();}
            // Ext.fly(Klb.loadingEl).destroy();

            this.fireEvent('klb.system.app.idle');
            this.inicompled = true;
        }
    },

    onMainViewRender:function() {
        if (!window.location.hash) {
            this.redirectTo("dashboard");
        }
    },

    onRouteChange: function (id) {
        console.log('KlbIm.controller.Main -- onRouteChange, ' + id );
        this.setCurrentView(id);
    },

    onMain: function () {

        var chatWnd = Ext.create('KlbCore.view.window.ChatWindow', {
            title: i18n('Chat Window'),
            constrainHeader: true,
            closable: false,
            modal: true,
            width: Ext.getBody().getViewSize().width * 0.3,
            height: Ext.getBody().getViewSize().height * 0.9
        });

        chatWnd.show();
    },

// --------------- Requests -----------------------------------
    onPostContent: function(emitname, options, scope) {

        Klb.system.Im.setKlbsignal(emitname, options);
    },

// --------------- Events el-----------------------------------
    onHeaderBtnFullClick: function(textfield, e, eOpts) {
console.log('onHeaderBtnFull');

    },

    onRatingSubmit: function(view) {
console.log('onRatingSubmit');
        var me = this,
            elRating = this.getViewMain().getViewRating();

        if ( elRating ) {
            this.onPostContent('thread.ui.estimate', {
                  classified:     elRating.getValueRating()
                , qualification:  0
                , comment:        elRating.getValueComment()
                , success: function(response){
                    me.getViewMain().setCurrentView('restore');
                }
                , failure: function(response){
                    me.getViewMain().setCurrentView('messages');
                }
            });
        }
    },

    onRatingClose: function(view) {

        this.getViewMain().setCurrentView('messages');
    },

    onLeaveOpen: function(view) {

        this.getViewMain().setCurrentView('leave');
    },

    onRestoreOpen: function(view) {

        this.getViewMain().setCurrentView('connecting');
        Klb.system.Core.restartMessenger();
    },

    onRestoreClose: function(view) {
        // this.getViewMain().setCurrentView('connecting');
        Klb.system.Core.stopMessenger();
    },

    onCloseIm: function(view) {
        this.getViewMain().setCurrentView('connecting');
    }
});
