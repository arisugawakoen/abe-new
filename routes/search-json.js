"use strict"

const express = require('express')
const router = express.Router()
const models = require('../models')

function escapeJsHTML(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/(0x0D)/g, '\r')
    .replace(/(0x0A)/g, '\n')
}

router.post('/', (req, res) => {
  let jsonArticles
  const searchQuery = req.body.query ? escapeJsHTML(req.body.query) : ''

  if (searchQuery) {
    const searchLike = `%${searchQuery}%`

    models.bbs.findAll({
      where: {
        text: { $like: searchLike }
      },
      order: 'id DESC',
      attributes: ['id', 'text', 'replyto', 'date', 'color', 'icon']
    }).then((articles) => {
      jsonArticles = JSON.stringify(articles)
    }).then(() => {
      res.json(jsonArticles)
    }).catch((e) => {
      if(e) res.json(e)
    })
  } else {
    res.send('query nothing')
  }  
})


module.exports = router
