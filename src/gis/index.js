import intl from 'react-intl-universal';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { message } from 'antd';
import { toJS } from 'mobx';
import { css } from 'emotion';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import '@supermap/iclient-leaflet/dist/iclient9-leaflet-es6.min';
import 'leaflet.chinatmsproviders';
import 'leaflet-draw';
import * as esri from 'esri-leaflet';
import 'proj4leaflet';
import 'leaflet.markercluster';
import HeatmapOverlay from './heatmap';
import Highcharts from 'highcharts';
import Highchart3D from 'highcharts/highcharts-3d';
import uuid from 'uuid/v4';
import cloneDeep from 'lodash.clonedeep';
import * as Constant from './analyzer_2/constant';
import * as Util from './analyzer_2/util';
import * as PopupTemplates from './template-pop-ups';
import { renderTemplate } from './template-bubble-popup';
import { renderPopoverTemplate } from './template-popover-popup';
import { renderCatalogTemplate } from './template-catalog-popup';
import {
  queryLngLatsByAddress,
  queryLngLatsByToken,
  getConditionData,
  getConditionDataByToken,
} from './common/service/new-analyzer';
import 'leaflet/dist/leaflet.css';
import '@supermap/iclient-leaflet/dist/iclient9-leaflet.min.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { loadJSON, gis_annotationTransform, GradientColor } from './utils';
// import { TIANDITU_KEY } from './common/Constant';
import GeoJSON from './maps/GeoJson';
import TreeLegend from './tree-legend';
import SearchFields from './search-fields';
import imgUrl from './images/marker.png';
import { playRTSP } from './rtsp';
import GISSelector from './gis-selector';
import MotionPolyline from './leaflet.motion.polyline';
import AnalyseEventHOC from './analyse-event/AnalyseEventHOC';
import CustomReactPopup from './canvasPopup';
import ReactDOMServer from 'react-dom/server';
import './leaflet.ellipse';
import './leaflet.wmts';
import './style.less';
import { hydrateRoot } from 'react-dom/client';
// import hydrateRoot from 'react-dom';

Highchart3D(Highcharts);

const TIANDITU_KEY = '393226a27031cf7b4358b7f0c9c37301';
L.TileLayer.ChinaProvider.providers.TianDiTu = {
  Normal: {
    Map:
      'http://t{s}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk={key}',
    Annotion:
      'http://t{s}.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk={key}',
  },
  Satellite: {
    Map:
      'http://t{s}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk={key}',
    Annotion:
      'http://t{s}.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk={key}',
  },
  Terrain: {
    Map:
      'http://t{s}.tianditu.gov.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk={key}',
    Annotion:
      'http://t{s}.tianditu.gov.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk={key}',
  },
  Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
  key: '174705aebfe31b79b3587279e211cb9a',
};

L.drawLocal.draw.toolbar.buttons = {
  polygon: intl.get('COMM.DRAW_POLYGON'),
  circle: intl.get('ANAL.PAINTINGGARDEN'),
  marker: intl.get('COMM.SIGN'),
  polyline: intl.get('COMM.DAP'),
  rectangle: intl.get('ANAL.DRAWRECTNGLE'),
};

L.drawLocal.draw.toolbar.actions = {
  text: intl.get('COMM.CANCEL'),
};

L.drawLocal.draw.toolbar.finish = {
  text: intl.get('COMM.COMPLETE'),
};

L.drawLocal.draw.toolbar.undo = {
  text: intl.get('COMM.DLP'),
};

L.drawLocal.draw.handlers.circle = {
  tooltip: {
    start: intl.get('COMM.CADTDAC'),
  },
  radius: intl.get('COMM.RADIUS'),
};

L.drawLocal.draw.handlers.marker = {
  tooltip: {
    start: intl.get('COMM.CTPTT'),
  },
};

L.drawLocal.draw.handlers.polygon = {
  tooltip: {
    start: intl.get('COMM.CTSD'),
    cont: intl.get('COMM.CTCD'),
    end: intl.get('COMM.CTFP'),
  },
};

L.drawLocal.draw.handlers.polyline = {
  tooltip: {
    start: intl.get('COMM.CTSDL'),
    cont: intl.get('COMM.CTCDL'),
    end: intl.get('COMM.CTLPTETLD'),
  },
};

L.drawLocal.draw.handlers.rectangle = {
  tooltip: {
    start: intl.get('COMM.CADTDAR'),
  },
};

L.drawLocal.edit.handlers.edit = {
  tooltip: {
    text: intl.get('COMM.DOTEL'),
  },
};

L.drawLocal.edit.handlers.remove = {
  tooltip: {
    text: intl.get('COMM.CALTRI'),
  },
};

L.drawLocal.edit.toolbar.actions = {
  save: {
    text: intl.get('COMM.PRESERVATION'),
  },
  cancel: {
    text: intl.get('COMM.CANCEL'),
  },
  clearAll: {
    text: intl.get('COMM.CLEAR_ALL'),
  },
};

L.drawLocal.edit.toolbar.buttons = {
  edit: intl.get('COMM.EDIT_LAYER'),
  editDisabled: intl.get('COMM.NLEA'),
  remove: intl.get('COMM.DELETE_LAYER'),
  removeDisabled: intl.get('COMM.NLATD'),
};

const CustomMarker = L.Icon.extend({
  options: {
    shadowUrl: null,
    iconAnchor: new L.Point(12, 12),
    iconSize: new L.Point(30, 30),
    iconUrl: imgUrl,
  },
});
class GISChart extends Component {
  static propTypes = {
    options: PropTypes.object,
    id: PropTypes.string,
    assetId: PropTypes.string,
    model: PropTypes.object,
    chartType: PropTypes.string,
    layers: PropTypes.array,
    token: PropTypes.string,
    from: PropTypes.string,
    setChartOptions: PropTypes.func,
    selectSeries: PropTypes.array,
    openFilter: PropTypes.bool,
    sheetIndex: PropTypes.number,
    condition: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    appVariables: PropTypes.array,
    sendComponentEvent: PropTypes.func,
    isApplication: PropTypes.bool,
  };

  map = null;
  layerData = [];
  markersArray = [];
  timingTimers = [];
  scrollKey = null;
  scrollValue = null;
  filterSeries = [];
  motionPolylineCases = [];
  currentClickMarker = null;
  customReactPopup = {};

  constructor(props) {
    super(props);



    this.state = {
      geoMap: new Map(),
      checkedList: props.options.checkedList || [],
    };
  }

  // state = {
  //   geoMap: new Map(),
  //   checkedList: this.props.options.checkedList || [],
  // };

