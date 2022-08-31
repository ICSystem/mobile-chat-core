/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.form.PaymentDetail
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.form.PaymentDetail', {
    extend: 'KlbIm.view.system.Form',
    alias: 'widget.formPaymentDetail',

    config: {
        autoDestroy: false,
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                ui: 'light',
                title: 'Payment Details',
                height: 50,
                items: [
                    {
                        xtype: 'button',
                        cls: 'my-buttons',
                        itemId: 'cancelPayment',
                        iconCls: 'icon-back',
                        iconMask: true,
                        text: _('Cancel')
                    }
                ]
            },
            {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'numberfield',
                        itemId: 'mynumberfield1',
                        label: 'Amount',
                        labelAlign: 'top',
                        name: 'amount'
                    },
                    {
                        xtype: 'datepickerfield',
                        label: 'Date',
                        labelAlign: 'top',
                        name: 'date',
                        placeHolder: 'mm/dd/yyyy'
                    },
                    {
                        xtype: 'textfield',
                        label: 'Notes',
                        labelAlign: 'top',
                        name: 'memo'
                    },
                    {
                        xtype: 'button',
                        text: _('Отправить'),
                        ui: 'action',
                        cls: 'formSubmitBtn',
                        margin: '15px 10px 10px 10px',
                        height: 40
                    }
                ]
            },
            {
                xtype: 'hiddenfield',
                name: 'debt_id'
            }
        ]
    }

});