/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.Center
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.content.Center', {
    extend: 'KlbIm.view.system.Container',
    xtype: 'viewcenter',
    requires: [
        'KlbIm.view.chat.Connecting',
        'KlbIm.view.chat.Profile',
        'KlbIm.view.chat.Messages',
        'KlbIm.view.chat.Rating',
        'KlbIm.view.chat.Restore',
            'KlbIm.view.chat.Leave',
            'KlbIm.view.chat.Survey',
        'KlbIm.view.chat.Forms',
        'KlbIm.view.chat.Gallery'
    ],

    constructor: function(config) {
        var me = this;
        config = config || {};

        Ext.applyIf(config, {
             layout: 'fit', flex: 1,
             items: this.getConfigItems(),
        });
        me.callParent([config]);
    },

    // @private
    afterInstance: function(view, eOpts) {
console.log('KlbIm.view.content.Center -- initialize');

    },

    getConfigItems: function(config) {
        return  [
            // {
            //   xtype: 'view-chatconnecting'
            //   xtype: 'view-chatmessages'
            //   xtype: 'view-chatleave'
            //   xtype: 'view-chatrating'
            //   xtype: 'view-formaccountdetail'
            //   xtype: 'view-chatgallery'
            //   xtype: 'viewfileup'
            //   xtype: 'view-boxwarning'
            //   xtype: 'view-boxerror'
            // }
        ];
    },

    getContentMain: function() {

        return this.up();
    }

});