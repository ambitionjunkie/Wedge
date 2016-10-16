// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive

    .state('splash', {
        url: '/splash',
        templateUrl: 'templates/splash.html',
        controller: 'SplashPageCtrl'
    })

    .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
    })

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'SignInCtrl'
    })

    .state('info', {
        url: '/info',
        templateUrl: 'templates/info.html',
        controller: 'InfoCtrl'
    })

    .state('skills', {
        url: '/skills',
        templateUrl: 'templates/skills.html',
        controller: 'SkillsCtrl'
    })

    .state('loading', {
        url: '/loading',
        templateUrl: 'templates/loading.html',
        controller: 'LoadingCtrl'
    })

    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    .state('tab.low', {
        url: '/low',
        views: {
            'tab-low': {
                templateUrl: 'templates/opportunity.html',
                controller: 'OpportunityLowCtrl'
            }
        }
    })

    .state('tab.mid', {
        url: '/mid',
        views: {
            'tab-mid': {
                templateUrl: 'templates/opportunity.html',
                controller: 'OpportunityMidCtrl'
            }
        }
    })

    .state('tab.high', {
        url: '/high',
        views: {
            'tab-high': {
                templateUrl: 'templates/opportunity.html',
                controller: 'OpportunityHighCtrl'
            }
        }
    })

    .state('advisor', {
        url: '/advisor',
        controller: 'AdvisorCtrl',
        templateUrl: 'templates/advisor.html'
    })

    .state('appointment_made', {
        url: '/appointment',
        controller: 'AppointmentMadeCtrl',
        templateUrl: 'templates/appointmentMade.html'
    });


    // Each tab has its own nav history stack:

    $urlRouterProvider.otherwise('splash');

});
