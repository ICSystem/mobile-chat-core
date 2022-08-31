/**
 * KlbChat-Modern 2.3.7
 * @package     Touch-Chat
 * @subpackage  model.User
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.model.User', {
    extend : 'Ext.data.Model',
    config : {
        identifier : {
            type : 'uuid'
        },
        fields     : [
            { name : 'id', type : 'string' },
            { name : 'username', type : 'string' },
            { name : 'organizer', type : 'boolean'},
            { name : 'code', type : 'string' }
        ]
    }
});