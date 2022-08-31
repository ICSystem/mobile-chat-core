/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.chat.Leave
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.chat.Leave', {
    extend: 'KlbIm.view.system.Container',
    xtype: 'view-chatleave',
    config: {
        cls: 'x-msgleave-panel',
        layout: {
            type: 'fit',
            animation: {
                duration: 300,
                easing: 'ease-out',
                type: 'slide',
                direction: 'left'
            }
        },
        control: {
            '#leave-btn-accept': {
                tap:   'onBtnAcceptClick',
                click: 'onBtnAcceptClick'
            },
            '#leave-btn-repeat': {
                tap:   'onBtnRepeatClick',
                click: 'onBtnRepeatClick'
            },
            '#leave-btn-close': {
                tap:   'onBtnCloseClick',
                click: 'onBtnCloseClick'
            }
        }
    },

    getConfigItems: function(config) {
        var me = this;

        me.config.message = config.message || me.config.message;

        var _items =  [
            {
                xtype: 'container',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'label',
                        html:  "<div class='x-msgleave-header'>"
                                + _('Отправить сообщение')
                                + "</div>"
                    }, {
                        xtype: 'container',
                        margin: '10px 10px',
                        html:  _('Залиште нам своє повідомлення, і ми зателефонуємо Вам у відповідь або зв\'яжемось з Вами по e-mail.')
                    }, {
                        xtype:  'textareafield',
                        name:   'message',
                        itemId: 'x-msgleave-comment',
                        cls:    'x-msgleave-comment',
                        placeHolder: _('Комментарий к оценке...'),
                        // label: _('Комментарий к оценке'),
                        labelAlign: 'top'
                    }, {
                        xtype: 'container',
                        cls: 'x-box-btn',
                        layout: 'hbox',
                        items: [
                             {
                                xtype: 'button',
                                itemId: 'leave-btn-close',
                                text: _('Закрыть'),
                                cls: 'x-btn-close',
                                flex: 1
                            }, {
                                xtype: 'button',
                                itemId: 'leave-btn-accept',
                                text: _('Ok'),
                                cls: 'x-btn-submit',
                                flex: 1
                            }
                        ]
                    }, {
                        xtype: 'spacer',
                        height: 20
                    }, {
                        xtype: 'view-boxerror',
                        btnstatus: 'hidden',
                        message: _('Ошибка подключения ...')
                    }, {
                        xtype: 'container',
                        cls: 'x-box-btn',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'button',
                                itemId: 'leave-btn-repeat',
                                text: _('Повторить'),
                                cls: 'x-btn-repeat',
                                flex: 1
                            }
                        ]
                    }, {
                        xtype: 'spacer',
                        height: 20
                    }
                ]
            }
        ];
        return _items;
    },

    getValueComment: function() {
        return this.down('#x-msgleave-comment').getValue();
    },

    onBtnAcceptClick: function(btn, eventm, id, opts) {
        this.destroy();
        this.fireEvent('buttonaccept', this);
    },

    onBtnRepeatClick: function(btn, eventm, id, opts) {
        this.destroy();
        Klb.system.Event.fireEvent('im.system.restart', this);
    },

    onBtnCloseClick: function(btn, eventm, id, opts) {
        this.destroy();
        this.fireEvent('buttonclose', this);
    }
});