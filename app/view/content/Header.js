/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.Header
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.content.Header', {
    extend: 'KlbIm.view.system.Container',
    xtype: 'viewheader',

    constructor: function(config) {
        var me = this;
        config = config || {};

        Ext.applyIf(config, {
            height: '60px',
            docked: 'top',
            control: {
                '#header-btn-full': {
                    tap:   'onBtnFullClick',
                    click: 'onBtnFullClick'
                },
                '#header-btn-exit': {
                    tap:   'onBtnExitClick',
                    click: 'onBtnExitClick'
                }
            }
        });
        me.callParent([config]);
    },

    getConfigItems: function() {

        return [
            {
                xtype: 'titlebar',
                height: 60,
                title: i18n('Умный Чат'),
                titleAlign: 'left',
                items: [
                    {
                        xtype: 'spacer'
                        // style: '-webkit-box-flex: 1;'
                    }, {
                        itemId: 'header-btn-full',
                        cls: 'block-full-screen',
                        align: 'right',
                        title: i18n('Full')
                    }, {
                        itemId: 'header-btn-exit',
                        cls: 'block-turn-off',
                        align: 'right',
                        title: i18n('Exit'),
                        margin: '0px 15px 0px 10px'
                    }
                ]
            }
        ]
    },

    // @private
    afterInitialize: function(view, eOpts) {
console.log('KlbIm.view.content.Header -- initialize');

    },

// --------------- Events el-----------------------------------
    onBtnFullClick: function() {
console.log('onHeaderBtnFull');
        var me = this;
        Klb.system.Event.fireEvent('klb.system.btn.full', me);
    },

    onBtnExitClick: function() {
console.log('onHeaderBtnFull');
        var me = this;
        Klb.system.Event.fireEvent('klb.system.btn.exit', me);
    }
});
