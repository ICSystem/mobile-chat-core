/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.form.ContactDetail
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.form.ContactDetail', {
    extend: 'KlbIm.view.system.Form',
    alias: 'widget.formContactDetail',

    config: {
        padding: '0 0 12px 0',
        autoDestroy: false,
        layout: {
            type: 'vbox'
        },
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                ui: 'light',
                title: 'Prey Details',
                items: [
                    {
                        xtype: 'button',
                        cls: 'my-buttons',
                        id: 'cancelContact',
                        iconCls: 'icon-back',
                        iconMask: true,
                        text: 'Cancel'
                    }
                ]
            },
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
                        id: 'saveContact',
                        iconCls: 'icon-save',
                        iconMask: true,
                        text: 'save'
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
                        id: 'contactHeaderLabel',
                        style: 'font-weight: bold;text-align: center; font-size: 75px;background-color: #FE8A28; color: white;'
                    },
                    {
                        xtype: 'button',
                        cls: 'my-buttons',
                        id: 'addDebt',
                        margin: '10px 10px 5px 10px',
                        style: 'border-radius: 0; color: black;',
                        ui: 'gray-light-button',
                        text: 'New Loan'
                    },
                    {
                        xtype: 'fieldset',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Name',
                                labelAlign: 'top',
                                name: 'name'
                            },
                            {
                                xtype: 'emailfield',
                                label: 'Email',
                                labelAlign: 'top',
                                name: 'email'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Phone',
                                labelAlign: 'top',
                                name: 'phone'
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
                        html: 'Loan History',
                        id: 'loanHistoryLabel',
                        margin: '0 12px',
                        padding: '0 0 8px 8px',
                        style: 'font-size: .8em; font-weight: bold;color: gray;border-bottom: 2px solid #333;'
                    },
                    {
                        xtype: 'dataview',
                        baseCls: 'x-list',
                        cls: 'x-list-normal',
                        id: 'myDebtDataView',
                        padding: '0 22px',
                        disableSelection: true,
                        defaultType: 'myDebtListItem',
                        store: 'Debts',
                        useComponents: true
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onFormpanelShow',
                event: 'show'
            }
        ]
    },

    onFormpanelShow: function(component, eOpts) {

        //refresh Debt dataview
        this.down('dataview').refresh();

        //remove person label in debt dataview when viewed from contact detail
        Ext.select('.x-form .debt-person-label').setStyle({display:'none'});
    }

});