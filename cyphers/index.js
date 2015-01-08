var _glob = require("glob");
var fs = require("fs-promise");
var path = require("path");
var par = require("par");
var queries = {};

exports.queries = queries;
exports.load = load_all_queries;

function load_all_queries() {
	return get_cypher_file_names().then(process_cypher_files);
}

function get_cypher_file_names() {
	return glob(path.join(__dirname, "*.cql"));
}

function process_cypher_files(files) {
	return Promise.all(files.map(load_query_file))
}

function load_query_file(file) {
	var name = get_query_name(file);
	return fs.readFile(file).then(par(save_query, name));
}

function save_query(name, contents) {
	queries[name] = make_query(contents);
}

function make_query(query_string) {
	return function(params) {
		// TODO: Make actual query and return a promise
	}
}

function get_query_name(file_path) {
	return path.basename(file_path, ".cql");
}

function glob(pattern) {
	return new Promise(function(resolve, reject) {
		glob(pattern, function(err, matches) {
			if (err) reject(err);
			else resolve(matches);
		});
	});
}
