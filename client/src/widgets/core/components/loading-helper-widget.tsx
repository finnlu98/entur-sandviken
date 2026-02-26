import LoadingOverlay from '../../../feedback/loading/components/loading/loading-overlay';
import { useLoading } from '../../../feedback/loading/hooks/use-loading';
import type { WidgetEnum } from '../model/widget-type';
import EditWidget from './edit-widget';

interface LoadingHelperWidgetProps {
  widgetKey: WidgetEnum;
  children: React.ReactNode;
  loadingKeys?: string[];
  showConfig?: () => boolean;
}

const LoadingHelperWidget: React.FC<LoadingHelperWidgetProps> = ({
  widgetKey,
  children,
  loadingKeys,
  showConfig,
}) => {
  const { isLoading: checkLoading } = useLoading();
  const loading = loadingKeys ? loadingKeys.some((key) => checkLoading(key)) : false;
  return (
    <>
      {loading ? (
        <LoadingOverlay />
      ) : showConfig && showConfig() ? (
        <EditWidget widgetKey={widgetKey} />
      ) : (
        <>{children}</>
      )}
    </>
  );
};
export default LoadingHelperWidget;
