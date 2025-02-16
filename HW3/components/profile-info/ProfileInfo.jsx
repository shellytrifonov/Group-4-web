/**
 * User profile information display component.
 * Shows user's profile picture with fallback to default image.
 * Displays personal information including name, email, and food preferences.
 * Responsive layout that adapts between mobile and desktop views.
 * Handles missing profile image gracefully with error fallback.
 */

export const ProfileInfo = ({ user }) => {
    return (
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-12 text-center md:text-left">
        <div className="flex-shrink-0 md:mb-0">
          <img
            src={user.profileImage || "/images/defaultprofile.jpg"}
            alt="User Profile"
            className="w-48 h-48 rounded-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/defaultprofile.jpg";
            }}
          />
        </div>
        <div className="flex-grow">
          <h2 className="text-3xl font-bold mb-4">
            {user.firstName} {user.lastName}
          </h2>
          <div className="space-y-3">
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <div>
              <span className="font-semibold">Food Preferences:</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {user.foodPreferences?.map((preference) => (
                  <span
                    key={preference}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {preference}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };