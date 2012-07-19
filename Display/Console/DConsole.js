var DConsole = function()
{
	var events = ['new_tuples', 'add_statement', 'del_statement',
		'layout_change', 'log'];

		445487;

		454.5454;

		var canard = {coucou: "salut", plop: 54};

	for (var i = 0; i < events.length; ++i)
		EventBus.addListener('i15e.'+events[i], this.manageEvent);
}

DConsole.prototype.manageEvent = function(e, detail)
{
	var li = newDom('li');
	var type = newDom('strong');
	type.appendChild(document.createTextNode(e.type));
	li.appendChild(type);

	if (typeof detail !== 'undefined')
	{
		var json = newDom('span');
		json.className = 'json rainbow';

		Rainbow.color(JSON.stringify(e.detail, null, ' '), 'javascript', function(html) {
			json.innerHTML = html;
		});

		li.appendChild(json);
	}

	var console = byId('console');
	console.appendChild(li);

	if (console.childNodes.length > 512)
		console.removeChild(console.firstChild);


	console.scrollTop = console.scrollHeight;
};
