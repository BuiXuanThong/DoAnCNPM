

const Dish = require('./../models/Dish');
const User = require('./../models/User');
const Order = require('./../models/Order');

const { mutiMongoosetoObject, MongoosetoObject } = require('../../util/mongoose');


class ManagerController {
    index(req, res) {
        res.send('asd');
    }
    // [GET] /manager/viewrevenue
    viewrevenue(req, res, next) {
        if (!req.query.page) req.query.page = 1;
        // res.json(req.session.email);
        Promise.all([Dish.find({}).limit(6).skip((req.query.page - 1) * 6).sortable(req), Dish.countDocumentsDeleted(), Dish.countDocuments()])
            .then(([dishes, deletedCount, count]) => {
                res.render('Manager/viewrevenue', {
                    dishes: mutiMongoosetoObject(dishes),
                    page: req.query.page,
                    user: req.user,
                    count,
                    deletedCount,
                });
            })
            .catch(next);
    }

    // [GET] /manager/vieworders
    viewOrders(req, res, next) {
        //if(!req.query.page) req.query.page = 1;
        // res.json(req.session.email);
        Order.find({}).sort({ createdAt: -1 })
            .then((orders) => {
                //res.json(req.user)
                res.render('user/ordered', {
                    user: req.user,
                    orders: mutiMongoosetoObject(orders)
                })
            })
            .catch(next)
    }

    // [GET] /manager/trash
    trash(req, res, next) {
        Dish.findDeleted({})
            .then((dishes) => {
                res.render('Manager/trash', {
                    dishes: mutiMongoosetoObject(dishes),
                    user: req.user,
                });
            })
            .catch(next);
    }

    create(req, res, next) {
        res.render('courses/create', { user: req.user, });
    }

    edit(req, res, next) {
        Dish.findById(req.params.id)
            .then((dish) =>
                res.render('Manager/edit', {
                    dish: MongoosetoObject(dish),
                    user: req.user,
                }),
            )
            .catch(next);
    }
    // [PUT] /course/:id
    update(req, res, next) {
        Dish.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/manager/stored/foods'))
            .catch(next)
    }

    storedFoods(req, res, next) {
        if (req.query.hasOwnProperty('_sort')) {
            res.json({ message: 'successfully!!!' });
        }

        // Promise
        Promise.all([Dish.find({}), Dish.countDocumentsDeleted()])
            .then(([dishes, deletedCount]) =>
                res.render('me/stored-food', {
                    deletedCount,
                    dishes: mutiMongoosetoObject(dishes),
                    user: req.user,
                })
            )
            .catch(next);
    }

    // [GET]    /trash/courses
    trashedFoods(req, res, next) {
        Dish.findDeleted({})
            .then((dishes) =>
                res.render('me/trashed-food', {
                    dishes: mutiMongoosetoObject(dishes),
                    user: req.user,
                }),
            )
            .catch(next);
    }
    viewtablereservation(req, res, next) {
        if (req.query.hasOwnProperty('_sort')) {
            res.json({ message: 'successfully!!!' });
        }

        // Promise
        Promise.all([Table.find({}), Table.countDocumentsDeleted()])
            .then(([tables, deletedCount]) =>
                res.render('User/viewtablereservation', {
                    deletedCount,
                    tables: mutiMongoosetoObject(tables),
                })
            )
            .catch(next);
    }

    trashedTableReservation(req, res, next) {
        Table.findDeleted({})
            .then((tables) =>
                res.render('User/trashedtablereservation', {
                    tables: mutiMongoosetoObject(tables),
                }),
            )
            .catch(next);
    }
}

module.exports = new ManagerController();
