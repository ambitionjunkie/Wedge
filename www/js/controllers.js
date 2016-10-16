angular.module('starter.controllers', [])

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
})

.controller('SignInCtrl', function($scope, DB) {

  $scope.user = {
      username: '',
      password: ''
  };
  $scope.login = function() {
      DB.login($scope.user);
  };

})

.controller('InfoCtrl', function($scope, $state, DB) {
    $scope.data = {};
    $scope.submit = function() {
        DB.basicInfo($scope.data);
    }
})

.controller('RegisterCtrl', function($scope, $state, DB) {
    $scope.user = {
        namename: '',
        password: '',
        email: '',
        phone: ''
    };

    $scope.register = function() {
        DB.register($scope.user);
    }
})

.controller('SplashPageCtrl', function($scope, $state) {
    $scope.goTo = function(type) {
        if (type == 'register') {
            $state.go('register');
        } else if (type == 'login') {
            $state.go('login')
        }
    }
})

.controller('SkillsCtrl', function($scope, DB) {

    var id_map = {
        automotive: 1,
        retail: 2,
        customer: 3,
        landscaping: 4,
        hospitality: 5

    };
    $scope.data = {
        automotive: false,
        retail: false,
        customer: false,
        landscaping: false,
        hospitality: false
    };

    $scope.text = '';

    $scope.submit = function() {
        var sendArray = [];
        for ( var key in $scope.data ) {
            if ($scope.data[key]) {
                sendArray.push(id_map[key]);
            }
        }

        var data = {
            description: '',
            skills: sendArray
        };

        DB.skillsInfo(data);
    }
})

.controller('LoadingCtrl', function($scope, DB) {
    DB.getOpportunities();
})

.controller('OpportunityLowCtrl', function($scope, DB, User) {
    $scope.opportunity = 'Low';
    $scope.data = User.opportunities.low;
    $scope.submit = function() {
        DB.getAdvisor($scope.data);
    };
})

.controller('OpportunityMidCtrl', function($scope, DB, User) {
    $scope.opportunity = 'Mid';
    $scope.data = User.opportunities.mid;
    $scope.submit = function() {
        DB.getAdvisor($scope.data);
    };
})

.controller('OpportunityHighCtrl', function($scope, DB, User) {

    $scope.opportunity = 'High';
    $scope.data = User.opportunities.high;
    $scope.submit = function() {
        DB.getAdvisor($scope.data);
    };
})

.controller('AdvisorCtrl', function($scope, DB, User,$state) {
    $scope.data = User.advisor;
    $scope.appointmentTime = "";
    $scope.appointmentDate = new Date();
    $scope.data.picture = 'http://team6.code.goodiehack.com' + $scope.data.picture;


    $scope.makeAppointment = function() {
        console.log($scope.appointmentDate);
        console.log($scope.appointmentTime);
        $state.go('appointment_made');
        //DB.makeAppointment($scope.dateTime.toISOString().subs, $scope.appointmentTime)
    }
})

.controller('AppointmentMadeCtrl', function($scope, $state) {
    $scope.goToSkills = function() {
        $state.go('skills');
    }
});
