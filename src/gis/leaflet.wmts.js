/**
 * WMTS{intl.get('EVEN.SERVICE')}
 */
import L from 'leaflet';

L.TileLayer.WMTS = L.TileLayer.extend({
  options: {
    version: '1.0.0',
    style: 'default',
    tilematrixSet: '',
    format: 'image/png',
    tileSize: 256,
    layer: '',
  },

  initialize: function(url, options) {
    this._url = url;
    L.setOptions(this, options);
  },
  getParamString: function(obj, existingUrl, uppercase) {
    let params = [];
    for (let i in obj) {
      params.push((uppercase ? i.toUpperCase() : i) + '=' + obj[i]);
    }
    return (
      (!existingUrl || existingUrl.indexOf('?') === -1 ? '?' : '&') +
      params.join('&')
    );
  },
  getTileUrl: function(coords) {
    let zoom = this._getZoomForUrl();
    if (this.options.zOffset) zoom = zoom + this.options.zOffset;

    let ident;
    if (this.options.matrixIds) ident = this.options.matrixIds[zoom];
    else if (this.options.tilematrixBefore)
      ident = this.options.tilematrixBefore + zoom;
    else ident = zoom;

    let url = L.Util.template(this._url, { s: this._getSubdomain(coords) });
    let obj = {
      service: 'WMTS',
      request: 'GetTile',
      version: this.options.version,
      style: this.options.style,
      tilematrixSet: this.options.tilematrixSet,
      format: this.options.format,
      width: this.options.tileSize,
      height: this.options.tileSize,
      layer: this.options.layer,
      tilematrix: ident,
      tilerow: coords.y,
      tilecol: coords.x,
    };
    return url + this.getParamString(obj, url);
  },
});

L.tileLayer.wmts = function(url, options) {
  return new L.TileLayer.WMTS(url, options);
};
