/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.chat.Messages
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.chat.Messages', {
    extend: 'KlbIm.view.system.Container',
    xtype: 'view-chatmessages',

    config: {
        // disableSelection: true,
        fullscreen: true,
        scrollable: {
            direction: 'vertical',
            translationMethod: 'scrollposition'
        }
    },
    inisialized: false,

    // @private
    afterInstance: function() {

        if ( !this.inisialized )
        {
            this // . initMsgtblContent()
                 . initMsgtblBottom()
                    . appendSlots();
            this.inisialized = true;
        }
    },

    appendSlots: function() {
        var me = this;

        // Klb.system.Im.addImSlot('thread.message.agent', function () {
        //     me.onMessagerInsert();
        // });
        // Klb.system.Im.addImSlot('thread.message.user', function () {
        //     me.onMessagerInsert();
        // });
        return me;
    },

    afterInitialize: function() {
        var scroller = this.getViewScroller();
           scroller.on('refresh', this.onScrollToRefresh, this);
           scroller.on('scrollstart', this.onScrollToStart, this);
           scroller.on('scrollend', this.onScrollToEnd, this);
           // scroller.on('maxpositionchange', this.onScrollToMaxposition, this);

        // var store = this.getView().getStore();
        // store.addListener("write", this.onStoreWrite, this);
        // store.proxy.addListener("exception", this.onStoreException, this);
        // // onStoreLoad is not called when loaded by auto
        // store.proxy.addListener("load", this.onStoreLoad, this);


        // // Native scrolling in Browser
        // document.addEventListener('mousewheel', function(e){
        //     var el = e.target;
        //     var offset, scroller, _results;
        //     _results = [];
        //     while (el !== document.body) {
        //         if (el && el.className && el.className.indexOf('x-container') >= 0) {
        //             var cmp = Ext.getCmp(el.id);
        //             if (cmp && typeof cmp.getScrollable == 'function' && cmp.getScrollable()){
        //                 var scroller = cmp.getScrollable().getScroller();
        //                 if (scroller) {
        //                     var offset = {x:0, y: -e.wheelDelta*0.5};
        //                     scroller.fireEvent('scrollstart', scroller, scroller.position.x, scroller.position.y, e);
        //                     scroller.scrollBy(offset.x, offset.y);
        //                     scroller.snapToBoundary();
        //                     scroller.fireEvent('scrollend', scroller, scroller.position.x, scroller.position.y-offset.y);
        //                     break;
        //                 }
        //             }
        //         }
        //         _results.push(el = el.parentNode);
        //     }
        //     return _results;
        // }, false);

        // var mouseWheelHandler = function (e) {
        //     var e = window.event || e,
        //         el = e.target,
        //         cmp,
        //         offset,
        //         scroller,
        //         delta,
        //         _results = [];
        //     e.preventDefault(); // prevent scrolling when in iframe
        //     while (el !== document.body) {
        //         if (el && el.className && el.className.indexOf('x-container') >= 0) {
        //             cmp = Ext.getCmp(el.id);
        //             if (cmp && typeof cmp.getScrollable == 'function' && cmp.getScrollable()) {
        //                 scroller = cmp.getScrollable().getScroller();
        //                 if (scroller) {
        //                     delta = e.detail ? e.detail*(-120) : e.wheelDelta;
        //                     offset = { x:0, y: -delta*0.5 };
        //                     scroller.fireEvent('scrollstart', scroller, scroller.position.x, scroller.position.y, e);
        //                     scroller.scrollBy(offset.x, offset.y);
        //                     scroller.snapToBoundary();
        //                     scroller.fireEvent('scrollend', scroller, scroller.position.x, scroller.position.y-offset.y);
        //                     break;
        //                 }
        //             }
        //         }
        //         _results.push(el = el.parentNode);
        //     }
        //     return _results;
        // };
        //
        // if (document.addEventListener) {
        //     // IE9, Chrome, Safari, Opera
        //     document.addEventListener('mousewheel', mouseWheelHandler, false);
        //     // Firefox
        //     document.addEventListener('DOMMouseScroll', mouseWheelHandler, false);
        // }
        // else {
        //     // IE 6/7/8
        //     document.attachEvent('onmousewheel', mouseWheelHandler);
        // }
    },

    /**
     * perform the initial load of grid data
     */
    getConfigItems: function() {
        var _items = [];

            _items.push({
                xtype: 'container',
                cls: 'chat-messagecontent',
                itemId: 'chat-messages-items',
                html: this.getHtmlToCenter()
            });

            // _items.push({
            //     xtype: 'titlebar',
            //     docked: 'bottom',
            //     cls: 'chat-messagebottom',
            //     itemId: 'chat-messages-bottom',
            //     items:[
            //         {
            //             iconCls: 'add',
            //             iconMask: true,
            //             align: 'left'
            //         }
            //     ]
            // });
        return _items;
    },

    getHtmlToCenter: function() {

        return Ext.get('template-messagecontent') ? Ext.get('template-messagecontent').getHtml() : '';
    },

    initMsgtblContent: function() {
        var itemsMsg = [],
            msgtblcontent = this.getDomMsgContent();

            itemsMsg.push(Ext.create('KlbIm.view.system.FormComplete') );
            itemsMsg.push(Ext.create('KlbIm.view.form.Account', {
                    height: 450
                })
            );
            itemsMsg.push(Ext.create('KlbIm.view.form.PaymentDetail') );

            this.setHtmlToMsgcontent( this.getContentTest() );
            for (var i = 0; i < itemsMsg.length; i++) {
                itemsMsg[i].renderTo(msgtblcontent);
            }
        return this;
    },

    initMsgtblBottom: function() {

            this.up().add(Ext.create('Ext.Component', {
                    docked: 'bottom',
                    cls: 'x-msgtblbottom-grid',
                    itemId: 'msgtblbottom',
                    html: Ext.get('template-message-events') ? Ext.get('template-message-events').getHtml() : ''
                }
            ));

            Klb.getCmp('msgtblbottom-number_down').on('tap',   'onClickBottomDown', this);
            Klb.getCmp('msgtblbottom-number_down').on('click', 'onClickBottomDown', this);
        return this;
    },

    setViewTyping: function(content) {
        content = content || _('Оператор набирает текст');
        this.setHtmlToEventDown(content);
        return this;
    },

    getViewScroller: function() {
        return this.getScrollable().getScroller();
    },

    getViewMessages: function() {
        return this.down('#chat-messages-items');
    },

    getViewControl: function() {
        return this.down('#chatid-control-bottom');
    },

    getViewBottom: function() {
        return this.up().query('#msgtblbottom')[0];
    },

    getDomChatwnout: function() {
        return Klb.getCmp('chatwnout');
    },

    getDomMsgContent: function() {

        return Klb.getCmp('msgcontent');
    },

    incNumerToBadge: function() {
        var cntmsg = this.getNumerToBadge();
        this.setNumerToBadge( ++cntmsg );
    },

    getNumerToBadge: function( data ) {
        let downnumber = Klb.getCmp('msgtblbottom-number_badge'),
            number = downnumber ? downnumber.getHtml() : 0;
        return parseInt(number);
    },

    setNumerToBadge: function( number ) {

        number = parseInt(number);
        let downnumber = Klb.getCmp('msgtblbottom-number_badge');
        if (downnumber) {
            if (number == 0) {
                downnumber.hide();
                this.onScrollIcon(false);
            } else {
                this.onScrollIcon(true);
                // this.onScrollToDown();
                downnumber.show();
            }
            downnumber.setHtml(number);
        }
        return this;
    },

    setHtmlToEventDown: function( content ) {
            Klb.getCmp('msgtblbottom-event_down').setHtml('<div class="x-icon-grid-item x-info-event">' + content + '</div>');
            Klb.getCmp('msgtblbottom-event_down').show();
        return this;
    },

    setHtmlToMsgcontent: function( content ) {
        let msgtblcontent = this.getDomMsgContent();
            if (msgtblcontent)
                msgtblcontent.setHtml( content );
        return this;
    },

    scrollToDown: function(status) {
        status = status || false;
        this.getViewScroller().scrollToEnd(true);

        if (status) this.setNumerToBadge(0);
    },
