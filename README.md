# Guided Practice - Table Mini

Build out an API that helps restaurants keep track of their reservations. Customers will be able to make reserve a table at a restaurant of their choice while waiting in line!

## Getting Started

1. Create a new repository 
2. `npm install`
3. Rename `example.env` to `.env`. In that file, update the `DATABASE_URL` with your Postgres credentials.

## Prisma

<figure>

![Visualized schema. The textual representation in DBML is linked below.](/docs/schema.svg)

<figcaption>

[textual representation of schema in DBML](/docs/schema.dbml)

</figcaption>
</figure>

1. Create the `Restaurant` and `Reservation` models in the Prisma schema. One Restaurant can have many Reservations. The `restaurantId` field of `Reservation` refers to the `id` field of `Restaurant`. Refer to [these docs on defining a 1-Many relation](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/one-to-many-relations).

2. Create the initial migration with `npx prisma migrate dev`.
3. Update the seed script to create at least 3 restaurants. Each restaurant should have at least 5 reservations. You can use arbitrary data as placeholder values.

   - Note: Prisma **cannot** [create multiple related records in a single nested write](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#create-multiple-records-and-multiple-related-records)! Instead, you must [create a single record with multiple related records](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#create-a-single-record-and-multiple-related-records) several times.

4. `npx prisma migrate reset` to clear and seed your database.
5. Use `npx prisma studio` to confirm that your database has been seeded with restaurants and reservations.

## Express

Define the following routes in `api/restaurants.js`. You can test these routes using the sample requests in `.http`.

1.  `GET /restaurants` should send an array of all restaurants.
   
2.  `GET /restaurants/:id` should send the restaurant specified by id. The response should include all reservations made for the restaurant. Refer to [these docs on including related records](https://www.prisma.io/docs/orm/prisma-client/queries/crud#include-related-records).

3.  `POST /restaurants/:id/reservations` should make a new reservation for the restaurant specified by id. Convert strings to numbers as necessary!


## Extensions

In `prisma/seed.js`, refactor the seed script to:

1. Refactor the `seed` function to take the number of restaurants and reservations as [parameters with default values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters).
  
2. Use [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) with a `mapFn` to generate the `reservations` array for each restaurant.

3. Use [faker](https://fakerjs.dev/) to generate fake (but realistic) seed data.
  
