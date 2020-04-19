jQuery(function ($) {

    $('#registrationButton').click(function (e) { //e - это объект события, которое сработало. В нашем случае - нажатие на кнопку в форме регистрации

        e.preventDefault(); // Убираем у события действие по-умолчанию - отправку данных на сервер.

        $('#ajaxRegistrationDiv').html('<h4>Registering new user...</h4>').fadeIn(1000, function () {
            var createObject = {};
            createObject["name"] = $("#usernameInput").val();
            createObject["password"] = $("#passwordInput").val();
            createObject["age"] = $("#ageInput").val();
            createObject["roles"] = $("#rolesInput").val();

            $.ajax({
                url: '/api/userAdd',
                type: 'POST',
                contentType: "application/json;charset=UTF-8",
                data: JSON.stringify(createObject), //тип данных, передаваемых на сервер
                dataType: 'json', //тип данных, ожидаемый в качестве ответа от сервера
                context: document.getElementById('ajaxRegistrationDiv'), //задает содержимое переменной this
                success: function (data) { //функция в success сработает при получении ответа от сервера с кодом 200 - ОК
                    $(this).fadeOut(1000, function () {
                        $(this).toggleClass('alert-primary alert-success');
                        $(this).find('h4').attr('class', 'alert-heading').text('New user registered!');
                        $(this).append(`<hr><h5>User ${data.name}</h5><p>age: ${data.age}</p><p>roles: ${data.roles}</p>`);
                        $(this).fadeIn(1000)
                            .delay(2000)
                            .fadeOut(1000, function () {
                                $("#registrationForm").trigger("reset");
                            });
                    });
                    addTableRow(data);
                },
                error: function () {
                    alert("Error!");
                }
            });
        })
    });
});


