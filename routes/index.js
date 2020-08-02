var express = require('express');
var router = express.Router();
const ALL_MODEL = require('../models/index');
const Todo = ALL_MODEL.Todo;
const TestMiddle = require('../middleware/TestMiddle');

/* GET home page. */
router.get('/', TestMiddle.fn, async function(req, res, next) {
  // await Todo.create({ title: "首頁用" });
  res.render('index', { title: 'Express' });
});

router.get('/todo', async (req, res, next) => {
  const resData = {};
  resData['title'] = 'TODO_CRUD';
  const currentTodos = await Todo.findAll();
  resData['todos'] = currentTodos;
  res.render('todos', resData);
});

router.post('/todo', async (req, res, next) => {
  await Todo.create({ title: req.body.newItem });
  res.redirect('/todo');
});

router.get('/delete/:id', async(req, res, next) => {
  await Todo.destroy({
    where: {
      id: req.params.id,
    }
  });
  res.redirect('/todo');
});

router.get('/edit/:id', async(req, res, next) => {
  const item = await Todo.findOne({
    where: {
      id: req.params.id,
    },
  });
  const resData = {};
  resData['title'] = '更新';
  resData['id'] = req.params.id;
  resData['item'] = item.title;
  res.render('edit', resData);
});

router.post('/update/:id', async(req, res, next) => {
  console.log('=========================> ', req.body.item);
  const item = await Todo.findOne({
    where: {
      id: req.params.id,
    },
  });
  await item.update({
    title: req.body.item,
  });
  res.redirect('/todo');
});

module.exports = router;
