
exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('links').del()
		.then(function () {
			// Inserts seed entries
			return knex('links').insert([
				{
					id:1,
					url: '',
					description: 'AlvarezNews',
					date: '01/28/2017 10:00:00',
					userId: 1
				}
			]);
		});
};
