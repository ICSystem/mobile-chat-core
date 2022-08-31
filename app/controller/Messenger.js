/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  controller.Messenger
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.controller.Messenger', {
    extend: 'Ext.app.Controller',
    requires: [
       'KlbIm.controller.Socket', 'KlbIm.controller.WebRtc'
    ],

    config: {
        socket: null,
        config: null,
        scroller: null,
        maxPosition: 0,

        models: [
            'Config',
            'Message'
        ],

        stores: [
            'Config',
            'Messages'
        ],

        views: [
            'chat.Messages'
        ],

        refs: {
            'message': 'input[name=message]'
        },

        control: {
            'messagelist': {
                initialize: function (list) {
                    var me = this,
                        scroller = list.getScrollable().getScroller();

                    scroller.on('maxpositionchange', function (scroller, maxPos, opts) {
                        me.setMaxPosition(maxPos.y);
                    });

                    me.setScroller(scroller);

                    me.getMessage().setValue(Ext.create('Chat.ux.LoremIpsum').getSentence());
                }
            },

            'textfield#message': {
                action: 'sendMessage'
            },

            'button#send': {
                tap: 'sendMessage'
            }
        }
    },

    initSocketConnection: function () {
        var me = this,
            config = Ext.getStore('Config').getAt(0);

        Ext.getStore('Messages').removeAll();
        me.setConfig(config);

        if (!me.getSocket()) {
            var socket = io.connect(config.get('server'));
            me.setSocket(socket);
            socket.on('connect', Ext.Function.bind(me.registerUser, me));
            socket.on('message', Ext.Function.bind(me.addMessage, me));
        } else {
            me.registerUser();
        }
    },

    getIm: function () {
        return Klb.system.Im;
    },

    prepareMessage: function () {
        return {
            nickname: this.getConfig().get('nickname'),
            message: this.getMessage().getValue()
        }
    },

    registerUser: function () {
        this.getSocket().emit('register', {
            nickname: this.getConfig().get('nickname')
        });
    },

    sendMessage: function () {
        var message = this.prepareMessage();
        this.getSocket().emit('message', message);
        this.addMessage(Ext.apply({local: true}, message));
        this.getMessage().setValue(Ext.create('Chat.ux.LoremIpsum').getSentence());
    },

    addMessage: function(message) {
        Ext.getStore('Messages').add(message);

        if (this.getMaxPosition()) {
            this.getScroller().scrollToEnd(true);
        }
    },

    onSendMessage : function (view, message) {
        var MessagesStore = Ext.getStore('Messages'),
            Message,
            now,
            CurrentUser,
            socket,
            chatPrompt,
            scroller,
            pc;
        message = message ? message.trim() : '';
        if (message) {
            socket = KlbIm.app.getController('Socket').socket;
            pc = KlbIm.app.getController('WebRtc').pc;
            CurrentUser = KlbIm.app.currentUser;
            now = new Date();
            chatPrompt = this.getChatPrompt();
            scroller = chatPrompt.container.getScrollable().getScroller();
            Message = Ext.create('KlbIm.model.Message', {
                name    : CurrentUser ? CurrentUser.name : '?',
                message : message,
                date    : now.toLocaleString()
            });
            MessagesStore.add(Message);
            if (pc && pc.send) {
                pc.send(Message.data);
            } else {
                socket.emit('typingchange', Message.data);
            }
            Ext.defer(function () {
                scroller.scrollToEnd();
            }, 10);
        }
    },

    updateMessage : function (message) {

        if (message) {
            var MessagesStore = Ext.getStore('Messages'),
                Message = new Ext.create('KlbIm.model.Message', message),
                chatPrompt = this.getChatPrompt(),
                scroller = chatPrompt.container.getScrollable().getScroller();
            MessagesStore.add(Message);
            //MessagesStore.sync();
            Ext.defer(function () {
                scroller.scrollToEnd();
            }, 100);
        }
    }
});
