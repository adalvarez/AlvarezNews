'use strict';

const 
	Fs = require('fs'),
	path = require('path'),
	Sequelize = require('sequelize');

const sequelize = new Sequelize(null, null, null, {
	dialect: 'sqlite',
	storage: path.join(__dirname, '..', 'db', 'db.sqlite'),
	logging: false
});
const db = {};

Fs.readdirSync(__dirname)
	.filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
	.forEach((file) => {
		const model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Associations
db['users'].hasMany(db['links']);
db['links'].belongsTo(db['users']);

module.exports = db;