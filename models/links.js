'use strict';

module.exports = (sequelize, DataTypes) => {
	let links = sequelize.define('links', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		url: DataTypes.STRING,
		description: DataTypes.STRING,
		date: DataTypes.STRING
	},{
		timestamps:false
	});

	return links;
};