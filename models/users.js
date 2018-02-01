'use strict';

module.exports = (sequelize, DataTypes) => {
	let users = sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING
	},{
		timestamps:false
	});

	return users;
};