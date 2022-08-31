Ext.define('KlbCore.store.Ticket', {
    extend: 'Ext.data.Store',
    alias: 'store.ticketStore',

    requires: [
        'KlbCore.model.Ticket',
        'Ext.util.Sorter'
    ],

    config: {
        data: [
            {
                title: 'Improve CSS',
                status: 'Open',
                description: 'improve site css',
                importance: 4
            },
            {
                title: 'PHP scripting',
                status: 'Open',
                description: 'Perform some PHP scripting',
                importance: 2
            },
            {
                title: 'PHP Bug',
                status: 'In Progress',
                description: 'remove PHP Bug',
                importance: 1
            }
        ],
        model: 'KlbCore.model.Ticket',
        storeId: 'ticketStore',
        sorters: {
            sorterFn: function(first, second) {
                // Completed stuff always goes last.
                if ((first.get("status") === "completed") && (second.get("status") !== "completed")) {
                    return 1;
                } else if ((first.get("status") !== "completed") && (second.get("status") === "completed")) {
                    return -1;
                }

                // Now let's sort by importance.
                if (first.get("importance") < second.get("importance")) {
                    return -1;
                } else {
                    return 1;
                }
            }
        }
    }
});