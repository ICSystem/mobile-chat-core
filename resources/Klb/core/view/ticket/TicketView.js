Ext.define('KlbCore.view.ticket.TicketView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ticketview',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Slider',
        'Ext.field.Select',
        'Ext.field.TextArea',
        'Ext.Button'
    ],

    config: {
        items: [
            {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'textfield',
                        itemId: 'titleField',
                        label: 'Title',
                        labelAlign: 'top',
                        required: true,
                        placeHolder: 'Save the world'
                    },
                    {
                        xtype: 'sliderfield',
                        itemId: 'importanceField',
                        label: 'Importance',
                        labelAlign: 'top',
                        required: true,
                        value: [
                            3
                        ],
                        maxValue: 5,
                        minValue: 1
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'statusField',
                        label: 'Status',
                        labelAlign: 'top',
                        required: true,
                        options: [
                            {
                                text: 'Open',
                                value: 'Open'
                            },
                            {
                                text: 'In Progress',
                                value: 'In Progress'
                            },
                            {
                                text: 'Completed',
                                value: 'Completed'
                            }
                        ],
                        usePicker: true
                    },
                    {
                        xtype: 'textareafield',
                        itemId: 'descriptionField',
                        label: 'Description',
                        labelAlign: 'top'
                    },
                    {
                        xtype: 'button',
                        itemId: 'saveTicketButton',
                        margin: 10,
                        ui: 'action',
                        text: 'Save'
                    }
                ]
            }
        ]
    }

});