import { Button, Modal } from 'antd';
import { deleteDocument, updateDocument, FieldValue } from '../../firebase/services';
import { ExclamationCircleOutlined } from "@ant-design/icons"
const { confirm } = Modal;
export const openNotification = (task) => {
    confirm({
        title: 'Bạn có chắc chắn muốn xóa tiến trình này không ?',
        icon: <ExclamationCircleOutlined />,
        content: 'Chọn Ok để xóa hoặc chọn Cancel để hủy',
        onOk() {


        },
        width: 500
    });

};