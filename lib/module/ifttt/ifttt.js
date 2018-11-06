var instance_skel = require('../../instance_skel');
var debug;
var log;

function instance(system, id, config) {
    var self = this;

    // super-constructor
    instance_skel.apply(this, arguments);

    self.actions(); // export actions

    return self;
}

instance.prototype.updateConfig = function(config) {
    var self = this;

    self.config = config;
};
instance.prototype.init = function() {
    var self = this;

    self.status(self.STATE_OK);

    debug = self.debug;
    log = self.log;
};

// Return config fields for web config
instance.prototype.config_fields = function () {
    var self = this;

    return [
        {
            type: 'textinput',
            id: 'makerKey',
            label: 'IFTTT Maker Key',
            width: 18,
            default: 'Your Maker Key'
        }
    ]
};


// When module gets deleted
instance.prototype.destroy = function() {
    var self = this;
    debug("destroy");
};

instance.prototype.actions = function(system) {
    var self = this;
    self.system.emit('instance_actions', self.id, {
        'webhook': {
            label: 'WebHook',
            options: [
                {
                    type: 'textinput',
                    id: 'event',
                    label: 'Eventname',
                    width: 18,
                    default: 'Your Event',
                },
                {
                    type: 'textinput',
                    id: 'value1',
                    label: 'Value 1',
                    width: 18,
                    default: ''
                },
                {
                    type: 'textinput',
                    id: 'value2',
                    label: 'Value 2',
                    width: 18,
                    default: ''
                },
                {
                    type: 'textinput',
                    id: 'value3',
                    label: 'Value 3',
                    width: 18,
                    default: ''
                }
            ]
        }
    });
}

instance.prototype.action = function(action) {
    var self = this;
    var cmd;

    if (action.action == 'post') {

        self.system.emit('rest', action.options.url, {}, function (err, result) {

            if (err !== null) {
                self.log('error', 'HTTP POST Request failed');
                return;
            }

            self.log('info', 'HTTP POST Request OK');


        });
    }
};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
