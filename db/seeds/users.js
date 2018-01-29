
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          name: "Adrián Álvarez",
          email: "adrianalvarezcalderon@gmail.com",
          password: "U2FsdGVkX19Qh2xLU+qn7JBdGhjo4dyyU7D1km4iETT77MOERd/QXw1zgHB/16N7"
        }
      ]);
    });
};
