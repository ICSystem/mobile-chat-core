/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.chat.x-msgrating
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.chat.Restore', {
    extend: 'KlbIm.view.system.Container',
    xtype: 'view-chatrestore',
    config: {
        cls: 'x-msgrating-panel x-msgcontent-bgform',
        margin: '20px 10px 25px 20px',
        control: {
            '#restore-btn-close': {
                tap:   'onBtnCloseClick',
                click: 'onBtnCloseClick'
            },
            '#restore-btn-submit': {
                tap:   'onBtnSubmitClick',
                click: 'onBtnSubmitClick'
            }
        }
    },

    getConfigItems: function () {
        var me = this, _items;

        _items = [
            {
                xtype: 'container',
                // layout: 'vbox',
                flex: 1,
                items: [
                    {
                        xtype: 'spacer',
                        height: '50px',
                    }, {
                        xtype: 'button',
                        itemId: 'restore-btn-submit',
                        text: _('Восстановить диалог?'),
                        cls: 'x-btn-submit',
                        height: '50px',
                        flex: 1
                    }, {
                        xtype: 'spacer',
                        height: '50px',
                    }, {
                        xtype: 'button',
                        itemId: 'restore-btn-close',
                        text: _('Завершить диалог?'),
                        cls: 'x-btn-close',
                        height: '50px',
                        flex: 1
                    }
                ]
            }
        ];

        return _items;
    },

    onBtnSubmitClick: function(btn, eventm, id, opts) {

        Klb.system.Event.fireEvent('klb.system.restore.open', this);
    },

    onBtnCloseClick: function(btn, eventm, id, opts) {

        Klb.system.Event.fireEvent('klb.system.restore.close', this);
    }
});