// Endereço da API de enquetes
const API = 'https://surveys-platform-api.onrender.com';

function changeLocation(new_location) {
    window.location.href = new_location;
}

// Controla a exibição do menu dropdown
var menuDropdown = false;

function openDropdown(){
	document.getElementById('dropdown-menu').style = ("margin-top: 90px; transition: all .4s;");
	menuDropdown = true;
}

function closeDropdown(){
	document.getElementById('dropdown-menu').style = ("margin-top: -100%; transition: all 1s;");
	menuDropdown = false;
}

function changeDropdownMenu(){
	if(menuDropdown == false){
		openDropdown();
	}
	else{
		closeDropdown();	
	}	
}

// Verifica se o campo está preenchido, removendo os espaços do início
// e do final para que não seja passado um valor vazio
function checkInputFilling(id){
	campo = $(id).val(); 
	if(campo.trim() == ""){
		$(id).css({"border-color": "red"});	
	}
	else{
		$(id).css({"border-color": ""});
	}
}

function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
}

function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = document.getElementById('eye-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

// Verifica se existe um token salvo para dispor os botões do menu
function verifyTokenLogin() {
    if (localStorage.getItem('token')) {
        tokenLogin();
    } else {
        generateMenuButtons(false);
    }
}

// Adiciona os botões do menu conforme o estado de login do usuário
function generateMenuButtons(isUserLoggedIn) {
    var menuItems;

    if (isUserLoggedIn) {
        // Caso true trata-se de um usuário logado
        menuItems = `
            <li onclick="changeLocation('/')">Enquetes Públicas</li>
            <li onclick="changeLocation('my-surveys')">Minhas Enquetes</li>
            <li onclick="changeLocation('my-votes')">Minhas Votações</li>
            <li onclick="changeLocation('create-survey')">Criar Enquete</li>
            <li onclick="logoutUser()">Sair</li>
        `;
    } else {
        // Caso false trata-se de um usuário deslogado, se ele não estiver na rota principal
        // redireciona ele para o index.html
        if (window.location.pathname !== '/') {
            changeLocation('/');
        }

        menuItems = `
            <li data-toggle='modal' data-target='#modalLogin'>Entrar</li>
            <li data-toggle='modal' data-target='#modalRegister'>Cadastre-se</li>
        `;
    }

    // Adiciona os botões ao menu
    $('#top-menu').html(menuItems);
    $('#dropdown-menu ul').html(menuItems);
}

function verifyMessage() {
    const message = localStorage.getItem('message');

    if (message) {
        showMessage(message);
        localStorage.removeItem('message');
    }
}