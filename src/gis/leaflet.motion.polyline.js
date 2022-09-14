/**
 * leaflet{intl.get('COMM.TRACK_PLAYBACK')}、动态绘制
 */
import L from 'leaflet';

class MotionPolyline {
  constructor(
    map,
    coord,
    dataMap,
    dimValues,
    id,
    paramStyle,
    popupConfig,
    canvasInfo,
    popupFunc,
    handleFunc
  ) {
    this.map = map;
    this.coord = coord || [];
    this.dataMap = dataMap;
    this.dimValues = dimValues;
    this.timer = null;
    this.coordIndex = 0;
    this.id = id;
    this.paramStyle = paramStyle;
    this.playbackStyle = {
      circleStyle: {},
      polylineStyle: {},
      scopeStyle: {},
    };
    // eslint-disable-next-line new-cap
    this.scopeCircle = null; // {intl.get('COMM.RANGE_CIRCLE')}
    this.popupConfig = popupConfig;
    this.popupFunc = popupFunc;
    this.handleFunc = handleFunc;
    this.canvasInfo = canvasInfo;
  }

  init() {
    this.handleParseJSON();
    this.drawScopeCircle();

    this.timer = setInterval(() => {
      if (this.coordIndex >= this.coord.length) {
        clearInterval(this.timer);
        return void 0;
      }
      this.scopeCircleMove();
      this.drawPolyline();
      this.drawCircle();
      this.coordIndex++;
    }, 300);
  }

  clearMotion() {
    clearInterval(this.timer);
    this.map.eachLayer(
      layer => layer.__motion_marker === this.id && this.map.removeLayer(layer)
    );
  }

  drawPolyline() {
    if (this.coordIndex > 0) {
      const lat = this.coord[this.coordIndex][0];
      const lng = this.coord[this.coordIndex][1];
      const prevLat = this.coord[this.coordIndex - 1][0];
      const prevLng = this.coord[this.coordIndex - 1][1];
      const latlngs = [[prevLat, prevLng], [lat, lng]];
      const motionPolyline = L.polyline(
        latlngs,
        this.playbackStyle.polylineStyle
      ).addTo(this.map);
      motionPolyline.__motion_marker = this.id;
    }
  }

  drawCircle() {
    const lat = this.coord[this.coordIndex][0];
    const lng = this.coord[this.coordIndex][1];

    const motionCircle = L.circleMarker(
      [lat, lng],
      this.playbackStyle.circleStyle
    ).addTo(this.map);

    motionCircle.__motion_marker = this.id;

    // {intl.get('COMM.BPP')}
    const pop = this.renderPopup();
    motionCircle.bindPopup(pop).on('click', () => {
      this.handleFunc(pop, this.map);
    });
  }

  // intl.get('COMM.RCM')
  scopeCircleMove() {
    this.scopeCircle &&
      this.coordIndex > 0 &&
      this.scopeCircle.setLatLng([
        this.coord[this.coordIndex][0],
        this.coord[this.coordIndex][1],
      ]);
  }

  drawScopeCircle() {
    this.scopeCircle = L.circle(
      [this.coord[0][0], this.coord[0][1]],
      this.playbackStyle.scopeStyle
    );
    this.scopeCircle.addTo(this.map);
    this.scopeCircle.__motion_marker = this.id;
  }

  // intl.get('CON.ANALYSIS')json轨迹样式
  handleParseJSON() {
    let payload = {};

    if (this.paramStyle) {
      try {
        payload = JSON.parse(this.paramStyle);
      } catch (e) {}
    }

    const {
      circleRaidus,
      circleFillColor,
      circleColor,
      circleWeight,
      circleFillOpacity,
      polylineWeight,
      polylineOpacity,
      polylineColor,
      scopeRaidus,
      scopeFillColor,
      scopeColor,
      scopeWeight,
      scopeFillOpacity,
    } = payload;
    let { circleStyle, polylineStyle, scopeStyle } = this.playbackStyle;

    circleStyle.radius = circleRaidus || 5; // {intl.get('COMM.PIXEL')}
    circleStyle.fillColor = circleFillColor || '#f30';
    circleStyle.color = circleColor || '#666';
    circleStyle.weight = circleWeight || 1;
    circleStyle.fillOpacity = circleFillOpacity || 1;

    polylineStyle.weight = polylineWeight || 1;
    polylineStyle.opacity = polylineOpacity || 0.6;
    polylineStyle.color = polylineColor || 'blue';

    scopeStyle.radius = scopeRaidus || 200000; // {intl.get('COMM.RICE')}
    scopeStyle.fillColor = scopeFillColor || 'yellow';
    scopeStyle.color = scopeColor || '#666';
    scopeStyle.weight = scopeWeight || 0;
    scopeStyle.fillOpacity = scopeFillOpacity || 0.3;
  }

  // intl.get('COMM.CPI')
  renderPopup() {
    const key = this.dimValues[this.coordIndex];
    const dataArray = this.dataMap.get(key);

    return this.popupFunc(
      {
        ...this.popupConfig,
        dataArray,
      },
      this.canvasInfo
    );
  }
}

export default MotionPolyline;
