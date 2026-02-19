const Entity = require("../models/user");

async function create(data){
  const entity = await Entity.create(data);
  return entity;
}

async function find(data){
  const entities = await Entity.find(data);
  return entities;
}

async function get(id){
  const entity = await Entity.findById(id);
  return entity;
}

async function update(id,data){
  const entity = await Entity.findByIdAndUpdate(id,data);
  return entity;
}

async function remove(id){
  await Entity.findByIdAndDelete(id);
  return true;
}

module.exports = {create, get, find, update, remove};