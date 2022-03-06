const { default: mongoose } = require("mongoose");
const { BadRequestError } = require("../errors");
const handlerPromise = require("../helpers/promise.helper");

exports.create = (req, res,next) => {
    if (!req.body.name) {
        return next(new BadRequestError(400, "Name can not be empty"));
    }
    
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        favorite: req.body.favorite === true,
    });

    const [error, document] = await handlerPromise(contact.save());

    if (error) {
        return next(new BadRequestError(500,
            "An error occurred while creating the contact"));
    }

    return res.send(document);
};
exports.findAll = async(req, res, next) => {
    const condition = { };
    const { name } = req.query;
    if (name) {
        condition.name = { $regex: new RegExp(name), $options: "i"};
    }

    const [error, document] = await handlerPromise(contact.find(condition));

    if (error) {
        return next(new BadRequestError(500,
            "An error occurred while creating the contact"));
    }

    return res.send(document);
};

exports.findOne = async(req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    const [error, document] = await handlerPromise(contact.findOne(condition));

    if (error) {
        return next(new BadRequestError(500,
            `Error retrieving contact with id=${req.params.id}`));
    }

    if(!document) {
        return next(new BadRequestError(404, "Contact not found"));
    }

    return res.send(document);
};

exports.update = async(req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new BadRequestError(400
            "Data to update can not be empty"));
    }

    conts { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    const [error, document] = await handlerPromise(
        Contact.findOneAndUpdate(condition, req.body, {
            new: true,
        })
    );

    if ( error) {
        return next(new BadRequestError(500,
            `Error updateing contact with id=${req.params.id}`));
    }

    if (!document) {
        return next(new BadRequestError(400, "Contact not fuond"));
    }

    return res.send({message: "Cintact was updated successfully", });
};

exports.delete = async (req, res, next) => {
    conts { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    conts [error, document] = await handlerPromise(
        Contact.findOneAndDelete(condition)
    );

    if (error) {
        return next(new BadRequestError(500,
            `Could not delete contact with id=${req.params.id}`));
    }

    if (!document) {
        return next(new BadRequestError(404, "Contact not found"));
    }

    return res.send({ message: "Contact was deleted successfully", });
};

exports.deleteAll = async(req, res, next) => {
    const [error, data] = await handlerPromise(
        Contact.deleteMany({ })
    );

    if (error) {
        return next(new BadRequestError(500,
            "Anerror occurred while removing all contacts"));
    }

    return res.send({
        message: `${data.deletedCount} contacts were deleted successfully`,
    });
};

exports.findAllFavorrite = async (req, res, next) => {
    conts [error, document] = await handlerPromise(
        contacct.find({favorite: true,})
    );

    if(error){
        return next(new BadRequestError(500,
            "An error occurred while retrieving favorite contacts"));
    }

    return res.send(document);
};