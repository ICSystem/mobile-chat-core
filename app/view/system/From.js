/**
 * KlbChat-Modern 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.system.Form
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.system.Form', {
    extend: 'Ext.form.Panel',
    config: {
        margin: '10px 10px 15px 10px',
        cls: 'x-msgcontent-bgform',
        scrollable: false,
        height: 300
    },

    getFormItems: function() {
        return [];
    },

    getSubmitItem: function() {
        return  {
            xtype: 'button',
            flex: 1,
            text: _('Отправить'),
            ui: 'action',
            cls: 'formSubmitBtn',
            margin: '15px 10px 10px 10px',
            height: 40
        };
    },

    // @private
    onSubmit: function(e) {
        var me = this;
        if (e && !me.getStandardSubmit()) {
            e.stopEvent();
        } else {
            this.submit();
        }
    },

    submit: function(options) {
        var me = this,
            form = me.element.dom || {},
            formValues;

        options = Ext.apply({
            url : me.getUrl() || form.action,
            submit: false,
            method : me.getMethod() || form.method || 'post',
            autoAbort : false,
            params : null,
            waitMsg : null,
            headers : null,
            success : null,
            failure : null
        }, options || {});

        formValues = me.getValues(me.getStandardSubmit() || !options.submitDisabled);

        return me.fireAction('beforesubmit', [me, formValues, options], 'doBeforeSubmit');
    },
});

Ext.define('KlbIm.view.system.FormComplete', {
    extend: 'KlbIm.view.system.Container',
    config: {
        margin: '10px 10px 15px 10px',
        scrollable: false,
        height: 100,
        cls: 'x-msgcontent-bgcomleted'
    },

    getConfigItems: function() {
        return [
            {
                xtype: 'container',
                layout: 'hbox',
                items: [
                    {
                        width: 50,
                        cls: 'x-comleted-left',
                        html: [
                            '<svg  class="glyph-svg stroked" viewBox="0 0 44 44" width="40" height="40"  xmlns="http://www.w3.org/2000/svg"> ' +
                            '<g class="line" fill="none" stroke="white" stroke-width="1.5" stroke-miterlimit="10">' +
                             '<path  d="M34.58 14.11L17.61 31.08l-9.19-9.19"></path>' +
                            '</g>' +
                            '</svg>'
                        ].join('')
                    },
                    {
                        cls: 'x-comleted-right',
                        flex: 2,
                        html: [
                                '<div class="title">Заявка на карту оформлена</div>' +
                                '<div class="content">В течении 15 мин. с Вами свяжется наш консультант </div>'
                        ].join('')
                    }
                ]

            }
        ];
    }
});


// Ext.override(Ext.field.TextArea, {
//     constructor: function(config) {
//         config = config || {};
//         Ext.apply(config, {
//             maxRows: 3,
//             clearIcon: false,
//             autoHeight: true
// listeners: {
//     keyup: function (field, event) {
//         if (field.autoHeight) {
//             var numOfRows = field.getValue().split("\n").length;
//             if( numOfRows >= 2) {
//                 numOfRows = numOfRows++;
//                 field.setMaxRows( numOfRows );
//             } else if (numOfRows < field.getMaxRows()) {
//                 field.setMaxRows( numOfRows + 1 );
//             }
//         }
//     }
// }
// });

// this.callParent([config]);

// this.adjustHeight = Ext.Function.createBuffered(function(textarea) {
//     var textAreaEl = textarea.getComponent().input;
//     if (textAreaEl) {
//         textAreaEl.dom.style.height = 'auto';
//         textAreaEl.dom.style.height = textAreaEl.dom.scrollHeight + "px";
//     }
// },200,this);

// this.on({
//     scope: this,
//     keyup: function (textarea) {
//         textarea.adjustHeight(textarea);
//     },
//     change: function(textarea, newValue) {
//         textarea.adjustHeight(textarea);
//     },
//     painted: function(textarea) {
//         textarea.adjustHeight(textarea);
//     }
// });
//     }
// });