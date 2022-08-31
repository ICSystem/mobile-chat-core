/**
 * KlbChat-Modern 2.3.8
 * @package     Modern-Chat
 * @subpackage  System Core
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2019 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('Klb.system.Im', {
    extend: 'Ext.Base',
    singleton: true,
    numLoadedFiles: 0,

    status: [],
    indicators: [],

    loaderChat: function() {

        this.chatListScripts = Klb.scriptImLists || [];
            this.chatListScripts.push( Klb.paths['CryptoJS'] + '/core.js');
            this.chatListScripts.push( Klb.paths['CryptoJS'] + '/sha1.js');
            this.chatListScripts.push( Klb.paths['CryptoJS'] + '/enc-base64.js');

        this.refreshQueue();
    },

    onFileLoaded: function () {
        var me = this;

        if ( me.numLoadedFiles < me.chatListScripts.length ) {

            me.refreshQueue();
        }
         else {

            Klb.system.Event.fireEvent('im.system.loaded', me);
        }
        return this;
    },

    onFileLoadError: function () {
           Ext.Function.defer(this.loaderChat, 5000, this, []);
        return this;
    },

    refreshQueue: function () {

            Ext.Loader.loadScriptFile(  this.chatListScripts[this.numLoadedFiles],
                                        this.onFileLoaded,
                                        this.onFileLoadError, this);
            this.numLoadedFiles++;
        return this;
    },

    isKlbsignal: function () {

        return typeof klbsignal != 'undefined';
    },

    setKlbsignal: function (event, data, timeout) {
            timeout = timeout || 0;
            data = data || {};
        return Klb.system.Im.isKlbsignal() ? klbsignal(event, data, timeout) : null;
    },

    getConnection: function () {

        return Klb.system.Im.setKlbsignal('thread.get.app');
    },

    getStatus: function(name) {
        return this.status[name] ? this.status[name] : false;
    },

    resetStatus: function() {
        this.status = {};
    },

    setStatus: function(name, value) {
        this.status[name] = value;
        return this;
    },

    startIm: function(timeout) {
        timeout = timeout || 100;

        Klb.system.Im.setKlbsignal('thread.ui.chat.onload');
        Klb.system.Im.setKlbsignal('thread.ui.chat.startup');
        Klb.system.Im.setKlbsignal('thread.ui.chat.connect', {}, timeout);
    },

    stopIm: function(timeout) {
        timeout = timeout || 0;

        Klb.system.Im.setKlbsignal('thread.ui.chat.disconnect', {}, timeout);
    },

    addImSlot: function(slotname, callback) {
        console.log('Klb.system.Core -- addImSlot ' + slotname );

        Klb.system.Im.setKlbsignal('thread.ui.chat.slotappend', {'slotname': slotname, 'slotfunc': callback});
    },

    delImSlot: function(slotname) {
        console.log('Klb.system.Core -- delImSlot ' + slotname );
        Klb.system.Im.setKlbsignal('thread.ui.chat.slotdelete', {'slotname': slotname});
    },

    getUrl:function() {
        return Klb.system.Im.setKlbsignal('thread.system.ajaxgeturl') || Klb.requestUrl;
    },

    newHash:function() {
        return Klb.system.Im.setKlbsignal('generatehash');
    },

    str2xml:function(str) {
        return Klb.system.Im.setKlbsignal('thread.system.onstrtoxml', str);
    },

    parseXml:function(xml) {
        console.log("parseXml:"+ xml);
    },

    postMessage: function(view, message) {
        Klb.system.Im.setKlbsignal('thread.ui.message.post', {msg: message});
    },

    upgradeUpload: function(view, record) {
        if (!record && !record.get('id') ) return false;

        var me = this,
            _recid = record.get('id'),
            _itemMes = Klb.getCmp('mes-' + _recid);

        if ( !_itemMes ) {
            var content = ''
                + '<div class="upload" >'
                    + '<div class="sector" id="sector-' + _recid + '"></div>'
                    + '<div class="icon"></div>'
                    + '<div class="filename">' + record.get('name') + '</div>'
                    + '<div class="process" id="process-' + _recid + '" >0%</div>'
                + '</div>';

            Klb.system.Im.setKlbsignal('thread.ui.chat.insert',
                    { message: content,
                      options: { kind: 'upload', hash: _recid, avatar: false, name: false } });

            me.indicators[_recid] = Ext.create('KlbIm.view.system.Sector', {
                id: 'sector-' + _recid,
                size: 3,
                stroke: 2,
                arc: true,
                angle: 0,
                sectorColor: '#F5F5F5',
                circleColor: '#7ed086',
                fillCircle: false
            });

        } else if ( Ext.get('sector-' + _recid) ) {

            Klb.getCmp('process-'+ _recid).setHtml( ' '+record.get('progress') + '% ');
            me.indicators[_recid].changeAngle( 359 * record.get('progress') / 100 );
        }
    }

});