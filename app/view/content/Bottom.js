/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.content.Bottom
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.content.Bottom', {
    extend: 'KlbIm.view.system.Container',
    xtype: 'viewbottom',
    requires: [
        'Ext.ux.file.Upload',
        'Ext.ux.file.UploadManager',
        'Ext.ux.file.BrowsePlugin',

        'Ext.ux.BrowseButton'
    ],
    constructor: function(config) {
        var me = this;
        config = config || {};

        Ext.applyIf(config, {
            docked: 'bottom',
            updateBuffer: 100,
            textfield : null,
            bubbleEvents: ['sendmessage'],
            control : {
                'button[id=chat-btn-sending]' : {
                    tap : 'handleButtonTap'
                },
                '[id=msgwnd]' : {
                    action : 'handleTextfieldAction',
                    keyup  : 'handleTextfieldKey'
                }
            }
        });

        me.updateTask = Ext.create('Ext.util.DelayedTask', me.fireUpdate, me);

        // Ext.Loader.loadScriptFile( Klb.paths['Ext.ux'] + '/BrowseButton.js', this.fireUpdateButton.bind(this), this);
        me.callParent([config]);
    },

    getConfigItems: function() {
        var me = this;
        return  [
            {
                xtype:  'container',
                itemId: 'chatid-control-bottom',
                layout: 'fit',
                cls:    'x-border-top',
                items: [
                    {
                        xtype: 'container',
                        minHeight: '60px',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'container',
                                itemId: 'chatid-textarea',
                                clearIcon: false,
                                flex: 1,
                                html:
                                    '<div style="display:none;" id="msgwnd_bar" class="message_bar"></div>' +
                                    '<div style="display:none; float:right;position:relative; left: 0px; top: 0px; height: 32px !important;">' +
                                    '   <div id="msgwndInfo" >' +
                                    '      <div id="msgwndInfo_Img" ></div>' +
                                    '      <div id="msgwndInfo_Text" style="display:none;"></div>' +
                                    '   </div>' +
                                    '</div>' +
                                    '<div id="msgwnd_div">' +
                                    ' <div id="indicatorTxt" class="borderindicator"></div>' +
                                    '<textarea id="msgwnd" placeholder="'+ _('Напишите сообщение...')+'" tabindex="0" class="msgtexarea" ></textarea>' +
                                    '</div>'
                            }, {
                                xtype: 'button',
                                itemId: 'chat-btn-sending',
                                margin: '10px 10px 0 0',
                                hidden: true,
                                width: 35,
                                cls: 'k-button-light btn-send-ico',
                                scope: me,
                                handler: function (btn, event, opts) {
                                    // Ext.Msg.alert('Sended', 'The quick empty', Ext.emptyFn);
                                    btn.getScope( ).handleButtonTap();
                                }
                            }, {
                                xtype: 'browsebutton',
                                itemId: 'chat-btn-attachment',
                                margin: '10px 10px 0 0',
                                hidden: false,
                                width: 35,
                                cls: 'k-button-light btn-attachment-ico',
                                reference: 'itemattach',
                                visibleLayer: true,
                                listeners: {
                                    scope: this,
                                    uploadprogress: function (view, record, el) {
                                        if (Klb.system.Im)
                                            Klb.system.Im.upgradeUpload(this, record);
                                    },
                                    uploadcomplete: function (view, record, el) {
                                        if (Klb.system.Im)
                                            Klb.system.Im.upgradeUpload(this, record);
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ];
    },

    fireUpdateButton: function() {

        var me = this;
        // this.down('#chatid-control-bottom').add([
        //
        // ]);
    },


    // @private
    afterInstance: function(view, eOpts) {
        console.log('KlbIm.view.content.Bottom -- initialize');

        var me = this,
            elmsgcontent = Klb.getCmp('msgwnd_div'),
            eltextfield = Klb.getCmp('msgwnd');

        eltextfield.on('action', 'handleTextfieldAction', me);
        eltextfield.on('keyup', 'handleTextfieldKey', me);

        // var _contentItem =  Ext.create('Ext.ux.field.BetterTextArea', {
        //         placeHolder:  _('Напишите сообщение...'),
        //         id: 'msgwnd',
        //         name: 'msgwnd',
        //         cls: 'msgtexarea',
        //         setViewport: function(editor) {
        //             KlbIm.app.getController('Main').getViewMain().add(editor);
        //         },
        //         getBodyPanel: function(cfg) {
        //             return KlbIm.app.getController('Main').getViewMain();
        //         },
        //         listeners: {
        //             scope: me,
        //             change: me.onInputChange,
        //             keyup: me.onInputKeyUp
        //         }
        //  });
        // _contentItem.renderTo(msgcontent);

        // me.fileElement.dom.onchange = function() {
        //     me.onChanged.apply(me, arguments);
        // };
        //
        // me.on({
        //     scope: me,
        //     buffer: 250,// Avoid multiple tap
        //     tap: me.onButtonTap
        // });
        //
        // // Stup initial button state
        // me.changeState('browse');
    },

    /**
     * @private
     * called by this.updateTask
     */
    fireUpdate: function () {

        this.fireEvent('msgwnd-update', this);
    },

    getTextfield: function() {
        return Klb.getCmp('msgwnd');
    },

    getMessage : function() {
        var field = this.getTextfield();
        if (!field) {
            this.setTextfield(
                field = this.down('textfield')
            );
        }
        return field.getValue();
    },

    cleanMessage: function() {
        this.onButtonSending('attachment');
        this.getTextfield().dom.value = '';
    },

    handleButtonTap : function() {
        var me = this,
            message = this.getMessage();

        Klb.system.Im.postMessage(me, message);
        me.cleanMessage();
        me.fireEvent('im.message.post', me, message);
        // Ext.defer(function() {
        //     me.getTextfield().dom.focus();
        // }, 200);
    },

    handleTextfieldAction : function(field, e) {
        if (field.browserEvent.keyCode === 13) {
            this.handleButtonTap();
        }
    },

    handleTextfieldKey : function(field, e) {

        if (field.browserEvent.keyCode !== 13) {
            this.fireEvent('keyup', this, field, e);
            this.onButtonSending( this.getMessage() == '' ? 'attachment' : false);
        }
    },

    onButtonSending: function(status) {
        var me = this;

            if ( status == 'attachment') {
                me.down('#chat-btn-sending').hide();
                me.down('#chat-btn-attachment').show();
            } else if ( status == 'sending' || me.down('#chat-btn-sending').isHidden() ) {
                me.down('#chat-btn-sending').show();
                me.down('#chat-btn-attachment').hide();
            }
        return this;
    },

    /**
     * @private
     * Handler method called when there is a keyup event on an input
     * item of this menu.
     */
    onInputKeyUp: function(field, e, eOpts) {
        // if (e.getKey() === e.RETURN ) {
            // e.stopEvent();
            // this.hide();
        // }
        console.log('onInputKeyUp');

        if (field.autoHeight) {
            var numOfRows = field.getValue().split("\n").length;
            if( numOfRows >= 2) {
                numOfRows = numOfRows++;
                field.setMaxRows( numOfRows );
            } else if (numOfRows < field.getMaxRows()) {
                field.setMaxRows( numOfRows + 1 );
            }
        }
    },
    /**
     * @private
     * Handler method called when the user changes the value of one of the input
     * items in this menu.
     */
    onInputChange: function(field) {
        // var me = this,
        //     fields = me.fields,
        //     eq = fields.eq,
        //     gt = fields.gt,
        //     lt = fields.lt;
        //
        // if (field == eq) {
        //     if (gt) {
        //         gt.setValue(null);
        //     }
        //     if (lt) {
        //         lt.setValue(null);
        //     }
        // }
        // else {
        //     eq.setValue(null);
        // }
        // restart the tonInputKeyUpimer
        // this.updateTask.delay(this.updateBuffer);
    }

});

