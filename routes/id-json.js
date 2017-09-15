"use strict"

const express = require('express')
const router = express.Router()
const models = require('../models')

const re = /\d+/

router.get('/:id', (req, res, next) => {
  let jsonArticle

  if (re.test(req.params.id)) {
    models.bbs.findById(req.params.id, {
      attributes: ['id', 'text', 'replyto', 'date', 'color', 'icon']
    }).then((article) => {
      jsonArticle = JSON.stringify(article)
    }).then(() => {
      res.json(jsonArticle)
    }).catch((e) => {
      if(e) res.json(e)
    })
  } else {
    res.send('not decimal')
  }
})

module.exports = router
