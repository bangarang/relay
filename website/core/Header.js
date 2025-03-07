/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Header
*/

const React = require('React');

const Header = React.createClass({
  slug: function(string) {
    //  var accents = "àáäâèéëêìíïîòóöôùúüûñç";
    const accents = "\u00e0\u00e1\u00e4\u00e2\u00e8"
      + "\u00e9\u00eb\u00ea\u00ec\u00ed\u00ef"
      + "\u00ee\u00f2\u00f3\u00f6\u00f4\u00f9"
      + "\u00fa\u00fc\u00fb\u00f1\u00e7";

    const without = "aaaaeeeeiiiioooouuuunc";

    return string
      .toString()

      // Handle uppercase characters
      .toLowerCase()

      // Handle accentuated characters
      .replace(
        new RegExp('[' + accents + ']', 'g'),
        function (c) { return without.charAt(accents.indexOf(c)); })

      // Dash special characters
      .replace(/[^a-z0-9]/g, '-')

      // Compress multiple dash
      .replace(/-+/g, '-')

      // Trim dashes
      .replace(/^-|-$/g, '');
  },

  render: function() {
    const slug = this.slug(this.props.toSlug || this.props.children);
    const Heading = 'h' + this.props.level;

    return (
      <Heading {...this.props}>
        <a className="anchor" name={slug}></a>
        {this.props.children}
        {' '}<a className="hash-link" href={'#' + slug}>#</a>
      </Heading>
    );
  }
});

module.exports = Header;
