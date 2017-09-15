'use strict';
module.exports = function(sequelize, DataTypes) {
  var bbs = sequelize.define('bbs', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    replyto: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return bbs;
};
