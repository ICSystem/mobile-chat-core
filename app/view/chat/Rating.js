/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.chat.x-msgrating
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.chat.Rating', {
    extend: 'KlbIm.view.system.Container',
    xtype: 'view-chatrating',
    config: {
        cls: 'x-msgrating-panel x-msgcontent-bgform',
        margin: '20px 10px 25px 20px',
        scrollable: {
            direction: 'vertical',
            directionLock: true,
            translationMethod: 'scrollposition'
        },
        control: {
            '#rating-btn-close': {
                tap:   'onBtnCloseClick',
                click: 'onBtnCloseClick'
            },
            '#rating-btn-submit': {
                tap:   'onBtnSubmitClick',
                click: 'onBtnSubmitClick'
            }
        }
    },

    getConfigInit: function(config) {
        // Ext.apply(config, {
        //     control: {
        //         'component#x-msgrating-graph': {
        //             tap: 'onClickGraph'
        //         }
        //     }
        // });

        this.setParams('classified', 0);
        this.config.captions = [
            _('Отсуствует'),
            _('Ответ ужасен. Это меня злит.'),
            _('Мне не понравился ответ.'),
            _('Ответ понятен.'),
            _('Хороший ответ.'),
            _('Отличный ответ.')
        ];

        return config;
    },

    // @private
    afterInstance: function(view, eOpts) {

        var _options = {
             delegate: ' > component'
        };
        var _container = this.down('component#x-msgrating-graph');
        _container.element.on('tap', 'onClickGraph', this);
        // _container.element.on('tap', 'onClickGraph', this, _options, 'before');
        // _container.element.on('mousedown', 'onClickGraph', this, _options, 'before');
    },

    onClickGraph: function(event, node, options, eOpts) {
console.log('onClickGraph');
        this.setRating( node );
    },

    cleanRating: function(node) {

        var el = [],
            nodes = this.query('component#x-msgrating-graph component');
        Ext.Array.each(nodes, function (item, index, array) {
            el = item.element.query('div[class="x-circle"]'); // Ext.get(item.element).down('div d[cls="x-circle"]');
            if (el.length)
                el[0].setAttribute('class', 'x-circle-o');
        });
        node.setAttribute('class', 'x-circle');
    },

    setRating: function(node) {

        var elParent = Ext.get(node),
            relSel = elParent.getAttribute('rel'),
            elIcon = this.down('component#x-msgrating-icon-picture'),
            elGraph = this.down('component#x-msgrating-graph'),
            elCaption = this.down('component#x-msgrating-caption'),
            elComment = this.down('component#x-msgrating-comment');

        switch (relSel){
            case 'node-first':
                this.cleanRating(node);

                    elCaption.setHtml( this.config.captions[1] );
                      elGraph.setCls('x-msgrating-graph isVeryBad');
                       elIcon.setCls('x-msgrating-icon-verybad');
                    this.setParams('classified', 1);
                break;
            case 'node-second':
                this.cleanRating(node);
                    elCaption.setHtml( this.config.captions[2]  );
                      elGraph.setCls('x-msgrating-graph isBad');
                       elIcon.setCls('x-msgrating-icon-bad');
                    this.setParams('classified', 2);
                break;
            case 'node-third':
                this.cleanRating(node);
                    elCaption.setHtml( this.config.captions[3]   );
                     elGraph.setCls('x-msgrating-graph isNormal');
                      elIcon.setCls('x-msgrating-icon-normal');
                    this.setParams('classified', 3);
                break;
            case 'node-fourth':
                this.cleanRating(node);
                    elCaption.setHtml( this.config.captions[4]  );
                      elGraph.setCls('x-msgrating-graph isGood');
                       elIcon.setCls('x-msgrating-icon-good');
                    this.setParams('classified', 4);
                break;
            case 'node-fifth':
                this.cleanRating(node);
                    elCaption.setHtml( this.config.captions[5] );
                      elGraph.setCls('x-msgrating-graph isVeryGood');
                       elIcon.setCls('x-msgrating-icon-verygood');
                    this.setParams('classified', 5);
                break;
        }

    },

    getConfigItems: function() {
        var me = this;

        var _items = [
            {
                xtype: 'container',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'label',
                        html:  "<div class='x-msgrating-header'>"+
                                  _('Оцени ответ на вопрос')+
                                "</div>"
                    }, {
                        xtype: 'container',
                        itemId: 'x-msgrating-icon',
                        height: 90,
                        width: 90,
                        cls: 'x-msgrating-icon',
                        items: [
                            {
                                xtype: 'component',
                                itemId: 'x-msgrating-icon-picture',
                                cls: 'x-msgrating-icon-normal'
                            }
                        ]
                    }, {
                        xtype: 'label',
                        itemId: 'x-msgrating-caption',
                        cls: 'x-msgrating-caption',
                        html: _('Ваша оценка?')
                    }, {
                        xtype: 'container',
                        itemId: 'x-msgrating-graph',
                        margin: '10px 20px 10px 20px',
                        cls: 'x-msgrating-graph isEmpty',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'component',
                                itemId: 'x-msgrating-node-first',
                                flex: 1,
                                html: '<div rel="node-first" class="x-circle-o"></div>'
                            }, {
                                xtype: 'component',
                                itemId: 'x-msgrating-node-second',
                                flex: 1,
                                html: '<div rel="node-second" class="x-circle-o"></div>'
                            }, {
                                xtype: 'component',
                                itemId: 'x-msgrating-node-third',
                                flex: 1,
                                html: '<div rel="node-third" class="x-circle-o"></div>'
                            }, {
                                xtype: 'component',
                                itemId: 'x-msgrating-node-fourth',
                                flex: 1,
                                html: '<div rel="node-fourth" class="x-circle-o"></div>'
                            }, {
                                xtype: 'component',
                                itemId: 'x-msgrating-node-fifth',
                                flex: 1,
                                html: '<div rel="node-fifth" class="x-circle-o"></div>'
                            }
                        ]
                    }, {
                        xtype: 'textareafield',
                        name: 'message',
                        itemId: 'x-msgrating-comment',
                        cls: 'x-msgrating-comment',
                        // placeHolder: _('КОММЕНТАРИЙ К ОЦЕНКЕ...'),
                        label: _('Комментарий к оценке'),
                        labelAlign: 'top' // placeholder
                    }, {
                        xtype: 'container',
                        cls: 'x-msgrating-btn x-box-btn',
                        layout: 'hbox',
                        flex: 1,
                        items: [
                            {
                                xtype: 'button',
                                itemId: 'rating-btn-close',
                                text: _('Закрыть'),
                                cls: 'x-btn-close',
                                flex: 1
                            }, {
                                xtype: 'button',
                                itemId: 'rating-btn-submit',
                                text: _('Оценить'),
                                cls: 'x-btn-submit',
                                flex: 1
                            }
                        ]
                    }
                ]
            }
        ];

        return _items;
    },

    getValueRating: function() {
        return this.getParams('classified');
    },

    getValueComment: function() {
        return this.down('#x-msgrating-comment').getValue();
    },

    onBtnSubmitClick: function(btn, eventm, id, opts) {
        this.destroy();
        Klb.system.Event.fireEvent('klb.system.rating.submit', this);
    },
    onBtnRepeatClick: function(btn, eventm, id, opts) {
        this.destroy();
        Klb.system.Event.fireEvent('im.system.restart', this);
    },
    onBtnCloseClick: function(btn, eventm, id, opts) {
        this.destroy();
        Klb.system.Event.fireEvent('klb.system.rating.close', this);
    }
});