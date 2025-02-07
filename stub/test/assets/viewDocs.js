var ddoc = {
  _id: "_design/submission-people",
  views: {},
};

ddoc.views.by_email = {
  map: function (doc) {
    if (!doc.application) return;
    if (!doc.application.email) return;
    emit(doc.application.email, null);
  }
};

module.exports = ddoc;

