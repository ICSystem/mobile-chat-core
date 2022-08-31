/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.chat.Connecting
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.chat.Connecting', {
    extend: 'KlbIm.view.system.Container',
    xtype: 'view-chatconnecting',

    config: {
        timercount: 10,
        control: {
            '#chatid-connecting': {
                tap:   'onBtnRestartClick',
                click: 'onBtnRestartClick'
            }
        }
    },

    getConfigItems: function(config) {
        var _items = [];

        this.config.timercount = config.timercount || this.config.timercount;

        _items.push(
            {
                xtype: 'container',
                itemId: 'chatid-connecting',
                cls: 'x-chat-connecting',
                centered: true,
                html: [
                    '<div class="x-connecting">' +
                        '  <div class="circle"> ' +
                        '    <svg width="300" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">' +
                        '    <g transform="translate(110,110)">' +
                        '      <circle r="100" class="e-c-base"/>' +
                        '      <g transform="rotate(-90)">' +
                        '        <circle r="100" class="e-c-progress"/>' +
                        '        <g id="e-pointer">' +
                        '          <circle cx="100" cy="0" r="6 " class="e-c-pointer"/>' +
                        '        </g>' +
                        '      </g>' +
                        '    </g>' +
                        '     </svg>' +
                        '  </div>' +

                        '  <div class="controlls">' +
                        '    <div class="display-remain-time"></div>' +
                        '    <div class="display-remain-comment">'+ this.config.timercount +'</div>' +
                        '  </div>' +
                    '</div>' +

                    '<div id="sector" class="sector" style="height: 40px;width: 40px;background-image: /resources/images/icons/attach.svg;"></div>'
                ],
                scope: this,
                handler: function (btn, event, opts) {
                    // Ext.Msg.alert('Sended', 'The quick empty', Ext.emptyFn);
                    btn.getScope( ).handleButtonTap();
                }
            }
        );
        return _items;
    },

    afterInstance: function() {

        var me = this;
        me.startTimer(this.config.timercount);

        // me.sector = Ext.create('KlbIm.view.system.Sector', {
        //     id: 'sector',
        //     size: 2,
        //     stroke: 1,
        //     arc: true,
        //     angle: 250,
        //     sectorColor: '#47bc53',
        //     circleColor: '#F5F5F5',
        //     fillCircle: false
        // });
        // setInterval(function(){
        //     me.sector.changeAngle(me.sector.options.angle + 10);
        //
        // }, 1000);
    },

    startTimer: function(seconds) {
        //circle start
        var me = this,
            el = me.element;

            me.intervalTimer = null;
            me.timeLeft = false;
            me.isPaused = false;
            me.isStarted = false;
            me.wholeTime = Math.floor(seconds); // manage this to set the whole time
        if ( el )
        {
                me.controlls      = el.down('[class=controlls]');
                me.pause          = el.down('button[class=data-setter]');
                me.setterBtns     = el.down('[class=pause]');
                me.displayComment = el.down('[class=display-remain-comment]');
                me.displayOutput  = el.down('[class=display-remain-time]');
                me.progressBar    = el.down('[class=e-c-progress]');
                me.pointer        = el.down('#e-pointer');
            me.updateDisplayComment(_('Ожидайте, проверяю наличие свободных операторов ...') );
            me.updateDisplayOutput(seconds);
            me.timer(seconds);
            this.fireEvent('timerstart');
        }

        return this;
    },

    restartTimer: function() {

        this.stopTimer();
        this.startTimer(this.wholeTime * 2);
        this.fireEvent('timerrestart');
    },

    stopTimer: function() {
        clearInterval( this.intervalTimer);
        this.isStarted = false;
        // this.displayTimeLeft(this.wholeTime);
        this.fireEvent('timerstop');
    },

    timer: function(seconds){ //counts time, takes seconds
        let me = this;
        let remainTime = Date.now() + (seconds * 1000);
        me.displayTimeLeft(seconds);
        if (this.intervalTimer) clearInterval( this.intervalTimer);
        me.intervalTimer = setInterval(function(){
            var timeLeft = Math.round((remainTime - Date.now()) / 1000);
            if(timeLeft < 0){
                    me.stopTimer();
                return ;
            }

            me.displayTimeLeft(timeLeft);
        }, 1000);
    },

    update: function (value, length, timePercent) {

        var offset = - length - length * value / (timePercent);
        this.progressBar.setStyle('strokeDashoffset', offset);
        this.pointer.setStyle('transform', `rotate(${360 * value / (timePercent)}deg)`);
    },

    changeWholeTime: function(seconds) {

        if ((this.wholeTime + seconds) > 0){
            this.wholeTime += seconds;
            this.update(this.wholeTime, 0, this.wholeTime);
        }
    },

    displayTimeLeft: function(timeLeft){ //displays time on the input

        let minutes = Math.floor(timeLeft / 60),
            seconds = timeLeft % 60,
            displayString = '';

            if ( minutes > 0 ) {
                // this.controlls.setStyle('left', '50%');
                this.controlls.setStyle('margin-left', '-75px');
                displayString = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
            } else {
                this.controlls.setStyle('margin-left', '-50px');
                displayString = (seconds < 10 ? '0' : '') + seconds;
            }

        this.updateDisplayOutput(displayString);
        this.update(timeLeft, 0, this.wholeTime);
    },

    updateDisplayComment: function(content) {
        if ( this.displayComment )
            this.displayComment.setText(content);
    },

    updateDisplayOutput: function(seconds) { //counts time, takes seconds
        // Ext.DomQuery.selectNode('[class=display-remain-time]', this.element.dom);
            this.displayOutput.setText(seconds);
        return this;
    },

    onBtnRestartClick: function () {

        Klb.system.Event.fireEvent('im.system.restart');
    }
});