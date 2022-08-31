/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.Login
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.content.Login', {
    extend: 'Ext.tab.Panel',
    xtype: 'viewlogin',
    requires: [
        'Ext.XTemplate',
        'Ext.TitleBar',
        'Ext.Video',
    ],

    config: {
        tabBarPosition: 'bottom',

        items:[
            {
                title: 'Welcome',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                xtype: 'list',
                itemId: 'tableContents',
                cls: 'table-contents-list',
                itemTpl: '{title}',
                data: [
                    {title: 'Макет', itemId: 'maketContainer'},
                    {title: 'История диалогов', itemId: 'historyDialogs'},
                    {title: 'Формы', itemId: 'formsExamples'},
                    {title: 'Шаблон клавиатуры', itemId: 'keyboardTpl'},
                    {title: 'Реплики для чата', itemId: 'speechTpl'}
                ]
            }, {
                title: 'Get Started',
                iconCls: 'action',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Getting Started'
                    },
                    {
                        xtype: 'video',
                        // url: 'http://av.vimeo.com/64284/137/87347327.mp4?token=1330978144_f9b698fea38cd408d52a2393240c896c',
                        // posterUrl: 'http://b.vimeocdn.com/ts/261/062/261062119_640.jpg'
                    }
                ]
            },{
                title: 'Вариант 1',
                iconCls: 'favorites',

                layout: 'fit',
                scrollable: true,
                items: [
                    {
                        xtype: 'formAccountDetail'
                    }
                ]
            }
        ]
    },

    getFormItems: function() {
        return [
            {
                xtype: 'fieldset',
                title: 'Personal Info',
                instructions: 'Please enter the information above.',
                defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: [
                    {
                        xtype: 'textfield',
                        labelAlign: 'top',
                        name: 'name',
                        label: 'ФИО',
                        autoCapitalize: false
                    }, {
                        xtype: 'passwordfield',
                        name: 'password',
                        label: 'Password'
                    }, {
                        xtype: 'textfield',
                        name: 'disabled',
                        label: 'Disabled',
                        disabled: true
                    }, {
                        xtype: 'emailfield',
                        name: 'email',
                        label: 'Email',
                        placeHolder: 'you@sencha.com'
                    }, {
                        xtype: 'urlfield',
                        name: 'url',
                        label: 'Url',
                        placeHolder: 'http://sencha.com'
                    }, {
                        xtype: 'checkboxfield',
                        name: 'cool',
                        label: 'Cool',
                        value: true
                    }, {
                        xtype: 'spinnerfield',
                        name: 'spinner',
                        label: 'Spinner'
                    }, {
                        xtype: 'selectfield',
                        name: 'rank',
                        label: 'Rank',
                        valueField: 'rank',
                        displayField: 'title',
                        store: {
                            data: [
                                {rank: 'master', title: 'Master'},
                                {rank: 'padawan', title: 'Student'},
                                {rank: 'teacher', title: 'Instructor'},
                                {rank: 'aid', title: 'Assistant'}
                            ]
                        }
                    }, {
                        xtype: 'datepickerfield',
                        name: 'date',
                        label: 'Start Date',
                        value: new Date(),
                        picker: {
                            yearFrom: 1980
                        }
                    }, {
                        xtype: 'hiddenfield',
                        name: 'secret',
                        value: 'false'
                    }, {
                        xtype: 'textareafield',
                        name: 'bio',
                        label: 'Bio',
                        maxRows: 10
                    }, {
                        xtype: 'sliderfield',
                        name: 'height',
                        label: 'Height'
                    }, {
                        xtype: 'togglefield',
                        name: 'enable',
                        label: 'Security Mode'
                    }, {
                        xtype: 'radiofield',
                        name: 'team',
                        label: 'Red Team',
                        value: 'redteam'
                    }, {
                        xtype: 'radiofield',
                        name: 'team',
                        label: 'Blue Team',
                        value: 'blueteam'
                    }
                ]
            }, {
                xtype: 'fieldset',
                title: 'Favorite color',
                defaults: {xtype: 'radiofield'},
                items: [
                    {name: 'color', label: 'Red', value: 'red'},
                    {name: 'color', label: 'Green', checked: true, value: 'green'}
                ]
            }, {
                xtype: 'fieldset',
                title: 'HTML5',
                items: [
                    {
                        xtype: 'numberfield',
                        name: 'number',
                        label: 'Number'
                    }, {
                        xtype: 'emailfield',
                        name: 'email2',
                        label: 'Email',
                        clearIcon: true
                    }, {
                        xtype: 'urlfield',
                        name: 'url2',
                        label: 'URL',
                        clearIcon: true
                    }
                ]
            }, {
                xtype: 'fieldset',
                title: 'Single Select',
                items: [
                    {
                        xtype: 'selectfield',
                        name: 'options',
                        options: [
                            {text: 'This is just a big select with text that is overflowing', value: '1'},
                            {text: 'Another item', value: '2'}
                        ]
                    }
                ]
            }, {
                xtype: 'fieldset',
                title: 'Single Text',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'single_text',
                        clearIcon: true
                    }
                ]
            }, {
                xtype: 'fieldset',
                title: 'Single Toggle',
                items: [
                    {
                        xtype: 'togglefield',
                        name: 'single_toggle',
                        value: 1
                    }
                ]
            }, {
                xtype: 'fieldset',
                title: 'Single Slider',
                items: [
                    {
                        xtype: 'sliderfield',
                        name: 'single_slider',
                        value: 60
                    }
                ]
            }, {
                xtype: 'fieldset',
                title: 'Multiple Slider Thumbs',
                items: [
                    {
                        xtype: 'sliderfield',
                        name: 'multiple_slider',
                        values: [40, 90]
                    }
                ]
            }];
    }
});