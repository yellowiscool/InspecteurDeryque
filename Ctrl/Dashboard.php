<?php

class Dashboard
{

	public function refresh() {
		$c = new Gift();
		$c->form();
		//echo "bordel de merde";
		//groaw(R::find('user_gift'));

	}

	public function index() {
		CNavigation::setTitle('Tableau de bord');
	}

	public function submit() {
		groaw($_POST);

		if (!CNavigation::isValidSubmit(array('url'), $_REQUEST)) {
			new CMessage('An url is required');
			CNavigation::redirectToApp('Dashboard');
		}
	
		$capture = new Capture(time(), $_REQUEST['url']);
		$capture->download();
		$capture->save();
		groaw($capture);
	}
}

?>
