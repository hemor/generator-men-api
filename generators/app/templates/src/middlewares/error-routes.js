'use strict';

function badRequest(req, res) {
  res.status(400)
    .json({
      status: 'error',
      error: {
        code: 400,
        message: 'Bad Request'
      }
    });
};

function unauthorized(req, res) {
  res.status(401)
    .json({
      status: 'error',
      error: {
        code: 401,
        message: 'Unauthorized Request'
      }
    });
};

function pageNotFound(req, res) {
  res.status(404)
    .json({
      status: 'error',
      error: {
        code: 404,
        message: 'Page Not Found'
      }
    });
};


module.exports = {
  badRequest,
  unauthorized,
  pageNotFound
};
