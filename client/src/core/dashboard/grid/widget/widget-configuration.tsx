import Tab from '../../../shared/tab/Tab';
import { IoSettingsOutline } from 'react-icons/io5';
import { CiCircleInfo } from 'react-icons/ci';
import './widget-configuration.css';
import { Widgets } from '../../../../widgets/core/model/widgets';
import type { WidgetEnum } from '../../../../widgets/core/model/widget-type';
import { useWidgetQuery } from '../../../../widgets/core/hooks/useWidgetQueryResult';
import { useWidgetConfig } from '../../../../widgets/core/hooks/useWidgetConfig';
import { useState } from 'react';
import { useDashboard } from '../../../../context/dashboard-context';

interface WidgetConfigurationProps {
  widget: WidgetEnum;
  onClose: () => void;
}

const WidgetConfiguration: React.FC<WidgetConfigurationProps> = ({ widget, onClose }) => {
  const { setWidgetConfig } = useDashboard();
  const [config, setConfig] = useState(useWidgetConfig(widget));
  const widgetData = useWidgetQuery(widget, config);

  const handleApply = () => {
    setWidgetConfig(widget, config);
    onClose();
  };

  return (
    <>
      <div className="edit-widget-container">
        <div className="edit-widget-content">
          <div className="config-container edit-widget-content-item surface">
            <Tab
              tabs={[
                {
                  label: (
                    <div className="h-row">
                      <IoSettingsOutline />
                      Settings
                    </div>
                  ),
                  content: (() => {
                    const ConfigComponent = Widgets[widget].widgetConfig?.component;
                    return ConfigComponent ? (
                      <ConfigComponent
                        {...(config !== null ? { config } : {})}
                        setConfig={setConfig}
                        data={widgetData?.data}
                      />
                    ) : (
                      <div>No settings available 🗅</div>
                    );
                  })(),
                },
                {
                  label: (
                    <div className="h-row">
                      <CiCircleInfo />
                      About
                    </div>
                  ),
                  content: (() => {
                    const DocumentationComponent = Widgets[widget].widgetConfig?.documentation;
                    return DocumentationComponent ? (
                      <DocumentationComponent />
                    ) : (
                      <div>No documentation available 🗅</div>
                    );
                  })(),
                },
              ]}
            />
          </div>
          <div className="widget-container edit-widget-content-item widget-preview">
            {(() => {
              const Preview = Widgets[widget].widgetComponent;
              return (
                <Preview
                  data={widgetData?.data}
                  isLoading={widgetData?.isLoading}
                  error={widgetData?.error}
                  {...(config !== null ? { config } : {})}
                />
              );
            })()}
          </div>
        </div>
      </div>
      <div className="action-buttons h-row">
        <button className="button-tertiary" onClick={onClose}>
          Cancel
        </button>
        <button onClick={handleApply}>Apply 🚀</button>
      </div>
    </>
  );
};

export default WidgetConfiguration;
