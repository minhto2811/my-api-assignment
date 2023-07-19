
const { request } = require('express');
const Comic = require('../models/comic.model');
const { uploadImageToFirestore } = require('../configs/firestore.configs');

class ApiController {
    listComic(req, res) {
        Comic.find()
            .then((rs) => {
                const comics = rs.map((comic) => comic.toObject());
                res.json(comics);
            }).catch((err) => res.json(err));
    }

    home(req, res) {
        Comic.find()
            .then((rs) => {
                const comics = rs.map((comic) => comic.toObject());
                res.render('comic-home', { comics })
            }).catch((err) => res.json(err));
    }

    add(req, res) {
        res.render('comic-add');
    }

    async addNew(req, res) {
        const uploadedUrls = await Promise.all(req.files.map(uploadImageToFirestore));
        const obj = req.body;
        obj.avatar = uploadedUrls[0];
        uploadedUrls.shift();
        obj.image = uploadedUrls;
        console.log(obj);
        Comic.create(obj).then((rs) => res.redirect('/comic/home')).catch((err) => { res.json(err) });
    }
}





module.exports = new ApiController;