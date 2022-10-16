var express = require('express');
var artistRouter = require('./artistRoutes');
var contactRouter = require('./contactRouter');
var bannerRouter = require('./bannerRoutes');
var artistImageRouter = require('./artistImageRouter');
var artistImageRouterKid = require('./artistImageRouterKid');
var artistRouterKid = require('./artistRoutesKid');
var keywordRouter = require('./keywordRouter');
var keywordRouterKid = require('./keywordRouterKid');
var AdminRouter = require('./adminRouter');
var bipocRouter = require('./bipocRouter')
var worldDataRouter = require('./worldDataRouter')


const rootRouter = express.Router()

rootRouter.use('/artistUser',artistRouter);
rootRouter.use('/contact',contactRouter);
rootRouter.use('/banner',bannerRouter);
rootRouter.use('/artistImage',artistImageRouter);
rootRouter.use('/keyword',keywordRouter);
rootRouter.use('/Admin',AdminRouter); 
rootRouter.use('/bipoc',bipocRouter);
rootRouter.use('/worldData',worldDataRouter);
//kidShanon
rootRouter.use('/artistImageKid',artistImageRouterKid);
rootRouter.use('/artistUserKid',artistRouterKid);
rootRouter.use('/keywordKid',keywordRouterKid);

module.exports = rootRouter;

 