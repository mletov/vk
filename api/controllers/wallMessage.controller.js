const express = require("express");
const mongoose = require("mongoose");
const app = express();
const wallMessageModel = require("../../models/wallMessage.model.js");


exports.insert = (req, res) => {
    wallMessageModel.create(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
 };

 exports.getById = (req, res) => {
    wallMessageModel.findById(req.params.id).then((result) => {
        res.status(200).send(result);
    });
 };

 exports.removeById = (req, res) => {
    wallMessageModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
 };

 exports.patchById = (req, res) => {
    wallMessageModel.patch(req.params.id, req.body)
    .then((result) => {
        res.status(201).send({id: result._id});
    });
 };

 exports.list = (req, res) => {

    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    wallMessageModel.list(limit, page).then((result) => {
        res.status(200).send(result);
    });
    
 };