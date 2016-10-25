namespace StateTestApp {
    let states = [
        { name: `home`, config: { url: `/`, templateUrl: `/ngApp/views/home.html`, controller: StateTestApp.Controllers.HomeController, controllerAs: `controller` } },
        { name: `secret`, config: { url: `/secret`, templateUrl: `/ngApp/views/secret.html`, controller: StateTestApp.Controllers.SecretController, controllerAs: `controller` } },
        { name: `login`, config: { url: `/login`, templateUrl: `/ngApp/views/login.html`, controller: StateTestApp.Controllers.LoginController, controllerAs: `controller` } },
        { name: `register`, config: { url: `/register`, templateUrl: `/ngApp/views/register.html`, controller: StateTestApp.Controllers.RegisterController, controllerAs: `controller` } },
        { name: `externalRegister`, config: { url: `/externalRegister`, templateUrl: `/ngApp/views/externalRegister.html`, controller: StateTestApp.Controllers.ExternalRegisterController, controllerAs: `controller` } },
        { name: `about`, config: { url: `/about`, templateUrl: `/ngApp/views/about.html`, controller: StateTestApp.Controllers.AboutController, controllerAs: `controller` } },
        { name: `notFound`, config: { url: `/notFount`, templateUrl: `/ngApp/views/notFount.html` } }

    ];
    angular.module('StateTestApp', ['ui.router', 'ngResource', 'ui.bootstrap']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        angular.forEach(states, (state) => {
            $stateProvider.state(state.name, state.config);
        })
        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });

    
    angular.module('StateTestApp').factory('authInterceptor', (
        $q: ng.IQService,
        $window: ng.IWindowService,
        $location: ng.ILocationService
    ) =>
        ({
            request: function (config) {
                config.headers = config.headers || {};
                config.headers['X-Requested-With'] = 'XMLHttpRequest';
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401 || rejection.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }
        })
    );

    angular.module('StateTestApp').config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });

    

}
