var _ = require('underscore');
var q = require('q')

module.exports = (data) => {

    var deferred = q.defer();
    var {
        config,
        value,
        cardId,
        type
    } = data;

    var filteredConversions = _.filter(config.conversionRate[type], function (obj) {
        return obj.cardId === cardId.toString()
    })
    var conversionObject = filteredConversions[0]
 
    if (!conversionObject)
        deferred.resolve(parseInt(value));
    else
        deferred.resolve(conversionObject.value * value);

    return deferred.promise;

}