// --------------- Events -------------------------------
    onScrollToRefresh: function() {

        this.onScrollIcon(true);
    },

    onScrollToStart: function(view, x, y, eOpts) {

        if ( view && view.maxPosition && (view.maxPosition.y - 20) > y ) {
            this.onScrollIcon(true);
        }
    },

    onScrollToEnd: function(view, x, y, eOpts) {

        if ( view.maxPosition && (view.maxPosition.y -5) < y ) {
            this.setNumerToBadge(0);
        }
    },

    onScrollIcon: function(status) {
        var  _scrollIcon = Klb.getCmp('msgtblbottom-number_down');
        if ( _scrollIcon ) {
            if (status) {
                _scrollIcon.show();
            } else {
                _scrollIcon.hide();
            }
        }
    },

    onMessagerTiping: function() {
          this.setHtmlToEventDown( _('Оператор отвечает') );
        return this;
    },

    onMessagerInsert: function() {
        this.incNumerToBadge();
            var scroller = this.getViewScroller();
            if ( scroller.maxPosition && (scroller.maxPosition.y - 20) < scroller.position.y ) {
                this.scrollToDown();
            }
        return this;
    },

    onClickBottomDown: function() {

            this.scrollToDown(true);
        return this;
    },

// --------------- Store events -------------------------------
    onStoreLoad : function(proxy, records, successful, eOpts) {
        if (!successful) {
            Ext.MessageBox.show({
                title : 'Data Load Error',
                msg : 'The data encountered a load error, please try again in a few minutes.'
            });
        } else {
            console.log(records.length + ' records returned');
        }
    },

    onStoreWrite: function(store, operation, eOpts) {
        console.log(operation);
    },

    onStoreException: function(proxy, request, operation, eOpts) {
        //console.log(request);
        Ext.Msg.show({
            title : 'Error on ' + request.method,
            msg : request.message.text + '<br/><i>' + request.message.detail + '</i>',
            icon : Ext.Msg.ERROR,
            buttons : Ext.Msg.OK
        });
        var store = this.getView().getStore();
        store.rejectChanges();
    },

    //------------------------------ TESTING
    getContentTest: function() {

        var _contentHtnl =
            '<div class="item" id="mes-eae07df448201855df76034413ee1b55"><div class="delimeter"></div><div class="nuser"><div class="infuser"></div> <span class="time">[13:42:34]</span>  <span class="nuser name"></span>  <span class="muser mess">CREATE CHAT_STATUS_RULEBASE --&gt;--CHAT_STATUS_LOADING---- RULEBASE</span> <div class="avatardefault"></div></div></div>' +
            '<div class="item" id="mes-ad6142bfcc53d85aabd5a9824ce239bd"><div class="delimeter"></div><div class="nuser"><div class="infuser"></div> <span class="time">[13:42:36]</span>  <span class="nuser name">Посетитель</span>  <span class="muser mess">yer</span> <div class="avatardefault"></div></div></div>' +
            '<div class="item" id="mes-7f54f42b942a6bb73713a856a1cce274">' +
            '<div class="nagent">' +
            '<div class="infuser"></div>' +
            '<span class="time">[13:42:37]</span> ' +
            '<span class="nuser name"></span> ' +
            '<span class="muser mess">REFRESH ------CHAT_STATUS_LOADING --&gt;--CHAT_STATUS_QUERY------ RULEBASE</span> ' +
            '<div class="avatardefault"></div>' +
            '</div>' +
            '</div>' +
            '<div class="item" id="mes-7f54f42b942a6bb73713a856a1cce274">' +
            '<div class="nuser">' +
            '<span class="infuser"></span>' +
            '<span class="time">[13:42:37]</span>  ' +
            '<span class="nuser name"></span> ' +
            '<span class="muser mess">Столкнулся с проблемой перевода с моей карты на мою карту</span> ' +
            '<div class="avatardefault"></div>' +
            '</div>' +
            '</div>' +
            '<div class="item" id="mes-86dc2a6f4e83e0fd1d098755ac7ad04f"><div class="nuser"><div class="infuser"></div> <span class="time">[16:59:01]</span>  <span class="nuser name"></span>  <span class="muser mess">REFRESH ------CHAT_STATUS_QUERY --&gt;-- CHAT_STATUS_CHATING------ RULEBASE</span> <div class="avatardefault"></div></div>' +
            '<div class="item" id="mes-86dc2a6f4e83e0fd1d098755ac7ad04f"><div class="nuser"><div class="infuser"></div> <span class="time">[16:59:01]</span>  <span class="nuser name"></span>  <span class="muser mess">REFRESH ------CHAT_STATUS_QUERY --&gt;-- CHAT_STATUS_CHATING------ RULEBASE</span> <div class="avatardefault"></div></div>' +
            '';

        return _contentHtnl;
    }
});