// Cria um usuário e faz login
function createUser(){
	// Verifica se os campos estão preenchidos corretamente
	checkInputFilling("#input-register-email");
	checkInputFilling("#input-register-password");
	
	// Dados do Usuário
	var email = $("#input-register-email").val();
	email = email.trim();
	var password = $("#input-register-password").val();

	$.ajax({
		url: `${API}/users`,
		type: 'POST',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify({
            email: email,
            password: password,
        }),
		success: function(response){
			// Adiciona os botões do menu do usuário logado
			generateMenuButtons(true);
			// oculta o modal de cadastro após o cadastro com sucesso
			$('#modalRegister').modal('hide');

			// Exibe o modal com uma mensagem de retorno
			showMessage(response.message);
			localStorage.setItem('token', response.token);

			// Redefine os valores dos campos input
			$('#input-register-email').val('');
			$('#input-register-password').val('');
		},
		error: function(response){
			// oculta o modal de cadastro após o cadastro com sucesso
			$('#modalRegister').modal('hide');

			// Exibe o modal com uma mensagem de retorno
			showMessage(response.responseJSON.message);
		}
	});
}

// Faz login
function loginUser(){
	// Verifica se os campos estão preenchidos corretamente
	checkInputFilling("#input-login-email");
	checkInputFilling("#input-login-password");
	
	// Dados do Usuário
	var email = $("#input-login-email").val();
	email = email.trim();
	var password = $("#input-login-password").val();

	$.ajax({
		url: `${API}/login`,
		type: 'POST',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify({
            email: email,
            password: password,
        }),
		success: function(response){
			// Adiciona os botões do menu do usuário logado
			generateMenuButtons(true);

			// oculta o modal de cadastro após o cadastro com sucesso
			$('#modalLogin').modal('hide');

			// Exibe o modal com uma mensagem de retorno
			showMessage(response.message);
			localStorage.setItem('token', response.token);

			// Redefine os valores dos campos input
			$('#input-register-email').val('');
			$('#input-register-password').val('');
		},
		error: function(response){
			// oculta o modal de cadastro após o cadastro com sucesso
			$('#modalLogin').modal('hide');

			// Exibe o modal com uma mensagem de retorno
			showMessage(response.responseJSON.message);
		}
	});
}

// Encerra a sessão do usuário
function logoutUser() {
    const token = localStorage.getItem('token');

    $.ajax({
        url: `${API}/logout`,
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(response) {
            localStorage.removeItem('token');
			// Adiciona os botões do menu do usuário deslogado
			generateMenuButtons(false);
        },
        error: function(response) {
            showMessage(response.responseJSON.message);
        }
    });
}

function tokenLogin() {
	const token = localStorage.getItem('token');

	$.ajax({
        url: `${API}/token-login`,
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(response) {
            generateMenuButtons(true);
        },
        error: function(response) {
            generateMenuButtons(false);
        }
    });
}

function showSurvey(survey_id) {
	const token = localStorage.getItem('token');

	$.ajax({
		url: `${API}/survey/${survey_id}`,
		type: 'GET',
		dataType: 'json',
		headers: {
			'Authorization': `Bearer ${token}`
		},
		success: function(response) {
			localStorage.setItem('selected_survey', JSON.stringify(response));
			changeLocation('survey');
		},
		error: function(response) {
			showMessage(response.responseJSON.message);
		}
	});
}

function createSurvey(options) {
	const token = localStorage.getItem('token');

	const title = $('#input-create-survey-title').val().trim();
	const description = $('#input-create-survey-description').val().trim();

	$.ajax({
        url: `${API}/survey`,
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
		data: JSON.stringify({
            title: title,
            description: description,
			options: options
        }),
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(response) {
			localStorage.setItem('message', response.message);
			changeLocation('my-surveys');
        },
        error: function(response) {
            showMessage(response.responseJSON.message);
        }
    });
}

function voteSurveyOption(survey_id, option_id) {
	const token = localStorage.getItem('token');

	$.ajax({
        url: `${API}/vote/survey/${survey_id}/option/${option_id}`,
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(response) {
			localStorage.setItem('message', response.message);
            showSurvey(survey_id);
        },
        error: function(response) {
            showMessage(response.responseJSON.message);
        }
    });
}