'use strict';

function badRequest(req, res) {
  res.status(400)
    .json({
      ok: false,
      status: 400,
      message: 'Bad Request',
      data: {}
    });
};

function unauthorized(req, res) {
  res.status(401)
    .json({
      ok: false,
      status: 401,
      message: 'Unauthorized Request',
      data: {}
    });
};

function pageNotFound(req, res) {
  res.status(404)
    .json({
      ok: false,
      status: 404,
      message: 'Page Not Found',
      data: {}
    });
};


module.exports = {
  badRequest,
  unauthorized,
  pageNotFound
};
