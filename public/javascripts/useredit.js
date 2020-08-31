$(document).ready(function(){
    $('#user-edit__click').on('click', function(e) {
        e.preventDefault();
        var id = $('#user-edit__id').val();
        var login = $('#user-edit__login').val();
        var isAdmin = $('#user-edit__admin').val();
        var isLogist = $('#user-edit__logist').val();
        var isAccountant = $('#user-edit__accountant').val();
        var isAccountantnotnal = $('#user-edit__accountantnotnal').val();
        var isManager = $('#user-edit__manager').val();
        var ban = $('#user-edit__ban').val();
        var password = $('#user-edit__password').val();
        $(location).attr('href', `${id}/${login}/${isAdmin}/${isLogist}/${isAccountant}/${isAccountantnotnal}/${isManager}/${ban}/${password}`);
    });
});