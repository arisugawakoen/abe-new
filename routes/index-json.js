'use strict'

const express = require('express')
const router = express.Router()
const models = require('../models')

const re = /\d+/

// escape JavaScript and HTML

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

function findAllJson(res, Offset, Limit) {
  let jsonArticles

  models.bbs.findAll({
    offset: Offset,
    limit: Limit,
    order: 'id DESC',
    attributes: ['id', 'text', 'replyto', 'date', 'color', 'icon']
  }).then((articles) => {
    jsonArticles = JSON.stringify(articles)
  }).then(() => {
    res.json(jsonArticles)
  }).catch((e) => {
    if(e) res.json(e)
  })
}

router.get('/:offset(\\d+)/:limit(\\d+)', (req, res, next) => {
  const offset = parseInt(req.params.offset)
  const limit = parseInt(req.params.limit)

  findAllJson(res, offset, limit)
})

router.get('/', (req, res, next) => {
  const offset = 0
  const limit = 30
  findAllJson(res, offset, limit)
})

router.post('/', (req, res, next) => {
  const replyNo = (re.test(req.body.replyto)) ? req.body.replyto : null
  const text = req.body.text ? escapeJsHTML(req.body.text) : ''
  const color = req.body.color ? escapeJsHTML(req.body.color) : ''
  const icon = req.body.icon ? escapeJsHTML(req.body.icon) : ''

  models.bbs.create({
    text: text,
    replyto: replyNo,
    date: Date(),
    color: color,
    icon: icon,
  }).then(() => {
    res.send('ok')
  }).catch((e) => {
    res.send('ng')
    console.log(e)
  })
})

module.exports = router
