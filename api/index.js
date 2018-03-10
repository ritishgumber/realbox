var transactionApi = require('./transaction')
var onBoardUserApi = require('./onBoardingUser')
var applyPromotionsApi = require('./applyPromotions')
var addPointsApi = require('./addPoints')
var createNewCardApi = require('./createNewCard')
var createNewPromotionApi = require('./createNewPromotion')
var newConfigApi = require('./newConfig')
var setDefaultCardApi = require('./setDefaultCard')
var createNewLoyaltyApi = require('./createNewLoyalty');
var createNewConversionApi = require('./createNewConversion');
var createNewCategoryApi = require('./createNewCategory');
var conversionApi = require('./conversion');
var mapCategoryToTypeApi=require('./mapCategoryToType');


var q = require("q");


module.exports = function () {

    function onBoardUser(data) {
        console.log("Inside User onboard api");
        var deferred = q.defer();
        onBoardUserApi(data).then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        })
        return deferred.promise;

    }

    function addPoints(data) {
        console.log("Inside add points api");
        var deferred = q.defer();
        addPointsApi(data).then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        })
        return deferred.promise;

    }

    function transaction(data) {
        console.log("Inside transaction api");
        var deferred = q.defer();
        transactionApi(data).then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        })
        return deferred.promise;
    }

    function applyPromotion() {
        console.log("Inside promotion api");

        var deferred = q.defer();
        applyPromotionsApi().then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        })
        return deferred.promise;

    }

    function createNewCard(data) {
        console.log("Inside new card api");

        var deferred = q.defer();
        createNewCardApi(data).then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        })
        return deferred.promise;

    }

    function createNewPromotion(data) {
        console.log("Insisde new promotion api");
        var deferred = q.defer();
        createNewPromotionApi(data).then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        })
        return deferred.promise;

    }

    function newConfig(data) {
        console.log("Inside new config api");
        var deferred = q.defer();
        newConfigApi(data).then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        })
        return deferred.promise;
    }

    function setDefaultCard(data) {
        console.log("Inside set defaut card api");
        var deferred = q.defer();
        setDefaultCardApi(data).then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        })
        return deferred.promise;
    }

    function createNewLoyalty(data) {
        console.log("Inside new Loyalty api");
        var deferred = q.defer();
        createNewLoyaltyApi(data).then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        })
        return deferred.promise;
    }

    function createNewConversion(data) {
        console.log("Inside new Conversion api");
        var deferred = q.defer();
        createNewConversionApi(data).then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        })
        return deferred.promise;

    }

    function conversion(data) {
        console.log("Inside  Conversion api");
        var deferred = q.defer();
        conversionApi(data).then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        })
        return deferred.promise;

    }
    
    function createNewCategory(data) {
        console.log("Inside  Conversion api");
        var deferred = q.defer();
        createNewCategoryApi(data).then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        })
        return deferred.promise;

    }
    
    function mapCategoryToType(data) {
        console.log("Inside  Conversion api");
        var deferred = q.defer();
        mapCategoryToTypeApi(data).then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        })
        return deferred.promise;

    }


    return {
        onBoardUser,
        addPoints,
        transaction,
        applyPromotion,
        createNewCard,
        createNewPromotion,
        newConfig,
        setDefaultCard,
        createNewLoyalty,
        createNewConversion,conversion,createNewCategory,mapCategoryToType
    }

}