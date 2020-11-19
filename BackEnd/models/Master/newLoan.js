var _globals;

module.exports = {
    newLoanSchema: {},
    init: function (globals) {
        _globals = globals;
        var modelName = _globals.MODEL_LIST.NewLoan;
        this.newLoanSchema = new _globals.Schema({
            loanID: { type: String, required: true },
            name: { type: String, required: true },
            pName: { type: String, required: true },
            date: { type: Date, required: true },
            mobileNo: { type: String, required: true },
            aMobileNo: { type: String, required: false },
            address: { type: String, required: true },
            amount: { type: Number, required: true },
            interest: { type: Number, required: true },
            interestPaid: { type: Number, required: true },
            notes: { type: String, required: false },
            isActive: { type: Boolean, required: true, default: true },
            createdDate: { type: Date, default: Date.now },
            updatedDate: { type: Date }
        }, { collection: modelName, autoIndex: false });
        this.newLoanSchema.index({ _id: 1, name: 1 });

        var EMP_LIST = [{}, {
            _id: 1,
            loanID: 1,
            name: 1,
            pName: 1,
            date: 1,
            mobileNo: 1,
            aMobileNo: 1,
            address: 1,
            amount: 1,
            interest: 1,
            interestPaid: 1,
            notes: 1,

            isActive: 1, createdDate: 1, updatedDate: 1,
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
                    "loanID": ret.loanID,
                    "name": ret.name,
                    "pName": ret.pName,
                    "date": ret.date,
                    "mobileNo": ret.mobileNo,
                    "aMobileNo": ret.aMobileNo,
                    "address": ret.address,
                    "interest": ret.interest,
                    "interestPaid": ret.interestPaid,
                    "notes": ret.notes,
                    "isActive": ret.isActive,
                    "createdDate": ret.createdDate,
                    "updatedDate": ret.updatedDate,
                }
            }
            else {
                output = {
                    "_id": ret._id,
                    "loanID": ret.loanID,
                    "name": ret.name,
                    "pName": ret.pName,
                    "date": ret.date,
                    "mobileNo": ret.mobileNo,
                    "aMobileNo": ret.aMobileNo,
                    "address": ret.address,
                    "interest": ret.interest,
                    "interestPaid": ret.interestPaid,
                    "notes": ret.notes,
                    "isActive": ret.isActive,
                    "createdDate": ret.createdDate,
                    "updatedDate": ret.updatedDate,
                }
            }
            return output;
        };

        this.newLoanSchema.set("toJSON", { virtuals: true, getters: false, transform: transform_result });
        this.newLoanSchema.set("toObject", { virtuals: true, getters: false, transform: transform_result });

        this.newLoanSchema.statics.checkByActive = function (data, opts, callBack) {
            var cond = { isActive: data.isActive };
            var query = this.findOne(cond);
            _globals.setOpts(query, opts, EMP_LIST);
            query.exec(callBack);
        };

        this.newLoanSchema.statics.getAll = function (data, opts, callBack) {
            var cond = {};
            var query = this.find(cond);
            _globals.setOpts(query, opts, EMP_LIST);
            query.exec(callBack);
        };

        var newLoanSchema = _globals.mongoose.model(modelName, this.newLoanSchema);
        newLoanSchema.ensureIndexes(function (err) {
            if (err) {
                console.log(err);
            }
            else {
                //console.log('create newLoan index successfully');
            }
        });
    }
};
