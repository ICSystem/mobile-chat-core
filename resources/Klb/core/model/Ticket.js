Ext.define('KlbCore.model.Ticket', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
            {
                name: 'title'
            },
            {
                name: 'status'
            },
            {
                name: 'description'
            },
            {
                name: 'importance'
            }
        ]
    }
});