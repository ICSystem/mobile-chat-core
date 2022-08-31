/**
 * KlbChat-Modern 2.3.7
 * @package     Touch-Chat
 * @subpackage  view.system.Form
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Development team ICS Corporation, Denys Zherebyatyev <kolobizok@gmail.com>
 * @copyright   Copyright (c) 2017 ICS GmbH (www.icstime.com)
 *
 */

Ext.define('KlbIm.model.Message', {
    extend : 'Ext.data.Model',

    config : {
        identifier: 'sequential',
        fields:[
            { name:'name', type:'string' },
            { name:'message', type:'string' },
            { name:'date', type:'date' }
        ]
    }
});