/**
 * KlbChat-Modern 2.3.8
 * @package     Modern-Chat
 * @subpackage  System Core
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2019 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.system.Sector', {
    extend: 'Ext.Base',
    xtype: 'ui-sys-sector',

    options: {
        size: 20,
        stroke: 10,
        arc: false,
        angle: 5,
        sectorColor: '#789',
        circleColor: '#DDD',
        fillCircle: true
    },

    constructor: function(config) {
        config = config || {};
        var me = this;

        Ext.apply(me.options, config);
        // Reset stroke to 0 if drawing full sector
        me.options.stroke = me.options.arc ? me.options.stroke : 0;

        // Circle dimenstions
        me.options.center = me.options.size / 2;
        me.options.radius = me.options.stroke ? me.options.center - me.options.stroke / 2 : me.options.center;

        var svg = '<svg class=\'sektor\' viewBox=\'0 0 ' + me.options.size + ' ' + me.options.size + '\'>'
            + this.getCircle() + ' ' + this.getSector() + '</svg>';

        if (me.options.id && Klb.getCmp(me.options.id) ) {
            this.element = Klb.getCmp(me.options.id);
            this.element.dom.innerHTML = svg;
            this.sector = this.element.dom.querySelector('.sektor-sector');
        }

    },

    checkAngle: function () {
        if (this.options.angle > 360) {
            this.options.angle = this.options.angle % 360;
        }
    },
    changeAngle: function (angle) {
        this.options.angle = angle;
        this.checkAngle();
        this.sector.setAttribute('d', this.getSector(true));
    },
    step: function (angleOffset, endAngle, time, endTime) {
        var _this = this;

        var now = new Date().valueOf();
        var timeOffset = endTime - now;

        if (timeOffset <= 0) {
            this.changeAngle(endAngle);
        } else {
            var angle = endAngle - angleOffset * timeOffset / time;

            this.changeAngle(angle);

            requestAnimationFrame(function () {
                return _this.step(angleOffset, endAngle, time, endTime);
            });
        }
    },
    animateTo: function (angle) {
        var _this2 = this;

        var time = arguments.length <= 1 || arguments[1] === undefined ? 300 : arguments[1];

        if (angle > 360) {
            angle = angle % 360;
        }

        var startTime = new Date().valueOf();
        var endTime = startTime + time;
        var angleOffset = angle - this.options.angle;

        requestAnimationFrame(function () {
            return _this2.step(angleOffset, angle, time, endTime);
        });
    },

    getSector: function () {

        var returnD = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
        var options = this.options;

        // Colors
        var sectorFill = options.arc ? 'none' : options.sectorColor;
        var sectorStroke = options.arc ? options.sectorColor : 'none';

        // Arc angles
        var firstAngle = options.angle > 180 ? 90 : options.angle - 90;
        var secondAngle = -270 + options.angle - 180;

        // Arcs
        var firstArc = this.getArc(firstAngle, options);
        var secondArc = options.angle > 180 ? this.getArc(secondAngle, options) : '';

        // start -> starting line
        // end -> will path be closed or not
        var end = '';
        var start = null;

        if (options.arc) {
            start = 'M' + options.center + ',' + options.stroke / 2;
        } else {
            start = 'M' + options.center + ',' + options.center + ' L' + options.center + ',' + options.stroke / 2;
            end = 'z';
        }

        var d = start + ' ' + firstArc + ' ' + secondArc + ' ' + end;

        if (returnD) {
            return d;
        }

        return '<path class=\'sektor-sector\' stroke-width=\'' + options.stroke + '\'  fill=' + sectorFill + ' stroke=' + sectorStroke + '\n d=\'' + d + '\' />';
    },

    getCircle: function () {
        var options = this.options;
        var circleFill = options.fillCircle || !options.arc ? options.circleColor : 'none';

        return '<circle class=\'sektor-circle\' stroke-width=\'' + options.stroke + '\' fill=' + circleFill + ' stroke=' + options.circleColor + '\n      cx=\'' + options.center + '\'\n  cy=\'' + options.center + '\'\n   r=\'' + options.radius + '\' />';
    },

    getArc: function (angle) {
        var options = this.options;

        var x = options.center + options.radius * Math.cos(this.radians(angle));
        var y = options.center + options.radius * Math.sin(this.radians(angle));

        return 'A' + options.radius + ',' + options.radius + ' 1 0 1 ' + x + ',' + y;
    },

    radians: function (degrees) {
        return degrees / 180 * Math.PI;
    }
});