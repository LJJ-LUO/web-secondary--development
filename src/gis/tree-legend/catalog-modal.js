import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, message } from 'antd';
import intl from 'react-intl-universal';
import nanoid from 'nanoid';
import { toJS } from 'mobx';

function CatalogModal({
  visible,
  options,
  currentCatalog,
  setChartOptions,
  handleCatalogVisible,
}) {
  // title{intl.get('COMM.HAVE_ADDED')}icon需求，所以name嵌套深
  const _name = currentCatalog?.title.props.children[0].props.children;
  const [name, setName] = useState(_name || intl.get('COMM.NEW_DIRECTORY'));

  const onChangeName = e => setName(e.target.value);

  const handleOk = () => {
    if (name.trim() === '')
      return message.warning(intl.get('COMM.LNCBE').d('图层名称不能为空！'));

    let clone = toJS(options);

    // {intl.get('ASS.MODIFY')}
    if (currentCatalog) {
      clone.treeLegends.forEach(item => {
        if (item.key === currentCatalog.eventKey) {
          item.title = name;
        }
      });
    } else {
      let id = nanoid();
      const result = {
        key: `0#${id}`,
        id,
        title: name,
      };
      clone.treeLegends = [result, ...(options.treeLegends || [])];
    }

    setChartOptions(clone);

    handleCatalogVisible(false);
  };

  return (
    <Modal
      className="wms-modal ant-customized-new"
      title={intl.get('analysis.model.catalog.modal.title')}
      visible={visible}
      width={560}
      onOk={handleOk}
      onCancel={() => handleCatalogVisible(false)}
    >
      <p className="label">{intl.get('COMM.DIRECTORY_NAME')}</p>
      <Input value={name} maxLength={35} onChange={e => onChangeName(e)} />
    </Modal>
  );
}

CatalogModal.propTypes = {
  visible: PropTypes.bool,
  options: PropTypes.object,
  currentCatalog: PropTypes.object,
  setChartOptions: PropTypes.func,
  handleCatalogVisible: PropTypes.func,
};

export default CatalogModal;
