angular.module('starter.services', [])

.service('User', function() {
    this.session = false;

    this.isLoggedIn = function() {
      return this.session === false ? false : true;
    }
})

.service('DB', function($http, User, $state) {
    var self = this;
    this.register = function(user) {
        var username = user.username;
        var password = user.password;
        var email = user.email;
        var phone = user.phone;

        $http({
            url: "http://team6.code.goodiehack.com/user/register",
            method: 'POST',
            data: {
                username: username,
                password: password,
                email: email,
                phone: phone
            }
        }).then(function(res) {
            if (res.data.success) {
                User.session = res.data.session;
                $state.go('info')
            } else {
                console.log(res.data.error);
            }
        });
    };

    this.login = function(user) {
        var username = user.username;
        var password = user.password;
        $http({
            url: "http://team6.code.goodiehack.com/user/login",
            method: 'POST',
            data: {
                username: username,
                password: password
            }
        }).then(function(res) {
            if (res.data.success) {
                User.session = res.data.session;
                $state.go('skills')
            } else {
                console.log(res.data.error);
            }
        });
    };

    this.basicInfo = function(info) {
        info.session = User.session;
        $http({
            url: "http://team6.code.goodiehack.com/user/info",
            method: 'POST',
            data: info
        }).then(function(res) {
            if (res.data.success) {
                $state.go('skills')
            } else {
                console.log(res.data.error);
            }
        });

    };

    this.skillsInfo = function(info) {
        info.session = User.session;
        $http({
            url: "http://team6.code.goodiehack.com/user/skills",
            method: 'POST',
            data: info
        }).then(function(res) {
            if (res.data.success) {
                $state.go('loading')
            } else {
                console.log(res.data.error);
            }
        });
    };

    this.getOpportunities = function() {
        var session = User.session;
        $http({
            url: "http://team6.code.goodiehack.com/user/opportunities",
            method: 'POST',
            data: {
                session: session
            }
        }).then(function(res) {
            if (res.data.success) {
                User.opportunities = {
                    low: res.data.low,
                    mid: res.data.mid,
                    high: res.data.high
                };
                $state.go('tab.mid');
            } else {
                console.log(res.data.error);
            }
        })
    }

    this.getAdvisor = function(data) {
        User.choice = data;
        var session =   User.session;
        $http({
            url: "http://team6.code.goodiehack.com/user/advisor",
            method: 'POST',
            data: {
                session: session
            }
        }).then(function(res) {
            if (res.data.success) {
                User.advisor = res.data;
                $state.go('advisor');
            } else {
                console.log(res.data.error);
            }
        })
    };

    this.makeAppointment = function(advisorId) {
        var data = {
            session: User.session,
            adviserId: advisorId,
            houseId: User.choice.house.id,
            job1Id: User.choice.jobs[0].id,
            job2Id: User.choice.jobs[1].id,
        }
        $http(
            {
                url: "http://team6.code.goodiehack.com/user/appointment",
                method: 'POST',
                data: data
            }
        ).then(function(res) {
            if (res.data.success) {
                User.advisor = res.data;
                $state.go('appointment_made');
            } else {
                console.log(res.data.error);
            }
        });
    }
});
