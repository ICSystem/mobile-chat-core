/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.form.Account
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.form.Account', {
    extend: 'KlbIm.view.system.Form',
    xtype: 'view-formaccountdetail',

    config: {
        autoDestroy: false,
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                ui: 'light',
                title: _('Вход в личный кабинет'),
                height: 50
            },
            {
                xtype: 'hiddenfield',
                name: 'debt_id'
            },
            {
                xtype: 'fieldset',
                header: {
                    cls: 'greyPanelHeader',
                },
                shadow: true,
                items: [
                    {
                        xtype: 'textfield',
                        labelAlign: 'top',
                        name: 'field1',

                        label: 'ФИО (полностью)'
                    },
                    {
                        xtype: 'datepickerfield',
                        labelAlign: 'top',
                        placeHolder: 'mm/dd/yyyy',
                        name: 'date',
                        label: 'Дата рождения'
                    },
                    {
                        xtype: 'textfield',
                        labelAlign: 'top',
                        name: 'field3',
                        label: 'Кодовое слово'
                    },
                    {
                        xtype: 'textfield',
                        labelAlign: 'top',
                        name: 'field4',
                        label: 'Ваш финансовый телефон'
                    },
                    {
                        xtype: 'numberfield',
                        labelAlign: 'top',
                        name: 'field5',
                        label: '4 последние цифра карты'
                    },
                    {
                        xtype: 'button',
                        flex: 1,
                        text: _('Отправить'),
                        ui: 'action',
                        cls: 'formSubmitBtn',
                        margin: '15px 10px 10px 10px',
                        height: 40
                    }
                ]
            }
        ]
    }
});