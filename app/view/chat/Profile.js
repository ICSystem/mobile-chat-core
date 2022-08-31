/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.chat.Connecting
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.chat.Profile', {
    extend: 'KlbIm.view.system.Container',
    xtype: 'view-chatprofile',
    config: {
        control: {
            '#chatid-profile': {
                tap:   'onBtnRestartClick',
                click: 'onBtnRestartClick'
            }
        }
    },
    getConfigItems: function() {
        var me = this,
            _items = [];
        _items.push(
            {
                xtype: 'container',
                itemId: 'chatid-profile',
                cls: 'x-chat-profile',
                centered: true,
                html: [
                    '<div class="x-profile">' +
                    '  <div class="profile-img"> ' +
                        '<img id="profile-img-avatar" src="http://static.kolobiz.com/styles/default/images/avatars/unknown.gif">' +
                    '  </div>' +
                    '  <div class="profile-options">' +
                    '  </div>' +
                    '</div>'
                ]
            }
        );

        _items.push(
            {
                xtype: 'container',
                itemId: 'chatid-profile-description',
                cls: 'x-chat-profile-description',
                centered: true,
            });
        return _items;
    }
});