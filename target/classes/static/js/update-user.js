jQuery(function($) {

    $('#tbody').on('click', '.edit-user', function () {

        var id = this.id.slice(this.id.lastIndexOf('-') + 1);
        $('#id-input').attr('value', id);
        $('#id-input-hidden').attr('value', id);
        $('#username-edit').attr('value', $('#username-' + id).text());
        $('#password-edit').attr('value', "");
        $('#age-edit').attr('value', $('#userAge-' + id).text());
        var userRow = $("[id=" + id + "]");
        var rolesList = ["admin", "user"];
        var userRoles = userRow.find('#userRoles-' + id).text();
        $('#role-edit').empty();
        rolesList.forEach(function (value) {
            if (userRoles.includes(value)) {
                $('#role-edit').append('<option id="option"' + value + ' value="' + value + '" selected>' + value + '</option>')
            } else {
                $('#role-edit').append('<option id="option"' + value + ' value="' + value + '">' + value + '</option>')
            }
        });
    });

    $('#update-user').on('click', function () {
        var updateObject = {};
        updateObject["id"] = $("#id-input-hidden").val();
        updateObject["name"] = $("#username-edit").val();
        updateObject["password"] = $("#password-edit").val();
        updateObject["age"] = $("#age-edit").val();
        updateObject["roles"] = $("#role-edit").val();

        let json = JSON.stringify(updateObject);
        $.ajax({
            url: '/api/editUser',
            type: 'PUT',
            contentType: "application/json;charset=UTF-8",
            data: json, //тип данных, передаваемых на сервер
            // dataType: 'json', //тип данных, ожидаемый в качестве ответа от сервера
            success: function () {

                createTable();

                $('#modal-edit .close-btn').click();
            },
            error: function () {
                alert("Error!");
            }
        })
    })

});