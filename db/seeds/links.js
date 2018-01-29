
exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('links').del()
		.then(function () {
			// Inserts seed entries
			return knex('links').insert([
				{
					id:1,
					url: 'https://devcode.la',
					description: 'DevCode | Aprende a desarrollar aplicaciones web y móviles',
					date: '01/28/2017 10:00:00',
					postedBy: 1
				},
				{
					id:2,
					url: 'https://news.ycombinator.com/',
					description: 'Hacker News',
					date: '01/28/2017 10:00:00',
					postedBy: 1
				},
				{
					id:3,
					url: 'https://github.com/',
					description: 'GitHub',
					date: '01/28/2017 10:00:00',
					postedBy: 1
				}
			]);
		});
};
