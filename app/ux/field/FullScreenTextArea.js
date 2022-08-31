/**
 * KlbChat-Modern 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.system.Form
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('Ext.ux.field.FullScreenTextArea', {
    extend: 'Ext.field.TextArea',
    xtype: 'fullscreentextarea',

    config: {
        clearIcon: false,
        scrollModifier: 1.8,
        editorMargin: 0,
        showCancelButton: false,

        editorPanel: {
            xtype: 'panel',
            fullscreen: true,
            hidden: true,
            scrollable: true,
            items: [
                { xtype: 'textareafield', style: 'background: #eeeeee;', clearIcon: false },
                { xtype: 'toolbar',
                    docked: 'bottom',
                    layout: { type: 'hbox', pack: 'center' },
                    items: [
                        { xtype: 'button', text: 'Done'},
                        { xtype: 'button', text: 'Cancel'}
                    ]
                }
            ]
        }
    },

    initialize: function() {
        this.callParent();
        this.element.on('focus', function() { this.blur(); }, this);
        this.element.on('tap', this.onFormFieldTap, this);
    },

    applyEditorPanel: function(cfg) {

        if(!this.editorPanel) {
            this.editorPanel = Ext.factory(cfg, Ext.Panel);

            this.editorPanel.on('painted', this.onEditorPanelPainted, this);
            this.editorPanel.element.on('drag', this.onTouchMove, this);
        }

        return this.editorPanel;
    },

    onAccept: function() {
        var savedValue = this.editorPanel.down('textareafield').getValue();

        this.setValue(savedValue);
        this.getEditorPanel().hide();
        Ext.Viewport.setActiveItem(this.lastFullscreenItem);
    },

    onCancel: function() {
        this.getEditorPanel().hide();
        Ext.Viewport.setActiveItem(this.lastFullscreenItem);
    },

    onEditorPanelPainted: function() {
        var panel = this.getEditorPanel();
        // save
        panel.query('button')[0].on(
            'tap', this.onAccept, this, { single: true }
        );
        // cancel
        var cancelButton = panel.query('button')[1];
        cancelButton.on(
            'tap', this.onCancel, this, { single: true }
        );
        if(!this.getShowCancelButton()) cancelButton.hide();
        // set inner height of actual textarea
        var actualField = panel.down('textareafield');
        actualField.setHeight(
            panel.element.down('.x-panel-inner').getHeight()
        );
        actualField.setWidth(
            panel.element.down('.x-panel-inner').getWidth()
        );
    },

    onTouchMove: function(e) {
        var textArea = this.getEditorPanel().down('textareafield').element.down('textarea');
        textArea.dom.scrollTop -= (e.deltaY / this.getScrollModifier());
    },

    onFormFieldTap: function() {
        var editor = this.getEditorPanel();

        if(!this.isInitialized) {
            this.isInitialized = true;
            Ext.Viewport.add(editor);
        }

        editor.down('textareafield').setValue(this.getValue());
        editor.down('textareafield').setReadOnly(this.getReadOnly());

        editor.show();
        this.lastFullscreenItem = Ext.Viewport.getActiveItem();
        Ext.Viewport.setActiveItem(editor);
    }
});