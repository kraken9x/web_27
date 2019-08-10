//MongoDB

//mongo ->>
//->>
//show dbs
//->>
//use db_name

//GHI
//db.(collection_name).insertOne({});


//DOC
//db.collection_name.find({});

//db.collection_name.find({"age" : 22})

//-----------

//db.collection_name.findOne({dieu kien});
//neu co nhieu document dc tra ve thoa man dieu kien, chi tra ve document dau tien


//SUA
//db.collection_name.updateOne({'age':22, 'name': 'Peter'}, {$set:{'age':22, 'name':'Peter'}})
//Object dau tien trong ham updateOne la dieu kien
//Object thu 2 la update nhung document thoa man dieu kien

//db.collection_name.updateMany({dieu kien}, {$set: {...}});


//XOA
//db.collection_name.deleteOne({dieu kien});
//db.collection_name.deleteMany({dieu kien});