/**
 * KlbChat-Modern 2.3.7
 * @package     Touch-Chat
 * @subpackage  store.Users
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com, www.kolobiz.com)
 *
 */

Ext.define('KlbIm.store.Users', {
    extend  :'Ext.data.Store',
    requires:[
        'Ext.data.proxy.Memory',
        'KlbIm.model.User'
    ],

    config  :{
        storeId:'Users',
        model  :'KlbIm.model.User',
        autoLoad:true,
        autoSync: true
    }
});