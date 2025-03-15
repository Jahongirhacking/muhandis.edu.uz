import { Result } from "antd"
import { NotificationBigIcon } from "../../assets/icons"

const NotificationsPage = () => {
    return (
        <div style={{ margin: 'auto' }}>
            <Result
                icon={<NotificationBigIcon />}
                title="Sizda hozircha yangi bildirishnomalar yo‘q!"
            />
        </div>
    )
}

export default NotificationsPage