"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.resolvers = void 0;
const resolvers = {
  SearchHistory: {
    me: (parent, args, context, info) => {
      let hei = "test";

      if (typeof context.userid != 'undefined') {
        hei += context.userid;
      }

      console.log("resolver response");
      return hei;
    }
  }
};
exports.resolvers = resolvers;