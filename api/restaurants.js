const express = require("express");
const router = express.Router();
module.exports = router;

const prisma = require("../prisma");

router.get("/", async (req, res, next) => {     // send an array of all restaurants.
    try {
      const restaurants = await prisma.restaurant.findMany();
      res.json(restaurants);
    } catch (e) {
      next(e);
    }
});

router.get("/:id", async (req, res, next) => {      //send the restaurant specified by id
const { id } = req.params;
try {
    // We can throw an error instead of checking for a null restaurant
    const restaurant = await prisma.restaurant.findUniqueOrThrow({
    where: { id: +id },
    include: { reservations: true },
    });
    res.json(restaurant);
} catch (e) {
    next(e);
}
});


router.post("/:id/reservations", async (req, res, next) => {        //make a new reservation for the restaurant specified by id.
    const { id } = req.params;
    const { name, email, partySize } = req.body;
    try {
      // partySize and restaurantId have been converted to numbers
      const reservation = await prisma.reservation.create({
        data: { name, email, partySize: +partySize, restaurantId: +id },
      });
      res.status(201).json(reservation);
    } catch (e) {
      next(e);
    }
});