describe('Sign_Up controller', function () {

    beforeEach(module('webApp'));
    beforeEach(inject(function (service_JSLoad) {
        service_JSLoad.set_sync(true);
    }));

    var sign_up = null, scope = null;
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        sign_up = $controller('ctrl_signUp', {
            $scope: scope
        });
    }));

    it('should show warning message when password is weak', function () {
        scope.login_psswd = '1';
        scope.$digest();
        expect(scope.show_password_warning).toBe(true);
    });
});
