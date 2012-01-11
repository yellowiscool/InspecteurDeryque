<?php

define('NO_LOGIN_REQUIRED', true);
define('NO_HEADER_BAR', true);

class Session
{
	
	public function index() {
		$this->login();
	}

	public function login() {
		CHead::addJs('sha1');
		CHead::delCSS('bootstrap.min');
		CHead::delCSS('application');
		new SessionView();
	}

	public function submit() {
		if (CNavigation::isValidSubmit(array('email_deryque', 'password_deryque'), $_POST)) {
R::debug(true);
			$user = R::findOne('user', 'mail = :mail AND password = :password', array('mail' => $_POST['email_deryque'], 'password' => sha1($_POST['password_deryque'].'grossel')));

			if ($user) {
				$_SESSION['logged'] = true;
				$_SESSION['nom'] = $user->nom;
				$_SESSION['mail'] = $user->mail;
				CNavigation::redirectToApp('Dashboard');
			}
		}

		new CMessage(_('Impossible de se connecter !!!'));
		CNavigation::redirectToApp('Session');
	}

	public function logout() {
		session_destroy();
		CNavigation::redirectToApp('Session','login');
	}

}

?>
