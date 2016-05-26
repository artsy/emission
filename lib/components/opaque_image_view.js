/* @flow */
'use strict';

import React from 'react';
import {
  processColor,
  requireNativeComponent,
  ColorPropType,
  PixelRatio,
  StyleSheet
} from 'react-native';

import colors from '../../data/colors';

const GeminiHost = 'd7hftxdivxxvm.cloudfront.net';
const ImageQuality = 85;

export default class OpaqueImageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Unless `aspectRatio` was not specified at all, default the ration to 1 to prevent illegal layout calculations.
  aspectRatio() {
    const ratio = this.props.aspectRatio;
    return ratio === undefined ? undefined : (ratio || 1);
  }

  imageURL() {
    if (this.aspectRatio()) {
      return `https://${GeminiHost}/?resize_to=fit&width=${this.state.width}&height=${this.state.height}&quality=${ImageQuality}&src=${encodeURIComponent(this.props.imageURL)}`;
    } else {
      return this.props.imageURL;
    }
  }

  onLayout(event) {
    const { width, height } = event.nativeEvent.layout;
    this.setState({
      width: width * PixelRatio.get(),
      height: height * PixelRatio.get(),
    });
  }

  render() {
    const isLaidOut = !!(this.state.width && this.state.height);
    const { style, placeholderBackgroundColor, ...props } = this.props;

    Object.assign(props, {
      aspectRatio: this.aspectRatio(),
      imageURL: isLaidOut ? this.imageURL() : null,
      onLayout: isLaidOut ? null : this.onLayout.bind(this),
    });

    // If no imageURL is given at all, simply set the placeholder background color as a view backgroundColor style so
    // that it shows immediately.
    let backgroundColorStyle = null;
    if (this.props.imageURL) {
      props.placeholderBackgroundColor = processColor(placeholderBackgroundColor);
    } else {
      backgroundColorStyle = { backgroundColor: placeholderBackgroundColor };
    }

    return <NativeOpaqueImageView style={[style, backgroundColorStyle]} {...props} />;
  }
}

OpaqueImageView.propTypes = {
  /**
   * The URL from where to fetch the image.
   */
  imageURL: React.PropTypes.string,

  /**
   * An aspect ratio created with: width / height.
   *
   * When specified:
   * - The view will be sized in such a way that it maintains the aspect ratio of the image.
   * - The imageURL will be modified so that it resizes the image to the exact size at which the view has been laid out,
   *   thus never fetching more data than absolutely necessary.
   */
  aspectRatio: React.PropTypes.number,

  /**
   * A callback that is called once the image is loaded.
   */
  onLoad: React.PropTypes.func,

  placeholderBackgroundColor: ColorPropType,
};

OpaqueImageView.defaultProps = {
  placeholderBackgroundColor: colors['gray-regular'],
};

const NativeOpaqueImageView = requireNativeComponent('AROpaqueImageView', OpaqueImageView);
