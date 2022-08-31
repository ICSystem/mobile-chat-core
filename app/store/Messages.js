/**
 * KlbChat-Modern 2.3.7
 * @package     Touch-Chat
 * @subpackage  store.Messages
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.store.Messages', {
	extend: 'Ext.data.Store',
	requires : [
		'Ext.data.proxy.Memory',
		'KlbIm.model.Message'
	],

	config : {
		storeId  : 'Messages',
		autoLoad : true,
		autoSync : true,
		model    : 'KlbIm.model.Message',
		proxy    : {
			type   : 'memory',
			reader : {
				type : 'json',
				rootProperty : 'messages'
			}
		}
	}

});