  // geojson{intl.get('ANAL.TO_CONFIGURE')}
  geoJsonConfig = {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: 8,
        fillColor: '#ff7800',
        color: '#000',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      });
    },
    onEachFeature: function (feature, layer) {
      if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
      }
    },
  };

  // intl.get('COMM.RENDER_LAYER')：GeoJSON、ArcGIS、WMS
  handleRenderLayers = list => {
    const { layers } = this.props;
    if (list && list.length) {
      let _list = list.filter(
        item => item.split('#').length === 1 || item.split('#').length === 3
      );
      const paths = layers.filter(k =>
        _list.find(v => k.id && v.includes(k.id))
      );

      if (paths.length) {
        paths.forEach(item => {
          switch (item.type) {
            // GeoJSON
            case 3:
              let style = {};

              try {
                style = JSON.parse(item.layers);
              } catch (e) { }

              const layerGeo = L.geoJSON([], {
                ...this.geoJsonConfig,
                style: function () {
                  return style;
                },
              }).addTo(this.map);
              loadJSON([item], result => {
                result.forEach(k => {
                  if (k.status === 200) {
                    layerGeo.__GeoMarker = true;
                    layerGeo.addData(GeoJSON.decode(k.data));
                  }
                });
              });
              break;
            // ArcGIS
            case 4:
              let payloadArc = {
                url: item.path,
                opacity: 0.8,
                useCors: false,
                pane: 'markerPane',
                maxZoom: 19,
                minZoom: 0,
              };

              if (item.layers && item.layers.length) {
                payloadArc = Object.assign({}, payloadArc, {
                  layers: item.layers.slice().map(e => +e),
                });
              }

              const layerArcGIS = esri
                .dynamicMapLayer(payloadArc)
                .metadata(error => {
                  if (error) {
                    console.log(error);
                  }
                })
                .addTo(this.map);
              layerArcGIS.__ArcGISMarker = true;
              break;
            // WMS
            case 5:
              let payloadWMS = {};

              try {
                payloadWMS = JSON.parse(item.layers);
              } catch (e) {
                payloadWMS = {
                  layers: item.layers,
                  format: 'image/png',
                };
              }

              const layerWMS = L.tileLayer
                .wms(item.path, payloadWMS)
                .addTo(this.map);
              layerWMS.__WMSMarker = true;
              break;
            // WMS
            case 6:
              const layerWMTS = L.tileLayer
                .wmts(item.path, JSON.parse(item.layers))
                .addTo(this.map);
              layerWMTS.__WMSMarker = true;
              break;
            // {intl.get('ANAL.LABEL')}
            case 7:
              let payloadLabel = [];

              try {
                payloadLabel = JSON.parse(item.layers);
              } catch (e) { }

              payloadLabel.forEach(k => {
                const icon = L.divIcon({
                  html: `<span style="font-size: ${k?.size ||
                    24}px; line-height: 1; color: ${k?.color ||
                    '#fff'}; font-family: ${k?.fontFamily ||
                    'sans-serif'}; font-weight: ${k?.fontWeight ||
                    'normal'}">${k?.label || ''}</span>`,
                  iconSize: [k?.size || 30, k?.size || 30],
                });
                let marker = L.marker([+k?.lat, +k?.lng], { icon });
                marker.__GISLabel = true;
                marker.addTo(this.map);
              });

              break;
            default:
              break;
          }
        });
      }
    }
  };

  componentDidMount() {
    this.init();
    const { from, layers, options, setChartOptions } = this.props;
    if (from === 'analyzer' && layers.length === 0) {
      message.info(intl.get('COMM.AALITRA'));
    }
    // {intl.get('COMM.CWDBTL')}
    if (!options?.treeLegends) {
      let clone = toJS(options);
      clone.treeLegends = layers.map(({ id, name, icon }) => {
        let ID = id || uuid();
        return {
          ID,
          title: name,
          key: `0#0#${ID}`,
          icon,
        };
      });
      setChartOptions && setChartOptions(clone);
    }

    document.addEventListener("CUSTOM_EVENT", event => {
      const params = event.detail;
      switch (params?.marker) {
        // {intl.get('COMM.EDE')}
        case 'ellipse':
          this.drawEllipseByEvent(params);
          break;
        // {intl.get('COMM.RWEL')}
        case 'highlight':
          this.highlightMarker(params);
          break;
        // {intl.get('COMM.EPP')}
        case 'popover':
          this.handleEventPopover(params);
          break;
        default:
          this.drawFiltedLayer(params);
          break;
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.checkedList !== this.state.checkedList) {
      // {intl.get('ANAL.ELIMINATE')}markers, 城际不用
      const { options, chartType } = this.props;
      const {
        bgMap = Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_STANDARD,
      } = options;
      if (bgMap !== Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_CITY_GIS) {
        this.clearMapMarker();
      }
      if (chartType === '712' || chartType === '714') {
        // this.clearLayerMarker();
      }
      this.handleRenderLayers(this.state.checkedList);
    } else {
      this.props?.model && this.clearLayerMarker();
      this.debounceUpdate(prevProps, prevState);
    }
  }

  componentWillUnmount() {
    this.clearIntervalTiming();
    this.destroyMotionCase();
  }

  debounceFunc = async prevProps => {
    const { layers, options } = this.props;
    const prevOptions = prevProps.options;
    const propOptions = options;
    if (prevOptions.bgMap !== propOptions.bgMap) {
      this.clear(prevProps);
    } else {
      this.clearLayerMarker();
      this.clearMapMarker();
    }
    this.map && this.map.invalidateSize && this.map.invalidateSize(true);
    prevOptions.bgMap !== propOptions.bgMap && (await this.initBaseLayer());
    this.handleRenderLayers(this.state.checkedList);
    this.destroyMotionCase();
    if (layers.length === 0) {
      return;
    }
    this.findDataLayers();
  };

  debounceUpdate = debounce(async prevProps => {
    if (prevProps !== this.props) {
      const prevOptions = prevProps.options;
      const propOptions = this.props.options;
      // {intl.get('COMM.CWLANR')}
      if (
        !this.props.isApplication &&
        (prevOptions.showToolbar !== propOptions.showToolbar ||
          prevOptions.showRangeTool !== propOptions.showRangeTool ||
          prevOptions.marginRight !== propOptions.marginRight ||
          prevOptions.marginTop !== propOptions.marginTop ||
          prevOptions.showMapLegend !== propOptions.showMapLegend ||
          prevOptions.mapZoomLevel !== propOptions.mapZoomLevel ||
          prevOptions.searchLeft !== propOptions.searchLeft ||
          prevOptions.searchTop !== propOptions.searchTop ||
          prevOptions.filterRight !== propOptions.filterRight ||
          prevOptions.filterTop !== propOptions.filterTop ||
          prevOptions.searchBgColor !== propOptions.searchBgColor ||
          !isEqual(prevOptions.mapCenter, propOptions.mapCenter))
      ) {
        if (
          prevOptions.bgMap !== propOptions.bgMap ||
          this.props.sheetIndex !== prevProps.sheetIndex
        ) {
          this.debounceFunc(prevProps);
        }
      } else {
        this.debounceFunc(prevProps);
      }
    }
  }, 500);

  // intl.get('ANAL.ELIMINATE')markers, 城际不用
  clearLayerMarker = () => {
    this.map &&
      this.map.eachLayer(layer => {
        if (
          layer.__marker ||
          layer.__bubblePop ||
          layer.__GeoMarker ||
          layer.__ArcGISMarker ||
          layer.__heatmap ||
          layer.__scatter
        ) {
          layer && layer.closePopup && layer.closePopup();
          if (this.props.chartType === '711' && layer.__heatmap) {
          } else {
            setTimeout(() => {
              this.map.removeLayer(layer);
            }, 200);
          }
        }
      });
  };

  // 清除数据图层指定图层markers，{intl.get('SRC.TIMED_REFRESH')}
  clearMarkersByTiming = item => {
    const { options } = this.props;
    const { bgMap = Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_STANDARD } = options;
    if (bgMap !== Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_CITY_GIS) {
      this.map &&
        this.map.eachLayer(layer => {
          if (
            item.id &&
            (layer.__marker === item.id ||
              layer.__GISLabel === item.id ||
              layer.__heatmap === item.id ||
              layer.__scatter === item.id)
          ) {
            layer && layer.closePopup && layer.closePopup();
            this.map.removeLayer(layer);
          }
        });
    }
  };

  clearMapMarker = () => {
    this.map &&
      this.map.eachLayer(
        layer =>
          (layer.__GeoMarker ||
            layer.__ArcGISMarker ||
            layer.__WMSMarker ||
            layer.__GISLabel) &&
          this.map.removeLayer(layer)
      );
  };

  // intl.get('COMM.TIMER_CLEAR')
  clearIntervalTiming = () => {
    if (sessionStorage.timingTimers) {
      let _timingTimers = JSON.parse(sessionStorage.timingTimers);
      _timingTimers.filter(e => e).forEach(item => clearInterval(item.key));

      sessionStorage.removeItem('timingTimers');
    }
  };

  // intl.get('COMM.LRR')
  timingLayerData = (layers, checkedList) => {
    this.clearIntervalTiming();
    let timingTimers = sessionStorage.timingTimers
      ? JSON.parse(sessionStorage.timingTimers)
      : [];
    // {intl.get('COMM.FDTL')}
    let roundLayers = layers.filter(
      layer =>
        layer.category === 'data' &&
        layer.useTiming &&
        layer.timing &&
        checkedList.find(k => k.includes(layer.id))
    );


    if (roundLayers.length) {
      roundLayers.forEach(item => {
        timingTimers.push({
          id: item.id,
          key: setInterval(() => {
            this.loadSingleLayerData(item);
          }, item.timing * 1000 || 30000),
        });
      });

      sessionStorage.timingTimers = JSON.stringify(timingTimers);
    }
  };

  insterTileLayer = (path, key, maxZoom = 19, minZoom = 3) => {
    const baseMap = L.tileLayer.chinaProvider(path, {
      maxZoom,
      minZoom,
      key,
    });
    baseMap.__base = true;
    baseMap.addTo(this.map);
  };

  initBaseLayer = async () => {
    const { options } = this.props;
    const {
      bgMap = Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_STANDARD,
      mapCenter,
    } = options;
    this.map && this.map.remove ? this.map.remove() : (this.map = null);
    let registerMap = 'GaoDe.Normal.Map';
    if (bgMap === Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_DARK) {
      registerMap = 'Geoq.Normal.PurplishBlue';
    }
    if (bgMap === Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_SATELLITE) {
      registerMap = 'GaoDe.Satellite.Map';
    }
    // {intl.get('REPO.SKY_MAP')}
    if (bgMap === Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_TIANDISATELLITE) {
      registerMap = 'TianDiTu.Satellite.Map';
    }
    if (bgMap === Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_TIANDITERRAIN) {
      registerMap = 'TianDiTu.Terrain.Map';
    }

    if (bgMap === Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_ARCGIS) {
      const { arcService, mapZoomLevel } = options;
      const { url, origin, bounds, resolutions } = arcService;
      let crs = {
        resolutions,
        origin,
      };
      if (bounds) {
        crs.bounds = L.bounds(bounds.min, bounds.max);
      }
      // 默认为wgs84{intl.get('ANAL.COORDINATE_SYSTEM')}
      const CRS_4326 = new L.Proj.CRS(
        'EPSG:4326',
        '+proj=longlat +datum=WGS84 +no_defs',
        crs
      );
      this.map = L.map(this.mapElement, {
        crs: CRS_4326,
        minZoom: 1,
        maxZoom: resolutions ? resolutions.length - 1 : 14,
      }).setView(
        mapCenter ? [+mapCenter?.lat, +mapCenter?.lng] : [39.835689, 116.3386],
        mapZoomLevel || 1
      );
      const arcgisBase = esri.tiledMapLayer({
        url,
      });
      arcgisBase.__base = true;
      arcgisBase.addTo(this.map);
    } else if (bgMap === Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_TMS) {
      const { tmsService, mapZoomLevel } = options;
      const { url } = tmsService;
      const crs = L.CRS.EPSG3857;
      this.map = L.map(this.mapElement, {
        crs,
        minZoom: tmsService.minZoom || 3,
        maxZoom: tmsService.maxZoom || 14,
      }).setView(
        mapCenter ? [+mapCenter?.lat, +mapCenter?.lng] : [39.835689, 116.3386],
        mapZoomLevel || 4
      );
      let tmsLayer = L.tileLayer(url, {
        tms: tmsService.tmsUse,
        crossOrigin: true,
      });
      tmsLayer.__base = true;
      tmsLayer.addTo(this.map);
    } else {
      const { mapZoomLevel, mapCenter } = options;
      const center = mapCenter
        ? [mapCenter.lat, mapCenter.lng]
        : [39.835689, 116.3386];
      this.map = L.map(this.mapElement, {
        center,
        zoom: mapZoomLevel || 4,
        zoomControl: false,
      });

      if (bgMap === Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_SUPERMAP) {
        const { supermapService } = options;
        const { url } = supermapService;
        const superBase = L.supermap.tiledMapLayer(url);
        superBase.__base = true;
        superBase.addTo(this.map);
      } else if (
        bgMap === Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_TIANDISATELLITE ||
        bgMap === Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_TIANDITERRAIN
      ) {
        this.insterTileLayer(registerMap, TIANDITU_KEY);
        this.insterTileLayer('TianDiTu.Normal.Annotion', TIANDITU_KEY, 18);
      } else {
        this.insterTileLayer(registerMap);
      }
    }
    if (bgMap !== Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_CITY_GIS) {
      this.initToolbar(this.map);
      if (!this.props.isApplication) {
        this.map && this.map.on('zoom', this.zoomMoveChange);
        this.map && this.map.on('move', this.zoomMoveChange);
      }
    }
  };

  zoomMoveChange = () => {
    const { options } = this.props;
    const zoomLevel = this.map.getZoom();
    const mapCenter = this.map.getCenter();
    let clone = { ...toJS(options) };
    if (
      clone.mapZoomLevel === zoomLevel &&
      isEqual(clone.mapCenter, mapCenter)
    ) {
      return;
    }
    clone.mapZoomLevel = zoomLevel;
    clone.mapCenter = mapCenter;
    this.props.setChartOptions && this.props.setChartOptions(clone);
  };

  initLayers = async () => {
    const { checkedList } = this.state;
    const { layers } = this.props;
    if (layers.length === 0) {
      return;
    }
    this.clearLayerMarker();
    this.findDataLayers();
    if (checkedList.length) {
      this.handleRenderLayers(checkedList);
    }
  };

  init = async () => {
    const { options = {} } = this.props;
    const center = options.mapCenter
      ? [options.mapCenter.lat, options.mapCenter.lng]
      : [39.835689, 116.3386];
    await this.initMap(center);
    this.initLayers();
  };

  initMap = async center => {
    const { options } = this.props;
    const { bgMap = Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_STANDARD } = options;
    //  * {intl.get('COMM.IMCR')}
    if (bgMap !== Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_CITY_GIS) {
      this.map = L.map(this.mapElement, {
        center,
        zoom: options.mapZoomLevel || 4,
        zoomControl: false,
      });
    }
    this.map.getContainer().focus = () => { };
    await this.initBaseLayer();
  };

  initToolbar = map => {
    const editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);

    const options = {
      draw: {
        marker: {
          icon: new CustomMarker(),
        },
        polyline: {},
        polygon: {},
        circle: {},
        rectangle: {},
        remove: {},
      },
      edit: {
        featureGroup: editableLayers,
        remove: true,
      },
    };

    let drawControl = new L.Control.Draw(options);
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, e => {
      let { geoMap, checkedList } = this.state;
      const layerData = this.layerData;
      let drawLayer = e.layer;
      const { _mRadius, _latlng } = drawLayer;
      let layerType = e.layerType;
      if (layerType === 'circle') {
        layerData.forEach(item => {
          const { data, layer } = item;
          const { condition = {} } = layer;
          const header = data[0];
          const { columns = [] } = condition;
          if (layer.type === 1) {
            let column = layer.positionColumn;
            let displayName;
            const col = columns.find(c => c.col_name === column);
            displayName = col.col_alias || col.col_name;
            let valueMap = geoMap.get(column);
            const dimColIndex = header.findIndex(h => h === displayName);
            let source = data.slice(1);
            source = source.filter(row => {
              const address = row[dimColIndex];
              const latlng = valueMap ? valueMap.get(address) : false;
              if (!latlng) {
                return false;
              }
              const pointA = L.latLng(latlng[0], latlng[1]); // {intl.get('COMM.CPC')}A
              const pointB = L.latLng(_latlng.lat, _latlng.lng); // {intl.get('COMM.CPC')}B
              const distance = map.distance(pointA, pointB); // {intl.get('COMM.GTD')}
              return parseFloat(distance) > 0 ? distance < _mRadius : false;
            });

            if (source.length) drawLayer.noEmpty = true;

            this.markersArray.push({
              layer,
              data: [header, ...source],
              noLngLats: true,
            });
          } else if (layer.type === 2) {
            const latItem = columns.find(c => layer.latColumn === c.col_name);
            const lngItem = columns.find(c => layer.lanColumn === c.col_name);
            const latIndex = header.indexOf(
              latItem.col_alias || latItem.col_name
            );
            const lanIndex = header.indexOf(
              lngItem.col_alias || lngItem.col_name
            );
            let source = data.slice(1);
            source = source.filter(row => {
              const lat = row[latIndex];
              const lan = row[lanIndex];
              const pointA = L.latLng(lan, lat);
              const pointB = L.latLng(_latlng.lat, _latlng.lng);
              const distance = map.distance(pointA, pointB);
              return parseFloat(distance) > 0 ? distance < _mRadius : false;
            });

            if (source.length) drawLayer.noEmpty = true;

            this.markersArray.push({
              layer,
              data: [header, ...source],
              noLngLats: true,
            });
          }
          this.clearLayerMarker();
          this.markersArray.forEach(layerData => {
            this.drawLayerMarker(layerData, false, true);
          });
        });

        // {intl.get('COMM.RTDOTOL')}
        const _markersArray = this.markersArray.filter(item =>
          checkedList.find(k => k.includes(item.layer.id))
        );

        const customEvent = new CustomEvent('MAP_CIRCLE_EVENT', {
          detail: _markersArray,
        });
        document.dispatchEvent(customEvent);

        // {intl.get('COMM.COAM')}，方便删除识别
        drawLayer.hadDrawCircle = true;
      }
      editableLayers.addLayer(drawLayer);
    });

    map.on(L.Draw.Event.DELETED, ({ layers }) => {
      const { _layers } = layers;
      if (_layers) {
        let isDraw = Object.keys(_layers).filter(
          k => _layers[k].hadDrawCircle && _layers[k].noEmpty
        );

        if (isDraw.length || this.markersArray.length) {
          this.clearLayerMarker();
          this.layerData.forEach(layerData => {
            this.drawLayerMarker(layerData);
          });
          this.markersArray = [];
        }
      }
    });
  };

  componentDidCatch(error) {
    console.error(error);
  }

  clear = prevProps => {
    const { options: prevOptions } = prevProps;
    const { options: propOptions } = this.props;
    const {
      bgMap = Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_STANDARD,
    } = prevOptions;
    if (bgMap === Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_CITY_GIS) {
      this.mapElement &&
        this.mapElement.removeChild(document.getElementById('mapiframe'));
    } else {
      this.map &&
        this.map.eachLayer(layer => {
          if (prevOptions.bgMap !== propOptions.bgMap || !layer.__base) {
            this.map.removeLayer(layer);
          }
        });
    }
  };

  // intl.get('COMM.MBS')
  changeTileLayer = base => {
    if (base && typeof +base === 'number' && !isNaN(+base)) {
      switch (+base) {
        // {intl.get('COMM.STANDARD_DRAWING')}
        case 1:
          this.insterTileLayer('Geoq.Normal.PurplishBlue');
          break;
        // {intl.get('COMM.SATELLITE_MAP')}
        case 2:
          this.insterTileLayer('TianDiTu.Satellite.Map', TIANDITU_KEY);
          this.insterTileLayer('TianDiTu.Normal.Annotion', TIANDITU_KEY, 18);
          break;
        // {intl.get('COMM.TOPOGRAPHIC_MAP')}
        case 3:
          this.insterTileLayer('TianDiTu.Terrain.Map', TIANDITU_KEY);
          this.insterTileLayer('TianDiTu.Normal.Annotion', TIANDITU_KEY, 18);
          break;
        default:
          break;
      }
    }
  };

  // intl.get('COMP.LOGICAL_CONTROL')：过滤地图点位数据
  do_EventCenter_filterMap = param => {
    if (typeof param !== 'object') return void 0;
    const keys = Object.keys(param);
    let { condition } = this.props;
    let newColumns = toJS(condition.columns);
    let series = newColumns
      .map(k => {
        let current = toJS(k);
        const key = keys.find(m => m === k.col_name || m === k.column);
        if (key && param[key] && param[key] !== '') {
          current.filter = {
            column: key,
            compareObj: [...(current.compareObj || [])].concat(param[key]),
            datatype: 0,
            type: 37,
          };
          current.filters = [...(current.filters || []), current.filter];
          return current;
        }
        return undefined;
      })
      .filter(e => e);

    if (series) {
      this.clearLayerMarker();
      this.findDataLayers(series);
    }
  };

  drawFiltedLayer = async params => {
    const type = params.type;
    const base = params.base;
    const _checkedList = this.state.checkedList;
    const { layers } = this.props;
    // {intl.get('COMM.RCML')}，后期需优化
    if (params.eventType === 'scroll') {
      this.scrollKey = params.scrollKey;
      this.scrollValue = params.scrollValue;
    }

    this.changeTileLayer(base);
    if (!type || isNaN(type) || parseInt(type) > layers?.length) {
      return;
    }

    let currentLayer = layers[parseInt(type) - 1];
    let currentId = `0#0#${currentLayer.id}`;
    let index = _checkedList.findIndex(item => item === currentId);
    let data = [];

    this.clearMarkersByTiming(currentLayer);

    if (index >= 0) {
      _checkedList.splice(index, 1);
      this.setState({
        checkedList: _checkedList,
      });
    } else {
      this.setState({
        checkedList: [..._checkedList, currentId],
      });
      let db = await this.queryLayerData(currentLayer);
      data.push(db);
    }

    const { chartType } = this.props;

    switch (chartType) {
      case '712':
        this.drawHeatmap(data);
        break;
      case '713':
        this.drawCharts(data);
        break;
      case '714':
        this.drawScatters(data);
        break;
      default:
        this.drawMarkers(data);
    }
  };

  drawLayers = (source, chartType) => {
    const { checkedList } = this.state;
    const data = source.filter(({ layer }) =>
      checkedList.find(v => v.includes(layer.id))
    );
    switch (chartType) {
      case '712':
        this.drawHeatmap(data);
        break;
      case '713':
        this.drawCharts(data);
        break;
      case '714':
        this.drawScatters(data);
        break;
      default:
        this.drawMarkers(data);
    }
  };

  getLngLats = async layer => {
    let { geoMap } = this.state;
    const { token, id, assetId } = this.props;
    const post = token ? queryLngLatsByToken : queryLngLatsByAddress;
    let column = layer.positionColumn;
    let asset_id = layer.assetId;
    if (
      layer.condition &&
      layer.condition.associations &&
      layer.condition.associations.length > 0
    ) {
      asset_id = layer.positionColumn.split('#')[0];
      column = layer.positionColumn.split('#')[1];
    }
    try {
      const { data } = await post(
        asset_id || assetId,
        column,
        layer.analysisId || id,
        token
      );
      const gmap = data.map(val => {
        const name = val[0];
        let value = val[1].split(',');
        const result = value.map(v => +v).reverse();
        return [name, result];
      });
      geoMap.set(layer.positionColumn, new Map(gmap));
      this.setState({ geoMap });
      return Promise.resolve(geoMap);
    } catch (error) {
      console.error(error);
    }
  };

  beforeDraw = async ({ layer, data, noLngLats, cols }) => {
    const { options, chartType } = this.props;
    const { geoMap } = this.state;
    if (!data[0] || !data[0][0]) {
      return Promise.resolve(false);
    }
    const columns = layer.condition ? layer.condition.columns : cols || [];
    let column = '';
    let tData = null;

    const dim = columns.find(
      c =>
        c.inChart &&
        c.col_name !== column &&
        (Util.isText(c.col_datatype) || Util.isDate(c.col_datatype))
    );

    if (layer.category === 'data' && layer.type === 1) {
      column = layer.positionColumn;
      let value = geoMap.get(column);
      let reloadLngLats = false;

      // {intl.get('COMM.DWTCNTBR')}
      if (value && !noLngLats) {
        if (data.length - 1 !== value.size) {
          reloadLngLats = true;
        } else {
          for (let i = 1, len = data.length; i < len; i++) {
            if (data[i][0] && data[i][0] !== '' && !value.has(data[i][0])) {
              reloadLngLats = true;
              break;
            }
          }
        }
      }

      if (!value || reloadLngLats) {
        const newMap = await this.getLngLats(layer);
        value = newMap.get(column);
      }

      const item = columns.find(c => c.col_name === column);
      column = item.col_alias || item.col_name;
      // {intl.get('COMM.SCRSMOCD')}
      if (chartType === '713') {
        tData = Util.fromDataToChartLatLanData(
          data,
          value,
          columns,
          column,
          dim ? dim.col_alias || dim.col_name : null,
          options
        );
      } else {
        tData = Util.fromDataToLatLanData(
          data,
          value,
          column,
          options,
          layer,
          columns
        );
      }
    } else if (layer.category === 'data' && layer.type === 2) {
      if (chartType === '713' || chartType === '714') {
        tData = Util.fromDataToLatLanDataByChart(
          data,
          columns,
          layer,
          dim ? dim.col_alias || dim.col_name : null,
          options
        );
      } else {
        tData = Util.fromLatLanDataToMapData(data, layer, columns, options);
      }
    }

    const { bgMap = Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_STANDARD } = options;
    //  * {intl.get('COMM.IMCR')}
    if (bgMap !== Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_CITY_GIS) {
      const { headerLatLan } = tData;
      if (headerLatLan.length > 0 && options.auto) {
        this.setAutoView(headerLatLan, this.map);
      }
    }

    return Promise.resolve(tData);
  };

  setAutoView = (points, map) => {
    let lats = [];
    let lngs = [];
    for (let i = 0; i < points.length; i++) {
      if (points[i]) {
        lats.push(points[i][1]);
        lngs.push(points[i][0]);
      }
    }
    const maxLat = Math.max(...lats);
    const maxLng = Math.max(...lngs);
    const minLat = Math.min(...lats);
    const minLng = Math.min(...lngs);
    map && this.setZoom(maxLat, minLat, maxLng, minLng, map);
  };

  // intl.get('COMM.CZL')
  setZoom = (maxLat, minLat, maxLng, minLng, map) => {
    const zoom = [
      10,
      25,
      50,
      100,
      200,
      500,
      1000,
      2000,
      5000,
      10000,
      20000,
      30000,
      50000,
      100000,
      200000,
      500000,
      1000000,
    ];

    const pointA = L.latLng(maxLat, maxLng); // {intl.get('COMM.CPC')}A
    const pointB = L.latLng(minLat, minLng); // {intl.get('COMM.CPC')}B
    const distance = map.distance(pointA, pointB); // {intl.get('COMM.GTD')}
    const { options } = this.props;
    const { bgMap } = options;
    let z = 5;
    if (distance > 10) {
      for (var i = 0, zoomLen = zoom.length; i < zoomLen; i++) {
        if (zoom[i] - distance > 0) {
          z =
            bgMap === Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_ARCGIS
              ? 14 - i + 3
              : 16 - i + 5;
          break;
        }
      }
      if (i === zoom.length) {
        z = bgMap === Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_ARCGIS ? 3 : 5;
      }
    }
    map.setView([(maxLng + minLng) / 2, (maxLat + minLat) / 2], z);
  };

  drawCityLayerMarker = async ({ layer, data }) => {
    const value = await this.beforeDraw({ layer, data });
    if (!value) {
      return;
    }
    const arr = [];
    const { headerLatLan, dataMap, dimValues } = value;
    for (let hIndex = 0; hIndex < headerLatLan.length; hIndex++) {
      const key = dimValues[hIndex]; // "经度: 118.825587，{intl.get('ANAL.LATITUDE')}: 31.914867"
      arr.push({
        xy: headerLatLan[hIndex],
        content: PopupTemplates.getTemplate1(
          dataMap.get(key),
          layer.popupHeight || Constant.POPUP_CONFIG.defaultHeight
        ),
      });
    }
    return arr;
  };

  // intl.get('COMM.PUS')
  popupStyle = type => {
    return +type ? `pop-up-template${type}` : 'pop-up-template1';
  };

  renderIconHtml = (icon, iconStyle) => {
    const svgHtml =
      icon && icon.html
        ? icon.html
        : `<svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><use xlink:href="#icon-weizhi"></use></svg>`;
    const iconHtml = `<div style="width: 100%; height: 100%; color: ${iconStyle && iconStyle?.color
      ? iconStyle.color
      : icon && icon.color
        ? icon.color
        : '#5182e4'
      }">${svgHtml}</div>`;

    return iconHtml;
  };

  // intl.get('COMM.DPTAT')
  destroyMotionCase = item => {
    if (item) {
      const index = this.motionPolylineCases.findIndex(k => k.id === item.id);
      if (index >= 0) {
        this.motionPolylineCases[index].case.clearMotion();
        this.motionPolylineCases.splice(index, 1);
      }
    } else {
      this.motionPolylineCases.forEach(k => k.case.clearMotion());
      this.motionPolylineCases = [];
    }
  };

  /**
   * intl.get('COMM.LDTP')
   * @param {{intl.get('COMM.LAYER ')}id} id
   * @param {{intl.get('COMM.LALA')}} headerLatLan
   * @param {*} dataMap
   * @param {*} dimValues
   * @param {{intl.get('COMM.TRACK_STYLE')}} playbackStyle
   * @param {{intl.get('COMM.PUC')}} popupConfig
   * @param {{intl.get('COMM.PUWCM')}} popupFunc
   * @param {{intl.get('COMM.PUC')}} handleFunc
   */
  handlePlaybackTrail = (
    id,
    headerLatLan,
    dataMap,
    dimValues,
    playbackStyle,
    popupConfig,
    canvasInfo,
    popupFunc,
    handleFunc
  ) => {
    const motionPolyline = new MotionPolyline(
      this.map,
      headerLatLan,
      dataMap,
      dimValues,
      id,
      playbackStyle,
      popupConfig,
      canvasInfo,
      popupFunc,
      handleFunc
    );
    this.motionPolylineCases.push({
      id,
      case: motionPolyline,
    });
    motionPolyline.init();
  };

  createPopup = (
    {
      popupType,
      popupWidth,
      popupHeight,
      attach,
      jumpField,
      popupFontSize,
      dataArray,
      detail,
      renderFunc,
    },
    canvasInfo,
    id
  ) => {
    if (popupType === '5' && canvasInfo && canvasInfo.canvasData?.length) {

      this.customReactPopup[id] = (
        <CustomReactPopup canvasInfo={toJS(canvasInfo)} dataArray={dataArray} jumpField={jumpField} />
      );


      return ReactDOMServer.renderToString(this.customReactPopup[id]);
    } else if (popupType === '5' && canvasInfo) {
      // 增加勾选了自定义弹窗样式并且开启点位弹窗但是没有配置自定义弹窗样式的提示，防止走到其他样式里面

      message.info(intl.get('ANAL.PCCPOPUPSTYLE'));
      return <></>;
    } else {
      return L.popup({
        autoClose: false,
        closeOnClick: false,
        className: this.popupStyle(popupType),
        minWidth: popupWidth || Constant.POPUP_CONFIG.defaultWidth,
      }).setContent(
        renderFunc(
          dataArray,
          popupWidth || Constant.POPUP_CONFIG.defaultWidth,
          popupHeight || Constant.POPUP_CONFIG.defaultHeight,
          attach,
          popupFontSize,
          detail
        )
      );
    }
  };

  // intl.get('COMM.CBPU')
  createBubblePopup = (dataArray, marker, id) => {
    const bubblePop = L.popup({
      autoClose: false,
      autoPan: false,
      className: 'bubble-tooltip',
    }).setContent(renderTemplate(dataArray));
    marker.bindPopup(bubblePop).openPopup();
    bubblePop.__bubblePop = id;
  };

  // intl.get('COMM.IPF')
  buildBubbleTip = ({ attach, data, marker, hIndex, dataArray, id }) => {
    // {intl.get('COMM.DWTIPFIC')}
    const tipIndex = (attach || []).findIndex(
      k => k.isBubbleTip && k.isBubbleTip === '2'
    );
    if (tipIndex < 0 || hIndex > 0) return void 0;

    let currentTip = null;
    let _form = [];
    dataArray.form.forEach(k => {
      if (k.label !== attach[tipIndex].label) {
        _form.push(k);
      } else {
        currentTip = k.value;
      }
    });
    const column = data[0].find(k => k === attach[tipIndex].label);
    dataArray.form = _form;

    column &&
      sessionStorage.bubbleTip &&
      sessionStorage.bubbleTip !== currentTip &&
      this.createBubblePopup(dataArray, marker, id);

    sessionStorage.bubbleTip = currentTip;
  };

  // intl.get('COMM.IPWTP')，设置可拖动
  appendPopup = (pop, map) => {
    const { _popup } = pop?._source?._map || {};
    if (_popup?._latlng) {
      let pos = map.latLngToLayerPoint(_popup._latlng);
      L.DomUtil.setPosition(_popup._wrapper.parentNode, pos);
      let draggable = new L.Draggable(_popup._container, _popup._wrapper);
      draggable.enable();
    }
  };

  parseMarkerStyle = customStyle => {
    if (customStyle.trim() !== '') {
      try {
        let style = JSON.parse(customStyle);
        const { fontSize, color } = style;
        return {
          width: parseInt(fontSize),
          height: parseInt(fontSize),
          color,
        };
      } catch (e) {
        message.error('');
      }
    }
    return null;
  };

  // intl.get('COMM.DWTIASTF')，设置大小颜色
  updateIconSize = ({
    step,
    minValue,
    minSize,
    iconSize,
    dataArray,
    sizeColumns,
  }) => {
    const { col_name } = sizeColumns[0];
    if (step) {
      const { form } = dataArray;
      const col = form.find(c => c.label === col_name);
      const value = col ? Number(col.value) : 0;
      if (!isNaN(value) && !isNaN(step)) {
        let size = step * (value - minValue) + minSize;
        return [size.toFixed(4), size.toFixed(4)];
      } else {
        return iconSize;
      }
    } else {
      return iconSize;
    }
  };

  renderMakerIconHtml = ({
    icon,
    markerColors,
    dataArray,
    colorColumns,
    labelColumns,
    hIndex,
    iconStyle,
  }) => {
    let color = null;
    let label = null;
    if (colorColumns.length > 0) {
      const { data, datatype, col_name } = colorColumns[0];
      const isMetric = datatype === Constant.NUMBER_DATATYPE;

      if (isMetric) {
        const { form } = dataArray;
        const { value } = form.find(c => c.label === col_name);
        let index = data.indexOf(value);
        color = markerColors[index];
      } else {
        color = markerColors[hIndex % markerColors.length];
      }
    }
    if (labelColumns.length > 0) {
      const { col_name } = labelColumns[0];
      const { form } = dataArray;
      const { value } = form.find(c => c.label === col_name);
      label = value;
    }

    const svgHtml =
      icon && icon.html
        ? icon.html
        : `<svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><use xlink:href="#icon-weizhi"></use></svg>`;
    const iconHtml =
      label !== null
        ? `<div style="position:relative" >
              ${this.renderIcon({ icon, color, svgHtml, iconStyle })}
              <div style="margin:auto; width:50px; overflow: hidden;
               text-shadow:  0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff;
                font-weight:bold; text-overflow:ellipsis; white-space: nowrap;
                position:absolute;left:50%;transform:translateX(-50%);text-align:center
               "
               >${label}</div>
              </div>`
        : this.renderIcon({ icon, color, svgHtml, iconStyle });

    return iconHtml;
  };
  renderIcon = ({ icon, color, svgHtml, iconStyle }) => {
    return `<div style="color: ${color ||
      (iconStyle && iconStyle?.color
        ? iconStyle.color
        : icon && icon.color
          ? icon.color
          : '#5182e4')}">${svgHtml}</div>`;
  };

  getMarkerColors = ({ colorColumns }) => {
    // {intl.get('COMM.COLOR_MARKING')}
    const { datatype } = colorColumns[0];
    const { markerThemes, seColor, NUMBER_DATATYPE } = Constant;
    let colors = markerThemes;
    const isMetric = datatype === NUMBER_DATATYPE;
    if (isMetric) {
      colors = new GradientColor(
        seColor[0],
        seColor[1],
        colorColumns[0].data.length
      );
    }
    return colors;
  };

  // intl.get('EVEN.UPDATE_FIELDS')，未考虑资产变更
  updateColumns = () => {
    const { condition } = this.props;
    const newColumns = JSON.parse(JSON.stringify(condition.columns));
    return newColumns;
  };
  getAnnotationColumns = (columns, data) => {
    const newColumns = this.updateColumns(columns);
    const annotationColumns = gis_annotationTransform(newColumns, data);
    return annotationColumns;
  };

  // 逻辑控制执行
  executeProcess = ({ layer, data, hIndex, sendComponentEvent }) => {
    if (sendComponentEvent) {
      const { positionColumn, latColumn, lanColumn } = layer;
      const dataHead = data[0];
      const posIndex = dataHead.findIndex(k => k === positionColumn);
      const latIndex = dataHead.findIndex(k => k === latColumn);
      const lanIndex = dataHead.findIndex(k => k === lanColumn);
      sendComponentEvent('click', {
        pos: data[hIndex + 1][posIndex],
        lng: data[hIndex + 1][latIndex],
        lat: data[hIndex + 1][lanIndex],
      });
    }
  };

  /**
   * intl.get('COMM.DLI')
   * @param {{intl.get('COMM.IAPW')}} autoOpen
   * @param {{intl.get('COMM.HCM')}} highlightMarkers
   */
  drawLayerMarker = async (
    { layer, data, noLngLats },
    autoOpen,
    highlightMarkers
  ) => {
    const { options, sendComponentEvent } = this.props;
    const { openPopup, openCluster, autoLink } = options;
    // let self = this;
    let {
      condition,
      attach = [],
      icon,
      id,
      jumpField,
      popupType,
      popupWidth,
      popupHeight,
      popupFontSize,
      autoModal,
      showPath,
      pathColor,
      pathType,
      playback,
      customStyle,
      customStyleJson,
      bubblePopup,
      canvasInfo,
    } = layer;
    const value = await this.beforeDraw({ layer, data, noLngLats });
    if (!value) {
      return;
    }
    const { headerLatLan, dataMap, dimValues } = value;

    const columns = condition?.columns || [];

    // 附加信息{intl.get('ANAL.FIELD')}存在别名更新label{intl.get('ANAL.FIELD')}
    const _attach = attach.map(k => {
      const hasAlias = (columns || []).find(
        m => m.alias && m.col_name === k.label
      );
      hasAlias && (k.label = hasAlias.alias);
      return k;
    });

    // {intl.get('COMM.LDPF')}，启用状态下地图不可进行打点
    if (playback) {
      this.handlePlaybackTrail(
        id,
        headerLatLan,
        dataMap,
        dimValues,
        customStyle ? customStyleJson : '',
        {
          popupType,
          popupWidth,
          popupHeight,
          attach,
          popupFontSize,
          renderFunc: PopupTemplates.getTemplate1,
        },
        canvasInfo,
        this.createPopup,
        this.appendPopup
      );
      return void 0;
    }

    const iconStyle = customStyle
      ? this.parseMarkerStyle(customStyleJson)
      : null;
    let iconHtml = this.renderIconHtml(icon, iconStyle);

    // draw
    let markers = L.markerClusterGroup({
      iconCreateFunction: () => {
        return L.divIcon({
          html: iconHtml,
          iconSize: [iconStyle?.width || 30, iconStyle?.height || 30],
        });
      },
      chunkedLoading: true,
      polygonOptions: {
        weight: 1,
        fill: false,
        color: pathColor || '#3388ff',
        dashArray: pathType === 'dashe' ? '5' : null,
      },
    });

    const headerMap = new Map();

    // {intl.get('COMM.DWTLFIC')}
    const chainIndex = (_attach || []).findIndex(
      k => k.isChain && k.isChain === '2'
    );

    // {intl.get('COMM.DWGFAC')}
    const divideIndex = (_attach || []).findIndex(
      k => k.isDivide && k.isDivide === '2'
    );

    let iconSize = [iconStyle?.width || 30, iconStyle?.height || 30];

    // {intl.get('COMM.SIZE_MARKER')}
    const annotationColumns = this.getAnnotationColumns(columns, data);
    const maxSize = 50;
    const minSize = 30;
    let step = null;
    let minValue = null;
    if (annotationColumns.size.length > 0) {
      let { data, datatype } = annotationColumns.size[0];

      const isMetric = datatype === Constant.NUMBER_DATATYPE;
      if (isMetric) {
        minValue = data[0];
        const maxValue = data[data.length - 1];
        step = (maxSize - minSize) / (maxValue - minValue);
      }
    }
    let markerColors = null;

    // {intl.get('ANAL.COLOUR')}label标记
    if (annotationColumns.color.length > 0) {
      markerColors = this.getMarkerColors({
        colorColumns: annotationColumns.color,
      });
    }

    let points = [];
    for (let hIndex = 0; hIndex < headerLatLan.length; hIndex++) {
      const latlan = headerLatLan[hIndex];
      const headerKey = latlan ? latlan.join(',') : 'null';
      if (
        !latlan ||
        !latlan[0] ||
        !latlan[1] ||
        headerMap.get(headerKey) !== undefined
      ) {
        continue;
      }
      headerMap.set(headerKey, 'marked');
      const key = dimValues[hIndex];
      const center = latlan;
      const dataArray = dataMap.get(key);

      if (
        canvasInfo &&
        canvasInfo.canvasData &&
        canvasInfo.canvasData.length > 0
      ) {
        canvasInfo.canvasData.map(item => {
          if (item.type === 'field') {
            dataArray.form.forEach(arr => {
              if (arr.label === item.title) {
                item.contentValue = arr.value;
              }
            });
          }
          return item;
        });
      }

      if (annotationColumns.size.length > 0) {
        iconSize = this.updateIconSize({
          step,
          minSize,
          iconSize,
          minValue,
          dataArray,
          sizeColumns: annotationColumns.size,
        });
      }
      if (
        annotationColumns.color.length > 0 ||
        annotationColumns.label.length > 0
      ) {
        iconHtml = this.renderMakerIconHtml({
          icon,
          markerColors,
          dataArray,
          colorColumns: annotationColumns.color,
          labelColumns: annotationColumns.label,
          hIndex,
          iconStyle,
        });
      }
      highlightMarkers && (iconSize = [50, 50]);
      const divIcon = L.divIcon({
        html: iconHtml,
        iconSize,
      });
      let marker = L.marker(center, { icon: divIcon, draggable: true });

      const markerId = id || uuid();
      marker.__marker = markerId;
      // {intl.get('COMM.MARK_HIGHLIGHT')}
      marker.__marker_highlight = `${id}_${hIndex}`;
      // {intl.get('COMM.ALI')}
      if (chainIndex >= 0) {
        const columnIndex = data[0].findIndex(
          k => k === _attach[chainIndex].label
        );

        if (columnIndex >= 0) {
          marker.__marker_chain_key = String(data[hIndex + 1][columnIndex]);
        }
      }
      if (openCluster) {
        markers.addLayer(marker);
      } else {
        marker.addTo(this.map);
        points.push([latlan[0], latlan[1]]);
      }

      let popupParams = {
        popupType,
        jumpField,
        popupWidth,
        popupHeight,
        dataArray,
        attach: _attach,
        popupFontSize,
        renderFunc: PopupTemplates.getTemplate1,
        detail: { hIndex },
      };

      divideIndex >= 0 &&
        Object.assign(popupParams, {
          detail: {
            layer,
            data,
            hIndex,
            divideIndex,
          },
          renderFunc: renderCatalogTemplate,
        });
      const pop = this.createPopup(
        popupParams,
        canvasInfo,
        `cp_${id}_${hIndex}`
      );

      // {intl.get('COMM.FNAVMDBB')}
      if (autoModal && this.scrollKey && this.scrollValue) {
        const { form = [] } = dataArray;
        let isBubble = form.find(item => item.value === this.scrollValue);
        isBubble && this.createBubblePopup(dataArray, marker, id);
      }

      // {intl.get('COMM.LIPF')}，通过校验资产是否有最新数据更新来进行地图气泡图提示
      bubblePopup &&
        this.buildBubbleTip({
          attach: _attach,
          data,
          marker,
          hIndex,
          dataArray,
          id,
        });

      // {intl.get('COMM.CTMTJA')}
      if (autoLink) {
        const linkAttach = _attach.find(k => k?.isLink && k.isLink === '2');

        if (linkAttach) {
          const index = data[0].findIndex(k => k === linkAttach?.label);
          marker.on('click', () => {

            window.open(data[hIndex + 1][index], '_self');
          });
        }
      } else if (openPopup) {
        const that = this;
        marker.on('popupopen', () => {
          this.updateMarkerIcon(marker, [50, 50]);
          if (popupType === '5') {

            setTimeout(() => {
              let dom = document.querySelector('.leaflet-popup-content');
              hydrateRoot(dom, that.customReactPopup[`cp_${id}_${hIndex}`]);
              // hydrateRoot.render(dom, that.customReactPopup[`cp_${id}_${hIndex}`]);
            }, 200);
          }
        });
        marker.on('popupclose', () => {
          this.updateMarkerIcon(marker, [30, 30]);
        });
        marker.bindPopup(pop).on('click', () => {

          this.executeProcess({ layer, data, hIndex, sendComponentEvent });
          this.appendPopup(pop, this.map);
          playRTSP();
        });
        marker.on('dragend', (event) => {
          this.onDragend({ lat: event.target._latlng.lat, lng: event.target._latlng.lng })
          // console.log(event.target._latlng.lat, '纬度=======');
          // console.log(event.target._latlng.lng, '经度=======');
        })
      } else {
        // {intl.get('COMM.ZITDTCCT')}
        marker.on('click', () => {

          this.updateMarkerIcon(marker, [48, 48]);
          this.map.eachLayer(layer => {
            const node = layer.__marker_highlight;
            node &&
              node === this.currentClickMarker &&
              this.updateMarkerIcon(layer, [24, 24]);
          });
          this.currentClickMarker =
            this.currentClickMarker === marker.__marker_highlight
              ? null
              : marker.__marker_highlight;
          // {intl.get('COMM.LCES')}
          this.executeProcess({ layer, data, hIndex, sendComponentEvent });
        });

        marker.on('dragend', (event) => {
          this.onDragend({ lat: event.target._latlng.lat, lng: event.target._latlng.lng })
          // console.log(event.target._latlng.lat, '纬度=======');
          // console.log(event.target._latlng.lng, '经度=======');
        })
      }

      if (openPopup && autoOpen) {
        this.map.openPopup(pop, latlan);
      }
    } //marker

    if (openCluster) {
      markers.__marker = id;
      this.map.addLayer(markers);
    } else if (showPath) {
      const path = L.polyline(points, {
        weight: 2,
        color: pathColor || '#3388ff',
        dashArray: pathType === 'dashe' ? '5' : null,
      });
      path.__marker = id;
      path.addTo(this.map);
    }
  };

  drawMarkers = async data => {
    const { checkedList } = this.state;
    let _data = data.filter(
      k => !checkedList.find(v => v.indexOf(k.layer?.id) > -1)
    );
    _data.forEach(layerData => {
      this.drawLayerMarker(layerData);
    });
  };

  // intl.get('COMM.STS')
  updateMarkerIcon = (marker, size = [30, 30], opacity = 1) => {
    let currentIcon = marker.getIcon();
    currentIcon.options = Object.assign({}, currentIcon.options, {
      iconSize: size,
    });
    marker.setIcon(L.divIcon(currentIcon.options));
    marker.setOpacity(opacity);
  };

  highlightMarker = ({ ids }) => {
    let _ids = ids.map(k => k.toString());
    if (!_ids.length) return void 0;
    this.map &&
      this.map.eachLayer(layer => {
        const chainKey = layer.__marker_chain_key;
        const inIds = _ids.includes(chainKey);

        chainKey &&
          this.updateMarkerIcon(
            layer,
            inIds ? [48, 48] : [24, 24],
            inIds ? 1 : 0
          );
      });
  };

  handleEventPopover = params => {
    const { lat, lng, title, summary, content } = params;
    const iconHtml = this.renderIconHtml();
    const icon = L.divIcon({
      html: iconHtml,
      iconSize: [30, 30],
    });
    const popupIcon = L.marker([+lat, +lng], {
      icon,
    }).addTo(this.map);

    const popup = L.popup({
      autoClose: false,
      closeOnClick: false,
      className: 'popover-popup-box',
    })
      .setLatLng([+lat, +lng])
      .openOn(this.map);
    popup.setContent(
      renderPopoverTemplate({ title, summary, content }, () => {
        popup.remove();
        popupIcon.remove();
      })
    );
    popupIcon.__popup_marker = true;
    popup.__popup_popover = true;
  };




  /**
   * intl.get('COMM.DEMOTMTLSE')
   * @param {*} id
   * @param {{intl.get('ANAL.LATITUDE')}} lat
   * @param {{intl.get('ANAL.LONGITUDE')}} lng
   * @param {{intl.get('SRC.STYLE_SETTINGS')}} options
   * @param {{intl.get('COMM.ELR')}} mRadius
   * @param {{intl.get('COMM.ESR')}} sRadius
   * @param {{intl.get('COMM.ROTATION_ANGLE')}} deg
   */
  drawEllipseByEvent = ({
    id,
    lat,
    lng,
    options = {},
    mRadius,
    sRadius,
    deg = 0,
  }) => {
    let hasLayer = false;
    this.map &&
      this.map.eachLayer(layer => {
        if (layer.__ellipseId === id) {
          this.map.removeLayer(layer);
          hasLayer = true;
        }
      });

    if (hasLayer) return void 0;

    const ellipse = L.ellipse(
      [+lat, +lng],
      [+mRadius, +sRadius],
      +deg,
      options
    ).addTo(this.map);
    ellipse.__ellipseId = id;
  };

  drawLayerHeatmap = async ({ layer, data, columns }) => {
    this.map.eachLayer(layer => layer.__heatmap && this.map.removeLayer(layer));
    const value = await this.beforeDraw({ layer, data, cols: columns });
    if (!value) {
      return;
    }
    let { headerLatLan, dataMap, dimValues } = value;
    const { options = {} } = this.props;
    let {
      heatmapRadius = 25,
      heatmapGradiant = '{"0.5": "blue", "0.75": "lime", "1": "red"}',
    } = options;
    try {
      heatmapGradiant = JSON.parse(heatmapGradiant);
    } catch (error) {
      heatmapGradiant = {
        0.5: 'blue',
        0.75: 'lime',
        1: 'red',
      };
    }

    let max = 0;

    let array = headerLatLan.map((point, index) => {
      const key = dimValues[index];
      const data = dataMap.get(key);
      const { form = [], table = [] } = data;
      let value = 1;
      if (form[0]) {
        const temp = parseFloat(form[0].value);
        value = isNaN(temp) ? 1 : temp;
      } else if (table[0] && table[1]) {
        const temp = parseFloat(table[1][0]);
        value = isNaN(temp) ? 1 : temp;
      }
      if (value > max) {
        max = value;
      }
      const latlng = point && Array.isArray(point) ? point : [];
      return {
        lng: latlng[1],
        lat: latlng[0],
        count: value,
      };
    });

    array = array.filter(center => {
      return center.lng && center.lat;
    });

    const heatmapLayer = new HeatmapOverlay({
      radius: heatmapRadius,
      minOpacity: 0.3,
      latField: 'lat',
      lngField: 'lng',
      valueField: 'count',
      gradient: heatmapGradiant,
    });
    heatmapLayer.setData({ data: array, max });
    heatmapLayer.__heatmap = layer?.id;
    heatmapLayer.addTo(this.map);
  };

  drawHeatmap = async data => {
    data.forEach(layerData => {
      this.drawLayerHeatmap(layerData);
    });
  };

  drawLayerCharts = async ({ layer, data }) => {
    const value = await this.beforeDraw({ layer, data });
    const { options = {} } = this.props;
    const { statisticsType = 'pie' } = options;
    switch (statisticsType) {
      case 'bar':
        this.drawColumn('bar', value, layer);
        break;
      case 'column':
        this.drawColumn('column', value, layer);
        break;
      default:
        this.drawPie(value, layer);
    }
  };

  drawCharts = async data => {
    data.forEach(layerData => {
      this.drawLayerCharts(layerData);
    });
  };

  drawPie = (value, layer) => {
    const { headerLatLan, layerValues, numberCols, content } = value;
    if (layerValues.length === 0) {
      return;
    }
    const {
      id: layerId,
      icon,
      condition: { columns },
    } = layer;
    let iconHtml = this.renderIconHtml(icon || {});
    const markIcon = L.divIcon({
      html:
        iconHtml ||
        '<svg width="1em" height="1em" fill="#5182e4" aria-hidden="true" focusable="false" class=""><use xlink:href="#icon-weizhi"></use></svg>',
      iconSize: [30, 30],
    });//画出遮盖物
    headerLatLan.forEach((latlng, index) => {
      const center = headerLatLan[index];
      const marker = L.marker(center, {
        icon: markIcon,
      }).addTo(this.map);
      marker.__marker = layerId;
      marker.__marker_highlight = `${layerId}_${index}`;
      const id = uuid();
      let pop = L.popup({
        autoClose: false,
        closeOnClick: false,
      }).setContent(
        `<div style="width: 250px; height: 150px;" id=${id}></div>`
      );
      marker.bindPopup(pop);
      let numberCol = [];
      if (numberCols.length === 0) {
        return;
      } else {
        // {intl.get('COMM.SMFTDTSC')}，过滤出第一条数值字段
        numberCols.find(name => {
          let col = columns.find(col => {
            let col_name = col.alias || col.col_name;
            return col_name === name;
          });
          let c_datatype =
            typeof col.convertColumn?.datatype === 'number'
              ? col.convertColumn?.datatype
              : col.col_datatype;
          if (Util.isNumber(c_datatype)) {
            numberCol.push(name);
          }
        });
      }
      marker.on('popupopen', function () {
        // {intl.get('SERV.INITIALIZATION')}highcharts实例
        let data = [];
        const array = content.get(layerValues[index]);
        // numberCols所有选中的附加信息字段，numberCol.includes(num)为了判断当前选中字段那些是数值类型，非数值类型给予0，防止饼图报错
        numberCols.forEach(num => {
          for (let i = 0; i < array.length; i++) {
            data.push({
              name: num,
              y: numberCol.includes(num) ? array[i][num] : 0,
            });
          }
        });
        const options = {
          chart: {
            type: 'pie',
            options3d: {
              enabled: true,
              alpha: 45,
              beta: 0,
            },
          },
          tooltip: {
            formatter: function () {
              return `${this.series.name} : <b>${this.point.y}</b>`;
            },
          },
          colors: Constant.mapColors,
          credits: false,
          plotOptions: {
            pie: {
              depth: 20,
              dataLabels: {
                enabled: false,
              },
              showInLegend: true,
            },
          },
          legend: {
            align: 'right',
            verticalAlign: 'top',
            layout: 'vertical',
          },
          title: {
            text: null,
          },
          series: [{ name: numberCol, data }],
        };
        Highcharts.chart(`${id}`, options);
      });
      marker.openPopup();
    });
  };

  drawColumn = (type, value, layer) => {
    const { headerLatLan, layerValues, numberCols, content, dim } = value;
    if (layerValues.length === 0) {
      return;
    }
    const { id: layerId, icon } = layer;
    let iconHtml = this.renderIconHtml(icon || {});
    const markIcon = L.divIcon({
      html:
        iconHtml ||
        '<svg width="1em" height="1em" fill="#5182e4" aria-hidden="true" focusable="false" class=""><use xlink:href="#icon-weizhi"></use></svg>',
      iconSize: [30, 30],
    }); //画出遮盖物
    headerLatLan.forEach((latlng, index) => {
      const center = headerLatLan[index];
      const marker = L.marker(center, {
        icon: markIcon,
      }).addTo(this.map);
      marker.__marker = layerId;
      marker.__marker_highlight = `${layerId}_${index}`;
      const id = uuid();
      let pop = L.popup({
        autoClose: false,
        closeOnClick: false,
      }).setContent(
        `<div style="width: 300px; height: 200px;" id=${id}></div>`
      );
      marker.bindPopup(pop);
      if (numberCols.length === 0) {
        return;
      }
      marker.on('popupopen', function () {
        // {intl.get('SERV.INITIALIZATION')}highcharts实例
        let xAxis = [];
        let series = [];
        const array = content.get(layerValues[index]);
        if (!dim) {
          for (let i = 0; i < array.length; i++) {
            xAxis.push(layerValues[index]);
          }
          for (let i = 0; i < numberCols.length; i++) {
            let d = [];
            for (let j = 0; j < array.length; j++) {
              d.push(array[j][numberCols[i]]);
            }
            series.push({
              name: numberCols[i],
              data: d,
            });
          }
        } else {
          for (let i = 0; i < array.length; i++) {
            xAxis.push(array[i][dim]);
          }
          for (let i = 0; i < numberCols.length; i++) {
            let d = [];
            for (let j = 0; j < array.length; j++) {
              d.push(array[j][numberCols[i]]);
            }
            series.push({
              name: numberCols[i],
              data: d,
            });
          }
        }
        const options = {
          chart: {
            type: type,
            options3d: {
              enabled: true,
              alpha: 15,
              beta: 15,
              depth: 25,
            },
          },
          tooltip: {
            formatter: function () {
              return `${this.series.name} : <b>${this.point.y}</b>`;
            },
          },
          legend: {
            align: 'right',
            verticalAlign: 'top',
            layout: 'vertical',
          },
          colors: Constant.mapColors,
          credits: false,
          title: {
            text: null,
          },
          xAxis: {
            categories: xAxis,
            gridLineWidth: 0,
          },
          yAxis: {
            gridLineWidth: 0,
          },
          series: series,
        };
        Highcharts.chart(`${id}`, options);
      });
      marker.openPopup();
    });
  };

  drawLayerScatters = async ({ layer, data }) => {
    const value = await this.beforeDraw({ layer, data });
    if (!value) {
      return;
    }
    const { headerLatLan, attach } = value;
    let radius = 20;
    const MAX_RAIDUS = 50;
    let max = null;
    let vals = null;
    let label = null;
    // {intl.get('COMM.FASTF')}，默认为数组第一个
    if (attach?.length) {
      label = attach[0].label;
      const index = data[0].indexOf(label);
      vals = data.slice(1).map(k => k[index]);
      max = Math.max(...vals);
    }
    // draw
    for (let hIndex = 0; hIndex < headerLatLan.length; hIndex++) {
      const latlan = headerLatLan[hIndex];
      if (!latlan || !latlan[0] || !latlan[1]) {
        continue;
      }
      const center = latlan;

      if (max && vals) {
        radius = (vals[hIndex] / max) * MAX_RAIDUS;
      }

      const circleOptions = {
        fillOpacity: 0.6,
        fillColor: '#5182E4',
        stroke: false,
        radius: radius < 5 ? 5 : radius,
      };
      const circle = L.circleMarker(center, circleOptions);
      max && vals && circle.bindTooltip(`${label}：${vals[hIndex]}`);
      circle.addTo(this.map);
      circle.__scatter = layer?.id;
    }
  };

  drawScatters = async data => {
    data.forEach(layerData => {
      this.drawLayerScatters(layerData);
    });
  };

  // intl.get('COMM.GTCCDLOTLUTD')
  handleCurrentLayer = event => {
    const { layers } = this.props;
    const { checked, node } = event;
    const { props, children } = node;
    let currentLayer = [];

    // {intl.get('COMM.COTD')}
    if (props.eventKey.split('#').length === 2 && children && children.length) {
      let queue = [];
      let result = [];
      queue.push(node);
      while (queue.length > 0) {
        const temp = queue.shift();
        if (temp.key.split('#').length > 2) {
          result.push(temp.key);
        }
        if (temp.children && temp.children.length) {
          for (let i = 0; i < temp.children.length; i++) {
            queue.push(temp.children[i]);
          }
        }
      }

      currentLayer = layers.filter(layer =>
        result.find(k => k.includes(layer.id))
      );
    } else {
      currentLayer = layers.filter(
        layer => props.eventKey.includes(layer.id) && layer.category === 'data'
      );
    }

    // {intl.get('COMM.RLDOCDL')}
    if (currentLayer.length) {
      currentLayer.forEach(item => {
        if (checked) {
          this.loadSingleLayerData(item);
        } else {
          this.clearMarkersByTiming(item);
          // {intl.get('COMM.CDPPAT')}
          item.playback && this.destroyMotionCase(item);
        }
      });
    }
  };


  onDragend(value) {

    const { componentId } = this.props
    window.eventCenter?.triggerEvent &&
      window.eventCenter.triggerEvent(componentId, "onDragend", {
        value
      });
  }
  /**
   * intl.get('COMM.FDL')
   * @param {{intl.get('APP.FILTER_CONDITION')}} series
   */
  findDataLayers = series => {
    const { checkedList } = this.state;
    const { layers } = this.props;
    layers.forEach(k => {
      if (
        checkedList.find(v => k.id && v.includes(k.id) && k.category === 'data')
      ) {
        this.loadSingleLayerData(k, series);
      }
    });
    this.timingLayerData(layers, checkedList);
  };

  onChangeFilterSeries = series => {
    this.clearLayerMarker();
    this.filterSeries = series;
    this.findDataLayers();
  };

  getDatatype = datatype => {
    switch (datatype) {
      case 0:
      case 5:
      case 6:
        return 0;
      case 8:
        return 8;
    }
  };

  buildConditionSeries = () => {
    let series = this.props.selectSeries.slice();
    let filterSeries = this.filterSeries;
    // {intl.get('COMM.FRFB')}
    filterSeries = filterSeries.filter(k =>
      series.find(m => m.column === k.column || m.col_name === k.column)
    );
    filterSeries.forEach(filter => {
      let index = series.findIndex(item => {
        return item.col_name === filter.column;
      });
      // {intl.get('COMM.DNTBTASTIF')}
      const datatype = this.getDatatype(filter.datatype);
      if (filter.selectedValue && filter.selectedValue.length > 0) {
        if (series[index]?.datatype === undefined) {
          series[index].datatype = series[index].col_datatype;
        }
        series[index].filter = {
          column: series[index].col_name,
          type: 37,
          datatype: datatype,
          compareObj: filter.selectedValue,
        };
        const empIndex = filter.selectedValue.findIndex(v => v === '');
        if (empIndex >= 0) {
          series[index].filters = [
            {
              column: series[index].col_name,
              type: 6,
              datatype: datatype,
            },
          ];
          if (filter.selectedValue.length > 1) {
            series[index].filters.push({
              column: series[index].col_name,
              type: 37,
              datatype: datatype,
              compareObj: filter.selectedValue.filter(v => v !== ''),
            });
          }
        } else {
          series[index].filters = [series[index].filter];
        }
      } else {
        delete series[index].filter;
        delete series[index].filters;
      }
    });

    return series;
  };

  queryLayerData = async (layer, series = []) => {
    let { token, condition, id, assetId, model, appVariables } = this.props;
    const { dataConfig = {} } = model || {};
    const { variables: bigscreenVariables = [] } = dataConfig;
    const newColumns = condition.columns;
    let newCondition = toJS(layer.condition);

    const {
      positionColumn,
      latColumn,
      lanColumn,
      attach,
      playbackStyle,
      canvasInfo = {},
    } = layer;
    const { canvasData = [] } = canvasInfo;
    const attachColumns = (attach || []).map(a => {
      return a && a.value !== undefined ? a.value : a;
    });
    const canvasFields = canvasData.map(a => {
      if (a.type === 'field') {
        return a.title;
      }
    });

    const inChart = [positionColumn, latColumn, lanColumn, playbackStyle]
      .concat(attachColumns)
      .concat(canvasFields);
    if (newCondition) {
      newCondition.columns.forEach(col => {
        const colName = col.col_name;
        const newColumn = newColumns.find(c => c.col_name === colName);
        col.inChart = inChart.includes(colName);

        if (
          layer?.bubblePopup &&
          (col.datatype === Constant.COLUMN_DATATYPE_DATE ||
            col.datatype === Constant.COLUMN_DATATYPE_TIMESTAMP)
        ) {
          col.timeGranularity = 7;
        }
        if (newColumn && newColumn.isAnnotation && !col.inChart) {
          col.inChart = true;
        }
      });
    } else {
      newCondition = condition;
      newCondition.columns.forEach(col => {
        const inChart = [
          positionColumn,
          latColumn,
          lanColumn,
          playbackStyle,
        ].concat(attachColumns);
        if (!col.inChart && inChart.includes(col?.col_name)) {
          col.inChart = true;
        }
      });
    }

    if (this.filterSeries.length) {
      newCondition.series = this.buildConditionSeries(newCondition.series);
    } else {
      newCondition.series = [];
    }

    // {intl.get('COMP.YES')}series参数进行拼接
    newCondition.series = [...(newCondition.series || []), ...series];

    let analyzerVariable = cloneDeep(newCondition.variable);
    let outsideVariable = toJS(condition)?.variable || [];
    newCondition.variable = analyzerVariable.map(k => {
      const sameVariable = outsideVariable.find(m => m.name === k.name);
      return sameVariable || k;
    });

    // 大屏联动变量
    if (bigscreenVariables.length) {
      newCondition.variable.forEach(k => {
        const same = bigscreenVariables.find(
          m => m.name === k.name && m.data_type === k.data_type
        );
        if (same) {
          k.current_value = same.current_value;
        }
      });
    }

    // 应用变量联动
    if (appVariables && appVariables.length) {
      newCondition.variable.forEach(k => {
        const same = appVariables.find(m => m.componentId === k.id);
        if (same) {
          k.current_value = same.value;
        }
      });
    }

    const { data } = token
      ? await getConditionDataByToken(
        layer.assetId || assetId,
        token,
        layer.analysisId || id,
        newCondition
      )
      : await getConditionData(
        layer.assetId || assetId,
        layer.analysisId || id,
        newCondition
      );

    if (data?.chartData.length) {
      return {
        layer,
        columns: layer.condition
          ? layer.condition.columns
          : condition.columns || [],
        data: data.chartData,
      };
    }
    return null;
  };

  // intl.get('COMM.DLGDSLD')
  loadSingleLayerData = async (layer, series) => {
    let db = await this.queryLayerData(layer, series);

    if (db) {
      let layerDataIndex = this.layerData.findIndex(
        item => item.layer.id === layer.id
      );
      if (layerDataIndex >= 0) {
        this.layerData.splice(layerDataIndex, 1, db);
      } else {
        this.layerData.push(db);
      }
      const { chartType } = this.props;
      switch (chartType) {//根据不同的地图类型画出不同的地图
        case '711':
          if (layer?.layerType === 'heat') {
            this.drawHeatmap([db]);
          } else {
            this.clearMarkersByTiming(layer);
            this.drawLayerMarker(db);
          }
          break;
        case '712':
          this.clearLayerMarker();
          this.drawHeatmap([db]);
          break;
        case '713':
          this.clearLayerMarker();
          this.drawCharts([db]);
          break;
        case '714':
          this.clearLayerMarker();
          this.drawScatters([db]);
          break;
      }
    }
    // this.clearMarkersByTiming(layer);
  };

  // intl.get('COMM.DSP')
  drawSearchMarker = ({ layer, data }) => {
    if (layer.lanColumn && layer.latColumn && data.length) {
      this.clearLayerMarker();
      this.drawLayerMarker({ layer, data }, true);

      // const { options, setChartOptions } = this.props;
      // let clone = toJS(options);
      // clone.checkedList = [];
      // setChartOptions && setChartOptions(clone);
      // this.setState({ checkedList: [] });
    }
  };

  onChangeLegends = (keys, event) => {  //图层出现的选择项框更改事件
    const { layers, options, setChartOptions } = this.props;
    this.handleCurrentLayer(event); //调用化标点方法
    let clone = toJS(options);
    clone.checkedList = keys;
    // {intl.get('COMM.LRR')}
    console.log(keys, event, '====keys');
    this.timingLayerData(layers, keys);
    setChartOptions && setChartOptions(clone);
    this.setState({ checkedList: keys });
  };

  buildColorGradiant = () => {
    const { options } = this.props;
    let {
      heatmapGradiant = '{"0.5": "blue", "0.75": "lime", "1": "red"}',
    } = options;
    try {
      heatmapGradiant = JSON.parse(heatmapGradiant);
    } catch (error) {
      heatmapGradiant = {
        0.5: 'blue',
        0.75: 'lime',
        1: 'red',
      };
    }
    let colors = [];
    Object.keys(heatmapGradiant)
      .sort()
      .forEach(val => {
        const color = heatmapGradiant[val];
        colors.push(
          <div
            key={color}
            style={{
              width: 24,
              height: 48,
              backgroundColor: color,
            }}
          />
        );
      });
    return <div className="map-color-gradiant">{colors}</div>;
  };

  cityMapDrawCircle = () => {
    this.map.addEventListener(arg => {
      switch (arg.action) {
        case 'mapclick':
          this.map.Invoke({
            ActionName: 'DrawAddFilter',
            Parameters: {
              type: 'circle',
              isfilter: true,
            },
          });
      }
    });
  };

  clearCircleRange = () => {
    this.map &&
      this.map.eachLayer(layer => {
        if (layer.__circleMarker) {
          this.map.removeLayer(layer);
        }
      });
  };

  drawMarkerRange = range => {
    this.clearCircleRange();
    // {intl.get('COMM.DPR')}
    const circleStyle = {
      color: 'green',
      fillColor: '#00cc00',
      fillOpacity: 0.3,
      radius: range,
    };
    let { geoMap } = this.state;
    const layerData = this.layerData;
    layerData.forEach((item, v) => {
      const { data, layer } = item;
      let source = data.slice(1);
      const { condition = {} } = layer;
      const header = data[0];
      const { columns = [] } = condition;
      if (layer.type === 1) {
        let column = layer.positionColumn;
        let displayName;
        const col = columns.find(c => c.col_name === column);
        displayName = col.col_alias || col.col_name;
        let valueMap = geoMap.get(column);
        const dimColIndex = header.findIndex(h => h === displayName);
        source.forEach(row => {
          const address = row[dimColIndex];
          const latlng = valueMap ? valueMap.get(address) : false;
          if (latlng) {
            const circle = L.circle([latlng[0], latlng[1]], circleStyle).addTo(
              this.map
            );
            circle.__marker = layer.id;
            circle.__marker_highlight = `${layer.id}_${v}`;
            circle.__circleMarker = true;
          }
        });
      } else if (layer.type === 2) {
        const latItem = columns.find(c => layer.latColumn === c.col_name);
        const lngItem = columns.find(c => layer.lanColumn === c.col_name);
        const latIndex = header.indexOf(latItem.col_alias || latItem.col_name);
        const lanIndex = header.indexOf(lngItem.col_alias || lngItem.col_name);
        source.forEach(row => {
          const lat = row[latIndex];
          const lan = row[lanIndex];
          if (lat && lan) {
            const circle = L.circle([lan, lat], circleStyle).addTo(this.map);
            circle.__marker = layer.id;
            circle.__marker_highlight = `${layer.id}_${v}`;
            circle.__circleMarker = true;
          }
        });
      }
    });
  };

  render() {
    const { checkedList } = this.state;
    const {
      token,
      options,
      layers,
      chartType,
      setChartOptions,
      selectSeries,
      openFilter,
    } = this.props;
    const { showMapLegend = true, showRangeTool = false } = options;
    let isCityGis = false;
    const showToolbar = !isCityGis && options.showToolbar;
    const showCityGisToolbar = isCityGis && options.showToolbar;
    const searchFields = layers.filter(item => item.searchColumn);

    const drawStyle = css`
      & {
        .leaflet-control-container {
          .leaflet-top {
            top: ${searchFields.length ? '60px' : '0'};
          }
        }
      }
    `;

    const {
      showLayer = true,
      treeLegends,
      marginTop,
      marginRight,
      searchTop,
      searchLeft,
      searchBgColor,
      searchFontColor,
      hoverColor,
      orderNumBgColor,
      orderNumFontColor,
      filterTop,
      filterRight,
    } = options;

    return (
      <div className={`map-wrapper ${drawStyle}`}>
        <div
          className={showToolbar ? 'map-content' : 'map-content hide-toolbar'}
          ref={element => {
            this.mapElement = element;
          }}
        />
        <div id="zhang" />
        {showCityGisToolbar && (
          <div className="city_gis_toolbar">
            <a
              className="leaflet-draw-draw-circle"
              onClick={this.cityMapDrawCircle}
            />
          </div>
        )}
        {showRangeTool && (
          <div className="range-toolbar">
            <a
              className="range-toolbar-100"
              title={intl.get('COMM.1ATP').d('点位100米周围')}
              onClick={this.drawMarkerRange.bind(this, 100)}
            />
            <a
              className="range-toolbar-200"
              title={intl.get('COMM.2ATP').d('点位200米周围')}
              onClick={this.drawMarkerRange.bind(this, 200)}
            />
            <a
              className="range-toolbar-500"
              title={intl.get('COMM.5ATP').d('点位500米周围')}
              onClick={this.drawMarkerRange.bind(this, 500)}
            />
          </div>
        )}
        {((showMapLegend && layers.length > 0) ||
          (treeLegends && treeLegends.length > 0)) &&
          showLayer && (
            <div
              className="map-legend"
              style={{
                top: +marginTop || 10,
                right: +marginRight || 10,
              }}
            >
              <TreeLegend
                checkedList={checkedList}
                layers={layers}
                options={options}
                onChangeLegends={this.onChangeLegends}
                setChartOptions={setChartOptions}
                chartType={chartType}
              />
            </div>
          )}
        {searchFields.length && chartType === '711' ? (
          <SearchFields
            searchTop={searchTop}
            searchLeft={searchLeft}
            searchBgColor={searchBgColor}
            searchFontColor={searchFontColor}
            hoverColor={hoverColor}
            orderNumBgColor={orderNumBgColor}
            orderNumFontColor={orderNumFontColor}
            token={token}
            searchFields={searchFields}
            drawSearchMarker={this.drawSearchMarker}
            initLayers={this.initLayers}
          />
        ) : null}
        {openFilter ? (
          <GISSelector
            selectSeries={selectSeries}
            layers={layers}
            filterTop={filterTop}
            filterRight={filterRight}
            onChangeFilterSeries={this.onChangeFilterSeries}
          />
        ) : null}
        {chartType === '712' && this.buildColorGradiant()}
      </div>
    );
  }
}

export default AnalyseEventHOC()(GISChart);
