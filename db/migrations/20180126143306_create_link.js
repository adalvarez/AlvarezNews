exports.up = function(knex, Promise) {
	Promise.all([
		knex.schema.createTable('links', (table) => {
			table.increments('id').primary().unsigned()
			table.string('url')
			table.string('description')
			table.string('date')
			table.integer('userId').unsigned()
		})
	])
};

exports.down = function(knex, Promise) {
	Promise.all([
		knex.schema.dropTable('links')
	])
};