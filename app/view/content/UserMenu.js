/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.Header
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.content.UserMenu', {
    extend       : 'Ext.Toolbar',
    xtype        : 'viewusermenu',

    config       : {
        docked : 'top',
        cls    : 'user-menu',
        tpl    : '<div class="user-name">'+_('Welcome') + ', {name}</div>'+
                '<div id="code-show" class="show-code">Code: <span class="code">{code}</span></div>'+
                '<div class="menu-action" data-event="logout">Logout</div>',
        data   : {}
    },

    initialize   : function () {
        this.callParent();
        var me = this;
        me.element.on({
            touchstart : me.onTouchStart,
            touchend   : me.onTouchEnd,
            tap        : me.onTap,
            scope      : me
        });

    },

    onTouchStart : function (evtObj) {
        var btn = evtObj.getTarget('.menu-action', null, true);
        if (btn) {
            Ext.fly(btn).addCls("pressed");
        }
    },

    onTouchEnd   : function (evtObj) {
        var btn = evtObj.getTarget('.menu-action', null, true);
        if (btn) {
            Ext.fly(btn).removeCls("pressed");
        }
    },

    onTap        : function (evtObj) {
        var btn = evtObj.getTarget('.menu-action', null, true),
            event;
        if (btn) {
            event = btn.dom.dataset ? btn.dom.dataset['event'] : btn.dom.getAttribute('data-event');
            this.fireEvent(event);
        }
    }
});
