module.exports = ({ router, Controllers, Middlewares }) => {
  let { User } = Controllers;
  let { Auth } = Middlewares;

  router.get("/", User.findAllView);
  
  return router;
};
