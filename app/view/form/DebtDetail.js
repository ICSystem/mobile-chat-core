/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.form.DebtDetail
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.form.DebtDetail', {
    extend: 'KlbIm.view.system.Form',
    alias: 'widget.formDebtDetail',

    config: {
        padding: '0 0 12px 0',
        style: 'background:  black; ',
        autoDestroy: false,
        layout: {
            type: 'vbox'
        },
        items: [
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        cls: 'my-buttons',
                        id: 'saveDebt',
                        iconCls: 'icon-save',
                        iconMask: true,
                        text: 'save'
                    }
                ]
            },
            {
                xtype: 'titlebar',
                docked: 'top',
                ui: 'light',
                title: 'Loan Details',
                items: [
                    {
                        xtype: 'button',
                        cls: 'my-buttons',
                        id: 'cancelDebt',
                        iconCls: 'icon-back',
                        iconMask: true,
                        text: 'Cancel'
                    },
                    {
                        xtype: 'button',
                        align: 'right',
                        cls: 'my-buttons',
                        id: 'emailDebt',
                        iconCls: 'icon-email',
                        iconMask: true,
                        text: 'Send Email'
                    }
                ]
            },
            {
                xtype: 'container',
                margin: '0 0 10px 0',
                items: [
                    {
                        xtype: 'label',
                        height: 100,
                        id: 'debtHeaderLabel',
                        style: 'font-weight: bold;text-align: center; font-size: 75px;background-color: #FE8A28; color: white;'
                    },
                    {
                        xtype: 'button',
                        cls: 'my-buttons',
                        id: 'addPayment',
                        margin: '10px 10px 5px 10px',
                        padding: '5px',
                        style: 'border-radius: 0; color: black;',
                        ui: 'gray-light-button',
                        text: 'Add Payment'
                    },
                    {
                        xtype: 'fieldset',
                        itemId: 'myfieldset1',
                        items: [
                            {
                                xtype: 'selectfield',
                                label: 'Prey',
                                labelAlign: 'top',
                                name: 'person_id',
                                displayField: 'name',
                                // store: 'People',
                                valueField: 'id'
                            },
                            {
                                xtype: 'datepickerfield',
                                label: 'Date',
                                labelAlign: 'top',
                                name: 'date',
                                picker: {
                                    ui: 'dark',
                                    doneButton: {
                                        cls: 'my-buttons',
                                        ui: 'gray-button'
                                    },
                                    cancelButton: {
                                        cls: 'my-buttons',
                                        ui: 'gray-light-button'
                                    }
                                }
                            },
                            {
                                xtype: 'numberfield',
                                itemId: 'mynumberfield',
                                label: 'Original Loan Amount',
                                labelAlign: 'top',
                                name: 'amount'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Notes',
                                labelAlign: 'top',
                                name: 'reason'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                items: [
                    {
                        xtype: 'label',
                        html: 'Payment History',
                        id: 'paymentHistoryLabel',
                        margin: '0 12px',
                        padding: '0 0 8px 8px',
                        style: 'font-size: .8em; font-weight: bold;color: gray;border-bottom: 2px solid #333;'
                    },
                    {
                        xtype: 'dataview',
                        baseCls: 'x-list',
                        cls: 'x-list-normal',
                        id: 'myPaymentDataView',
                        itemId: 'myPaymentDataView',
                        minHeight: '',
                        padding: '0 22px',
                        style: 'color: white;',
                        disableSelection: true,
                        defaultType: 'myPaymentListItem',
                        // store: 'Payments',
                        useComponents: true
                    }
                ]
            }
        ]
    }

});