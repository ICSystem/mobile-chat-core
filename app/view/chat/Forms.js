/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.chat.Leave
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.chat.Forms', {
    extend: 'KlbIm.view.system.Container',
    xtype: 'view-chatforms',
    requery: [
        'KlbIm.view.form.Account',
        'KlbIm.view.form.ContactDetail',
        'KlbIm.view.form.DebtDetail',
        'KlbIm.view.form.Fileup',
        'KlbIm.view.form.PaymentDetail'
    ]
});