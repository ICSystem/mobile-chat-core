/**
 * KlbChat-Mcp 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.system.Container
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.view.system.Container', {
    extend: 'Ext.Container',
    xtype: 'viewmaincontainer',
    xoptions: [],

    constructor: function(config) {
        config = config || {};
        var me = this,
            onListener = false;

        if ( config.onlisten )
        {
            var onListener = {};
            for (var key in config.onlisten) {
                onListener[key] = config.onlisten[key] || Ext.emptyFn;
            }

            delete config.onlisten;
        }

        config = me.getConfigInit(config);

        Ext.apply(config, {
            listeners: {
                order: 'after',
                painted: this.afterInstance,
                initialize: this.afterInitialize
            },
            items: me.getConfigItems(config)
        });

        me.callParent([config]);

        me.initialLoad();

        me.initAction();

        if ( onListener ) this.on(onListener);
    },

    getConfigInit: function(config) {
        return config;
    },

    getConfigItems: function(config) {
        return [];
    },

    /**
     * perform the initial load of grid data
     */
    initialLoad: Ext.emptyFn,

    initAction:  Ext.emptyFn,

    afterInstance: Ext.emptyFn,

    afterInitialize: function(view, eOpts) { },

    getParams: function(key) {
        return key ? this.xoptions[key] : this.xoptions;
    },

    setParams: function(key, value ) {
        this.xoptions[key] = value;
        return this;
    }
});
