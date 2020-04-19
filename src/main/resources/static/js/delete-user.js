jQuery (function ($) {

    $('#tbody').on('click', '.delete-row', function () {

        var id = this.id.slice(this.id.lastIndexOf('-') + 1);
        $('#id-input-delete').attr('value', id);
        $('#id-input-hidden-delete').attr('value', id);
        $('#username-edit-delete').attr('value', $('#username-' + id).text());
        $('#password-edit-delete').attr('value', "");
        $('#age-edit-delete').attr('value', $('#userAge-' + id).text());
        var userRow = $("[id=" + id + "]");
        var rolesList = ["admin", "user"];
        var userRoles = userRow.find('#userRoles-' + id).text();
        $('#role-edit-delete').empty();
        rolesList.forEach(function (value) {
            if (userRoles.includes(value)) {
                $('#role-edit-delete').append('<option id="option"' + value + ' value="' + value + '" selected>' + value + '</option>')
            } else {
                $('#role-edit-delete').append('<option id="option"' + value + ' value="' + value + '">' + value + '</option>')
            }
        });
    });

    $('#delete-user').on('click', function () {
        $.ajax({
            url: '/api/delete/' + $('#id-input-hidden-delete').val(),
            type: 'DELETE',
            contentType: "application/json;charset=UTF-8",
            success: function () {

                createTable();

                $('#modal-delete #close-delete-btn').click();
            },
            error: function () {
                alert("Error!");
            }
        })
    });

});