
const express = require("express");
const db = require("../testdb");
const config = require("../config");
const Sequelize = require('sequelize');
const router = express.Router();
const mysql2 = require('mysql2');
const moment = require('moment');
require('moment-timezone');

const seq = new Sequelize('test','user','user',
        {
        'host':'localhost',
        'dialect':'mysql'
        }

);

const stress = seq.define('Stress',{
		      user: {
		        type: Sequelize.DOUBLE,
		  	primaryKey: true,
		        autoIncrement:true,
		      	allowNull: false,
   			unique: true
		      		},
		      stressLv:{
		        type: Sequelize.INTEGER,
			allowNull: false
		      		}
		});

const inliving  = seq.define('Inliving',{
                  chi:{
                        type: Sequelize.BOOLEAN,
                        allowNull: false
                                },
                  liv:{
                        type: Sequelize.BOOLEAN,
                        allowNull: false
                                },
                  ins:{
                        type: Sequelize.BOOLEAN,
                        allowNull: false
                                },
                  vih:{
                        type: Sequelize.BOOLEAN,
                        allowNull: false
                                },
                  off:{
                        type: Sequelize.BOOLEAN,
                        allowNull: false
                                },
                  cho:{
                        type: Sequelize.BOOLEAN,
                        allowNull: false
                              }
		});

	stress.associsate = function(seq){
		seq.Stresses.hasMany(seq.Inliving, {
	            foreignKey: 'user',
	            onDelete: 'cascade'
       		 });
		}
	inliving.associate = function(seq){
		seq.Inliving.belongsTo(seq.Stresses, {
		    foreignKey: 'user',
	            onDelete: 'cascade'
        	});
	}

moment.tz.setDefault("Asia/Seoul");


router.get("/",(req,res) =>{
var date = moment().format('YYYYMMDDHHmmss');
var msg = ''
	seq.sync()
		.then(()=>{
			console.log('sync sucess');
			})
		.catch(err =>{
			console.error(err);
			console.log('sync error');
			});
//	db((err,connection)=>{
	seq
		.authenticate()
			.then(()=>{
				console.log('DB connected');
			})

			.catch(err=>{
				console.log('Connection fail : ',err);
			});

   		stress.create({user: date*1, stressLv:5})
				.then(result =>{
					console.log('stress insert sucess');
					msg= msg.concat(result);
					})
				.catch(err =>{
					console.error(err);
					});

                inliving.create({chi:1,liv:1,ins:1,vih:1,off:1,cho:1})
                                .then(result =>{
                                        console.log('inliving insert sucess');
                                        msg = msg.concat(result);
                                        })
                                .catch(err =>{
                                        console.error(err);
                                        });
		res.json(msg);

	    });
//	});

module.exports = router;
