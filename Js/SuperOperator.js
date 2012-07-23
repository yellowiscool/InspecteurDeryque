var SuperOperator = function() {
	this.rest_location = ROOT_PATH + "/app/RestJson/";

	EventBus.addListeners(this.listeners, this);

	this.database = new Object();
};

SuperOperator.prototype = {
ajax: function(path, callback) {
	$.ajax({
		url: this.rest_location+path,
		success: callback,
		error: function(e) {
			EventBus.send("error", {status: e.status, message: e.statusText});
		}});
},
addTuple: function(data, tuple)
{
	for (var key in tuple)
	{
		var keyMin = key+'Min';
		var keyMax = key+'Max';
		if (!(keyMin in data) || tuple[key] < data[keyMin]) data[keyMin] = tuple[key];
		if (!(keyMax in data) || tuple[key] > data[keyMax]) data[keyMax] = tuple[key];
	}
	data.data.push(tuple);
},

listeners: {
get_statements_list: function(d, obj) {
	obj.ajax('reports', function(json) {
		EventBus.send("statements_list", json);
	});
},

add_statement: function(d, obj) {
	var statement_name = d.statement_name;
	var hash = statement_name.hashCode();

	obj.ajax('data_dt/'+encodeURIComponent(statement_name),
		function(json) {
			var start_t = Date.parse(json.start_t);
			var date = new Date(start_t);
			var data  = {
				data: []
			};

			var _addTuple = function(i)
			{
				var tuple =json.data[i];
				start_t += tuple.dt;
				tuple.time_t = new Date(start_t);
				delete tuple.dt;

				obj.addTuple(data, tuple);
				return tuple;
			}

			var i = 0;
			// for (; i < json.data.length/2; ++i)
			// 	_addTuple(i);
			EventBus.send('new_tuples', {
				statement_name: statement_name,
				data: data.data});

			EventBus.addListener('layout_change', function() {
				var intervale = window.setInterval(function(){
					EventBus.send('new_tuples', {
						statement_name: statement_name,
						data: [_addTuple(i)]});

					if (++i == json.data.length)
						window.clearInterval(intervale);

				}, 42);
			});
		});
	//if (typeof this.database[hash]
}
}};