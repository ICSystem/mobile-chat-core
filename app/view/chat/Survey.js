/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.chat.Survey
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.chat.Survey', {
    extend: 'KlbIm.view.system.Container',
    xtype: 'view-chatsurvey',
    config: {
        items: [
            {
                xtype: 'container',
                itemId: 'chatid-surveycontent',
                layout: 'hbox',
                cls: 'maket-dialog-inner',
                flex: 1,
                items: []
            }
        ]
    }
});