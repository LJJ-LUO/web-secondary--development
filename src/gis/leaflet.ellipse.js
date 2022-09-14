/**
 * leaflet{intl.get('COMM.DRAW_ELLIPSE')}
 */
import L from 'leaflet';

L.SVG.include({
  _updateEllipse: function(layer) {
    let rx = layer._radiusX;
    let ry = layer._radiusY;
    let phi = layer._tiltDeg;
    let endPoint = layer._endPointParams;

    let d = `M${endPoint.x0},${endPoint.y0}A${rx},${ry},${phi},${
      endPoint.largeArc
    },${endPoint.sweep},${endPoint.x1},${endPoint.y1}, z`;

    this._setPath(layer, d);
  },
});

L.Canvas.include({
  _updateEllipse: function(layer) {
    if (layer._empty()) {
      return;
    }

    let p = layer._point;
    let ctx = this._ctx;
    let r = layer._radiusX;
    let s = (layer._radiusY || r) / r;

    this._drawnLayers[layer._leaflet_id] = layer;

    ctx.save();

    ctx.translate(p.x, p.y);
    if (layer._tilt !== 0) {
      ctx.rotate(layer._tilt);
    }
    if (s !== 1) {
      ctx.scale(1, s);
    }

    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.restore();

    this._fillStroke(ctx, layer);
  },
});

L.Ellipse = L.Path.extend({
  options: {
    fill: true,
    startAngle: 0,
    endAngle: 359.9,
  },

  initialize: function(latlng, radii, tilt, options) {
    L.setOptions(this, options);
    this._latlng = L.latLng(latlng);

    if (tilt) {
      this._tiltDeg = tilt;
    } else {
      this._tiltDeg = 0;
    }

    if (radii) {
      this._mRadiusX = radii[0];
      this._mRadiusY = radii[1];
    }
  },

  setRadius: function(radii) {
    this._mRadiusX = radii[0];
    this._mRadiusY = radii[1];
    return this.redraw();
  },

  getRadius: function() {
    // eslint-disable-next-line new-cap
    return new L.point(this._mRadiusX, this._mRadiusY);
  },

  setTilt: function(tilt) {
    this._tiltDeg = tilt;
    return this.redraw();
  },

  getBounds: function() {
    let lngRadius = this._getLngRadius();
    let latRadius = this._getLatRadius();
    let latlng = this._latlng;

    return new L.LatLngBounds(
      [latlng.lat - latRadius, latlng.lng - lngRadius],
      [latlng.lat + latRadius, latlng.lng + lngRadius]
    );
  },

  setLatLng: function(latlng) {
    this._latlng = L.latLng(latlng);
    this.redraw();
    return this.fire('move', { latlng: this._latlng });
  },

  getLatLng: function() {
    return this._latlng;
  },

  setStyle: L.Path.prototype.setStyle,

  _project: function() {
    let lngRadius = this._getLngRadius();
    let latRadius = this._getLatRadius();
    let latlng = this._latlng;
    let pointLeft = this._map.latLngToLayerPoint([
      latlng.lat,
      latlng.lng - lngRadius,
    ]);
    let pointBelow = this._map.latLngToLayerPoint([
      latlng.lat - latRadius,
      latlng.lng,
    ]);

    this._point = this._map.latLngToLayerPoint(latlng);
    this._radiusX = Math.max(this._point.x - pointLeft.x, 1);
    this._radiusY = Math.max(pointBelow.y - this._point.y, 1);
    this._tilt = (Math.PI * this._tiltDeg) / 180;
    this._endPointParams = this._centerPointToEndPoint();
    this._updateBounds();
  },

  _updateBounds: function() {
    let sin = Math.sin(this._tilt);
    let cos = Math.cos(this._tilt);
    let sinSquare = sin * sin;
    let cosSquare = cos * cos;
    let aSquare = this._radiusX * this._radiusX;
    let bSquare = this._radiusY * this._radiusY;
    let halfWidth = Math.sqrt(aSquare * cosSquare + bSquare * sinSquare);
    let halfHeight = Math.sqrt(aSquare * sinSquare + bSquare * cosSquare);
    let w = this._clickTolerance();
    let p = [halfWidth + w, halfHeight + w];
    this._pxBounds = new L.Bounds(this._point.subtract(p), this._point.add(p));
  },

  _update: function() {
    if (this._map) {
      this._updatePath();
    }
  },

  _updatePath: function() {
    this._renderer._updateEllipse(this);
  },

  _getLatRadius: function() {
    return (this._mRadiusY / 40075017) * 360;
  },

  _getLngRadius: function() {
    return (
      ((this._mRadiusX / 40075017) * 360) /
      Math.cos((Math.PI / 180) * this._latlng.lat)
    );
  },

  _centerPointToEndPoint: function() {
    let c = this._point;
    let rx = this._radiusX;
    let ry = this._radiusY;
    let theta2 =
      (this.options.startAngle + this.options.endAngle) * (Math.PI / 180);
    let theta1 = this.options.startAngle * (Math.PI / 180);
    let delta = this.options.endAngle;
    let phi = this._tiltDeg * (Math.PI / 180);

    let x0 =
      c.x +
      Math.cos(phi) * rx * Math.cos(theta1) +
      Math.sin(-phi) * ry * Math.sin(theta1);
    let y0 =
      c.y +
      Math.sin(phi) * rx * Math.cos(theta1) +
      Math.cos(phi) * ry * Math.sin(theta1);

    let x1 =
      c.x +
      Math.cos(phi) * rx * Math.cos(theta2) +
      Math.sin(-phi) * ry * Math.sin(theta2);
    let y1 =
      c.y +
      Math.sin(phi) * rx * Math.cos(theta2) +
      Math.cos(phi) * ry * Math.sin(theta2);

    let largeArc = delta > 180 ? 1 : 0;
    let sweep = delta > 0 ? 1 : 0;

    return {
      x0: x0,
      y0: y0,
      tilt: phi,
      largeArc: largeArc,
      sweep: sweep,
      x1: x1,
      y1: y1,
    };
  },

  _empty: function() {
    return (
      this._radiusX &&
      this._radiusY &&
      !this._renderer._bounds.intersects(this._pxBounds)
    );
  },

  _containsPoint: function(p) {
    let sin = Math.sin(this._tilt);
    let cos = Math.cos(this._tilt);
    let dx = p.x - this._point.x;
    let dy = p.y - this._point.y;
    let sumA = cos * dx + sin * dy;
    let sumB = sin * dx - cos * dy;
    return (
      (sumA * sumA) / (this._radiusX * this._radiusX) +
        (sumB * sumB) / (this._radiusY * this._radiusY) <=
      1
    );
  },
});

L.ellipse = function(latlng, radii, tilt, options) {
  return new L.Ellipse(latlng, radii, tilt, options);
};
