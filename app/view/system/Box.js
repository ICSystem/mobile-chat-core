/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.system.Box
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.system.Box', {
    extend: 'Klb.system.Msg',
    xtype: 'viewbox',
    require: [
        'Klb.system.Msg'
    ]
});

Ext.define('KlbIm.view.system.BoxView', {
    extend: 'KlbIm.view.system.Container',
    xtype: 'viewbox-container',

    constructor: function(config) {
        config = config || {};
        var me = this;
        config = me.getConfigInit(config);

        me.callParent([config]);
    }

});

Ext.define('KlbIm.view.system.Container.Error', {
    extend: 'KlbIm.view.system.BoxView',
    xtype: 'view-boxerror',
    config: {
        cls: 'x-box-container x-box-error',
        message: _('Error'),
        control: {
            '#error-btn-accept': {
                tap:   'onBtnAcceptClick',
                click: 'onBtnAcceptClick'
            },
            '#error-btn-close': {
                tap:   'onBtnCloseClick',
                click: 'onBtnCloseClick'
            }
        }
    },

    getConfigItems: function(config) {
        var me = this,
            _btnstatus = { hidden: false };

        if ( config.btnstatus && config.btnstatus == 'hidden') {
            delete  config.button;
            _btnstatus.hidden = true;
        }
        me.config.message = config.message || me.config.message;
        var _items =  [
            {
                xtype: 'container',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'container',
                        itemId: 'error-icon',
                        align: 'center',
                        cls: 'x-icon-warning'
                    }, {
                        xtype: 'container',
                        itemId: 'error-message',
                        align: 'center',
                        cls: 'x-box-message',
                        html:  me.config.message
                    }, {
                        xtype: 'container',
                        cls: 'x-box-btn',
                        hidden: _btnstatus.hidden,
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'button',
                                itemId: 'error-btn-close',
                                text: _('Закрыть'),
                                cls: 'x-btn-close',
                                flex: 1
                            }, {
                                xtype: 'button',
                                itemId: 'error-btn-accept',
                                text: _('Ok'),
                                cls: 'x-btn-submit',
                                flex: 1
                            }
                        ]
                    }
                ]
            }
        ];
        return _items;
    },

    setMessage: function(message) {

        this.down('#error-message').setHtml(message);
    },

    onBtnAcceptClick: function(btn, eventm, id, opts) {

        this.destroy();
        this.fireEvent('buttonaccept', this);
    },

    onBtnCloseClick: function(btn, eventm, id, opts) {

        this.destroy();
        this.fireEvent('buttonclose', this);
    }
});

Ext.define('KlbIm.view.system.Container.Warning', {
    extend: 'KlbIm.view.system.BoxView',
    xtype: 'view-boxwarning',
    config: {
        cls: 'x-box-container x-box-warning',
        message: _('Maксимальный размер 30 Мб'),
        control: {
            '#warning-btn-close': {
                tap:   'onBtnCloseClick',
                click: 'onBtnCloseClick'
            }
        }
    },
    getConfigItems: function(config) {
        var me = this,
            _btnstatus = { hidden: false };

        me.config.message = config.message || me.config.message;

        if ( config.btnstatus && config.btnstatus == 'off ') {
            delete  config.button;
            _btnstatus.hidden = true;
        }
        var _items =  [
            {
                xtype: 'container',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'container',
                        itemId: 'warning-icon',
                        align: 'center',
                        cls: 'x-icon-warning'
                    }, {
                        xtype: 'container',
                        itemId: 'warning-message',
                        align: 'center',
                        cls: 'x-box-message',
                        html:  me.config.message
                    }, {
                        xtype: 'button',
                        itemId: 'warning-btn-close',
                        text: _('Ok'),
                        hidden: _btnstatus.hidden,
                        cls: 'x-btn-close',
                    }]
            }
        ];

        return _items;
    },

    setMessage: function(message) {

        this.down('#warning-message').setHtml(message);
    },

    onBtnCloseClick: function(btn, eventm, id, opts) {

        this.destroy();
        this.fireEvent('buttonclose', this);
    }
});