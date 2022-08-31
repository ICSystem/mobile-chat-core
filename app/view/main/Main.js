/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.Main
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.override(Ext.Component, {

    applyPlugins: function (config) {
        var ln, i, configObj;

        if (!config) {
            return config;
        }

        config = [].concat(config);

        for (i = 0, ln = config.length; i < ln; i++) {
            configObj = config[i];
            //<deprecated product=touch since=2.0>
            if (Ext.isObject(configObj) && configObj.ptype) {
                //<debug warn>
                Ext.Logger.deprecate('Using a ptype is now deprecated, please use type instead', 1);
                //</debug>
                configObj.type = configObj.ptype;
            }
            //</deprecated>
            config[i] = Ext.factory(configObj, 'Klb.plugin.Plugin', null, 'plugin');
        }

        return config;
    },

    updatePlugins: function (newPlugins, oldPlugins) {
        var ln, i;

        if (newPlugins) {
            for (i = 0, ln = newPlugins.length; i < ln; i++) {
                newPlugins[i].init(this);
            }
        }

        if (oldPlugins) {
            for (i = 0, ln = oldPlugins.length; i < ln; i++) {
                Ext.destroy(oldPlugins[i]);
            }
        }
    }
});

Ext.define('KlbIm.view.main.Main', {
    extend: 'KlbIm.view.system.Container',
    xtype: 'viewmain',
    requires: [
        'KlbIm.view.system.Box',
        'KlbIm.view.system.Container',
        'KlbIm.view.system.Sector',
        'KlbIm.view.content.Header',
        'KlbIm.view.content.Center',
        'KlbIm.view.content.Bottom'
    ],

    lastView: null,

    constructor: function(config) {
        var me = this;
        config = config || {};

        Ext.applyIf(config, {
            fullscreen: true,
            layout: {
                type: 'fit',
                animation: {
                    duration: 300,
                    easing: 'ease-out',
                    type: 'slide',
                    direction: 'left'
                }
            },
            // width: '370px', height: '640px', centered: true, // debug
            cls: 'x-chat_bgtblmn_on',
            itemId: 'chatid-body-main',
        });

        me.callParent([config]);
    },

    getConfigItems: function() {
        return  [
            {
                xtype: 'viewheader',
                itemId: 'chatid-body-header'
            }, {
                xtype: 'viewusermenu',
                itemId:'chatid-body-usermenu',
                hidden: true
            }, {
                xtype: 'viewcenter',
                itemId: 'chatid-body-center',
                flex: 2,
            }, {
                xtype: 'viewbottom',
                itemId: 'chatid-body-bottom',
                flex:   1,
                hidden: true
            }
        ]
    },

    initialize: function() {
console.log('KlbIm.view.main.Main -- initialize ');
        this.callParent(arguments);
        this.fireEvent('initMainView', this);
    },

    // @private
    afterInstance: function(view, eOpts) {
console.log('KlbIm.view.content.Center -- initialize');

        Klb.system.Event.on('klb.system.btn.exit', 'routeRating', this);

        // execution of an anonymous function:
        // Ext.Function.defer(this.routeMessages, 2000, this, []);

        this.routeConnecting();

        //this.setItemCenter([{
            // xtype: 'view-chatconnecting'
            // xtype: 'view-chatmessages'
            // xtype: 'view-chatleave'
            // xtype: 'view-chatrating'
            // xtype: 'view-formaccountdetail'
            // xtype: 'view-chatgallery'
            // xtype: 'viewfileup'
            // xtype: 'view-boxwarning'
            // xtype: 'view-boxerror'
        // }]);
    },
    
    getItemHeader: function() {
        return this.down('#chatid-body-header');
    },
    
    getItemCenter: function() {
        return this.down('#chatid-body-center');
    },

    setItemCenter: function(items, isremove) {
        isremove = isremove || true;
        var _center = this.getItemCenter();
        if ( !_center) {
            this.removeAll().setItems( this.getConfigItems() );
        }
        if ( isremove ) {
            _center.removeAll()
        }
        _center.setItems(items);
        return this;
    },

    getViewMessages: function() {
        return this.down('#chatid-body-center').down('[xtype=view-chatmessages]');
    },
    getViewConnecting: function() {
        return this.down('#chatid-body-center').down('[xtype=view-chatconnecting]');
    },
    getViewProfile: function() {
        return this.down('#chatid-body-center').down('[xtype=view-chatprofile]');
    },
    getViewLeave: function() {
        return this.down('#chatid-body-center').down('[xtype=view-chatleave]');
    },
    getViewRating: function() {
        return this.down('#chatid-body-center').down('[xtype=view-chatrating]');
    },
    
    getItemBottom: function() {

        return  this.down('#chatid-body-bottom');
    },

    setCurrentView: function(nameTag ) {
        nameTag = (nameTag  || '').toLowerCase();
            switch(nameTag) {
                case 'connecting':
                            this.routeConnecting();
                    break;
                case 'profile':
                            this.routeProfile();
                    break;
                case 'restore':
                            this.routeRestore();
                    break;
                case 'messages':
                            this.routeMessages();
                    break;
                case 'leave':
                            this.routeLeave();
                    break;
                case 'postview':
                case 'bottomview':
                            this.getItemBottom().show();
                            Klb.system.Im.setStatus('bottom', 1);
                    break;
                case 'headerview':
                            this.getItemHeader().show();
                    break;
                case 'headerhide':
                            this.getItemHeader().hide();
                    break;
            }
        return this;
    },

    routeProfile: function() {

        this.getItemBottom().hide();
        this.getItemCenter().removeAll().setItems([
            {
                xtype: 'view-chatprofile',
                flex: 1
            }
        ]);
    },

    routeConnecting: function() {

        this.getItemBottom().hide();
        this.setItemCenter([
            {
                xtype: 'view-chatconnecting',
                timercount: 15,
                flex: 1,
                onlisten: {
                    timerstop: this.onTimerStop
                }
            }
        ]);
    },

    routeMessages: function() {
        var me = this;
            if (me.getViewRating())  {
                me.getItemCenter().remove( me.getViewRating() );
            }
            if (me.getViewConnecting())  {
                me.getViewConnecting().stopTimer();
                me.getViewConnecting().destroy();
            }

        if ( me.getViewMessages() ) {

            me.getItemBottom().show();
            me.getViewMessages().show();
            me.getViewMessages().getViewBottom().show();
        } else {

            me.getItemCenter().setItems([
                {
                    xtype: 'view-chatmessages',
                    flex: 1
                }
            ]);
        }
        if (Klb.system.Im.getStatus('bottom') == 1) {
            me.getItemBottom().show();
        }
    },

    routeRestore: function() {
        var me = this;
            if (me.getViewRating())  {
                me.getItemCenter().remove( me.getViewRating() );
            }

            me.getItemCenter().add([
            {
                xtype: 'view-chatrestore',
                flex: 1
            }
        ]);

    },

    routeLeave: function() {
        var me = this;
        if (me.getViewLeave())  {
            me.getItemCenter().remove( me.getViewLeave() );
        }
        if (me.getViewConnecting())  {
            me.getViewConnecting().destroy();
        }
        Klb.system.Event.fireEvent('im.system.stop', this);
        me.getItemCenter().add([
            {
                xtype: 'view-chatleave',
                flex: 1
            }
        ]);
    },

    routeRating: function() {

        if (this.getItemBottom().isHidden())
        { // debug version

            if (this.getViewRating())  {
                this.getItemCenter().remove( this.getViewRating() );
            }
            this.routeMessages();
        } else {

            this.getItemBottom().hide(true);
            if ( this.getViewMessages() ) {
                this.getViewMessages().hide();
                this.getViewMessages().getViewBottom().hide();
            }

            this.getItemCenter().add([
                {
                    xtype: 'view-chatrating',
                    flex: 1
                }
            ]);
        }
    },

    onTimerStop: function() {

        Klb.system.Event.fireEvent('im.system.stop', this);

        if ( !Klb.system.Im.getStatus('connected')) {
            Klb.system.Event.fireEvent('klb.system.leave.open');
        }

    }
});
