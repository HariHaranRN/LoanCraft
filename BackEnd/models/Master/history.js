var _globals;

module.exports = {
    historySchema: {},
    init: function (globals) {
        _globals = globals;
        var modelName = _globals.MODEL_LIST.History;
        this.historySchema = new _globals.Schema({
            loanID: { type: String, required: true },
            interestAmount: { type: Number, required: true },
            createdDate: { type: Date, default: Date.now },
        }, { collection: modelName, autoIndex: false });
        this.historySchema.index({ _id: 1, name: 1 });

        var EMP_LIST = [{}, {
            _id: 1,
            loanID: 1,
            interestAmount: 1,

            createdDate: 1, 
        }, { _id: 1 }];

        var transform_result = function (doc, ret, options) {
            var output = {};
            if (typeof doc.ownerDocument == "function") {
                return;
            }
            var index = -1;
            if (options.selector) {
                index = options.selector;
            }
            if (index == 1) {
                output = {
                    "_id": ret._id,
                    "loanID": ret.name,
                    "interestAmount": ret.interestAmount,
                    "createdDate": ret.createdDate,
                }
            }
            else {
                output = {
                    "_id": ret._id,
                    "loanID": ret.name,
                    "interestAmount": ret.interestAmount,
                    "createdDate": ret.createdDate,
                }
            }
            return output;
        };

        this.historySchema.set("toJSON", { virtuals: true, getters: false, transform: transform_result });
        this.historySchema.set("toObject", { virtuals: true, getters: false, transform: transform_result });

        this.historySchema.statics.checkByActive = function (data, opts, callBack) {
            var cond = { isActive: data.isActive };
            var query = this.findOne(cond);
            _globals.setOpts(query, opts, EMP_LIST);
            query.exec(callBack);
        };

        this.historySchema.statics.getAll = function (data, opts, callBack) {
            var cond = {};
            var query = this.find(cond);
            _globals.setOpts(query, opts, EMP_LIST);
            query.exec(callBack);
        };

        var historySchema = _globals.mongoose.model(modelName, this.historySchema);
        historySchema.ensureIndexes(function (err) {
            if (err) {
                console.log(err);
            }
            else {
                //console.log('create history index successfully');
            }
        });
    }
};
