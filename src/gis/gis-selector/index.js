import intl from 'react-intl-universal';
/**
 * GISintl.get('COMM.MFF')
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import qs from 'querystringify';
import { Select, message } from 'antd';
import {
  getValues,
  getValues2,
  getValuesByToken,
  getValues2ByToken,
} from '../common/service/new-analyzer';
import isEqual from 'lodash.isequal';
import { pull as lodash_pull } from 'lodash';
import './index.less';
const DATATYPE = {
  0: 'string',
  5: 'date',
  6: 'timestamp',
  8: 'number',
  10: 'image',
  string: 0,
  date: 5,
  timestamp: 6,
  number: 8,
  image: 10,
};

const CUSTOM_DATE_OPTION = 20;
const { Option } = Select;

class GISSelector extends PureComponent {
  static propTypes = {
    selectSeries: PropTypes.array,
    layers: PropTypes.array,
    legendWidth: PropTypes.number,
    filterTop: PropTypes.string,
    filterRight: PropTypes.string,
    onChangeFilterSeries: PropTypes.func,
    assetId: PropTypes.string,
    analysisId: PropTypes.string,
    condition: PropTypes.array,
  };

  state = {
    filters: [],
  };

  componentDidMount() {
    this.transformFilter(this.props.selectSeries || []);
  }

  componentDidUpdate(prevProps) {
    const { selectSeries, layers, condition } = this.props;
    const {
      selectSeries: prevSelectSeries,
      layers: prevLayers,
      condition: prevCondition,
    } = prevProps;

    const _condition = condition || layers[0]?.condition;
    const _prevCondition = prevCondition || prevLayers[0]?.condition;

    if (
      // {intl.get('COMM.RFCTTOVP')}
      selectSeries !== prevSelectSeries ||
      (_condition && !isEqual(_condition, _prevCondition))
    ) {
      const { filters } = this.state;
      const { selectSeries } = this.props;

      let sliceFilter = filters
        .slice()
        .filter(k =>
          selectSeries.find(
            m => m.column === k.column || m.col_name === k.col_name
          )
        );
      this.setState({
        filters: sliceFilter,
      });
      this.transformFilter(this.props.selectSeries);
    }
  }

  getTimeGranularity = item => {
    if (
      DATATYPE[item.col_datatype] === 'date' ||
      DATATYPE[item.col_datatype] === 'timestamp'
    ) {
      return item.timeGranularity === null || item.timeGranularity === undefined
        ? CUSTOM_DATE_OPTION
        : item.timeGranularity;
    } else {
      return null;
    }
  };

  getPost = (token, version1) => {
    if (token && location.pathname.indexOf('share-app') > -1) {
      return version1 ? getValuesByToken : getValues2ByToken;
    } else {
      return version1 ? getValues : getValues2;
    }
  };

  getAvaValues = async (item, index) => {
    const { layers } = this.props;
    const {
      assetId = layers[0]?.assetId,
      analysisId = layers[0]?.analysisId,
      condition = layers[0]?.condition,
    } = this.props;
    const con = condition ? { ...condition } : {};
    if (!condition.columns && !condition.dimensions && !condition.values) {
      return;
    }
    const { token } = qs.parse(location.search);
    const version1 = condition && (condition.dimensions || condition.values);
    const post = this.getPost(token, version1);
    let _series = {
      alias: item.col_alias,
      column: item.originColumn || item.col_name || item.column,
      datatype:
        item.col_datatype !== undefined ? item.col_datatype : item.datatype,
    };

    const common = {
      series: [_series],
      filters: condition.filters,
      associations: condition.associations,
    };
    const params = version1
      ? [common]
      : {
        ...con,
        ...common,
      };
    try {
      const { data } = await post(
        assetId,
        item.col_name || item.column,
        this.getTimeGranularity(item),
        analysisId,
        params,
        token
      );
      this.transData(item, data, index);
    } catch (error) {
      console.error(error);
      message.error(intl.get('COMM.FTGFOV'));
    }
  };

  transData = (item, data, index) => {
    let { filters } = this.state;
    let _filters = filters.slice();

    _filters[index] = {
      alias: item.col_alias,
      column: item.col_name || item.column,
      index: index,
      datatype: item.col_datatype || item.datatype,
      selectedValue: item.filter ? item.filter.compareObj : [],
      options: Array.from(new Set(data)),
    };

    this.setState({
      filters: _filters,
    });
  };

  transformFilter = series => {
    // const { filters } = this.state;
    series.forEach((ser, index) => {
      // const existsOp = filters.find(
      //   k => k?.column === ser?.col_name || k?.column === ser?.column
      // );
      // if (!existsOp) {
      if (ser.customLabels && ser.customLabels.length > 0) {
        const data = ser.customLabels.map(item => item.value);
        this.transData(ser, data, index);
      } else {
        this.getAvaValues(ser, index);
      }
      // }
    });
  };

  changeFilter = (item, value) => {
    let { filters } = this.state;
    let copyFilters = filters.slice();
    let currentIndex = copyFilters.findIndex(
      k => item?.column === k?.column || item?.col_name === k?.column
    );

    if (currentIndex >= 0) {
      if (
        copyFilters[currentIndex].options.map(v => v + '').indexOf(value) !== -1
      ) {
        copyFilters[currentIndex].selectedValue.push(value);
        this.setState({ filters: copyFilters });
        this.props.onChangeFilterSeries(copyFilters);
      }
    }
  };
  onDeselect = (item, value) => {
    let { filters } = this.state;
    let copyFilters = filters.slice();
    let currentIndex = copyFilters.findIndex(
      k => item?.column === k?.column || item?.col_name === k?.column
    );

    if (currentIndex >= 0) {
      lodash_pull(copyFilters[currentIndex].selectedValue, value);
      this.setState({ filters: copyFilters });
      this.props.onChangeFilterSeries(copyFilters);
    }
  };

  render() {
    const { filters } = this.state;
    const { selectSeries, filterTop, filterRight } = this.props;

    return (
      <div
        className="gis-selector"
        style={{
          right: +filterRight || 170,
          top: +filterTop || 10,
        }}
      >
        {selectSeries.length > 0 &&
          selectSeries.map(k => {
            const ops = filters.filter(
              e => e && (e.column === k.column || e.column === k.col_name)
            );
            return (
              <Select
                mode="multiple"
                key={k.index}
                value={ops.length ? ops[0].selectedValue : []}
                onDeselect={value => this.onDeselect(k, value)}
                onSelect={value => this.changeFilter(k, value)}
                placeholder={k.alias || k.column || k.col_name}
                optionFilterProp="label"
                filterOption={(input, option) => option.value.includes(input)}
              >
                {ops.length > 0 &&
                  ops[0].options.map((m, n) => (
                    <Option value={m + ''} key={`${m}-${n}`}>
                      {m}
                    </Option>
                  ))}
              </Select>
            );
          })}
      </div>
    );
  }
}

export default GISSelector;
