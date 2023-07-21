
const Comic = require('../models/comic.model');
const Comment = require('../models/comment.model');
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

    comment(req, res) {
        const id_comic = req.params.id;
        const data = req.body;
        data.id_comic = id_comic;
        console.log(data);
        Comment.create(data).then((rs) => res.json(rs)).catch((err) => res.json(err));
    }
    readComment(req, res) {
        const id_comic = req.params.id;
        Comment.find({id_comic:id_comic}).then((rs) => res.json(rs)).catch((err) => res.json(err));
    }
}





module.exports = new ApiController;