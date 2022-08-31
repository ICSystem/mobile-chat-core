/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  controller.Socket
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.controller.Socket', {
    extend : 'Ext.app.Controller',

    config : {
        socket : true
    },

    init : function (app) {
        var me = this,
            socket = this.socket = io.connect(),
            mainController = KlbIm.app.getController('Main');

        socket.on('error', function() {
            Ext.Msg.alert("Error","Error connecting to the handshake server");
            mainController.logoutPerform();
        });

        socket.on('msg', function(data) {
            console.log("SERVER: " + data.message);
        });

        socket.on('get_code', function(data) {
            me.createSesssionCallback.call(me, data);
        });
        socket.on('login_complete', function(data) {
            me.loginCallback.call(me, data);
            socket.emit('read_users');
        });

        socket.on('read_users_complete', function(data) {
            if (data.success) {
                me.updateUsers(data.data);
            }
        });

        socket.on('get_peer', function(data) {
            console.log("got peer:" + data.code);
            mainController.hideInputCode();

            Klb.system.Event.fireEvent('gotpeer', me);
        });
        socket.on('rtcmessage', function(message) {
            console.log('RTC Message Received', message);
            Klb.system.Event.fireEvent('receivertcmessage', message);
        });

        socket.on('typingchange', function(message) {
              me.updateMessage(message);
        });

        socket.on('disconnect_users', function(data) {
            if (KlbIm.app.currentUser) {
                //if the user hasn't been disconnected yet log him out
                Ext.Msg.alert("Modus Talk", data.message);
                mainController.logoutPerform();
            }
        });

        app.on({
            scope          : this,
            login          : me.sendLogin,
            logout         : me.sendLogout,
            disconnect     : me.sendDisconnect,
            createsession  : me.createSession,
            sendrtcmessage : me.onSendRtcMessage
        });
    },
    sendLogin: function(user, callback) {
        this.loginCallback = callback;
        this.socket.emit('login', user);
    },
    createSession: function(user, callback) {
        this.createSesssionCallback = callback;
        this.socket.emit('createsession', user);
    },
    sendLogout: function() {
        this.socket.emit('logout');
    },
    sendDisconnect: function() {
        this.socket.emit('disconnect_users');
    },

    onSendRtcMessage: function(message) {
        console.log('Sending RTC Message', message);
        this.socket.emit('rtcmessage', message);
    },

    updateMessage: function(message) {
        var chatController = KlbIm.app.getController('Chat');
        chatController.updateMessage(message);
    },
    updateUsers: function(data) {
         var UsersStore = Ext.getStore('Users'),
             User;
        UsersStore.removeAll();
        data.forEach(function(usr) {
            User = Ext.create('KlbIm.model.User', usr);
            UsersStore.add(User);
        });
    }
});