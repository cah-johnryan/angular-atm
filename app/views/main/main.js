'use strict';

angular.module('myApp.main', ['ngRoute', 'draganddrop'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/main/main.html',
            controller: 'MainCtrl'
        });
    }])

    .controller('MainCtrl', [function () {
        var ctrl = this;
        ctrl.customerAtmCard = {
            'cardType': 'atmCard',
            'cardNumber': 123457898765432,
            'PIN': 1234
        };
        ctrl.showCustomerAtmCard = true;
        ctrl.currentDisplay = '';
        ctrl.keysPressed = 0;
        ctrl.pinEntered = 0;
        ctrl.cardInserted = null;
        
        ctrl.processCardInserted = function (data, event) {
            console.log('drop works');
            var insertedCard = data['json/custom-object'];
            if (!insertedCard || insertedCard.cardType !== 'atmCard') return;
            console.log('An ATM card was found to be inserted')
            ctrl.currentDisplay = 'enterPinNumber';
            ctrl.showCustomerAtmCard = false;
            ctrl.cardInserted = ctrl.customerAtmCard;
        };

        ctrl.processNumberPadKeyPress = function (keyPressed) {
            console.log('A key press of ' + keyPressed + ' was registered');
            if(!ctrl.cardInserted) return;
            switch (ctrl.keysPressed) {
                case 0:
                    ctrl.pinEntered = keyPressed;
                    ctrl.currentDisplay = 'enterPinNumber-1Character';
                    break;
                case 1:
                    ctrl.pinEntered = ctrl.pinEntered + (10 * keyPressed);
                    ctrl.currentDisplay = 'enterPinNumber-2Characters';
                    break;
                case 2:
                    ctrl.pinEntered = ctrl.pinEntered + (100 * keyPressed);
                    ctrl.currentDisplay = 'enterPinNumber-3Characters';
                    break;
                case 3:
                    ctrl.pinEntered = ctrl.pinEntered + (1000 * keyPressed);
                    ctrl.currentDisplay = 'enterPinNumber-Complete';
                    break;
            }
            console.log('PIN entered at present: ' + ctrl.pinEntered);
            ctrl.keysPressed++;
        }
    }]);