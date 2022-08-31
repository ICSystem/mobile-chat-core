/**
 * Improve the UI of the default TextArea in two ways:
 * - Provide a popup editor to give full-screen editing
 * - Enable the scrolling of the text area
 */
Ext.define('Ext.ux.field.BetterTextArea', {

	extend: 'Ext.field.TextArea',
	xtype: 'bettertextareafield',

	config: {
		clearIcon: false,
		scrollModifier: 1.8,
		editorMargin: 20,

		editorPanel: {
			xtype: 'panel',
			modal: true,
			centered: true,
			scrollable: false,
			items: [
				{ xtype: 'textareafield', style: { 'background': '#eeeeee;' }, clearIcon: false },
				{ xtype: 'toolbar', docked: 'top', layout: { type: 'hbox', pack: 'center' },
					items: [
						{ xtype: 'button', text: 'Ok',   iconCls: 'add', padding: '0 1em' },
						{ xtype: 'spacer' },
						{ xtype: 'button', text: 'Cancel', style: { 'backgroundc-color': '#6bb170;' }
										 , iconCls: 'delete',  padding: '0 1em' }
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

	setViewport: function(editor) {
		Ext.Viewport.add(editor);
	},

	getBodyPanel: function(cfg) {
		return Ext.getBody();
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
		this.setValue(this.editorPanel.down('textareafield').getValue());
		this.getEditorPanel().hide();
	},

	onCancel: function() {
		this.getEditorPanel().hide();
	},

	setEditorHeight: function(height) {
		var editor = this.getEditorPanel();
		height = parseInt(height);

		editor.setHeight(height);
		height = editor.element.down('.x-dock-vertical').getHeight() - editor.down('toolbar').element.getHeight()
		editor.down('textareafield').setHeight(height);
	},

	prepareForKeyboard: function() {
		var editor = this.getEditorPanel(),
			height = parseInt( this.getBodyPanel().getHeight() );
		this.setEditorHeight( height * 0.65);

		editor.setTop(5);
		editor.setLeft(this.getEditorMargin() / 2);
		editor.down('textareafield').focus();
		if ( this.getBodyPanel().dom ) {
			this.getBodyPanel().dom.scrollTop = 0;
		}
	},


	setEditorFullScreen: function() {
		var editor = this.getEditorPanel(),
			body  = this.getBodyPanel();

		editor.setWidth( parseInt(body.getWidth()) - this.getEditorMargin());
		editor.setHeight( parseInt(body.getHeight()) - this.getEditorMargin());

		var heightTxtfield = editor.element.down('.x-dock-vertical').getHeight() - editor.down('toolbar').element.getHeight();
		editor.down('textareafield').setHeight( parseInt(heightTxtfield) );
	},

	onEditorPanelPainted: function() {
		var panel = this.getEditorPanel();

		panel.query('button')[0].on('tap', this.onAccept, this, { single: true });
		panel.query('button')[1].on('tap', this.onCancel, this, { single: true });
		panel.down('textareafield').setHeight(panel.element.down('.x-panel-inner').getHeight());
		panel.down('textareafield').setWidth(panel.element.down('.x-panel-inner').getWidth());

		if(!this.getReadOnly()) {
			this.prepareForKeyboard();
			panel.query('button')[1].show();
		} else {
			panel.query('button')[1].hide();
			panel.setCentered(true);
		}
	},


	onTouchMove: function(e) {
		var textArea = this.getEditorPanel().down('textareafield').element.down('textarea');
		if (textArea.dom) {
			textArea.dom.scrollTop -= (e.deltaY / this.getScrollModifier());
		}
	},

	onFormFieldTap: function() {
		var editor = this.getEditorPanel();

		if(!this.isInitialized) {
			this.isInitialized = true;
			this.setEditorFullScreen();
			this.setViewport(editor);
		} else {
			this.setEditorFullScreen();
		}

		editor.down('textareafield').setValue(this.getValue());
		editor.down('textareafield').setReadOnly(this.getReadOnly());

		editor.show();
	}
});
