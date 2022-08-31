/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.Main
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('Ext.ux.BrowseButton', {
    extend: 'Ext.Button',
    xtype: 'browsebutton',

    requires: [
        'Ext.ux.file.BrowsePlugin'
    ],
    constructor: function(config) {
        config = config || {};
        var me = this;

        Ext.apply(config, {
            plugins: [{
                ptype: 'ux.browseplugin',
                visibleLayer: config.visibleLayer || false,
                opacity:      config.opacity || 0,
                multiple: true
            }],
            scope: me,
            handler: me.onFileSelect
        });

        config.listeners = config.listeners || {};
        Ext.apply(config.listeners, {
                order: 'after',
                painted: this.afterInstance,
                initialize: this.afterInitialize
        });

        me.callParent([config]);
    },

    initComponent: function() {
        var me = this;
        // me.scope = me;
        me.callParent();
    },

    afterInstance: function() {
        var me = this;
    },

    afterInitialize: function(view, eOpts) {
        // var me = this;

    },

    /**
     * @private
     */
    onFileSelect: function (fileSelector) {
        var me = this;

        if ( !fileSelector || !fileSelector.getFileList ) {
            return false;
        }
        var files = fileSelector.getFileList(),
            _urlUpload = Klb.system.Im.getUrl();

        Ext.each(files, function (file) {

            var _uploader = Ext.create('Ext.ux.file.Upload', {
                itemId: 'browsebuttoon-upload',
                url: _urlUpload,
                file: file,
                fileSelector: fileSelector
            });

            _uploader.on('uploadstart',    Klb.system.uploadManager.onUploadStart, me);

            _uploader.on('uploadfailure',  me.onUploadFail, me);
            _uploader.on('uploadcomplete', me.onUploadComplete, me);
            _uploader.on('update',         me.onUploadProgress, me);

            var uploadKey  = Klb.system.uploadManager.queueUpload(_uploader);
            var fileRecord = Klb.system.uploadManager.upload(uploadKey);

            if(me.store && fileRecord.get('status') !== 'failure' ) {
                me.store.add(fileRecord);
            }

            me.onUploadStart(fileRecord);
        }, me);

    },

    onUploadStart: function(fileRecord) {

        this.fireEvent('uploadstart',  this, fileRecord);
    },

    onUploadProgress: function(action, event, fileRecord) {

        this.setText( fileRecord.data.progress + '%');
        this.fireEvent('uploadprogress',  this, fileRecord);
    },

    onUploadComplete: function(upload, fileRecord) {

        if (!fileRecord) {  return false; }

            fileRecord.beginEdit();
            fileRecord.set('status', 'complete');
            fileRecord.set('progress', 100);
            fileRecord.commit(false);

        Klb.system.uploadManager.onUploadComplete();
        this.fireEvent('uploadcomplete',  this, fileRecord);
    },

    /**
     * on upload failure
     * @private
     */
    onUploadFail: function (uploader, fileRecord) {

        // Ext.MessageBox.alert(_('Upload Failed'),
        //     _('Could not upload image. Please notify your Administrator')).setIcon(Ext.MessageBox.ERROR);
        if ( uploader ) {
                uploader.un('uploadcomplete', this.onUploadComplete, this);
                uploader.un('uploadfailure', this.onUploadFail, this);
            delete uploader;
        }
        if(this.loadMask) this.loadMask.hide();

        this.fireEvent('uploadfailure',  this, fileRecord);
    }
});