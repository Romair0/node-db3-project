const db = require('../data/config');

function find() {
	return db('schemes').select('*');
}

function findById(id) {
	return db('schemes as s').select('s.id', 's.scheme_name').where('s.id', id);
}

function findSteps(id) {
	return db('schemes as s')
		.join('steps as st', 's.id', 'st.scheme_id')
		.select('st.id', 's.scheme_name', 'st.step_number', 'st.instructions')
		.where('st.scheme_id', id);
}

async function add(scheme) {
	const [ id ] = await db('schemes').insert(scheme);
	return db('schemes as s').where('s.id', id).first();
}

async function update(changes, id) {
	await db('schemes').update(changes).where('schemes.id', id);
	return findById(id);
}

function remove(id) {
	return db('schemes').where({ 'schemes.id': id }).del();
}

module.exports = {
	find,
	findById,
	findSteps,
	add,
	update,
	remove
};
