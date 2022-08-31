/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.chat.Connecting
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.chat.Timer', {
    extend: 'KlbIm.view.system.Container',
    xtype: 'view-chattimer',

    getConfigItems: function() {
        var me = this,
            _items = [];

        _items.push(
            {
                xtype: 'container',
                itemId: 'chatid-messagecontent',
                cls: 'x-chat-connecting',
                centered: true,
                html: [
                    '<div class="x-connecting">' +
                    '  <div class="setters">' +
                    '    <div class="minutes-set">' +
                    '      <button data-setter="minutes-plus">+</button>' +
                    '      <button data-setter="minutes-minus">-</button>' +
                    '    </div>' +
                    '    <div class="seconds-set">' +
                    '      <button data-setter="seconds-plus">+</button>' +
                    '      <button data-setter="seconds-minus">-</button>' +
                    '    </div>' +
                    '  </div>' +

                    '  <div class="circle"> ' +
                    '    <svg width="300" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">' +
                    '    <g transform="translate(110,110)">' +
                    '      <circle r="100" class="e-c-base"/>' +
                    '      <g transform="rotate(-90)">' +
                    '        <circle r="100" class="e-c-progress"/>' +
                    '        <g id="e-pointer">' +
                    '          <circle cx="100" cy="0" r="4 " class="e-c-pointer"/>' +
                    '        </g>' +
                    '      </g>' +
                    '    </g>' +
                    '     </svg>' +
                    '  </div>' +

                    '  <div class="controlls">' +
                    '    <div class="display-remain-time">00:30</div>' +
                    '    <button class="play" id="pause"></button>' +
                    '  </div>' +
                    '</div>'
                ]
            }
        );
        return _items;
    },

    initConnect: function() {
        //circle start
        var me = this;

        me.progressBar = document.querySelector('.e-c-progress');
        me.indicator = document.getElementById('e-indicator');
        me.pointer = document.getElementById('e-pointer');
        me.length = Math.PI * 2 * 100;

        me.progressBar.style.strokeDasharray = length;
        //circle ends
        me.displayOutput = document.querySelector('.display-remain-time')
        me.pauseBtn = document.getElementById('pause');
        me.setterBtns = document.querySelectorAll('button[data-setter]');

        me.intervalTimer;
        me.timeLeft;
        me.wholeTime = 0.5 * 60; // manage this to set the whole time
        me.isPaused = false;
        me.isStarted = false;

        me.update(wholeTime,wholeTime); //refreshes progress bar
        me.displayTimeLeft(wholeTime);

        for (var i = 0; i < me.setterBtns.length; i++) {
            me.setterBtns[i].addEventListener("click", function(event) {
                var param = me.dataset.setter;
                switch (param) {
                    case 'minutes-plus':
                        this.changeWholeTime(1 * 60);
                        break;
                    case 'minutes-minus':
                        this.changeWholeTime(-1 * 60);
                        break;
                    case 'seconds-plus':
                        this.changeWholeTime(1);
                        break;
                    case 'seconds-minus':
                        this.changeWholeTime(-1);
                        break;
                }
                this.displayTimeLeft(wholeTime);
            });
        }

        me.pauseBtn.addEventListener('click', me.pauseTimer);
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

            me.pause         = el.down('button[class=data-setter]');
            me.setterBtns    = el.down('[class=pause]');
            me.displayOutput = el.down('[class=display-remain-time]');
            me.progressBar   = el.down('[class=e-c-progress]');
            me.pointer       = el.down('#e-pointer');


            me.updateDisplayOutput(seconds);
            me.timer(seconds);

        return this;
    },

    timer: function(seconds){ //counts time, takes seconds

        let remainTime = Date.now() + (seconds * 1000);
        this.displayTimeLeft(seconds);

        intervalTimer = setInterval(function(){
            timeLeft = Math.round((remainTime - Date.now()) / 1000);
            if(timeLeft < 0){
                clearInterval(intervalTimer);
                isStarted = false;
                setterBtns.forEach(function(btn){
                    btn.disabled = false;
                    btn.style.opacity = 1;
                });
                this.displayTimeLeft(wholeTime);
                pauseBtn.classList.remove('pause');
                pauseBtn.classList.add('play');
                return ;
            }

            this.displayTimeLeft(timeLeft);
        }, 1000);
    },

    update: function (value, timePercent) {

        var offset = - length - length * value / (timePercent);
        progressBar.style.strokeDashoffset = offset;
        pointer.style.transform = `rotate(${360 * value / (timePercent)}deg)`;
    },


    pauseTimer: function (event){
        var me = this;

        if(this.isStarted === false){

            this.timer(this.wholeTime);
            this.isStarted = true;
            this.classList.remove('play');
            this.classList.add('pause');

            setterBtns.forEach(function(btn){
                btn.disabled = true;
                btn.style.opacity = 0.5;
            });
        } else if (meisPaused){

            this.classList.remove('play');
            this.classList.add('pause');
            this.timer(timeLeft);
            this.isPaused = me.isPaused ? false : true
        } else {

            this.classList.remove('pause');
            this.classList.add('play');
            clearInterval(intervalTimer);
            this.isPaused = this.isPaused ? false : true ;
        }
    },

    changeWholeTime: function(seconds) {

        if ((wholeTime + seconds) > 0){
            wholeTime += seconds;
            this.update(wholeTime,wholeTime);
        }
    },

    displayTimeLeft: function(timeLeft){ //displays time on the input

        let minutes = Math.floor(timeLeft / 60),
            seconds = timeLeft % 60,

            displayString =  minutes > 0
                ?  (minutes < 10 ? '0' : '')+ minutes +':' + (seconds < 10 ? '0' : '')  + seconds
                :  (seconds < 10 ? '0' : '')  + seconds;

        this.updateDisplayOutput(displayString);
        this.update(timeLeft, this.wholeTime);
    },

    updateDisplayOutput: function(seconds) { //counts time, takes seconds
        // Ext.DomQuery.selectNode('[class=display-remain-time]', this.element.dom);
        this.displayOutput.setText(seconds);
        return this;
    }
});