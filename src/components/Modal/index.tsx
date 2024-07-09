interface Notification {
  id: number;
  subscriptionId: number;
  message: string;
  readed: boolean;
  userId: number;
}

interface NotificationModalProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal = ({ notifications, isOpen, onClose }: NotificationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-sm w-full">
        <h2 className="font-bold text-lg mb-4">Notifications</h2>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification, index) => (
              <li key={index} className="mb-2 border-b pb-2">
                {notification.message}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center p-4">
            No notifications available.
          </div>
        )}
        <button onClick={onClose} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};
