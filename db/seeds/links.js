
exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('links').del()
		.then(function () {
			// Inserts seed entries
			return knex('links').insert([
				{
					id:1,
					url: 'https://devcode.la',
					description: 'Some description',
					date: '01/28/2017 10:00:00',
					postedBy: 1
				},
				{
					id:2,
					url: 'https://news.ycombinator.com/',
					description: 'Some description 2',
					date: '01/28/2017 10:00:00',
					postedBy: 1
				},
				{
					id:3,
					url: 'https://github.com/',
					description: 'Some description 3',
					date: '01/28/2017 10:00:00',
					postedBy: 1
				}
			]);
		});
};
